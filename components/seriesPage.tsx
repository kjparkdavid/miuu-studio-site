import Link from "next/link";
import Layout from "@/components/layout";
import { EpisodeCard } from "@/components/comicCard";
import { SERIES, comicCover, seriesPath } from "@/lib/content";
import { Locale, UI, localePath } from "@/lib/i18n";

export default function SeriesPage({ locale, id }: { locale: Locale; id: string }) {
  const t = UI[locale];
  const s = SERIES.find((x) => x.id === id)!;
  const onSite = s.episodes.length;

  return (
    <Layout
      locale={locale}
      path={seriesPath(s)}
      title={`${s.title[locale]} · Miuu Studio`}
      description={s.blurb[locale]}
      image={comicCover(s.episodes[0], locale)}
    >
      <section className="section pt-8">
        <Link href={localePath(locale, "/comics/")} className="text-sm font-semibold text-violet hover:underline">
          ← {t.readerBack}
        </Link>
        <h1 className="mt-6 font-display text-4xl font-extrabold sm:text-5xl">{s.title[locale]}</h1>
        <p className="mt-3 text-ink/70">{s.blurb[locale]}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {s.episodes.map((ep, i) => (
            <EpisodeCard key={ep.slug} series={s} ep={ep} n={i + 1} locale={locale} />
          ))}
        </div>

        {s.instagram && (
          <div className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-ink/5">
            <h2 className="text-sm font-bold">{t.moreOnInstagram}</h2>
            <p className="mt-1 text-sm text-ink/60">{t.moreOnInstagramBody}</p>
            <ol className="mt-4 flex flex-wrap gap-2">
              {s.instagram.map((e, i) => (
                <li key={e.url}>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 rounded-full bg-lilac px-3 py-1.5 text-sm font-semibold hover:bg-violet hover:text-white"
                  >
                    <span className="text-xs opacity-60">{t.episodeN(onSite + i + 1)}</span>
                    {e.title[locale]} ↗
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </Layout>
  );
}
