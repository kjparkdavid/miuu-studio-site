import Link from "next/link";
import Layout from "@/components/layout";
import { EpisodeCard } from "@/components/comicCard";
import { SERIES, comicCover, seriesPath } from "@/lib/content";
import { Locale, UI, localePath } from "@/lib/i18n";

export default function SeriesPage({ locale, id }: { locale: Locale; id: string }) {
  const t = UI[locale];
  const s = SERIES.find((x) => x.id === id)!;

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
        <p className="mt-1 text-sm font-semibold text-violet">{t.serialized(s.years)}</p>
        <p className="mt-3 text-ink/70">{s.blurb[locale]}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {s.episodes.map((ep, i) => (
            <EpisodeCard key={ep.slug} series={s} ep={ep} n={i + 1} locale={locale} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
