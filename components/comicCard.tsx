import Link from "next/link";
import { Episode, Series, comicCover, episodeLang, episodePath, seriesPath } from "@/lib/content";
import { Locale, UI, localePath } from "@/lib/i18n";

const cardClass =
  "group block overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5 transition hover:-translate-y-1";

function Cover({ src, label }: { src: string; label?: string }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-lilac">
      <img
        src={src}
        alt=""
        loading="lazy"
        width={480}
        height={600}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      {label && (
        <span className="absolute start-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink shadow-card">
          {label}
        </span>
      )}
    </div>
  );
}

export function SeriesCard({ series, locale }: { series: Series; locale: Locale }) {
  const t = UI[locale];
  return (
    <Link href={localePath(locale, seriesPath(series))} className={cardClass}>
      <Cover
        src={comicCover(series.episodes[0], locale)}
        label={(series.standalone ? t.stories : t.episodes)(series.episodes.length)}
      />
      <div className="p-4">
        <h3 className="font-display text-lg font-extrabold leading-snug">{series.title[locale]}</h3>
        <p className="mt-0.5 text-xs font-semibold text-violet">{t.serialized(series.years)}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink/65">{series.blurb[locale]}</p>
      </div>
    </Link>
  );
}

export function EpisodeCard({ series, ep, n, locale }: { series: Series; ep: Episode; n: number; locale: Locale }) {
  const t = UI[locale];
  const lang = episodeLang(ep, locale);
  return (
    <Link href={localePath(locale, episodePath(series, ep))} className={cardClass}>
      <Cover src={comicCover(ep, locale)} label={series.standalone ? undefined : t.episodeN(n)} />
      <div className="flex items-start justify-between gap-2 p-3">
        <h3 className="text-sm font-bold leading-snug">{ep.title[locale]}</h3>
        <span className="shrink-0 pt-0.5 text-xs text-ink/50">
          {lang !== locale ? t.englishOnly : t.pages(ep.pages[lang] ?? 0)}
        </span>
      </div>
    </Link>
  );
}
