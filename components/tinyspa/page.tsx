import { ReactNode } from "react";
import Layout from "@/components/layout";
import { Locale, localePath } from "@/lib/i18n";
import { Block, Lang, LegalDoc, PRIVACY, SUPPORT, TERMS, TINYSPA } from "@/lib/tinyspaLegal";

// Tiny Spa's support, privacy and terms pages. Each page carries both languages, the page's own first, because the
// stores and the AdMob consent message link one URL for both: #en / #ko jump between them. Section anchors
// (#choices, #delete, #cloud) belong to the first language; the second one's are prefixed (#ko-choices).
export type SpaPageName = "support" | "privacy" | "terms";

const PATH: Record<SpaPageName, string> = { support: TINYSPA.base, privacy: `${TINYSPA.base}privacy/`, terms: `${TINYSPA.base}terms/` };
const LANG_NAME: Record<Lang, string> = { en: "English", ko: "한국어" };

// emails and the web addresses in the text become links
const LINK =
  /([\w.+-]+@[\w-]+\.[\w.]+|policies\.google\.com\/technologies\/partner-sites|policies\.google\.com\/privacy|support\.google\.com\/policies\/contact\/general_privacy_form|reportaproblem\.apple\.com|priv\.gc\.ca|cai\.gouv\.qc\.ca|kopico\.go\.kr|privacy\.kisa\.or\.kr|spo\.go\.kr|ecrm\.police\.go\.kr)/g;
function linkify(text: string): ReactNode[] {
  return text.split(LINK).map((part, i) =>
    i % 2 === 0 ? part : (
      <a key={i} href={part.includes("@") ? `mailto:${part}` : `https://${part}`} className="font-semibold text-violet underline-offset-4 hover:underline">
        {part}
      </a>
    ),
  );
}

function render(b: Block, i: number) {
  if (typeof b === "string") return <p key={i} className="mt-3">{linkify(b)}</p>;
  return (
    <ul key={i} className="mt-3 list-disc space-y-2 ps-5 marker:text-violet">
      {b.map((li) => <li key={li}>{linkify(li)}</li>)}
    </ul>
  );
}

function LegalArticle({ lang, doc, anchor, first }: { lang: Lang; doc: LegalDoc; anchor: (id: string) => string; first: boolean }) {
  const H = first ? "h1" : "h2";
  return (
    <>
      <H className="text-3xl font-extrabold tracking-tight sm:text-4xl">{doc.title}</H>
      <p className="mt-2 text-sm font-semibold text-ink/60">{lang === "ko" ? `시행일 ${doc.updated}` : `Last updated ${doc.updated}`}</p>
      <div className="mt-4">{doc.intro.map(render)}</div>
      {doc.sections.map((s) => (
        <section key={s.h} id={s.id && anchor(s.id)} className="mt-10 scroll-mt-20">
          <h3 className="text-xl font-bold">{s.h}</h3>
          <div className="text-ink/90">{s.blocks.map(render)}</div>
        </section>
      ))}
    </>
  );
}

function SupportArticle({ lang, locale, anchor, first }: { lang: Lang; locale: Locale; anchor: (id: string) => string; first: boolean }) {
  const s = SUPPORT[lang];
  const H = first ? "h1" : "h2";
  return (
    <>
      <H className="text-3xl font-extrabold tracking-tight sm:text-4xl">{s.title}</H>
      <p className="mt-3 text-lg leading-relaxed text-ink/80">{s.body}</p>
      <div className="mt-8 rounded-3xl bg-white p-6 shadow-card sm:p-8">
        <a href={`mailto:${TINYSPA.supportEmail}?subject=${encodeURIComponent(s.emailSubject)}`} className="pill bg-violet py-3 text-base text-white hover:bg-violet-deep">
          {s.emailCta}
        </a>
        <p className="mt-4 select-all break-all text-lg font-bold">{TINYSPA.supportEmail}</p>
        <p className="mt-2 leading-relaxed text-ink/70">{s.include}</p>
      </div>
      <h3 className="mt-12 text-2xl font-extrabold tracking-tight">{s.faqTitle}</h3>
      <div className="mt-5 space-y-3">
        {s.faq.map(([q, a]) => (
          <details key={q} className="group rounded-2xl bg-white px-5 py-4 shadow-card [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
              {q}
              <span className="text-xl leading-none text-violet transition group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-ink/70">{linkify(a)}</p>
          </details>
        ))}
      </div>
      <section id={anchor("delete")} className="mt-12 scroll-mt-20">
        <h3 className="text-2xl font-extrabold tracking-tight">{s.deleteTitle}</h3>
        <div className="text-ink/90">{s.delete.map(render)}</div>
      </section>
      <p className="mt-8 text-sm">
        <a href={localePath(locale, PATH.privacy) + (lang === locale ? "" : `#${lang}`)} className="font-semibold text-violet hover:underline">{s.privacy}</a>
        {" · "}
        <a href={localePath(locale, PATH.terms) + (lang === locale ? "" : `#${lang}`)} className="font-semibold text-violet hover:underline">{s.terms}</a>
      </p>
    </>
  );
}

export default function SpaPage({ locale, page }: { locale: Locale; page: SpaPageName }) {
  const langs: Lang[] = locale === "ko" ? ["ko", "en"] : ["en", "ko"];
  const name = TINYSPA.name[locale];
  const heading = page === "support" ? SUPPORT[locale].title : (page === "privacy" ? PRIVACY : TERMS)[locale].title;
  const tabs: [SpaPageName, string][] = [
    ["support", locale === "ko" ? "고객 지원" : "Support"],
    ["privacy", SUPPORT[locale].privacy],
    ["terms", SUPPORT[locale].terms],
  ];

  return (
    <Layout
      locale={locale}
      path={PATH[page]}
      title={page === "support" ? `${heading} · Miuu Studio` : `${heading} · ${name}`}
      description={page === "support" ? SUPPORT[locale].body : `${name} ${heading}`}
    >
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 leading-relaxed sm:px-6 sm:pt-14">
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <span className="me-2 font-extrabold">{name}</span>
          {tabs.map(([p, label]) => (
            <a key={p} href={localePath(locale, PATH[p])} aria-current={p === page ? "page" : undefined} className={`rounded-full px-3 py-1.5 ${p === page ? "bg-violet text-white" : "bg-lilac hover:text-violet"}`}>
              {label}
            </a>
          ))}
          <span className="ms-auto flex gap-1">
            {langs.map((l) => (
              <a key={l} href={`#${l}`} lang={l} className="rounded-full border border-ink/15 px-3 py-1.5 hover:border-violet hover:text-violet">{LANG_NAME[l]}</a>
            ))}
          </span>
        </nav>
        {langs.map((lang, i) => {
          const anchor = (id: string) => (i === 0 ? id : `${lang}-${id}`);
          return (
            <article key={lang} id={lang} lang={lang} className={`scroll-mt-20 ${i === 0 ? "mt-8" : "mt-20 border-t border-ink/10 pt-14"}`}>
              {page === "support" ? (
                <SupportArticle lang={lang} locale={locale} anchor={anchor} first={i === 0} />
              ) : (
                <LegalArticle lang={lang} doc={(page === "privacy" ? PRIVACY : TERMS)[lang]} anchor={anchor} first={i === 0} />
              )}
            </article>
          );
        })}
      </div>
    </Layout>
  );
}
