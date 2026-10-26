import { useEffect, useState } from "react";
import Head from "next/head";
import { Locale } from "@/lib/i18n";
import { TINYUS, TINYUS_LAUNCHED, TINYUS_ON_APP_STORE, TINY_PAGES, inviteUniversalLink, openAppUrl, playInviteUrl } from "@/lib/tinyus";
import TinyLayout from "./layout";
import PixelHome from "./pixelHome";
import GetTinyUs, { StoreBadges } from "./getTinyUs";

// Fallback for invite links when the app isn't installed (with the app, the universal link / App Link opens it
// directly). Links look like /tinyus/invite/ABCD-1234/; GitHub Pages serves 404.html for those, which forwards
// here as /tinyus/invite/?code=ABCD-1234. The code is read on the client only and never sent to us.
// dev #1212 (Lead 10-17): Android visitors go straight to Google Play with the install referrer (the app links up on
// first open); the App Store badge also copies the invite link, so "I have an invite code" → Paste fills it in;
// "Open Tiny Us" = <scheme>://invite/<CODE> for someone coming back to Safari with the app installed.
// Staging (/tinyus-staging/invite/<CODE>): the same page with tinyus-staging://, no Play redirect, no referrer, no launch gate.
export function normalizeCode(raw: string | null) {
  const c = (raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!TINYUS.inviteCode.test(c)) return null;
  return `${c.slice(0, 4)}-${c.slice(4, 8)}`;
}

export default function InvitePage({ locale, staging = false }: { locale: Locale; staging?: boolean }) {
  const p = TINY_PAGES[locale];
  const live = TINYUS_LAUNCHED || staging;
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const c = normalizeCode(new URLSearchParams(location.search).get("code"));
    setCode(c);
    if (c && TINYUS_LAUNCHED && !staging && /Android/i.test(navigator.userAgent)) location.replace(playInviteUrl(c));
  }, [staging]);

  const copy = async () => {
    if (!code) return;
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked: the code stays selectable */ }
  };
  // Same tap as the App Store badge (the link still opens): the universal link goes on the clipboard for the app's Paste.
  const copyLink = () => {
    if (!code) return;
    navigator.clipboard?.writeText(inviteUniversalLink(code, staging)).then(() => setLinkCopied(true), () => { /* blocked: the steps still work with the code */ });
  };

  return (
    <TinyLayout locale={locale} page="invite" title={`${p.inviteTitle} · Tiny Us`} description={p.inviteBody} noindex>
      <Head>
        {/* TODO(#450): turns on once TINYUS.store.appStoreId is set. Safari's Smart App Banner, opening the app on this invite. */}
        {TINYUS.store.appStoreId !== "TODO" && !staging && (
          <meta name="apple-itunes-app" content={`app-id=${TINYUS.store.appStoreId}${code ? `, app-argument=${inviteUniversalLink(code)}` : ""}`} />
        )}
      </Head>
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 px-4 pt-8 sm:px-6 sm:pt-14 md:grid-cols-[1fr_1.1fr]">
        <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[32px] bg-tu-night">
          <PixelHome bg="/tinyus/art/home-night.png" pets={["miuu", "miyomi"]} alt="" />
        </div>
        <div>
          <h1 className="text-[34px] font-extrabold leading-tight tracking-tight sm:text-5xl">{p.inviteTitle}</h1>
          <p className="mt-4 text-lg leading-relaxed text-tu-caption">{live ? p.inviteBody : p.invitePrelaunch}</p>

          {live ? (
            <>
              {code ? (
                <div className="mt-6 rounded-3xl bg-tu-card p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-tu-accent">{p.inviteCode}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="select-all font-mono text-3xl font-bold tracking-[0.12em]">{code}</span>
                    <button type="button" onClick={copy} className="pill bg-tu-lilac text-tu-accent">
                      {copied ? p.inviteCopied : p.inviteCopy}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-tu-caption">{p.inviteValid}</p>
                </div>
              ) : (
                <p className="mt-6 rounded-2xl bg-tu-card px-4 py-3 text-sm font-semibold">{p.inviteNoCode}</p>
              )}
              <ol className="mt-6 space-y-2">
                {p.inviteSteps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 font-semibold">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-tu-violet text-sm font-extrabold text-white">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="mt-7">
                <StoreBadges locale={locale} googlePlayHref={code && !staging ? playInviteUrl(code) : undefined} onAppStore={copyLink} />
              </div>
              {!TINYUS_ON_APP_STORE && !staging && <p className="mt-4 text-sm text-tu-caption">{p.inviteIphoneSoon}</p>}
              {linkCopied && (
                <p role="status" className="mt-4 rounded-2xl bg-tu-lilac px-4 py-3 text-sm font-semibold text-tu-accent">{p.inviteCopiedLink}</p>
              )}
              {code && (
                <a href={openAppUrl(code, staging)} className="pill mt-5 inline-flex bg-tu-violet text-white hover:opacity-90">
                  {p.inviteOpen}
                </a>
              )}
            </>
          ) : (
            <GetTinyUs locale={locale} id="waitlist-invite" />
          )}
        </div>
      </div>
    </TinyLayout>
  );
}
