import Link from "next/link";
import Layout from "@/components/layout";
import { SERIES, comicCover, comicPages, episodeLang, episodePath, seriesPath } from "@/lib/content";
import { Locale, UI, localePath } from "@/lib/i18n";

// Reads one episode; previous/next stay inside the same series
export default function ComicReader({ locale, seriesId, slug }: { locale: Locale; seriesId: string; slug: string }) {
  const t = UI[locale];
  const series = SERIES.find((s) => s.id === seriesId)!;
  const index = series.episodes.findIndex((e) => e.slug === slug);
  const ep = series.episodes[index];
  const prev = series.episodes[index - 1];
  const next = series.episodes[index + 1];
  const pages = comicPages(ep, locale);
  const fallback = episodeLang(ep, locale) !== locale;
  const other: Locale = locale === "en" ? "ko" : "en";
  const title = `${ep.title[locale]} · ${series.title[locale]}`;

  return (
    <Layout
      locale={locale}
      path={episodePath(series, ep)}
      title={`${title} · Miuu Studio`}
      description={series.blurb[locale]}
      image={comicCover(ep, locale)}
    >
      <article className="mx-auto max-w-[640px] px-4 pt-8">
        <Link href={localePath(locale, seriesPath(series))} className="text-sm font-semibold text-violet hover:underline">
          ← {series.title[locale]}
        </Link>
        <p className="eyebrow mt-6">{t.episodeN(index + 1)}</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold">{ep.title[locale]}</h1>
        {fallback ? (
          <p className="mt-3 rounded-xl bg-butter px-4 py-3 text-sm">{t.readerOnlyEnglish}</p>
        ) : (
          ep.pages[other] && (
            <Link href={localePath(other, episodePath(series, ep))} lang={other} className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">
              {t.readerOtherLang}
            </Link>
          )
        )}

        <div className="mt-6 flex flex-col gap-3">
          {pages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${ep.title[locale]} ${i + 1}/${pages.length}`}
              loading={i < 2 ? "eager" : "lazy"}
              width={1080}
              height={1350}
              className="w-full rounded-2xl bg-white shadow-card"
            />
          ))}
        </div>

        <nav className="mt-10 grid grid-cols-2 gap-3">
          {prev ? (
            <Link href={localePath(locale, episodePath(series, prev))} className="rounded-2xl bg-white p-4 ring-1 ring-ink/10 hover:ring-violet">
              <span className="text-xs text-ink/50">← {t.readerPrev}</span>
              <span className="mt-1 block text-sm font-bold">{prev.title[locale]}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={localePath(locale, episodePath(series, next))} className="rounded-2xl bg-violet p-4 text-right text-white hover:bg-violet-deep">
              <span className="text-xs text-white/70">{t.readerNext} →</span>
              <span className="mt-1 block text-sm font-bold">{next.title[locale]}</span>
            </Link>
          ) : (
            <Link href={localePath(locale, seriesPath(series))} className="rounded-2xl bg-lilac p-4 text-right hover:bg-violet hover:text-white">
              <span className="text-xs opacity-70">{t.readerEnd}</span>
              <span className="mt-1 block text-sm font-bold">{series.title[locale]} →</span>
            </Link>
          )}
        </nav>
      </article>
    </Layout>
  );
}
