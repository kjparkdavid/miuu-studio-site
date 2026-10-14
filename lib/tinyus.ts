import { Locale } from "@/lib/i18n";

// Tiny Us section of the site (miuustudio.com/tinyus). Everything Tiny Us lives under /tinyus so it can be lifted
// to its own domain later without a rewrite. Copy source of truth for the app: design-review/tinyus-pixel/copy/.

// ---------- launch switch ----------
// false = Phase 1 (now → launch): waitlist + follow CTA, "Coming soon", no store links, no price.
// true  = Phase 2 (launch day): App Store / Google Play badges everywhere. Fill STORE before flipping.
export const TINYUS_LAUNCHED = false;

export const TINYUS = {
  base: "/tinyus/",
  // TODO(launch): real store URLs. Badges also need Apple's / Google's official artwork in public/tinyus/badges/.
  store: {
    appStore: "https://apps.apple.com/app/idTODO",
    googlePlay: "https://play.google.com/store/apps/details?id=TODO",
  },
  // @tinyushome until launch; the main account moves to @tinyus.app at launch (HANDOFF "IG handle").
  instagram: { handle: "@tinyushome", url: "https://www.instagram.com/tinyushome/" },
  // tinyus@miuustudio.com, created by the user 10-14: the one place to change the support address on every Tiny Us page.
  supportEmail: "tinyus@miuustudio.com",
  company: "Miuu Studio",
  // Invite codes are the app's 8-character XXXX-XXXX (dev #378). Universal link: /tinyus/invite/<code>.
  inviteCode: /^[A-Z0-9]{4}-?[A-Z0-9]{4}$/,
};

// Links always point at a live locale: a hidden locale's links go to the English page.
export function tinyPath(locale: Locale, page = "") {
  const live = tinyLive(locale) ? locale : "en";
  return `${live === "ko" ? "/ko" : ""}/tinyus/${page ? `${page}/` : ""}`;
}

// The URL a locale's page is actually built at (even while that locale is hidden)
export function tinyBuiltPath(locale: Locale, page = "") {
  return `${locale === "ko" ? "/ko" : ""}/tinyus/${page ? `${page}/` : ""}`;
}

// ---------- locales ----------
// The app ships 15 locales (design-review/tinyus-pixel/copy/locales/). The site is structured for all of them but
// ships EN + KO first. To add one: add its copy to TINY_COPY below, add pages/<locale>/tinyus/*, and list it in SHIPPED.
export const TINY_LOCALES = ["en", "ko", "ja", "zh-Hans", "zh-Hant", "es", "pt", "fr", "de", "it", "ru", "tr", "th", "id", "ar"] as const;
export type TinyLocale = (typeof TINY_LOCALES)[number];
// KO hidden by the user (10-14): its copy and pages stay in the code, but no link points there, it's out of the
// sitemap/hreflang, and /ko/tinyus/* forwards to English. Add "ko" back here to show it again.
export const TINY_SHIPPED: TinyLocale[] = ["en"];
export const tinyLive = (l: string) => (TINY_SHIPPED as string[]).includes(l);

type QA = readonly [string, string];

export type TinyCopy = {
  metaTitle: string;
  metaDescription: string;
  navHow: string;
  navFaq: string;
  navSupport: string;
  switchLang: string;
  comingSoon: string;
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroNote: string;
  heroNoteLive: string;
  heroAlt: string;
  waitlistLabel: string;
  follow: (handle: string) => string;
  howEyebrow: string;
  howTitle: string;
  steps: readonly { title: string; body: string }[];
  qCardEyebrow: string;
  qCardQuestion: string;
  qCardPlaceholder: string;
  revealYou: string;
  revealThem: string;
  revealA: string;
  revealB: string;
  growLabels: readonly [string, string, string, string, string];
  growAlts: readonly [string, string, string, string, string];
  littleEyebrow: string;
  littleTitle: string;
  little: readonly { title: string; body: string }[];
  puppyEyebrow: string;
  puppyTitle: string;
  puppyBody: string;
  puppyAlt: string;
  plusEyebrow: string;
  plusTitle: string;
  plusBody: string;
  plusPerks: readonly string[];
  plusFree: string;
  faqEyebrow: string;
  faqTitle: string;
  faq: readonly QA[];
  endTitle: string;
  endBody: string;
  endBodyLive: string;
  footerPrivacy: string;
  footerTerms: string;
  footerSupport: string;
  footerMadeBy: string;
  badgeAppStore: [string, string];
  badgeGooglePlay: [string, string];
};

const en: TinyCopy = {
  metaTitle: "Tiny Us · Cozy couple questions & a tiny home for two",
  metaDescription:
    "Answer one question a day together and watch your tiny pixel home grow. A cozy couple app for iPhone and Android.",
  navHow: "How it works",
  navFaq: "FAQ",
  navSupport: "Support",
  switchLang: "한국어",
  comingSoon: "Coming soon",
  heroEyebrow: "A cozy couple app",
  heroTitle: "A tiny home for the two of you",
  heroBody:
    "Answer one question a day together. Every day you both answer, your little pixel home grows, and two tiny roommates move in.",
  heroNote: "Coming soon to iPhone and Android. Free to download.",
  heroNoteLive: "Free to download on iPhone and Android.",
  heroAlt: "Two pixel cats snuggling in a tiny house at night",
  waitlistLabel: "Get an email when it’s out",
  follow: (h) => `Follow ${h}`,
  howEyebrow: "How it works",
  howTitle: "Small questions. A home that grows.",
  steps: [
    {
      title: "One question a day",
      body: "Something light, like what made you smile today. Something deeper, like where you’d live if you could live anywhere.",
    },
    {
      title: "Answer, then see theirs",
      body: "Your answer stays hidden until your person answers too. Then you both see both, and the fun part starts.",
    },
    {
      title: "Watch your home grow",
      body: "Every day you both answer, your home grows. In two weeks, build a second floor or move to New York, Paris or Tokyo. After that? Keep answering and see.",
    },
  ],
  qCardEyebrow: "Today’s question",
  qCardQuestion: "What’s the first thing you noticed about me?",
  qCardPlaceholder: "Write your answer…",
  revealYou: "You",
  revealThem: "Sam",
  revealA: "Your laugh. I heard it before I saw you.",
  revealB: "Honestly? Your terrible taste in snacks 😄",
  growLabels: ["Day 1", "Day 3", "Day 14", "or a new city", "And then…?"],
  growAlts: [
    "A tiny hut on a hill",
    "A cottage with a pink roof",
    "The cottage with a second floor",
    "A home in New York, Paris or Tokyo",
    "A mystery silhouette with a question mark",
  ],
  littleEyebrow: "Made for two",
  littleTitle: "Little ways to stay close",
  little: [
    { title: "A hug in one tap", body: "Send a hug, a kiss or a “miss you” from anywhere." },
    { title: "Their mood, on your Home Screen", body: "See how they’re feeling right by their pet, even in a widget." },
    { title: "Sneaky notes", body: "Hide a little note somewhere in your home and let them find it." },
    { title: "A garden of places", body: "Stamp the places you go together. Each one plants a tree out front." },
  ],
  puppyEyebrow: "Cat people, dog people",
  puppyTitle: "Two little roommates. You pick.",
  puppyBody:
    "Choose a cat or a puppy for each of you. They wander, nap on the rug and snuggle up when you’re both around.",
  puppyAlt: "Two pixel puppies in a tiny house during the day",
  plusEyebrow: "Tiny Us Plus",
  plusTitle: "One of you gets Plus. You both have it.",
  plusBody: "Plus is shared. When one of you upgrades, it’s on for both of you. No second subscription, no splitting the bill.",
  plusPerks: [
    "Build a second floor, or move to New York, Paris or Tokyo",
    "Every seasonal box opened",
    "All 33 moods and your own app icon",
    "Your whole diary, every note, always there",
  ],
  plusFree: "Tiny Us is free to use every day. Plus is optional.",
  faqEyebrow: "FAQ",
  faqTitle: "Good to know",
  faq: [
    ["Is Tiny Us free?", "Yes. You can answer, grow your home and use Tiny Us every day for free. Plus is an optional upgrade, and one Plus covers both of you."],
    ["Do we both need the app?", "Yes, one each, on your own phones. One of you starts your home and sends an invite code; the other enters it to link up."],
    ["Can an iPhone and an Android phone link up?", "Yes. Tiny Us works on both, so you can link up whatever phones you have."],
    ["We’re long distance. Is it for us?", "Very much. One question a day is an easy way to keep talking when your schedules and time zones don’t line up."],
    ["Who can see our answers?", "Only the two of you. Your answer stays hidden until your person answers too."],
    ["What if my person hasn’t joined yet?", "Start without them. Answer today’s question, and they’ll see it once they move in."],
    ["When does it come out?", "Soon, on iPhone and Android. Join the waitlist or follow us and we’ll tell you the day it’s out."],
  ],
  endTitle: "Your tiny home is almost ready",
  endBody: "We’ll let you know the day you can move in.",
  endBodyLive: "Start your tiny home tonight.",
  footerPrivacy: "Privacy",
  footerTerms: "Terms",
  footerSupport: "Support",
  footerMadeBy: "Made by Miuu Studio",
  badgeAppStore: ["Download on the", "App Store"],
  badgeGooglePlay: ["Get it on", "Google Play"],
};

const ko: TinyCopy = {
  metaTitle: "Tiny Us · 둘이 함께 답하고, 작은 집을 키우는 커플 앱",
  metaDescription: "하루 한 질문에 둘이 함께 답하면 작은 픽셀 집이 자라요. iPhone과 Android용 아늑한 커플 앱.",
  navHow: "사용법",
  navFaq: "FAQ",
  navSupport: "고객지원",
  switchLang: "English",
  comingSoon: "곧 출시",
  heroEyebrow: "아늑한 커플 앱",
  heroTitle: "우리 둘만의 작은 집",
  heroBody: "하루 한 질문에 함께 답해요. 둘 다 답한 날마다 작은 픽셀 집이 자라고, 귀여운 룸메이트 둘이 이사 와요.",
  heroNote: "iPhone과 Android에 곧 나와요. 다운로드는 무료예요.",
  heroNoteLive: "iPhone과 Android에서 무료로 받을 수 있어요.",
  heroAlt: "밤에 작은 집에서 꼭 붙어 있는 픽셀 고양이 두 마리",
  waitlistLabel: "출시되면 메일로 알려드릴게요",
  follow: (h) => `${h} 팔로우`,
  howEyebrow: "사용법",
  howTitle: "작은 질문 하나, 함께 자라는 집",
  steps: [
    { title: "하루 한 질문", body: "오늘 웃었던 순간처럼 가벼운 것부터, 어디서든 살 수 있다면 어디 살고 싶은지 같은 깊은 것까지." },
    { title: "답하면, 상대 답이 열려요", body: "내 답은 상대도 답할 때까지 숨겨져요. 둘 다 답하면 같이 보고, 그때부터가 진짜 재미예요." },
    { title: "집이 자라요", body: "둘 다 답한 날마다 집이 자라요. 2주 뒤엔 2층을 올리거나 뉴욕·파리·도쿄로 이사 가요. 그다음은? 계속 답하다 보면 알게 돼요." },
  ],
  qCardEyebrow: "오늘의 질문",
  qCardQuestion: "나를 보고 제일 먼저 눈에 띈 게 뭐였어?",
  qCardPlaceholder: "답을 적어 보세요…",
  revealYou: "나",
  revealThem: "Sam",
  revealA: "웃음소리. 얼굴 보기 전에 먼저 들었어.",
  revealB: "솔직히? 과자 고르는 취향이 너무 이상했어 😄",
  growLabels: ["1일째", "3일째", "14일째", "또는 새 도시로", "그다음은…?"],
  growAlts: ["언덕 위 작은 오두막", "분홍 지붕 오두막", "2층을 올린 집", "뉴욕·파리·도쿄의 집", "물음표가 있는 비밀 실루엣"],
  littleEyebrow: "둘을 위해",
  littleTitle: "가까이 있는 작은 방법들",
  little: [
    { title: "탭 한 번에 포옹", body: "어디서든 포옹, 뽀뽀, “보고 싶어”를 보내요." },
    { title: "홈 화면에 상대 기분", body: "상대 캐릭터 옆에 지금 기분이 떠요. 위젯에서도요." },
    { title: "몰래 쪽지", body: "우리 집 어딘가에 쪽지를 숨기고, 찾게 해 보세요." },
    { title: "추억의 정원", body: "함께 간 곳에 도장을 찍으면 앞마당에 나무가 하나씩 자라요." },
  ],
  puppyEyebrow: "고양이파, 강아지파",
  puppyTitle: "작은 룸메이트 둘, 직접 골라요",
  puppyBody: "각자 고양이나 강아지를 골라요. 집 안을 돌아다니고, 러그 위에서 낮잠 자고, 둘 다 있을 땐 꼭 붙어 있어요.",
  puppyAlt: "낮에 작은 집에 있는 픽셀 강아지 두 마리",
  plusEyebrow: "Tiny Us Plus",
  plusTitle: "한 명만 결제해도 둘 다 Plus",
  plusBody: "Plus는 둘이 같이 써요. 한 명이 업그레이드하면 둘 다 켜져요. 구독을 두 번 할 필요도, 나눠 낼 필요도 없어요.",
  plusPerks: ["2층 올리기, 또는 뉴욕·파리·도쿄로 이사", "시즌 상자 전부 열기", "기분 33가지 전부 + 나만의 앱 아이콘", "다이어리와 쪽지, 전부 언제나 그대로"],
  plusFree: "Tiny Us는 매일 무료로 쓸 수 있어요. Plus는 원할 때만.",
  faqEyebrow: "FAQ",
  faqTitle: "알아 두면 좋아요",
  faq: [
    ["Tiny Us는 무료인가요?", "네. 질문에 답하고 집을 키우는 건 매일 무료예요. Plus는 선택이고, 하나로 둘 다 쓸 수 있어요."],
    ["둘 다 앱이 있어야 하나요?", "네, 각자 자기 폰에 하나씩요. 한 명이 집을 만들고 초대 코드를 보내면, 다른 한 명이 코드를 입력해서 연결해요."],
    ["iPhone이랑 Android끼리도 연결되나요?", "네. 둘 다 지원해서 어떤 폰이든 연결할 수 있어요."],
    ["장거리 연애인데 괜찮을까요?", "딱이에요. 일정도 시차도 안 맞을 때, 하루 한 질문이면 대화가 이어져요."],
    ["우리 답은 누가 볼 수 있나요?", "둘만 봐요. 내 답은 상대도 답할 때까지 숨겨져요."],
    ["상대가 아직 안 들어왔으면요?", "먼저 시작해도 돼요. 오늘의 질문에 답해 두면, 상대가 들어왔을 때 볼 수 있어요."],
    ["언제 나오나요?", "곧 iPhone과 Android에 나와요. 알림을 신청하거나 팔로우해 두면 나오는 날 알려드릴게요."],
  ],
  endTitle: "작은 집이 거의 다 준비됐어요",
  endBody: "이사 올 수 있는 날, 바로 알려드릴게요.",
  endBodyLive: "오늘 밤, 우리 집을 시작해요.",
  footerPrivacy: "개인정보처리방침",
  footerTerms: "이용약관",
  footerSupport: "고객지원",
  footerMadeBy: "Miuu Studio가 만들었어요",
  badgeAppStore: ["Download on the", "App Store"],
  badgeGooglePlay: ["GET IT ON", "Google Play"],
};

export const TINY_COPY: Partial<Record<TinyLocale, TinyCopy>> = { en, ko };
export const tinyCopy = (l: TinyLocale): TinyCopy => TINY_COPY[l] ?? en;

// ---------- support + invite pages ----------
// The Settings paths below (Partner link, Account → Delete account, Plus → Restore purchases) follow the design;
// confirm each with the dev before launch.
export const TINY_PAGES = {
  en: {
    supportTitle: "Support",
    supportBody: "Questions, a bug, or something feels off? Write to us and a real person will get back to you, usually within 2 business days.",
    supportEmailCta: "Email us",
    supportInclude: "It helps if you tell us your phone model, the app version (Settings → About) and what happened.",
    supportFaqTitle: "Quick answers",
    supportFaq: [
      ["How do we link up?", "One of you opens Settings → Partner link and shares the code (or the invite link). The other enters it in their app. Codes work for 7 days."],
      ["We both paid for Plus by mistake.", "One Plus covers both of you. The person who doesn’t need theirs can cancel it in the App Store or Google Play subscriptions; it stays on until the end of the period you paid for. For a refund, ask Apple or Google; they handle refunds for app purchases."],
      ["How do I restore Plus on a new phone?", "Sign in with the same account, then tap Settings → Plus → Restore purchases."],
      ["How do I unlink?", "Settings → Partner link → Unlink. You can re-link with a new code anytime."],
      ["How do I delete my account?", "Settings → Account → Delete account. This removes your account and your data. If you have a subscription, cancel it in the App Store or Google Play first; deleting the account doesn’t cancel it."],
    ] as QA[],
    inviteTitle: "Get Tiny Us to move in together",
    inviteBody: "Your person saved you a spot in their tiny home. Get the app, then enter this code to link up.",
    inviteCode: "Your invite code",
    inviteCopy: "Copy code",
    inviteCopied: "Copied",
    inviteValid: "Codes work for 7 days.",
    inviteNoCode: "Ask your person to share their invite code from Settings → Partner link.",
    invitePrelaunch: "Tiny Us isn’t out yet. Leave your email and we’ll tell you the day you can move in.",
    inviteSteps: ["Get Tiny Us", "Tap “I have an invite code”", "Enter the code"],
  },
  ko: {
    supportTitle: "고객지원",
    supportBody: "궁금한 점이나 버그, 뭔가 이상한 게 있으면 편하게 메일 주세요. 보통 영업일 기준 2일 안에 사람이 직접 답해 드려요.",
    supportEmailCta: "메일 보내기",
    supportInclude: "폰 기종, 앱 버전(설정 → 앱 정보), 어떤 일이 있었는지 같이 적어 주시면 빨리 도와드릴 수 있어요.",
    supportFaqTitle: "자주 묻는 질문",
    supportFaq: [
      ["어떻게 연결하나요?", "한 명이 설정 → 파트너 연결에서 코드(또는 초대 링크)를 공유하고, 다른 한 명이 앱에 입력하면 돼요. 코드는 7일 동안 쓸 수 있어요."],
      ["실수로 둘 다 Plus를 결제했어요.", "Plus 하나로 둘 다 쓸 수 있어요. 필요 없는 쪽은 App Store나 Google Play 구독에서 해지하면 되고, 결제한 기간이 끝날 때까지는 그대로 쓸 수 있어요. 환불은 Apple이나 Google에 요청해 주세요. 앱 결제 환불은 스토어에서 처리해요."],
      ["새 폰에서 Plus를 복원하려면요?", "같은 계정으로 로그인한 뒤 설정 → Plus → 구매 복원을 눌러 주세요."],
      ["연결을 끊으려면요?", "설정 → 파트너 연결 → 연결 끊기. 언제든 새 코드로 다시 연결할 수 있어요."],
      ["계정을 삭제하려면요?", "설정 → 계정 → 계정 삭제. 계정과 데이터가 삭제돼요. 구독 중이라면 먼저 App Store나 Google Play에서 해지해 주세요. 계정을 지워도 구독은 자동으로 해지되지 않아요."],
    ] as QA[],
    inviteTitle: "Tiny Us 받고 같이 이사 와요",
    inviteBody: "내 사람이 작은 집에 내 자리를 남겨 뒀어요. 앱을 받고 이 코드를 입력하면 연결돼요.",
    inviteCode: "초대 코드",
    inviteCopy: "코드 복사",
    inviteCopied: "복사했어요",
    inviteValid: "코드는 7일 동안 쓸 수 있어요.",
    inviteNoCode: "상대에게 설정 → 파트너 연결에서 초대 코드를 공유해 달라고 해 주세요.",
    invitePrelaunch: "Tiny Us는 아직 출시 전이에요. 이메일을 남겨 주시면 이사 올 수 있는 날 알려드릴게요.",
    inviteSteps: ["Tiny Us 받기", "“초대 코드가 있어요” 누르기", "코드 입력하기"],
  },
} satisfies Record<Locale, Record<string, unknown>>;
