import Link from "next/link";
import Layout from "@/components/layout";
import { SeriesCard } from "@/components/comicCard";
import { APPS, CHARACTERS, LINKS, REELS, SERIES, STATS } from "@/lib/content";
import { Locale, UI, localePath } from "@/lib/i18n";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = UI[locale];

  return (
    <Layout locale={locale} path="/" title={t.metaTitle} description={t.metaDescription}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lilac to-canvas">
        <Stars />
        <div className="section relative grid items-center gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:py-24">
          <div>
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">{t.heroTitle}</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/75">{t.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localePath(locale, "/comics/")} className="pill bg-violet text-white shadow-card hover:bg-violet-deep">
                {t.heroCtaComics}
              </Link>
              <a href={LINKS.instagram} target="_blank" rel="noopener" className="pill bg-white text-ink ring-1 ring-ink/10 hover:ring-violet">
                {t.heroCtaInstagram}
              </a>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <Stat value={STATS.instagram} label={t.statInstagram} />
              <Stat value={STATS.tiktok} label={t.statTiktok} />
              <Stat value={STATS.downloads} label={t.statDownloads} />
            </dl>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-6 rounded-full bg-white/70 blur-2xl" aria-hidden />
            <img src="/brand/miuu-wave.webp" alt="Miuu waving" width={342} height={342} className="relative w-full animate-float-slow" />
          </div>
        </div>
      </section>

      {/* Characters */}
      <section id="characters" className="section scroll-mt-20 pt-20">
        <SectionHead eyebrow={t.charactersEyebrow} title={t.charactersTitle} />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CHARACTERS.map((c, i) => (
            <article
              key={c.id}
              className={`${c.bg} flex flex-col rounded-3xl p-4 ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <img
                src={`/characters/${c.id}.webp`}
                alt={c.name[locale]}
                loading="lazy"
                width={560}
                height={551}
                className={`mx-auto w-full max-w-[200px] ${i % 2 ? "animate-float" : "animate-float-slow"}`}
              />
              <h3 className="mt-3 font-display text-xl font-extrabold">{c.name[locale]}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/75">{c.bio[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Comics */}
      <section id="comics" className="section scroll-mt-20 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow={t.comicsEyebrow} title={t.comicsTitle} body={t.comicsBody} />
          <Link href={localePath(locale, "/comics/")} className="pill bg-white ring-1 ring-ink/10 hover:ring-violet">
            {t.comicsAll} →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {SERIES.map((s) => (
            <SeriesCard key={s.id} series={s} locale={locale} />
          ))}
        </div>
      </section>

      {/* Reels */}
      <section id="reels" className="scroll-mt-20 pt-20">
        <div className="section flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow={t.reelsEyebrow} title={t.reelsTitle} />
          <a href={LINKS.instagram} target="_blank" rel="noopener" className="pill bg-white ring-1 ring-ink/10 hover:ring-violet">
            {t.reelsMore} →
          </a>
        </div>
        {/* sideways scroller on phones, grid from md up */}
        <div className="mt-8 overflow-x-auto pb-4 [scrollbar-width:none]">
          <div className="section flex snap-x snap-mandatory gap-4 md:grid md:grid-cols-5 md:gap-4">
            {REELS.map((r) => (
              <figure key={r.id} className="w-44 shrink-0 snap-start md:w-auto">
                <video
                  src={`/reels/${r.id}.mp4`}
                  poster={`/reels/${r.id}.jpg`}
                  preload="none"
                  controls
                  playsInline
                  className="aspect-[9/16] w-full rounded-2xl bg-night object-cover shadow-card"
                />
                <figcaption className="mt-2 text-sm font-semibold">{r.title[locale]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Apps */}
      <section id="apps" className="section scroll-mt-20 pt-20">
        <SectionHead eyebrow={t.appsEyebrow} title={t.appsTitle} />
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          {APPS.map((app, i) => (
            <article
              key={app.id}
              className={`${app.bg} flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8`}
            >
              <div className="flex items-center gap-4">
                {app.icon ? (
                  <img src={app.icon} alt="" width={256} height={256} className="h-14 w-14 rounded-2xl shadow-card" />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white font-display text-xl font-extrabold text-ink shadow-card">
                    {app.name[0]}
                  </div>
                )}
                <div>
                  <h3 className="font-display text-2xl font-extrabold">{app.name}</h3>
                  {app.status === "soon" && (
                    <span className="mt-1 inline-block rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-violet">
                      {t.comingSoon}
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-4 max-w-md leading-relaxed text-ink/75">{app.tagline[locale]}</p>
              {app.links && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {app.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener" className="pill bg-ink text-white hover:bg-violet">
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
              {app.shots.length > 0 && (
                <div className="mt-8 flex gap-3">
                  {app.shots.map((s) => (
                    <img
                      key={s}
                      src={s}
                      alt=""
                      loading="lazy"
                      width={600}
                      height={1300}
                      className="w-1/3 max-w-[180px] rounded-2xl border-4 border-white shadow-card"
                    />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {body && <p className="mt-2 text-ink/70">{body}</p>}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl font-extrabold text-violet">{value}</dd>
      <dd className="text-sm text-ink/60">{label}</dd>
    </div>
  );
}

// a few twinkling dots for the Catty Planet sky
function Stars() {
  const dots = [
    [8, 18], [22, 70], [35, 12], [48, 85], [62, 22], [78, 60], [90, 15], [70, 88], [15, 45], [55, 50],
  ];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {dots.map(([x, y], i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 animate-twinkle rounded-full bg-violet-soft"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 5) * 0.6}s` }}
        />
      ))}
    </div>
  );
}
