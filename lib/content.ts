import type { L, Locale } from "./i18n";

export const LINKS = {
  instagram: "https://www.instagram.com/miuustudio/",
  tiktok: "https://www.tiktok.com/@miuustudio",
  youtube: "https://www.youtube.com/@miuustudio",
  giphy: "https://giphy.com/miuustudio",
  email: "support@miuustudio.com",
  miuuNote: "https://miuunote.site/",
};

// Follower counts from the owner (2026-10-11); downloads from the Play Console (2026-10-09)
export const STATS = { instagram: "230K+", tiktok: "210K+", downloads: "1.8M+" };

// ---- Characters (art from the app: secret-note/assets/miuu)

export type Character = { id: string; name: L; bio: L; bg: string };

export const CHARACTERS: Character[] = [
  {
    id: "miuu",
    name: { en: "Miuu", ko: "미유" },
    bio: {
      en: "An alien kitty from Catty Planet, now living on Earth. Always positive, a little clueless, never without his yellow bag.",
      ko: "캐띠 행성에서 온 외계 고양이. 지금은 지구에 살아요. 늘 긍정적이고 살짝 엉뚱해요. 노란 가방은 꼭 챙겨요.",
    },
    bg: "bg-lilac",
  },
  {
    id: "miyomi",
    name: { en: "Miyomi", ko: "미요미" },
    bio: {
      en: "The friend Miuu met on Earth, now his roommate and girlfriend. Cool, quiet and secretly rich.",
      ko: "미유가 지구에서 만난 친구. 지금은 룸메이트이자 여자친구예요. 말수 적고 쿨한 숨은 부자.",
    },
    bg: "bg-blush",
  },
  {
    id: "kao",
    name: { en: "Kao", ko: "카오" },
    bio: {
      en: "A biologist from Catty Planet. He's the one who helped Miuu escape to Earth.",
      ko: "캐띠 행성의 생물학자. 미유가 지구로 탈출하게 도와준 고양이예요.",
    },
    bg: "bg-sky",
  },
  {
    id: "kiki",
    name: { en: "Kiki", ko: "키키" },
    bio: {
      en: "An innocent baby calico. Miuu took him in on a rainy day.",
      ko: "천진난만한 아기 삼색 고양이. 비 오는 날 미유가 데려왔어요.",
    },
    bg: "bg-butter",
  },
  {
    id: "nunu",
    name: { en: "Nunu", ko: "누누" },
    bio: {
      en: "A shy Shiba pup who's still waiting for his owner.",
      ko: "아직 주인을 기다리는 수줍은 시바 강아지.",
    },
    bg: "bg-mint",
  },
];

// ---- Comics. Pages live in public/comic-art/<slug>/<lang>/01.jpg… plus cover.jpg

export type Episode = {
  slug: string;
  title: L;
  // page count per language; an episode without "ko" is shown in English on the Korean site
  pages: Partial<Record<Locale, number>>;
};

export type Series = {
  id: string;
  title: L;
  blurb: L;
  // when it ran on Instagram
  years: string;
  // stand-alone shorts: no "Ep. N" numbering
  standalone?: boolean;
  episodes: Episode[];
};

export const SERIES: Series[] = [
  {
    id: "origin",
    title: { en: "Miuu Original Story", ko: "미유 오리지널 스토리" },
    years: "2024",
    blurb: {
      en: "How a kitty from Catty Planet ended up on Earth, and found a family.",
      ko: "캐띠 행성의 고양이가 지구에 와서 가족을 찾기까지.",
    },
    episodes: [
      { slug: "hi-im-miuu", title: { en: "Hi, I'm Miuu", ko: "안녕, 난 미유야" }, pages: { en: 10, ko: 10 } },
      { slug: "new-family-1", title: { en: "New Family! Part 1", ko: "새 가족 1편" }, pages: { en: 10, ko: 10 } },
      { slug: "new-family-2", title: { en: "New Family! Part 2", ko: "새 가족 2편" }, pages: { en: 10 } },
      { slug: "alley-cats", title: { en: "Meeting the Alley Cats", ko: "골목 고양이들" }, pages: { en: 10 } },
      { slug: "dream", title: { en: "Dream...", ko: "꿈" }, pages: { en: 8 } },
      { slug: "detective", title: { en: "Cat Detective Agency", ko: "고양이 탐정 사무소" }, pages: { en: 10 } },
      { slug: "first-shift", title: { en: "First Shift", ko: "첫 출근" }, pages: { en: 10 } },
      { slug: "crow", title: { en: "The Crow", ko: "까마귀" }, pages: { en: 10 } },
      { slug: "lab", title: { en: "To the Lab", ko: "연구소로" }, pages: { en: 10 } },
      { slug: "nunu", title: { en: "Nunu", ko: "누누" }, pages: { en: 10 } },
      { slug: "black-cat", title: { en: "The Black Cat", ko: "검은 고양이" }, pages: { en: 10 } },
      { slug: "secret-mission", title: { en: "Secret Mission", ko: "비밀 임무" }, pages: { en: 10 } },
      { slug: "his-path", title: { en: "His Path", ko: "그의 길" }, pages: { en: 13 } },
      { slug: "rescue-mission", title: { en: "Rescue Mission", ko: "구출 작전" }, pages: { en: 13 } },
      { slug: "ghost-of-the-lab", title: { en: "Ghost of the Lab", ko: "연구소의 유령" }, pages: { en: 12 } },
      { slug: "promise-for-nunu", title: { en: "Promise for Nunu", ko: "누누와의 약속" }, pages: { en: 13 } },
      { slug: "new-beginning", title: { en: "A New Beginning", ko: "새로운 시작" }, pages: { en: 13 } },
    ],
  },
  {
    id: "new-york",
    title: { en: "Miuu in New York", ko: "뉴욕의 미유" },
    years: "2025",
    blurb: {
      en: "One small cat, one very big city.",
      ko: "작은 고양이와 아주 큰 도시.",
    },
    episodes: [
      { slug: "times-square", title: { en: "Times Square", ko: "타임스스퀘어" }, pages: { en: 12 } },
      { slug: "hungry", title: { en: "Hungry", ko: "배고파" }, pages: { en: 8 } },
      { slug: "subway", title: { en: "NYC Subway", ko: "뉴욕 지하철" }, pages: { en: 10 } },
      { slug: "hospital", title: { en: "NYC Hospital", ko: "뉴욕 병원" }, pages: { en: 10 } },
      { slug: "prison-1", title: { en: "Locked Up", ko: "갇혔다" }, pages: { en: 10 } },
      { slug: "prison-2", title: { en: "Prison Playbook", ko: "슬기로운 감옥 생활" }, pages: { en: 14 } },
    ],
  },
  {
    id: "donut",
    title: { en: "Miuu's Donut Worry", ko: "미유의 도넛 가게" },
    years: "2026",
    blurb: {
      en: "Miuu opens his very own donut shop. What could go wrong?",
      ko: "미유가 드디어 자기 도넛 가게를 열었어요. 별일 없겠죠?",
    },
    episodes: [
      { slug: "i-did-it", title: { en: "I Did It!", ko: "해냈다!" }, pages: { en: 9 } },
      { slug: "zero-reviews", title: { en: "Zero Reviews", ko: "리뷰 0개" }, pages: { en: 8 } },
      { slug: "donut-3", title: { en: "I Needed a Hero", ko: "히어로가 필요해" }, pages: { en: 9 } },
    ],
  },
  {
    id: "daily",
    title: { en: "Little Days", ko: "소소한 하루" },
    years: "2024–2026",
    standalone: true,
    blurb: {
      en: "Short comics about Miuu, Miyomi and Kiki. Each one stands on its own.",
      ko: "미유, 미요미, 키키의 짧은 일상 만화. 한 편씩 끝나는 이야기예요.",
    },
    episodes: [
      { slug: "investment", title: { en: "Miyomi's Investment", ko: "미요미의 투자" }, pages: { en: 14 } },
      { slug: "new-outfit", title: { en: "Miuu's New Outfit", ko: "미유의 새 옷" }, pages: { en: 14 } },
      { slug: "abandoned-cat", title: { en: "Abandoned Cat", ko: "버려진 고양이" }, pages: { en: 10 } },
      { slug: "snowman", title: { en: "Memories with a Snowman", ko: "눈사람과의 추억" }, pages: { en: 13 } },
      { slug: "pigeons", title: { en: "Pigeons", ko: "비둘기" }, pages: { en: 13 } },
      { slug: "anger-academy", title: { en: "Anger Academy", ko: "분노 아카데미" }, pages: { en: 13 } },
      { slug: "camera", title: { en: "Miuu's Weird Camera", ko: "이상한 카메라" }, pages: { en: 11 } },
      { slug: "life-of-miuu", title: { en: "Life of Miuu: One Day Santa", ko: "미유의 하루: 하루 산타" }, pages: { en: 11 } },
      { slug: "lottery", title: { en: "Lottery Ticket", ko: "복권" }, pages: { en: 10 } },
      { slug: "cake", title: { en: "The Cake", ko: "케이크" }, pages: { en: 9 } },
      { slug: "cookie", title: { en: "Accept Cookies?", ko: "쿠키를 허용할까요?" }, pages: { en: 10 } },
      { slug: "birthday", title: { en: "Happy Birthday", ko: "생일 축하해" }, pages: { en: 10 } },
      { slug: "wizard", title: { en: "Wizard Miuu: Day One", ko: "마법사 미유 첫날" }, pages: { en: 8 } },
      { slug: "potion", title: { en: "Love Potion", ko: "사랑의 묘약" }, pages: { en: 13 } },
      { slug: "robot", title: { en: "Are You a Robot?", ko: "로봇입니까?" }, pages: { en: 5 } },
      { slug: "spa", title: { en: "Spa Day", ko: "스파 가는 날" }, pages: { en: 9 } },
      { slug: "soccer", title: { en: "Miuu Makes the National Team", ko: "국가대표 미유" }, pages: { en: 9 } },
      { slug: "movie-theater", title: { en: "Movie Theater", ko: "영화관" }, pages: { en: 1 } },
    ],
  },
];

export const ALL_EPISODES = SERIES.flatMap((s) => s.episodes.map((e) => ({ ...e, series: s })));

export function seriesPath(s: Series) {
  return `/comics/${s.id}/`;
}

export function episodePath(s: Series, ep: Episode) {
  return `/comics/${s.id}/${ep.slug}/`;
}

export function episodeLang(ep: Episode, locale: Locale): Locale {
  return ep.pages[locale] ? locale : "en";
}

export function comicCover(ep: Episode, locale: Locale) {
  return `/comic-art/${ep.slug}/${episodeLang(ep, locale)}/cover.jpg`;
}

export function comicPages(ep: Episode, locale: Locale) {
  const lang = episodeLang(ep, locale);
  return Array.from({ length: ep.pages[lang] ?? 0 }, (_, i) => `/comic-art/${ep.slug}/${lang}/${String(i + 1).padStart(2, "0")}.jpg`);
}

// ---- Reels: the most-watched @miuustudio reels (Instagram view counts, 2026-10-12).
// Files in public/reels/<id>.mp4 + <id>.jpg poster

export type Reel = { id: string; title: L; views: string; url: string };

const reel = (code: string) => `https://www.instagram.com/reel/${code}/`;

export const REELS: Reel[] = [
  { id: "pizza", title: { en: "Left one piece for you", ko: "한 조각 남겨뒀어" }, views: "15M", url: reel("CwoK246sUXL") },
  { id: "piano", title: { en: "My life was beautiful..", ko: "내 인생은 아름다웠어.." }, views: "11.9M", url: reel("CvYCdTkRn4j") },
  { id: "lil-fish", title: { en: "Lil fish stole my diary", ko: "물고기가 일기장을 훔쳐갔어" }, views: "9.3M", url: reel("DeC3qQSyv3R") },
  { id: "daily-routine", title: { en: "Daily routine", ko: "하루 루틴" }, views: "7.3M", url: reel("CwMH7vQssCG") },
  { id: "lighter-heart", title: { en: "A lighter heart today", ko: "오늘은 마음 가볍게" }, views: "7.2M", url: reel("DVcIzaxCTb1") },
];

// ---- Apps

export type App = {
  id: string;
  name: string;
  tagline: L;
  icon?: string;
  shots: string[];
  links?: { label: string; href: string }[];
  status?: "live" | "soon";
  bg: string;
};

export const APPS: App[] = [
  {
    id: "miuu-note",
    name: "Miuu Note",
    tagline: {
      en: "A cute private diary with a lock, mood calendar, stickers and a little room to decorate.",
      ko: "잠금 일기, 기분 캘린더, 스티커, 그리고 꾸밀 수 있는 작은 방까지 있는 귀여운 다이어리.",
    },
    icon: "/apps/miuu-note-icon.webp",
    shots: ["/apps/miuu-note-journals-list.jpg", "/apps/miuu-note-room-cozy.jpg", "/apps/miuu-note-mood-calendar.jpg"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/miuu-note-cute-diary-with-lock/id6446296872" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.miuustudio.miuudiary" },
      { label: "miuunote.site", href: "https://miuunote.site/" },
    ],
    status: "live",
    bg: "bg-lilac",
  },
  {
    id: "tiny-us",
    name: "Tiny Us",
    tagline: {
      en: "A cozy little home and diary for two.",
      ko: "둘이 함께 꾸미고 쓰는 아늑한 작은 집과 다이어리.",
    },
    icon: "/apps/tiny-us-icon.webp?v=2",
    shots: [],
    status: "soon",
    bg: "bg-blush",
  },
];
