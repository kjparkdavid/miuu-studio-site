import { useEffect, useState } from "react";
import { Locale } from "@/lib/i18n";
import { TINYUS, TINYUS_LAUNCHED, TINY_PAGES } from "@/lib/tinyus";
import TinyLayout from "./layout";
import PixelHome from "./pixelHome";
import GetTinyUs, { StoreBadges } from "./getTinyUs";

// Fallback for invite links when the app isn't installed (with the app, the universal link / App Link opens it
// directly). Links look like /tinyus/invite/ABCD-1234/; GitHub Pages serves 404.html for those, which forwards
// here as /tinyus/invite/?code=ABCD-1234. The code is read on the client only and never sent anywhere.
export function normalizeCode(raw: string | null) {
  const c = (raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!TINYUS.inviteCode.test(c)) return null;
  return `${c.slice(0, 4)}-${c.slice(4, 8)}`;
}

export default function InvitePage({ locale }: { locale: Locale }) {
  const p = TINY_PAGES[locale];
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(normalizeCode(new URLSearchParams(location.search).get("code")));
  }, []);

  const copy = async () => {
    if (!code) return;
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked: the code stays selectable */ }
  };

  return (
    <TinyLayout locale={locale} page="invite" title={`${p.inviteTitle} · Tiny Us`} description={p.inviteBody} noindex>
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 px-4 pt-8 sm:px-6 sm:pt-14 md:grid-cols-[1fr_1.1fr]">
        <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[32px] bg-tu-night">
          <PixelHome bg="/tinyus/art/home-night.png" pets={["miuu", "miyomi"]} alt="" />
        </div>
        <div>
          <h1 className="text-[34px] font-extrabold leading-tight tracking-tight sm:text-5xl">{p.inviteTitle}</h1>
          <p className="mt-4 text-lg leading-relaxed text-tu-caption">{TINYUS_LAUNCHED ? p.inviteBody : p.invitePrelaunch}</p>

          {TINYUS_LAUNCHED ? (
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
                <StoreBadges locale={locale} />
              </div>
            </>
          ) : (
            <GetTinyUs locale={locale} id="waitlist-invite" />
          )}
        </div>
      </div>
    </TinyLayout>
  );
}
