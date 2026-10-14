import { useEffect, useRef } from "react";
import { SPRITES } from "./sprites.generated";

// The Tiny Us home, alive: a baked 1x background + the two pets drawn from the prototype's sprite rows
// (design-review/tinyus-pixel/index.html): crawl 2 px / 120 ms swapping base/S1 frames, slime "breath", blink,
// tail flicks (a wag burst for puppies), and now and then they meet in the middle and snuggle with a heart.
// Everything is drawn at 1x and scaled up by an integer with no smoothing, so every pixel stays on the grid.

type Art = keyof typeof SPRITES.pets;
type Face = "normal" | "blink" | "happy" | "sleepy";
type Shape = "base" | "S1" | "S2" | "T1";

const { scene: S, pets: PETS, heart: HEART_ROWS, px: PX, seq: SEQ } = SPRITES;
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

type Pet = {
  art: Art; x: number; tx: number; step: number; nextStep: number; moving: boolean;
  seq: [string, number][]; seqAt: number; face: Face | null; faceUntil: number; tailSide: 1 | -1;
  nextWander: number; wagUntil: number; off: number;
};
const mkPet = (art: Art, x: number, off: number): Pet => ({
  art, x, tx: x, step: 0, nextStep: 0, moving: false, seq: [], seqAt: 0, face: null, faceUntil: 0,
  tailSide: 1, nextWander: 1500 + off, wagUntil: 0, off,
});

type Props = {
  bg: string; // 1x scene png from public/tinyus/art/
  pets: [Art, Art];
  alt: string;
  className?: string;
};

export default function PixelHome({ bg, pets, alt, className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const world = document.createElement("canvas");
    world.width = S.w; world.height = S.h;
    const g = world.getContext("2d")!;
    const heart = sprite(HEART_ROWS, PX);
    const img = new Image();
    let bgData: Uint8ClampedArray | null = null;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const [A, B] = [mkPet(pets[0], 34, 0), mkPet(pets[1], 74, 700)];
    const all = [A, B];
    const hearts: { x: number; y: number; t: number }[] = [];
    let snuggleAt = performance.now() + 5000 + Math.random() * 4000;
    let snuggling: { phase: "go" | "hold"; until: number } | null = null;

    const isPup = (p: Pet) => PETS[p.art].puppy;
    const play = (p: Pet, name: keyof typeof SEQ, now: number) => { p.seq = SEQ[name].map((s) => [s[0] as string, s[1] as number]); p.seqAt = now; };
    const showFace = (p: Pet, f: Face, ms: number, now: number) => { p.face = f; p.faceUntil = now + ms; };
    const cheer = (p: Pet, now: number) => { play(p, "land", now); if (isPup(p)) p.wagUntil = now + 1400; };
    const clampX = (x: number) => Math.round(Math.max(S.xMin, Math.min(S.xMax, x)));

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
      p.moving = Math.abs(p.tx - p.x) > 0.5;
      if (p.moving && now > p.nextStep) {
        p.step = (p.step + 1) % 2; p.nextStep = now + 120;
        p.x += Math.sign(p.tx - p.x) * Math.min(2, Math.abs(p.tx - p.x));
      }
      if (!snuggling && !p.moving && now > p.nextWander) {
        p.nextWander = now + 2800 + Math.random() * 4500;
        const r = Math.random();
        if (r < 0.6) p.tx = clampX(S.xMin + Math.random() * (S.xMax - S.xMin));
        else if (r < 0.75) play(p, "stretch", now);
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
      const cx = Math.round(p.x + SW / 2);
      const left = cx - Math.floor(body.width / 2), top = S.feet + 1 - body.height;
      // shadow: a 1-px-tall pixel ellipse under the feet
      g.fillStyle = shadowColor(cx);
      const rx = Math.max(5, Math.round(body.width / 2));
      for (let dx = -rx; dx <= rx; dx++) g.fillRect(cx + dx, S.feet + 1, 1, 1);
      g.fillRect(cx - rx + 2, S.feet + 2, rx * 2 - 3, 1);
      const pup = isPup(p), fast = now < p.wagUntil;
      const wag = p.moving || fast ? (Math.floor(now / (fast || pup ? 100 : 170)) % 2 ? "flick" : "up")
        : pup ? ((now + p.off) % 2200 < 700 && Math.floor(now / 130) % 2 ? "flick" : "up")
        : ((now + p.off) % 2600 < 420 ? "flick" : "up");
      const tail = (p.tailSide < 0 ? fr.tailL : fr.tail)[wag];
      const ty = top + body.height - (pup ? 8 : 4) - tail.height + 1;
      g.drawImage(tail, p.tailSide < 0 ? left - tail.width + 2 : left + body.width - 2, ty);
      g.drawImage(body, left, top);
    }

    function couple(now: number) {
      const [L, R] = A.x <= B.x ? [A, B] : [B, A];
      if (!snuggling && now > snuggleAt && !A.moving && !B.moving) {
        const mid = Math.max(S.xMin + SW, Math.min(S.xMax, (L.x + SW + R.x) / 2));
        L.tx = clampX(mid - SW + 1.5); R.tx = clampX(mid - 1.5); // bodies overlap a little = squished together
        snuggling = { phase: "go", until: now + 9000 };
      }
      if (!snuggling) return;
      if (snuggling.phase === "go" && !L.moving && !R.moving && Math.abs(L.tx - L.x) < 1 && Math.abs(R.tx - R.x) < 1) {
        snuggling = { phase: "hold", until: now + 3200 };
        L.tailSide = -1; R.tailSide = 1; // tails out on both sides, like bookends
        showFace(L, "happy", 2800, now); showFace(R, "happy", 2800, now);
        [0, 450, 900].forEach((d) => setTimeout(() => { const t = performance.now(); cheer(L, t); cheer(R, t); }, d));
        hearts.push({ x: Math.round((L.x + SW + R.x) / 2) - 3, y: S.feet - 26, t: now });
      }
      if (now > snuggling.until) {
        snuggling = null; L.tailSide = R.tailSide = 1;
        L.nextWander = now + 1200; R.nextWander = now + 2600;
        snuggleAt = now + 12000 + Math.random() * 8000;
      }
    }

    function draw(now: number) {
      g.drawImage(img, 0, 0);
      [...all].sort((a, b) => a.x - b.x).forEach((p) => drawPet(p, now));
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i], age = now - h.t;
        if (age > 1800) { hearts.splice(i, 1); continue; }
        g.drawImage(heart, h.x, Math.round(h.y - age / 120)); // floats up 1 px every 120 ms
      }
      ctx.drawImage(world, 0, 0, cv.width, cv.height);
    }

    let raf = 0, visible = true;
    const loop = (now: number) => {
      all.forEach((p) => step(p, now));
      couple(now);
      draw(now);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => { if (!raf && !still && visible && !document.hidden) raf = requestAnimationFrame(loop); };

    const poke = () => { // tap: both perk up, one heart
      const now = performance.now();
      all.forEach((p) => { play(p, "stretch", now); showFace(p, "happy", 1200, now); if (isPup(p)) p.wagUntil = now + 1400; });
      hearts.push({ x: Math.round((A.x + B.x) / 2 + SW / 2) - 3, y: S.feet - 26, t: now });
      if (still) draw(now);
    };

    img.onload = () => {
      g.drawImage(img, 0, 0);
      bgData = g.getImageData(0, 0, S.w, S.h).data;
      fit();
      if (still) { // reduced motion: one calm frame, side by side, happy
        A.x = 40; B.x = 58; A.tailSide = -1;
        showFace(A, "happy", 1e9, 0); showFace(B, "happy", 1e9, 0);
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
      cancelAnimationFrame(raf); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      removeEventListener("resize", onResize);
      cv.removeEventListener("click", poke);
    };
  }, [bg, pets[0], pets[1]]); // eslint-disable-line react-hooks/exhaustive-deps

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
