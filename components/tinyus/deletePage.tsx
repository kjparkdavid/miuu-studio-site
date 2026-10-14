import { ReactNode } from "react";
import { Locale } from "@/lib/i18n";
import { TINYUS, TINY_PAGES, tinyCopy, tinyPath } from "@/lib/tinyus";
import TinyLayout from "./layout";

// /tinyus/delete-account: the web deletion request page Google Play requires (Data safety → "delete account URL").
// Rules: design-review/tinyus-pixel/research/unlink-and-delete.md §7 (7-day change of mind, purge, backups ≤ 30 days).
function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-4 rounded-3xl bg-tu-card p-6 sm:p-7">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-3 leading-relaxed text-tu-caption">{children}</div>
    </section>
  );
}

export default function DeletePage({ locale }: { locale: Locale }) {
  const p = TINY_PAGES[locale];
  const t = tinyCopy(locale);
  const mail = `mailto:${TINYUS.supportEmail}?subject=${encodeURIComponent(p.deleteMailSubject)}`;
  return (
    <TinyLayout locale={locale} page="delete-account" title={`${p.deleteTitle} · Tiny Us`} description={p.deleteIntro}>
      <div className="mx-auto w-full max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
        <h1 className="text-4xl font-extrabold tracking-tight">{p.deleteTitle}</h1>
        <p className="mt-3 text-lg leading-relaxed text-tu-caption">{p.deleteIntro}</p>

        <Card title={p.deleteAppTitle}>
          <ol className="space-y-2">
            {p.deleteAppSteps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 font-semibold text-tu-ink">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tu-violet text-sm font-extrabold text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </Card>

        <Card title={p.deleteMailTitle}>
          <p>{p.deleteMailBody}</p>
          <div className="mt-4 rounded-2xl border border-tu-line bg-tu-page px-4 py-3 text-sm">
            <p><span className="font-semibold text-tu-ink">To</span> <span className="select-all break-all text-tu-ink">{TINYUS.supportEmail}</span></p>
            <p className="mt-1"><span className="font-semibold text-tu-ink">Subject</span> <span className="select-all text-tu-ink">{p.deleteMailSubject}</span></p>
          </div>
          <a href={mail} className="pill mt-4 bg-tu-violet py-3 text-white hover:brightness-110">{p.deleteMailCta}</a>
        </Card>

        <Card title={p.deleteWhenTitle}>
          <ul className="list-disc space-y-2 ps-5 marker:text-tu-accent">
            {p.deleteWhen.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </Card>

        <Card title={p.deletePartnerTitle}>
          <p>{p.deletePartnerBody}</p>
        </Card>

        <Card title={p.deleteKeptTitle}>
          <ul className="list-disc space-y-2 ps-5 marker:text-tu-accent">
            {p.deleteKept.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </Card>

        <p className="mt-6 rounded-2xl bg-tu-lilac px-4 py-3 text-sm font-semibold">{p.deleteSubNote}</p>
        <p className="mt-8 text-sm text-tu-caption">
          <a href={tinyPath(locale, "privacy")} className="font-semibold text-tu-accent hover:underline">{t.footerPrivacy}</a>
          {" · "}
          <a href={tinyPath(locale, "support")} className="font-semibold text-tu-accent hover:underline">{t.footerSupport}</a>
        </p>
      </div>
    </TinyLayout>
  );
}
