import { useEffect, useRef } from "react";
import { SPRITES } from "./sprites.generated";

// The Tiny Us home, alive: a baked 1x background + the two pets drawn from the prototype's sprite rows
// (design-review/tinyus-pixel/index.html). Same motion vocabulary as the app: crawl 2 px / 120 ms swapping base/S1
// frames, slime "breath", blink, tail flicks (wag bursts for puppies), SEQ squash/stretch, and the couple moments
// (snuggle, boop, the "you both answered" squish dance, a loveseat date that ends in a nap). Night stars twinkle
// like sky.json (a dot, now and then star2/star3 for 400 ms). Drawn at 1x, scaled by an integer with no smoothing.

type Art = keyof typeof SPRITES.pets;
type Face = "normal" | "blink" | "happy" | "sleepy";
type Shape = "base" | "S1" | "S2" | "T1";

const { scene: S, pets: PETS, heart: HEART_ROWS, px: PX, seq: SEQ, seats: SEATS, stars: STARS, twinkle: TWINKLE, zz: ZZ } = SPRITES;
const SW = 21;

function sprite(rows: readonly string[], pal: Record<string, string>) {
  const c = document.createElement("canvas");
  c.width = rows[0].length;
  c.height = rows.length;
  const g = c.getContext("2d")!;
  rows.forEach((r, y) => r.split("").forEach((ch, x) => {
    const col = pal[ch];
    if (col) { g.fillStyle = col; g.fillRect(x, y, 1, 1); }
  }));
  return c;
}

// SHAPES from the prototype: rows 7, 8, 12 and edge columns 1, 19 are plain body, so dropping/doubling them never moves the face
function ops(rows: readonly string[], rm: number[], dupR: number[], dupC: number[]) {
  const rs = rows.map((r) => {
    let s = r;
    for (const c of [...dupC].sort((a, b) => b - a)) s = s.slice(0, c + 1) + s[c] + s.slice(c + 1);
    return s;
  });
  const out: string[] = [];
  rs.forEach((r, i) => { if (rm.includes(i)) return; out.push(r); if (dupR.includes(i)) out.push(r); });
  return out;
}
const SHAPES: Record<Shape, (r: readonly string[]) => readonly string[]> = {
  base: (r) => r,
  S1: (r) => ops(r, [7], [], [19, 1]),
  S2: (r) => ops(r, [7, 8], [], [19, 1]),
  T1: (r) => ops(r, [], [7, 12], []),
};

type Frames = { body: Record<Face, Record<Shape, HTMLCanvasElement>>; tail: Record<string, HTMLCanvasElement>; tailL: Record<string, HTMLCanvasElement> };
const cache: Partial<Record<Art, Frames>> = {};
function frames(art: Art): Frames {
  if (cache[art]) return cache[art]!;
  const p = PETS[art];
  const pal = p.pal as Record<string, string>;
  const body = {} as Frames["body"];
  for (const f of Object.keys(p.faces) as Face[]) {
    body[f] = {} as Record<Shape, HTMLCanvasElement>;
    for (const s of Object.keys(SHAPES) as Shape[]) body[f][s] = sprite(SHAPES[s](p.faces[f]), pal);
  }
  const tail: Record<string, HTMLCanvasElement> = {}, tailL: Record<string, HTMLCanvasElement> = {};
  for (const [k, rows] of Object.entries(p.tail) as [string, readonly string[]][]) {
    tail[k] = sprite(rows, pal);
    tailL[k] = sprite(rows.map((r: string) => r.split("").reverse().join("")), pal);
  }
  return (cache[art] = { body, tail, tailL });
}

type Pt = { x: number; y: number };
type Pet = {
  art: Art; x: number; y: number; path: Pt[]; step: number; nextStep: number; moving: boolean;
  seq: [string, number][]; seqAt: number; face: Face | null; faceUntil: number; tailSide: 1 | -1;
  wagUntil: number; off: number; seat: number | null; arrive: (() => void) | null;
};
const mkPet = (art: Art, x: number, off: number): Pet => ({
  art, x, y: S.feet, path: [], step: 0, nextStep: 0, moving: false, seq: [], seqAt: 0, face: null, faceUntil: 0,
  tailSide: 1, wagUntil: 0, off, seat: null, arrive: null,
});

type Props = {
  bg: string; // 1x scene png from public/tinyus/art/
  pets: [Art, Art];
  alt: string;
  stars?: boolean; // night scene: twinkle the sky's stars
  className?: string;
};

export default function PixelHome({ bg, pets, alt, stars = false, className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const world = document.createElement("canvas");
    world.width = S.w; world.height = S.h;
    const g = world.getContext("2d")!;
    const HEART = sprite(HEART_ROWS, PX);
    const ZZZ = sprite(ZZ.rows, ZZ.pal as Record<string, string>);
    const TW: Record<number, HTMLCanvasElement> = { 1: sprite(TWINKLE.star2.rows, TWINKLE.star2.pal), 2: sprite(TWINKLE.star3.rows, TWINKLE.star3.pal) };
    const img = new Image();
    let bgData: Uint8ClampedArray | null = null;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alive = true;

    const A = mkPet(pets[0], 30, 0), B = mkPet(pets[1], 80, 700);
    const all = [A, B];
    const parts: { img: HTMLCanvasElement; x: number; y: number; t: number; rise: number; life: number }[] = [];
    const twinkles = STARS.filter((s) => s[2] > 0).map((s, i) => ({ x: s[0], y: s[1], k: s[2] as number, at: performance.now() + 600 + i * 450 + Math.random() * 2000 }));

    const isPup = (p: Pet) => PETS[p.art].puppy;
    const play = (p: Pet, name: keyof typeof SEQ) => { p.seq = SEQ[name].map((s) => [s[0] as string, s[1] as number]); p.seqAt = performance.now(); };
    const showFace = (p: Pet, f: Face, ms: number) => { p.face = f; p.faceUntil = performance.now() + ms; };
    const cheer = (p: Pet) => { play(p, "land"); if (isPup(p)) p.wagUntil = performance.now() + 1400; };
    const clampX = (x: number) => Math.round(Math.max(S.xMin, Math.min(S.xMax, x)));
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const heartAt = (x: number, y: number) => parts.push({ img: HEART, x: Math.round(x) - 3, y, t: performance.now(), rise: 120, life: 1800 });
    const zzAt = (x: number, y: number) => parts.push({ img: ZZZ, x: Math.round(x) - 3, y, t: performance.now(), rise: 200, life: 2200 });
    const midX = (L: Pet, R: Pet) => (L.x + SW + R.x) / 2;
    const headY = (p: Pet) => Math.round(p.y) - 26;

    // walk: along the floor, then up onto a seat (or down from one), 2 px a step like the prototype's routeTo
    function goTo(p: Pet, x: number, seat: number | null = null) {
      const pts: Pt[] = [];
      if (p.seat !== null) pts.push({ x: p.x, y: S.feet });
      if (seat === null) pts.push({ x: clampX(x), y: S.feet });
      else { const gx = SEATS[seat][0] - SW / 2; pts.push({ x: gx, y: S.feet }, { x: gx, y: SEATS[seat][1] }); }
      p.path = pts; p.seat = seat;
      return new Promise<void>((r) => { p.arrive = r; });
    }
    async function meet(gap: number) {
      const [L, R] = A.x <= B.x ? [A, B] : [B, A];
      const mid = Math.max(S.xMin + SW, Math.min(S.xMax, midX(L, R)));
      await Promise.all([goTo(L, mid - SW - gap / 2), goTo(R, mid + gap / 2)]);
      return [L, R] as const;
    }

    // ---------- couple moments (same beats as design-review/tinyus-pixel/index.html PAIR_MOMENTS) ----------
    const MOMENTS: Record<string, () => Promise<void>> = {
      async snuggle() {
        const [L, R] = await meet(-3);
        L.tailSide = -1; R.tailSide = 1; // tails out on both sides, like bookends
        showFace(L, "happy", 2600); showFace(R, "happy", 2600);
        for (let i = 0; i < 3; i++) { cheer(L); cheer(R); await wait(420); }
        heartAt(midX(L, R), headY(L));
        await wait(1400); L.tailSide = R.tailSide = 1;
      },
      async boop() {
        const [L, R] = await meet(1);
        showFace(L, "happy", 1600); play(L, "stretch"); await wait(260);
        play(R, "squish"); showFace(R, "blink", 500); await wait(520);
        showFace(R, "happy", 1400); if (isPup(R)) R.wagUntil = performance.now() + 1400;
        heartAt(R.x + SW / 2, headY(R)); await wait(1400);
      },
      async party() { // "You both answered!" squish dance
        const [L, R] = await meet(5);
        showFace(L, "happy", 3000); showFace(R, "happy", 3000);
        for (let i = 0; i < 3; i++) { play(L, "squish"); await wait(260); play(R, "squish"); await wait(260); }
        heartAt(L.x + SW / 2, headY(L)); await wait(200);
        heartAt(midX(L, R), headY(L) - 4); await wait(200);
        heartAt(R.x + SW / 2, headY(R)); await wait(1600);
      },
      async sofa() { // a loveseat date that turns into a nap
        const [p0, p1] = Math.abs(A.x - SEATS[0][0]) <= Math.abs(B.x - SEATS[0][0]) ? [A, B] : [B, A];
        await Promise.all([goTo(p0, 0, 0), goTo(p1, 0, 1)]);
        showFace(A, "happy", 2600); showFace(B, "happy", 2600);
        cheer(p0); await wait(300); cheer(p1);
        heartAt((SEATS[0][0] + SEATS[1][0]) / 2, SEATS[0][1] - 28); await wait(2600);
        showFace(A, "sleepy", 5200); showFace(B, "sleepy", 5200);
        for (let i = 0; i < 3; i++) { zzAt(SEATS[i % 2][0] + 6, SEATS[0][1] - 24); await wait(1500); }
        await wait(700); play(p0, "stretch"); play(p1, "stretch"); await wait(500);
        await Promise.all([goTo(p0, SEATS[0][0] - 30), goTo(p1, SEATS[1][0] + 14)]);
      },
    };
    const ORDER = ["snuggle", "sofa", "boop", "party", "snuggle", "boop", "sofa", "party"];

    async function wander() {
      await Promise.all(all.map((p) => (Math.random() < 0.75 ? goTo(p, S.xMin + Math.random() * (S.xMax - S.xMin)) : wait(800))));
    }
    async function director() {
      await wait(1800);
      for (let i = 0; alive; i++) {
        await MOMENTS[ORDER[i % ORDER.length]]();
        if (!alive) return;
        await wait(1200 + Math.random() * 1200);
        await wander();
        await wait(1500 + Math.random() * 2000);
      }
    }

    function fit() {
      const css = cv.clientWidth || S.w * 3;
      const r = Math.max(1, Math.round((css * (devicePixelRatio || 1)) / S.w));
      cv.width = S.w * r; cv.height = S.h * r;
      ctx.imageSmoothingEnabled = false;
    }

    function shadowColor(x: number) {
      if (!bgData) return "rgba(0,0,0,.12)";
      const i = (Math.min(S.h - 1, S.feet + 2) * S.w + Math.max(0, Math.min(S.w - 1, x))) * 4;
      const k = 0.86;
      return `rgb(${bgData[i] * k | 0},${bgData[i + 1] * k | 0},${bgData[i + 2] * k | 0})`;
    }

    function step(p: Pet, now: number) {
      const wp = p.path[0];
      p.moving = !!wp;
      if (wp && now > p.nextStep) {
        p.step = (p.step + 1) % 2; p.nextStep = now + 120;
        const dx = wp.x - p.x, dy = wp.y - p.y;
        p.x += Math.sign(dx) * Math.min(2, Math.abs(dx)); p.y += Math.sign(dy) * Math.min(2, Math.abs(dy));
        if (Math.abs(wp.x - p.x) < 0.5 && Math.abs(wp.y - p.y) < 0.5) {
          p.path.shift();
          if (!p.path.length) { const r = p.arrive; p.arrive = null; r?.(); }
        }
      }
      while (p.seq.length && now - p.seqAt > p.seq[0][1]) { p.seqAt += p.seq[0][1]; p.seq.shift(); }
    }

    function shapeOf(p: Pet, now: number): Shape {
      if (p.moving) return p.step ? "base" : "S1";
      if (p.seq.length) return p.seq[0][0] as Shape;
      return (now + p.off) % 1500 < 260 ? "S1" : "base";
    }
    function faceOf(p: Pet, now: number): Face {
      if (p.face && now < p.faceUntil) return p.face;
      return (now + p.off * 2) % 3600 < 150 ? "blink" : "normal";
    }

    function drawPet(p: Pet, now: number) {
      const fr = frames(p.art);
      const body = fr.body[faceOf(p, now)][shapeOf(p, now)];
      const cx = Math.round(p.x + SW / 2), y = Math.round(p.y);
      const left = cx - Math.floor(body.width / 2), top = y + 1 - body.height;
      if (y >= S.feet) { // shadow on the floor only (not on the sofa)
        g.fillStyle = shadowColor(cx);
        const rx = Math.max(5, Math.round(body.width / 2));
        g.fillRect(cx - rx, S.feet + 1, rx * 2 + 1, 1);
        g.fillRect(cx - rx + 2, S.feet + 2, rx * 2 - 3, 1);
      }
      const pup = isPup(p), fast = now < p.wagUntil;
      const wag = p.moving || fast ? (Math.floor(now / (fast || pup ? 100 : 170)) % 2 ? "flick" : "up")
        : pup ? ((now + p.off) % 2200 < 700 && Math.floor(now / 130) % 2 ? "flick" : "up")
        : ((now + p.off) % 2600 < 420 ? "flick" : "up");
      const tail = (p.tailSide < 0 ? fr.tailL : fr.tail)[wag];
      const ty = top + body.height - (pup ? 8 : 4) - tail.height + 1;
      g.drawImage(tail, p.tailSide < 0 ? left - tail.width + 2 : left + body.width - 2, ty);
      g.drawImage(body, left, top);
    }

    function draw(now: number) {
      g.drawImage(img, 0, 0);
      if (stars) for (const s of twinkles) {
        if (now > s.at + 400) s.at = now + 2600 + Math.random() * 1400;
        if (now >= s.at) { const t = TW[s.k]; g.drawImage(t, s.x - (t.width >> 1), s.y - (t.height >> 1)); }
      }
      [...all].sort((a, b) => a.y - b.y || a.x - b.x).forEach((p) => drawPet(p, now));
      for (let i = parts.length - 1; i >= 0; i--) {
        const h = parts[i], age = now - h.t;
        if (age > h.life) { parts.splice(i, 1); continue; }
        g.drawImage(h.img, h.x, Math.round(h.y - age / h.rise)); // floats up 1 px per `rise` ms
      }
      ctx.drawImage(world, 0, 0, cv.width, cv.height);
    }

    let raf = 0, visible = true, started = false;
    const loop = (now: number) => {
      all.forEach((p) => step(p, now));
      draw(now);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (still || !visible || document.hidden) return;
      if (!started) { started = true; director(); }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const poke = () => { // tap: both perk up, one heart
      all.forEach((p) => { play(p, "stretch"); showFace(p, "happy", 1200); if (isPup(p)) p.wagUntil = performance.now() + 1400; });
      heartAt((A.x + B.x) / 2 + SW / 2, Math.min(headY(A), headY(B)));
      if (still) draw(performance.now());
    };

    img.onload = () => {
      g.drawImage(img, 0, 0);
      bgData = g.getImageData(0, 0, S.w, S.h).data;
      fit();
      if (still) { // reduced motion: one calm frame, together on the loveseat
        [A, B].forEach((p, i) => { p.x = SEATS[i][0] - SW / 2; p.y = SEATS[i][1]; p.seat = i; showFace(p, "happy", 1e12); });
        draw(0);
      } else {
        draw(performance.now()); // paint right away; the loop takes over on the next frame
        start();
      }
    };
    img.src = bg;

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); });
    io.observe(cv);
    const onVis = () => start();
    const onResize = () => { fit(); if (still) draw(0); };
    document.addEventListener("visibilitychange", onVis);
    addEventListener("resize", onResize);
    cv.addEventListener("click", poke);
    return () => {
      alive = false;
      cancelAnimationFrame(raf); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      removeEventListener("resize", onResize);
      cv.removeEventListener("click", poke);
    };
  }, [bg, pets[0], pets[1], stars]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={alt}
      width={S.w * 3}
      height={S.h * 3}
      className={`pixelated block h-auto w-full cursor-pointer ${className}`}
      style={{ aspectRatio: `${S.w} / ${S.h}` }}
    />
  );
}

// One still pet frame (for small illustrations, e.g. answer bubbles), integer-scaled
export function PetSprite({ art, face = "happy", scale = 2, className = "" }: { art: Art; face?: Face; scale?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const g = cv.getContext("2d")!;
    g.clearRect(0, 0, cv.width, cv.height);
    g.drawImage(frames(art).body[face].base, 0, 0);
  }, [art, face]);
  return (
    <canvas
      ref={ref}
      aria-hidden
      width={SW}
      height={17}
      className={`pixelated shrink-0 ${className}`}
      style={{ width: SW * scale, height: 17 * scale }}
    />
  );
}
