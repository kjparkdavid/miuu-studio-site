import { ReactNode } from "react";
import { Locale } from "@/lib/i18n";
import { TINYUS_LAUNCHED, tinyCopy } from "@/lib/tinyus";
import TinyLayout from "./layout";
import PixelHome, { PetSprite } from "./pixelHome";
import GetTinyUs from "./getTinyUs";

// miuustudio.com/tinyus: the Tiny Us landing page. Pixel art only for the home, the pets and the animation;
// everything else is the app's clean v2 Soft UI. Phase 1 (pre-launch) vs Phase 2 (store badges) = TINYUS_LAUNCHED.

const card = "min-w-0 rounded-3xl bg-tu-card p-5 shadow-[0_1px_0_rgba(31,29,43,0.04),0_12px_32px_-18px_rgba(31,29,43,0.25)] sm:p-7";

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.16em] text-tu-accent">{children}</p>;
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-2 text-[28px] font-extrabold leading-tight tracking-tight sm:text-4xl">{children}</h2>;
}

// small line icons in the app's v1 style (2px stroke, round caps), violet
const ICONS: Record<string, ReactNode> = {
  hug: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  mood: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M9 14.5a4 4 0 0 0 6 0M9.5 10h.01M14.5 10h.01" />
    </>
  ),
  note: (
    <>
      <path d="M6 4h9l3 3v13H6z" />
      <path d="M9 10h6M9 14h4" />
    </>
  ),
  place: (
    <>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </>
  ),
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-tu-lilac text-tu-accent">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {ICONS[name]}
      </svg>
    </span>
  );
}

const GROW = ["grow1", "grow2", "grow3", "paris", "mystery"] as const;

export default function TinyLanding({ locale }: { locale: Locale }) {
  const t = tinyCopy(locale);

  return (
    <TinyLayout locale={locale} title={t.metaTitle} description={t.metaDescription}>
      {/* Hero: the night home, alive */}
      <section className="mx-auto grid w-full max-w-5xl items-center gap-10 px-4 pt-8 sm:px-6 sm:pt-14 md:grid-cols-[1.1fr_1fr] md:gap-14">
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-2">
            <Eyebrow>{t.heroEyebrow}</Eyebrow>
            {!TINYUS_LAUNCHED && (
              <span className="rounded-full bg-tu-lilac px-2.5 py-0.5 text-xs font-bold text-tu-accent">{t.comingSoon}</span>
            )}
          </div>
          <h1 className="mt-3 text-[40px] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">{t.heroTitle}</h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-tu-caption">{t.heroBody}</p>
          <GetTinyUs locale={locale} id="waitlist-hero" />
        </div>
        <div className="order-1 mx-auto w-full max-w-[264px] sm:max-w-[320px] md:order-2 md:max-w-[432px]">
          <div className="overflow-hidden rounded-[32px] bg-tu-night shadow-[0_24px_60px_-28px_rgba(36,32,90,0.7)]">
            <PixelHome bg="/tinyus/art/home-night.png" pets={["miuu", "miyomi"]} alt={t.heroAlt} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <Eyebrow>{t.howEyebrow}</Eyebrow>
        <H2>{t.howTitle}</H2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className={card}>
            <Step n={1} title={t.steps[0].title} body={t.steps[0].body} />
            <div className="mt-6 rounded-2xl border border-tu-line bg-tu-page p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-tu-accent">{t.qCardEyebrow}</p>
              <p className="mt-2 text-lg font-bold leading-snug">{t.qCardQuestion}</p>
              <div className="mt-4 rounded-xl border border-tu-line bg-tu-card px-3.5 py-3 text-sm text-tu-caption">{t.qCardPlaceholder}</div>
            </div>
          </article>
          <article className={card}>
            <Step n={2} title={t.steps[1].title} body={t.steps[1].body} />
            <div className="mt-6 space-y-3 rounded-2xl border border-tu-line bg-tu-page p-4">
              <Bubble art="miuu" who={t.revealYou} text={t.revealA} />
              <Bubble art="miyomi" who={t.revealThem} text={t.revealB} mine={false} />
            </div>
          </article>
          <article className={`${card} md:col-span-2`}>
            <Step n={3} title={t.steps[2].title} body={t.steps[2].body} />
            {/* integer-scaled stills (1x on phones, a row on wider screens); scrolls inside the card on narrow phones */}
            <ol className="-mx-5 mt-6 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:-mx-7 sm:px-7 md:mx-0 md:justify-between md:overflow-visible md:px-0">
              {GROW.map((g, i) => (
                <li key={g} className="w-36 shrink-0 snap-start">
                  <div className="overflow-hidden rounded-2xl">
                    <img src={`/tinyus/art/${g}.png`} alt={t.growAlts[i]} width={144} height={192} loading="lazy" className="pixelated block h-48 w-36" />
                  </div>
                  <p className={`mt-2 text-center text-sm font-bold ${i === 4 ? "text-tu-accent" : ""}`}>{t.growLabels[i]}</p>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      {/* Made for two */}
      <section className="mx-auto w-full max-w-5xl px-4 pt-24 sm:px-6">
        <Eyebrow>{t.littleEyebrow}</Eyebrow>
        <H2>{t.littleTitle}</H2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.little.map((f, i) => (
            <article key={f.title} className={card}>
              <Icon name={(["hug", "mood", "note", "place"] as const)[i]} />
              <h3 className="mt-4 text-lg font-bold leading-snug">{f.title}</h3>
              <p className="mt-1.5 leading-relaxed text-tu-caption">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Puppy couple (never a mixed cat + puppy couple in marketing art) */}
      <section className="mx-auto w-full max-w-5xl px-4 pt-24 sm:px-6">
        <div className={`${card} grid items-center gap-8 md:grid-cols-[1fr_1.1fr] md:gap-12`}>
          <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[28px]">
            <PixelHome bg="/tinyus/art/home-day.png" pets={["cocoa", "milk"]} alt={t.puppyAlt} />
          </div>
          <div>
            <Eyebrow>{t.puppyEyebrow}</Eyebrow>
            <H2>{t.puppyTitle}</H2>
            <p className="mt-4 text-lg leading-relaxed text-tu-caption">{t.puppyBody}</p>
            <div className="mt-6 flex gap-3">
              {(["miuu", "miyomi", "cocoa", "milk"] as const).map((a) => (
                <span key={a} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tu-lilac">
                  <PetSprite art={a} scale={2} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plus is shared */}
      <section className="mx-auto w-full max-w-5xl px-4 pt-24 sm:px-6">
        <div className="rounded-3xl bg-tu-lilac p-6 sm:p-10">
          <div className="flex items-center gap-1" aria-hidden>
            <PetSprite art="miuu" scale={2} />
            <PetSprite art="miyomi" scale={2} />
          </div>
          <div className="mt-4">
            <Eyebrow>{t.plusEyebrow}</Eyebrow>
          </div>
          <H2>{t.plusTitle}</H2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-tu-caption">{t.plusBody}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.plusPerks.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl bg-tu-card px-4 py-3.5 font-semibold leading-snug">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-tu-violet" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-semibold text-tu-caption">{t.plusFree}</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto w-full max-w-3xl scroll-mt-20 px-4 pt-24 sm:px-6">
        <Eyebrow>{t.faqEyebrow}</Eyebrow>
        <H2>{t.faqTitle}</H2>
        <div className="mt-8 space-y-3">
          {t.faq.map(([q, a]) => (
            <details key={q} className="group rounded-2xl bg-tu-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold">
                {q}
                <span className="text-xl leading-none text-tu-accent transition group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-tu-caption">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Last call */}
      <section className="mx-auto w-full max-w-5xl px-4 pt-24 sm:px-6">
        <div className="rounded-3xl bg-tu-night px-6 py-10 text-center text-white sm:px-10 sm:py-14">
          <img src="/tinyus/brand/icon-rounded.png" alt="" width={288} height={288} className="mx-auto h-16 w-16" />
          <h2 className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight sm:text-4xl">{t.endTitle}</h2>
          <p className="mt-3 text-lg text-white/75">{TINYUS_LAUNCHED ? t.endBodyLive : t.endBody}</p>
          <div className="mx-auto max-w-md text-left">
            <GetTinyUs locale={locale} id="waitlist-end" onDark />
          </div>
        </div>
      </section>
    </TinyLayout>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tu-violet text-sm font-extrabold text-white">{n}</span>
      <div>
        <h3 className="text-xl font-bold leading-snug">{title}</h3>
        <p className="mt-1.5 leading-relaxed text-tu-caption">{body}</p>
      </div>
    </div>
  );
}

function Bubble({ art, who, text, mine = true }: { art: "miuu" | "miyomi"; who: string; text: string; mine?: boolean }) {
  return (
    <div className={`flex items-end gap-2 ${mine ? "" : "flex-row-reverse"}`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tu-lilac">
        <PetSprite art={art} scale={2} />
      </span>
      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${mine ? "rounded-bl-md bg-tu-card" : "rounded-br-md bg-tu-violet text-white"}`}>
        <p className={`text-xs font-bold ${mine ? "text-tu-caption" : "text-white/75"}`}>{who}</p>
        <p className="mt-0.5 text-[15px] leading-snug">{text}</p>
      </div>
    </div>
  );
}

