import { ReactNode } from "react";
import { Locale } from "@/lib/i18n";
import { Block, LEGAL_DRAFT, LEGAL_UPDATED, LegalDoc } from "@/lib/tinyusLegal";
import TinyLayout from "./layout";

// Privacy Policy / Terms of Use. English only for now; the Korean URL shows the English text with a note
// (a Korean version comes after the legal review). Review flags ("!dev" / "!law") show while LEGAL_DRAFT is true.
const FLAG = { dev: "Confirm with dev", law: "Lawyer review" } as const;

// emails and the few web addresses in the text become links
const LINK = /([\w.+-]+@[\w-]+\.[\w.]+|miuustudio\.com\/tinyus\/[a-z-]+|reportaproblem\.apple\.com|priv\.gc\.ca|cai\.gouv\.qc\.ca|kopico\.go\.kr|privacy\.kisa\.or\.kr)/g;
function linkify(text: string): ReactNode[] {
  return text.split(LINK).map((part, i) => {
    if (i % 2 === 0) return part;
    const href = part.includes("@") ? `mailto:${part}` : part.startsWith("miuustudio.com") ? part.replace("miuustudio.com", "") + "/" : `https://${part}`;
    return <a key={i} href={href} className="font-semibold text-tu-accent underline-offset-4 hover:underline">{part}</a>;
  });
}

function render(b: Block, i: number) {
  if (typeof b !== "string") {
    return (
      <ul key={i} className="mt-3 list-disc space-y-2 ps-5 marker:text-tu-accent">
        {b.map((li) => <li key={li}>{linkify(li)}</li>)}
      </ul>
    );
  }
  const m = b.match(/^!(dev|law) (.*)$/);
  if (m) {
    if (!LEGAL_DRAFT) return null;
    return (
      <p key={i} className="mt-3 rounded-xl border border-dashed border-amber-500/60 bg-amber-400/10 px-3.5 py-2.5 text-sm">
        <span className="me-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-black">{FLAG[m[1] as keyof typeof FLAG]}</span>
        {m[2]}
      </p>
    );
  }
  return <p key={i} className="mt-3">{linkify(b)}</p>;
}

export default function LegalPage({ locale, doc, page }: { locale: Locale; doc: LegalDoc; page: "privacy" | "terms" }) {
  return (
    <TinyLayout locale={locale} page={page} title={`${doc.title} · Tiny Us`} description={`Tiny Us ${doc.title}`} noindex={LEGAL_DRAFT}>
      <article lang="en" className="mx-auto w-full max-w-3xl px-4 pt-10 leading-relaxed sm:px-6 sm:pt-14">
        {LEGAL_DRAFT && (
          <p className="mb-6 rounded-2xl bg-amber-400 px-4 py-3 text-sm font-bold text-black">
            DRAFT · not final. Needs the developer’s and a lawyer’s review before launch.
          </p>
        )}
        {locale === "ko" && (
          <p lang="ko" className="mb-6 rounded-2xl bg-tu-lilac px-4 py-3 text-sm font-semibold">
            지금은 영어판만 있어요. 한국어판은 검토가 끝나면 올라와요.
          </p>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight">{doc.title}</h1>
        <p className="mt-2 text-sm font-semibold text-tu-caption">Last updated {LEGAL_UPDATED}</p>
        <div className="mt-4 text-tu-ink">{doc.intro.map(render)}</div>
        {doc.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-xl font-bold">{s.h}</h2>
            <div className="text-tu-ink/90">{s.blocks.map(render)}</div>
          </section>
        ))}
      </article>
    </TinyLayout>
  );
}
