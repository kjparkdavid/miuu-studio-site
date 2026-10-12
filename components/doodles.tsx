// Little hand-drawn doodles in the same brown line as the characters.
// Decorative only: always aria-hidden.

type P = { className?: string; style?: React.CSSProperties };

const line = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function Sparkle({ className, style }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 9.5-.6-6.6-2.9-8.9-7.5-9.5 4.6-.6 6.9-2.9 7.5-7.5Z" {...line} strokeWidth={2.2} fill="#FFD94A" />
    </svg>
  );
}

export function Heart({ className, style }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" {...line} strokeWidth={2.2} fill="#FF8FB1" />
    </svg>
  );
}

export function Planet({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <circle cx="24" cy="24" r="11" {...line} fill="#C9B6FF" />
      <path d="M8 30c-4 4 2 6 14 2s22-12 18-16c-1.3-1.3-4.4-1-8.3.4" {...line} />
      <circle cx="20" cy="21" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function Star({ className, style }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3Z" {...line} strokeWidth={2.2} fill="#FFE98A" />
    </svg>
  );
}

export function Cloud({ className, style }: P) {
  return (
    <svg viewBox="0 0 64 36" className={className} style={style} aria-hidden>
      <path d="M14 30h36a8 8 0 0 0 0-16 12 12 0 0 0-22.6-4A9 9 0 0 0 14 30Z" {...line} fill="#fff" />
    </svg>
  );
}

// Soft wave edge between sections; `fill` is the colour of the section below.
export function Wave({ fill, className }: { fill: string; className?: string }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={className} aria-hidden>
      <path d="M0 30c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0v30H0Z" fill={fill} />
    </svg>
  );
}
