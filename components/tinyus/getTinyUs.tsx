import Waitlist from "@/components/waitlist";
import { Locale } from "@/lib/i18n";
import { TINYUS, TINYUS_LAUNCHED, TINYUS_ON_APP_STORE, tinyCopy } from "@/lib/tinyus";

// The one call to action on every Tiny Us page. Phase 1: the existing Google Form waitlist + follow on Instagram.
// Phase 2 (TINYUS_LAUNCHED): store badges. No price in either.
export default function GetTinyUs({ locale, id, onDark = false }: { locale: Locale; id: string; onDark?: boolean }) {
  const t = tinyCopy(locale);
  const note = `mt-4 text-sm ${onDark ? "text-white/65" : "text-tu-caption"}`;

  if (TINYUS_LAUNCHED) {
    return (
      <div className="mt-7">
        <StoreBadges locale={locale} />
        <p className={note}>{TINYUS_ON_APP_STORE ? t.heroNoteLive : t.heroNoteAndroid}</p>
      </div>
    );
  }

  return (
    <div className="mt-7">
      <p className={`text-sm font-bold ${onDark ? "text-white" : ""}`}>{t.waitlistLabel}</p>
      <div className="-mt-2">
        <Waitlist locale={locale} look="tinyus" id={id} />
      </div>
      <p className={note}>
        {t.heroNote}{" "}
        <a
          href={TINYUS.instagram.url}
          target="_blank"
          rel="noopener"
          className={`font-bold underline-offset-4 hover:underline ${onDark ? "text-white" : "text-tu-accent"}`}
        >
          {t.follow(TINYUS.instagram.handle)}
        </a>
      </p>
    </div>
  );
}

// TODO(launch): swap these text badges for Apple's and Google's official badge artwork (their brand rules require it):
// public/tinyus/badges/app-store-<locale>.svg and google-play-<locale>.png.
// The invite page (dev #1212) passes a Play link with the install referrer and an App Store tap that also copies the invite link.
export function StoreBadges({ locale, googlePlayHref, onAppStore }: { locale: Locale; googlePlayHref?: string; onAppStore?: () => void }) {
  const t = tinyCopy(locale);
  const badge = "flex h-14 min-w-[172px] flex-col justify-center rounded-xl bg-black px-4 text-white ring-1 ring-white/15 hover:opacity-90";
  // Until the App Store release (TINYUS_ON_APP_STORE), its badge is a "Coming soon" label that links nowhere.
  return (
    <div className="flex flex-wrap gap-3">
      {TINYUS_ON_APP_STORE ? (
        <a href={TINYUS.store.appStore} target="_blank" rel="noopener" className={badge} onClick={onAppStore}>
          <span className="text-[11px] font-semibold leading-none">{t.badgeAppStore[0]}</span>
          <span className="mt-1 text-xl font-bold leading-none">{t.badgeAppStore[1]}</span>
        </a>
      ) : (
        <span className={`${badge.replace(" hover:opacity-90", "")} opacity-50`} aria-disabled="true">
          <span className="text-[11px] font-semibold leading-none">{t.badgeAppStoreSoon[0]}</span>
          <span className="mt-1 text-xl font-bold leading-none">{t.badgeAppStoreSoon[1]}</span>
        </span>
      )}
      <a href={googlePlayHref || TINYUS.store.googlePlay} target="_blank" rel="noopener" className={badge}>
        <span className="text-[11px] font-semibold leading-none">{t.badgeGooglePlay[0]}</span>
        <span className="mt-1 text-xl font-bold leading-none">{t.badgeGooglePlay[1]}</span>
      </a>
    </div>
  );
}
