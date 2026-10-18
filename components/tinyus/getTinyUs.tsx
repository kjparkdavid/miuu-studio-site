import Waitlist from "@/components/waitlist";
import { Locale } from "@/lib/i18n";
import { TINYUS, TINYUS_LAUNCHED, tinyCopy } from "@/lib/tinyus";

// The one call to action on every Tiny Us page. Phase 1: the existing Google Form waitlist + follow on Instagram.
// Phase 2 (TINYUS_LAUNCHED): store badges. No price in either.
export default function GetTinyUs({ locale, id, onDark = false }: { locale: Locale; id: string; onDark?: boolean }) {
  const t = tinyCopy(locale);
  const note = `mt-4 text-sm ${onDark ? "text-white/65" : "text-tu-caption"}`;

  if (TINYUS_LAUNCHED) {
    return (
      <div className="mt-7">
        <StoreBadges locale={locale} />
        <p className={note}>{t.heroNoteLive}</p>
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
  return (
    <div className="flex flex-wrap gap-3">
      {(
        [
          [TINYUS.store.appStore, t.badgeAppStore, onAppStore],
          [googlePlayHref || TINYUS.store.googlePlay, t.badgeGooglePlay, undefined],
        ] as const
      ).map(([href, [small, big], onClick]) => (
        <a key={href} href={href} target="_blank" rel="noopener" className={badge} onClick={onClick}>
          <span className="text-[11px] font-semibold leading-none">{small}</span>
          <span className="mt-1 text-xl font-bold leading-none">{big}</span>
        </a>
      ))}
    </div>
  );
}
