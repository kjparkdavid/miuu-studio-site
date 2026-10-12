import Link from "next/link";
import Layout from "@/components/layout";
import { SeriesCard } from "@/components/comicCard";
import { SERIES } from "@/lib/content";
import { Locale, UI, localePath } from "@/lib/i18n";

export default function ComicsPage({ locale }: { locale: Locale }) {
  const t = UI[locale];
  return (
    <Layout locale={locale} path="/comics/" title={`${t.comicsTitle} · Miuu Studio`} description={t.comicsBody}>
      <section className="section pt-8">
        <Link href={localePath(locale)} className="text-sm font-semibold text-violet hover:underline">
          ← {t.backHome}
        </Link>
        <p className="eyebrow mt-6">{t.comicsEyebrow}</p>
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
