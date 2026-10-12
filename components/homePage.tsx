import Link from "next/link";
import Layout from "@/components/layout";
import { SeriesCard } from "@/components/comicCard";
import Waitlist from "@/components/waitlist";
import { APPS, CHARACTERS, LINKS, REELS, SERIES, STATS } from "@/lib/content";
import { Locale, UI, localePath } from "@/lib/i18n";
import { Cloud, Heart, Planet, Sparkle, Star, Wave } from "@/components/doodles";

export default function HomePage({ locale }: { locale: Locale }) {
  const t = UI[locale];

  return (
    <Layout locale={locale} path="/" title={t.metaTitle} description={t.metaDescription}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lilac to-canvas">
        <HeroDoodles />
        <div className="section relative grid items-center gap-10 pb-20 pt-14 md:grid-cols-[1.1fr_1fr] md:pb-28 md:pt-24">
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
              <a href={LINKS.miuuNote} target="_blank" rel="noopener" className="pill bg-white text-ink ring-1 ring-ink/10 hover:ring-violet">
                <img src="/apps/miuu-note-icon.webp" alt="" width={256} height={256} className="h-5 w-5 rounded-md" />
                {t.heroCtaApp}
              </a>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <Stat value={STATS.instagram} label={t.statInstagram} />
              <Stat value={STATS.tiktok} label={t.statTiktok} />
              <Stat value={STATS.downloads} label={t.statDownloads} />
            </dl>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            {/* soft round backdrop behind Miuu */}
            <div className="absolute -inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.45)_38%,rgba(201,182,255,0.18)_55%,transparent_70%)]" aria-hidden />
            <img src="/brand/miuu-wave.webp" alt="Miuu waving" width={342} height={342} className="relative w-full animate-float-slow" />
          </div>
        </div>
        <Wave fill="#FAF8FF" className="absolute inset-x-0 bottom-0 h-10 w-full sm:h-14" />
      </section>

      {/* Characters */}
      <section id="characters" className="section scroll-mt-20 pt-20">
        <SectionHead eyebrow={t.charactersEyebrow} title={t.charactersTitle} gif="miuu-trio" />
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
          <SectionHead eyebrow={t.comicsEyebrow} title={t.comicsTitle} body={t.comicsBody} gif="miuu-arrested" />
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
          <SectionHead eyebrow={t.reelsEyebrow} title={t.reelsTitle} gif="miuu-dance" />
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
                <figcaption className="mt-2 flex items-start justify-between gap-2 text-sm">
                  <span className="font-semibold">{r.title[locale]}</span>
                  <a href={r.url} target="_blank" rel="noopener" className="shrink-0 text-xs text-violet hover:underline">
                    {t.views(r.views)} ↗
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Apps */}
      <section id="apps" className="section scroll-mt-20 pt-20">
        <SectionHead eyebrow={t.appsEyebrow} title={t.appsTitle} gif="miuu-miyomi-hug" />
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
              {app.id === "tiny-us" && <Waitlist locale={locale} />}
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
                      className="w-1/3 max-w-[180px] rounded-[38px] border-[5px] border-white bg-white shadow-card"
                    />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Brand collabs */}
      <section id="collab" className="section scroll-mt-20 pt-20">
        <div className="relative overflow-hidden rounded-[32px] bg-night px-6 py-10 text-white sm:px-10 sm:py-14">
          <img src="/gifs/miuu-wizard.webp" alt="" width={320} height={320} loading="lazy" className="absolute -bottom-2 end-4 hidden h-40 w-40 sm:block lg:h-52 lg:w-52" />
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-soft">{t.collabEyebrow}</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-extrabold sm:text-4xl">{t.collabTitle}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-white/75">{t.collabBody}</p>
          <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {t.collabItems.map(([title, body]) => (
              <li key={title} className="rounded-2xl bg-white/10 p-4">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{body}</p>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${LINKS.email}?subject=${encodeURIComponent("Brand collaboration with Miuu")}`}
            className="pill mt-8 bg-white text-ink hover:bg-lilac"
          >
            {t.collabCta} →
          </a>
        </div>
      </section>
    </Layout>
  );
}

// gif: an animated Miuu from public/gifs/<name>.webp next to the title
function SectionHead({ eyebrow, title, body, gif }: { eyebrow: string; title: string; body?: string; gif?: string }) {
  return (
    <div className="flex items-end gap-3">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{title}</h2>
        {body && <p className="mt-2 text-ink/70">{body}</p>}
      </div>
      {gif && (
        <span className="relative -mb-2 shrink-0">
          {/* soft lilac glow behind the gif */}
          <span className="absolute inset-2 rounded-full bg-lilac blur-md" aria-hidden />
          <img src={`/gifs/${gif}.webp`} alt="" width={320} height={320} loading="lazy" className="relative h-20 w-20 sm:h-24 sm:w-24" />
        </span>
      )}
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

// little hand-drawn doodles (sparkles, stars, a heart, a planet, clouds) around the hero
function HeroDoodles() {
  const items: [typeof Star, string, string][] = [
    [Sparkle, "start-[6%] top-[12%] hidden h-7 w-7 animate-twinkle md:block", "0s"],
    [Star, "start-[44%] top-[9%] hidden h-6 w-6 animate-twinkle md:block", "0.4s"],
    [Heart, "end-[7%] top-[46%] h-7 w-7 animate-float", "0.2s"],
    [Sparkle, "end-[6%] top-[4%] h-5 w-5 animate-twinkle md:end-[30%] md:top-[14%]", "1.1s"],
    [Planet, "start-[3%] bottom-[22%] h-12 w-12 animate-float-slow", "0s"],
    [Star, "end-[4%] bottom-[26%] h-5 w-5 animate-twinkle", "0.7s"],
    [Sparkle, "start-[40%] bottom-[20%] hidden h-4 w-4 animate-twinkle md:block", "1.6s"],
  ];
  return (
    <div className="pointer-events-none absolute inset-0 text-ink" aria-hidden>
      <Cloud className="absolute start-[58%] top-[6%] hidden h-10 w-20 animate-float-slow md:block" />
      <Cloud className="absolute end-[2%] top-[70%] hidden h-8 w-16 animate-float md:block" />
      {items.map(([C, cls, delay], i) => (
        <C key={i} className={`absolute ${cls}`} style={{ animationDelay: delay }} />
      ))}
    </div>
  );
}
