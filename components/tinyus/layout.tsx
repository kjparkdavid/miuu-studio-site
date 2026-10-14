import Head from "next/head";
import Link from "next/link";
import { Figtree } from "next/font/google";
import { ReactNode, useEffect } from "react";
import { Locale, SITE_URL } from "@/lib/i18n";
import { TINYUS, TINY_SHIPPED, tinyBuiltPath, tinyCopy, tinyLive, tinyPath } from "@/lib/tinyus";

// Tiny Us has its own look (clean v2 Soft UI, light + dark) and its own header/footer; the studio brand only
// appears as "Made by Miuu Studio" in the footer. Self-contained under /tinyus so it can move to its own domain.
const figtree = Figtree({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-tu" });

type Props = {
  locale: Locale;
  page?: "" | "privacy" | "terms" | "support" | "invite" | "delete-account";
  title: string;
  description: string;
  noindex?: boolean;
  children: ReactNode;
};

export default function TinyLayout({ locale, page = "", title, description, noindex, children }: Props) {
  const t = tinyCopy(locale);
  const other: Locale = locale === "en" ? "ko" : "en";
  const home = tinyPath(locale);
  const url = SITE_URL + tinyPath(locale, page);
  const hidden = !tinyLive(locale);
  const showSwitch = tinyLive(other);

  // a hidden locale's page forwards to the English one (keeping ?code= on invite links)
  useEffect(() => {
    if (hidden) location.replace(tinyPath("en", page) + location.search + location.hash);
  }, [hidden, page]);
  const og = `${SITE_URL}/tinyus/brand/og.png`;

  return (
    <div className={`tu ${figtree.variable} min-h-screen bg-tu-page font-tu text-tu-ink antialiased`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {(noindex || hidden) && <meta name="robots" content="noindex" />}
        {hidden && <meta httpEquiv="refresh" content={`1; url=${tinyPath("en", page)}`} />}
        <link rel="canonical" href={url} />
        {TINY_SHIPPED.length > 1 &&
          TINY_SHIPPED.map((l) => (
            <link key={l} rel="alternate" hrefLang={l} href={SITE_URL + tinyBuiltPath(l as Locale, page)} />
          ))}
        {TINY_SHIPPED.length > 1 && <link rel="alternate" hrefLang="x-default" href={SITE_URL + tinyPath("en", page)} />}
        <meta name="theme-color" content="#F7F6FB" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#121019" media="(prefers-color-scheme: dark)" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tiny Us" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={og} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={t.heroAlt} />
        <meta property="og:locale" content={locale === "ko" ? "ko_KR" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={og} />
      </Head>

      <header className="sticky top-0 z-30 border-b border-tu-line backdrop-blur" style={{ backgroundColor: "color-mix(in srgb, var(--tu-page) 88%, transparent)" }}>
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href={home} className="flex shrink-0 items-center gap-2.5" aria-label="Tiny Us">
            <img src="/tinyus/brand/icon-rounded.png" alt="" width={288} height={288} className="h-8 w-8" />
            <span className="text-lg font-extrabold tracking-tight">Tiny Us</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm font-semibold">
            <div className="hidden items-center gap-1 sm:flex">
              <a href={`${home}#how`} className="rounded-full px-3 py-2 hover:bg-tu-lilac">{t.navHow}</a>
              <a href={`${home}#faq`} className="rounded-full px-3 py-2 hover:bg-tu-lilac">{t.navFaq}</a>
              <Link href={tinyPath(locale, "support")} className="rounded-full px-3 py-2 hover:bg-tu-lilac">{t.navSupport}</Link>
            </div>
            {showSwitch && (
              <Link
                href={tinyPath(other, page)}
                lang={other}
                className="rounded-full border border-tu-line px-3 py-1.5 hover:border-tu-accent hover:text-tu-accent"
              >
                {t.switchLang}
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-20 border-t border-tu-line">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 text-sm text-tu-caption sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2.5">
            <img src="/tinyus/brand/icon-rounded.png" alt="" width={288} height={288} className="h-7 w-7" />
            <span className="font-bold text-tu-ink">Tiny Us</span>
            <span aria-hidden>·</span>
            <a href={locale === "ko" ? "/ko/" : "/"} className="hover:text-tu-accent">{t.footerMadeBy}</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-semibold">
            <Link href={tinyPath(locale, "privacy")} className="hover:text-tu-accent">{t.footerPrivacy}</Link>
            <Link href={tinyPath(locale, "terms")} className="hover:text-tu-accent">{t.footerTerms}</Link>
            <Link href={tinyPath(locale, "support")} className="hover:text-tu-accent">{t.footerSupport}</Link>
            <a href={TINYUS.instagram.url} target="_blank" rel="noopener" className="hover:text-tu-accent">Instagram</a>
            <span className="font-medium">© {new Date().getFullYear()} {TINYUS.company}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
