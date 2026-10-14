import { Locale } from "@/lib/i18n";
import { TINYUS, TINY_PAGES, tinyPath, tinyCopy } from "@/lib/tinyus";
import TinyLayout from "./layout";
import { PetSprite } from "./pixelHome";

export default function SupportPage({ locale }: { locale: Locale }) {
  const p = TINY_PAGES[locale];
  const t = tinyCopy(locale);
  return (
    <TinyLayout locale={locale} page="support" title={`${p.supportTitle} · Tiny Us`} description={p.supportBody}>
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="flex items-end gap-1" aria-hidden>
          <PetSprite art="miuu" scale={3} />
          <PetSprite art="miyomi" scale={3} />
        </div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{p.supportTitle}</h1>
        <p className="mt-3 text-lg leading-relaxed text-tu-caption">{p.supportBody}</p>

        <div className="mt-8 rounded-3xl bg-tu-card p-6 sm:p-8">
          <a href={`mailto:${TINYUS.supportEmail}?subject=Tiny%20Us%20support`} className="pill bg-tu-violet py-3 text-base text-white hover:brightness-110">
            {p.supportEmailCta}
          </a>
          <p className="mt-4 select-all break-all text-lg font-bold">{TINYUS.supportEmail}</p>
          <p className="mt-2 leading-relaxed text-tu-caption">{p.supportInclude}</p>
        </div>

        <h2 className="mt-14 text-2xl font-extrabold tracking-tight">{p.supportFaqTitle}</h2>
        <div className="mt-6 space-y-3">
          {p.supportFaq.map(([q, a]) => (
            <details key={q} className="group rounded-2xl bg-tu-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {q}
                <span className="text-xl leading-none text-tu-accent transition group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-tu-caption">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-sm text-tu-caption">
          <a href={tinyPath(locale, "privacy")} className="font-semibold text-tu-accent hover:underline">{t.footerPrivacy}</a>
          {" · "}
          <a href={tinyPath(locale, "terms")} className="font-semibold text-tu-accent hover:underline">{t.footerTerms}</a>
        </p>
      </div>
    </TinyLayout>
  );
}
