import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import { LINKS } from "@/lib/content";
import { Locale, SITE_URL, UI, localePath } from "@/lib/i18n";

type Props = {
  locale: Locale;
  // the same page without the /ko prefix, e.g. "/" or "/comics/spa/"
  path: string;
  title: string;
  description: string;
  image?: string;
  children: ReactNode;
};

export default function Layout({ locale, path, title, description, image = "/brand/og.jpg", children }: Props) {
  const t = UI[locale];
  const other: Locale = locale === "en" ? "ko" : "en";
  const url = SITE_URL + localePath(locale, path);
  const home = localePath(locale);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={SITE_URL + localePath("en", path)} />
        <link rel="alternate" hrefLang="ko" href={SITE_URL + localePath("ko", path)} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL + localePath("en", path)} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Miuu Studio" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={SITE_URL + image} />
        <meta property="og:locale" content={locale === "ko" ? "ko_KR" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="sticky top-0 z-30 border-b border-ink/5 bg-canvas/85 backdrop-blur">
        <div className="section flex h-16 items-center justify-between gap-4">
          <Link href={home} aria-label="Miuu Studio" className="shrink-0">
            <img src="/brand/logo.png" alt="Miuu Studio" width={640} height={103} className="h-5 w-auto sm:h-6" />
          </Link>
          <nav className="flex items-center gap-1 text-sm font-semibold">
            <div className="hidden items-center gap-1 md:flex">
              <a href={`${home}#characters`} className="rounded-full px-3 py-2 hover:bg-lilac">{t.navCharacters}</a>
              <Link href={localePath(locale, "/comics/")} className="rounded-full px-3 py-2 hover:bg-lilac">{t.navComics}</Link>
              <a href={`${home}#reels`} className="rounded-full px-3 py-2 hover:bg-lilac">{t.navReels}</a>
              <a href={`${home}#apps`} className="rounded-full px-3 py-2 hover:bg-lilac">{t.navApps}</a>
              <a href={`${home}#collab`} className="rounded-full px-3 py-2 hover:bg-lilac">{t.navCollab}</a>
            </div>
            <Link
              href={localePath(other, path)}
              lang={other}
              className="rounded-full border border-ink/15 px-3 py-1.5 hover:border-violet hover:text-violet"
            >
              {t.switchLang}
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-24 bg-night text-white/80">
        <div className="section flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <img src="/brand/logo.png" alt="Miuu Studio" width={640} height={103} className="h-6 w-auto brightness-0 invert" />
            <p className="mt-4 text-sm leading-relaxed">{t.footerTagline}</p>
          </div>
          <div className="flex flex-col gap-4 text-sm md:items-end">
            <div className="flex flex-wrap gap-2">
              {[
                ["Instagram", LINKS.instagram],
                ["TikTok", LINKS.tiktok],
                ["YouTube", LINKS.youtube],
                ["GIPHY", LINKS.giphy],
              ].map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener" className="pill bg-white/10 text-white hover:bg-white/20">
                  {name}
                </a>
              ))}
            </div>
            <p>
              {t.footerContact} · <a href={`mailto:${LINKS.email}`} className="underline underline-offset-4 hover:text-white">{LINKS.email}</a>
            </p>
            <p className="text-white/50">© {new Date().getFullYear()} Miuu Studio</p>
          </div>
        </div>
      </footer>
    </>
  );
}
