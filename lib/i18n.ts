export type Locale = "en" | "ko";

// Text that exists in both languages
export type L = Record<Locale, string>;

export const SITE_URL = "https://miuustudio.com";

// Path prefix for a locale: English lives at the root, Korean under /ko
export function localePath(locale: Locale, path = "/") {
  return locale === "ko" ? `/ko${path === "/" ? "/" : path}` : path;
}

export const UI = {
  en: {
    metaTitle: "Miuu Studio · Home of Miuu, the alien kitty",
    metaDescription:
      "Miuu Studio makes comics, short animations and cozy apps starring Miuu, an alien kitty from Catty Planet now living in New York.",
    navCharacters: "Characters",
    navComics: "Comics",
    navReels: "Reels",
    navApps: "Apps",
    switchLang: "한국어",
    heroEyebrow: "Miuu Studio",
    heroTitle: "Hi! I'm Miuu, an alien kitty from Catty Planet.",
    heroBody:
      "I live in New York now. Here you'll find my comics, my little videos, and the apps my friends and I make.",
    heroCtaComics: "Read the comics",
    heroCtaInstagram: "Follow on Instagram",
    statFollowers: "followers on Instagram",
    statDownloads: "Miuu Note downloads on Google Play",
    charactersEyebrow: "Meet the gang",
    charactersTitle: "Miuu and friends",
    comicsEyebrow: "Comics",
    comicsTitle: "Read Miuu's comics",
    comicsBody: "Pick a series. Every episode stands on its own, so start anywhere.",
    comicsAll: "All series",
    pages: (n: number) => `${n} pages`,
    episodes: (n: number) => `${n} episodes`,
    episodeN: (n: number) => `Ep. ${n}`,
    englishOnly: "English",
    moreOnInstagram: "More on Instagram",
    moreOnInstagramBody: "These episodes live on @miuustudio for now.",
    reelsEyebrow: "Reels",
    reelsTitle: "Latest little videos",
    reelsMore: "More on Instagram",
    appsEyebrow: "Apps",
    appsTitle: "Cozy apps from the studio",
    comingSoon: "Coming soon",
    visitSite: "Visit site",
    footerTagline: "Comics, animation and cozy apps from New York.",
    footerContact: "Contact",
    readerBack: "All series",
    readerPrev: "Previous",
    readerNext: "Next episode",
    readerEnd: "That's the last one here for now.",
    readerOnlyEnglish: "This episode is only in English for now.",
    readerOtherLang: "한국어로 읽기",
  },
  ko: {
    metaTitle: "Miuu Studio · 외계 고양이 미유의 집",
    metaDescription:
      "캐띠 행성에서 온 외계 고양이 미유의 만화, 짧은 애니메이션, 그리고 아늑한 앱을 만드는 Miuu Studio예요.",
    navCharacters: "캐릭터",
    navComics: "만화",
    navReels: "릴스",
    navApps: "앱",
    switchLang: "English",
    heroEyebrow: "Miuu Studio",
    heroTitle: "안녕! 난 캐띠 행성에서 온 외계 고양이 미유야.",
    heroBody: "지금은 뉴욕에 살아. 내 만화랑 짧은 영상, 친구들이랑 만든 앱이 다 여기 있어.",
    heroCtaComics: "만화 보러 가기",
    heroCtaInstagram: "인스타그램 팔로우",
    statFollowers: "인스타그램 팔로워",
    statDownloads: "Google Play Miuu Note 다운로드",
    charactersEyebrow: "친구들 소개",
    charactersTitle: "미유와 친구들",
    comicsEyebrow: "만화",
    comicsTitle: "미유 만화 보기",
    comicsBody: "보고 싶은 시리즈를 골라요. 한 화씩 끝나는 이야기라 어디서 시작해도 돼요.",
    comicsAll: "전체 시리즈",
    pages: (n: number) => `${n}컷`,
    episodes: (n: number) => `${n}화`,
    episodeN: (n: number) => `${n}화`,
    englishOnly: "영어",
    moreOnInstagram: "인스타그램에서 더 보기",
    moreOnInstagramBody: "이 에피소드들은 지금 @miuustudio에서 볼 수 있어요.",
    reelsEyebrow: "릴스",
    reelsTitle: "최근 짧은 영상",
    reelsMore: "인스타그램에서 더 보기",
    appsEyebrow: "앱",
    appsTitle: "스튜디오가 만든 아늑한 앱",
    comingSoon: "곧 출시",
    visitSite: "사이트 보기",
    footerTagline: "뉴욕에서 만드는 만화, 애니메이션, 그리고 아늑한 앱.",
    footerContact: "문의",
    readerBack: "전체 시리즈",
    readerPrev: "이전",
    readerNext: "다음 화",
    readerEnd: "여기서 볼 수 있는 건 여기까지예요.",
    readerOnlyEnglish: "이 에피소드는 아직 영어판만 있어요.",
    readerOtherLang: "Read in English",
  },
} satisfies Record<Locale, Record<string, unknown>>;

export type UIStrings = (typeof UI)["en"];
