import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { PetSprite } from "./pixelHome";

// Scroll motion for the Tiny Us pages. Content is server-rendered visible (works without JS); on mount, anything
// below the fold is hidden and rises in when it scrolls into view. Reduced motion = everything simply shows.

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// "idle" (as rendered) → "wait" (below the fold, hidden) → "in" (in view, animated in). Fires once.
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "wait" | "in">("idle");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) { setState("in"); return; }
    if (el.getBoundingClientRect().top > innerHeight * 0.92) setState("wait");
    let done = false;
    const show = () => { if (done) return; done = true; setState("in"); io.disconnect(); removeEventListener("scroll", check); };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) show(); }, { threshold });
    // belt and braces: content must never stay hidden, so a plain position check on scroll backs up the observer
    const check = () => { if (el.getBoundingClientRect().top < innerHeight * 0.85) show(); };
    io.observe(el);
    addEventListener("scroll", check, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", check); };
  }, [threshold]);
  return [ref, state] as const;
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "article" | "section" }) {
  const [ref, state] = useInView<HTMLDivElement>(0.15);
  return (
    <Tag
      ref={ref as never}
      className={`tu-reveal ${state === "wait" ? "is-wait" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

// Step 1: the answer types itself into today's question, then folds away until the other one answers.
export function QuestionDemo({ eyebrow, question, placeholder, answer, hidden }: { eyebrow: string; question: string; placeholder: string; answer: string; hidden: string }) {
  const [ref, state] = useInView<HTMLDivElement>(0.5);
  const [n, setN] = useState(0);
  const done = n >= answer.length;
  useEffect(() => {
    if (state !== "in") return;
    if (reduced()) { setN(answer.length); return; }
    let i = 0;
    const t = setInterval(() => { i += 1; setN(i); if (i >= answer.length) clearInterval(t); }, 45);
    return () => clearInterval(t);
  }, [state, answer]);
  return (
    <div ref={ref} className="mt-6 rounded-2xl border border-tu-line bg-tu-page p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-tu-accent">{eyebrow}</p>
      <p className="mt-2 text-lg font-bold leading-snug">{question}</p>
      <div className="mt-4 min-h-[52px] rounded-xl border border-tu-line bg-tu-card px-3.5 py-3 text-[15px] leading-snug">
        {n === 0 ? (
          <span className="text-tu-caption">{placeholder}</span>
        ) : (
          <span>
            {answer.slice(0, n)}
            {!done && <span className="tu-caret" aria-hidden />}
          </span>
        )}
      </div>
      <p className={`mt-3 flex items-center gap-2 text-sm font-semibold text-tu-caption transition duration-500 ${done ? "opacity-100" : "translate-y-1 opacity-0"}`}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        {hidden}
      </p>
    </div>
  );
}

// Step 2: my answer, then they're typing…, then theirs pops in and the two of you get the "both answered" moment.
export function RevealDemo({ you, them, a, b, both }: { you: string; them: string; a: string; b: string; both: string }) {
  const [ref, state] = useInView<HTMLDivElement>(0.5);
  const [stage, setStage] = useState(0); // 0 nothing · 1 mine · 2 typing · 3 theirs · 4 both answered
  useEffect(() => {
    if (state !== "in") return;
    if (reduced()) { setStage(4); return; }
    const ts = [setTimeout(() => setStage(1), 150), setTimeout(() => setStage(2), 900), setTimeout(() => setStage(3), 2300), setTimeout(() => setStage(4), 2900)];
    return () => ts.forEach(clearTimeout);
  }, [state]);
  const shown = state === "idle" ? 4 : stage; // before JS / above the fold: the finished state
  return (
    <div ref={ref} className="mt-6 min-h-[236px] space-y-3 rounded-2xl border border-tu-line bg-tu-page p-4">
      <Bubble art="miuu" who={you} text={a} on={shown >= 1} />
      {shown === 2 ? (
        <div className="tu-pop flex flex-row-reverse items-end gap-2">
          <Avatar art="miyomi" />
          <div className="flex gap-1 rounded-2xl rounded-br-md bg-tu-violet px-4 py-3.5" aria-label={`${them}…`}>
            <span className="tu-dot" /><span className="tu-dot" style={{ animationDelay: "150ms" }} /><span className="tu-dot" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      ) : (
        <Bubble art="miyomi" who={them} text={b} mine={false} on={shown >= 3} />
      )}
      <div className={`flex items-center justify-center gap-2 pt-1 transition duration-500 ${shown >= 4 ? "opacity-100" : "translate-y-2 opacity-0"}`}>
        <span className={`rounded-full bg-tu-lilac px-3 py-1 text-sm font-bold text-tu-accent ${shown >= 4 && state === "in" ? "tu-pop" : ""}`}>{both}</span>
      </div>
    </div>
  );
}

function Avatar({ art }: { art: "miuu" | "miyomi" }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tu-lilac">
      <PetSprite art={art} scale={2} />
    </span>
  );
}

function Bubble({ art, who, text, mine = true, on }: { art: "miuu" | "miyomi"; who: string; text: string; mine?: boolean; on: boolean }) {
  return (
    <div className={`flex items-end gap-2 ${mine ? "" : "flex-row-reverse"} ${on ? "tu-pop" : "invisible"}`}>
      <Avatar art={art} />
      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${mine ? "rounded-bl-md bg-tu-card" : "rounded-br-md bg-tu-violet text-white"}`}>
        <p className={`text-xs font-bold ${mine ? "text-tu-caption" : "text-white/75"}`}>{who}</p>
        <p className="mt-0.5 text-[15px] leading-snug">{text}</p>
      </div>
    </div>
  );
}

// Step 3: the home grows tile by tile, like onboarding's "Our home grows" (each <li> sets --i for its turn)
export function GrowStrip({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [ref, state] = useInView<HTMLOListElement>(0.35);
  return (
    <ol ref={ref} className={`tu-grow ${state === "wait" ? "is-wait" : ""} ${className}`}>
      {children}
    </ol>
  );
}
