import Layout from "@/components/layout";
import { SeriesCard } from "@/components/comicCard";
import { SERIES } from "@/lib/content";
import { Locale, UI } from "@/lib/i18n";

export default function ComicsPage({ locale }: { locale: Locale }) {
  const t = UI[locale];
  return (
    <Layout locale={locale} path="/comics/" title={`${t.comicsTitle} · Miuu Studio`} description={t.comicsBody}>
      <section className="section pt-12">
        <p className="eyebrow">{t.comicsEyebrow}</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">{t.comicsTitle}</h1>
        <p className="mt-3 text-ink/70">{t.comicsBody}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {SERIES.map((s) => (
            <SeriesCard key={s.id} series={s} locale={locale} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
