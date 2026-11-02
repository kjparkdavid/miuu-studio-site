// Tiny Spa's support page, Privacy Policy and Terms of Use (miuustudio.com/tinyspa), English and Korean.
// Checked against what 1.0 ships (kjparkdavid/miuu-game: docs/release/privacy-answers.md, the cloud save spec #369
// and the Firebase swap #381, 2026-11-02). Not reviewed by a lawyer.
//
// Every page shows both languages: English first on /tinyspa/…, Korean first on /ko/tinyspa/…, each under its own
// anchor (#en, #ko), because the stores and the AdMob consent message link one URL for both.
// Change the policy whenever an SDK changes, together with privacy-answers.md and both store forms.
//
// Block syntax (as in tinyusLegal.ts): a string is a paragraph, a string[] a bullet list.

export type Lang = "en" | "ko";
export type Block = string | readonly string[];
export type LegalSection = { h: string; id?: string; blocks: readonly Block[] };
export type LegalDoc = { title: string; updated: string; intro: readonly Block[]; sections: readonly LegalSection[] };

export const TINYSPA = {
  base: "/tinyspa/",
  name: { en: "Tiny Spa", ko: "타이니 스파" },
  supportEmail: "support@miuustudio.com",
  // the same publisher as Tiny Us (lib/tinyus.ts TINYUS.legal)
  who: { en: "Miuu Studio, a sole proprietorship in Ontario, Canada", ko: "미우 스튜디오(캐나다 온타리오주 개인사업자)" },
  updated: { en: "November 2, 2026", ko: "2026년 11월 2일" },
} as const;

const email = TINYSPA.supportEmail;

// ---------------------------------------------------------------- Privacy Policy

const PRIVACY_EN: LegalDoc = {
  title: "Privacy Policy",
  updated: TINYSPA.updated.en,
  intro: [
    `This policy explains what Tiny Spa collects, why, who handles it for us, and the choices you have. Tiny Spa is made by ${TINYSPA.who.en} (“we”, “us”), which is responsible for your personal information. Questions or privacy requests: ${email}.`,
  ],
  sections: [
    {
      h: "The short version",
      blocks: [
        [
          "You never need to sign in to play. Your spa is saved on your phone.",
          "The game also keeps a backup of your spa in the cloud, under an anonymous account it makes for you (a random ID, no name or email). Sign in with Apple or Google in Settings and you can bring your spa back on a new phone.",
          "We see how the game is played and when it crashes, using Google Firebase. That data uses random IDs, never your name.",
          "Ads only play when you choose to watch one for a reward. On iPhone they’re personalized only if you allow tracking.",
          "We don’t sell your personal information for money. You can delete your cloud save and account in Settings at any time.",
        ],
      ],
    },
    {
      h: "What we collect",
      blocks: [
        "Your game:",
        [
          "Your save: your spa, progress, coins, items and settings, and the store’s transaction IDs for coin packs you bought (so a pack is never given twice). It’s kept on your phone, and a copy is kept in the cloud (see “Cloud save”).",
          "Purchases: which products you own, read from the App Store or Google Play when you buy or restore. We never see your card or payment details.",
          "Messages you send us, for example a support email, and the support code you include.",
        ],
        "Your account, for cloud save:",
        [
          "An anonymous account: the first time the game starts, it makes a random user ID for you. It has no name, email or password.",
          "If you sign in with Apple or Google: the email address Apple or Google gives us (Apple may give a private relay address instead of your real one), the ID Apple or Google uses for you, and your name and profile picture if that account shares them. We use these only to sign you in and to find your account if you ask us for help.",
          "With each cloud save: a few details about it (stars, coins, when it was saved, the game version, iPhone or Android) and a random ID the game makes for your phone when it’s installed (not an advertising ID), so two phones don’t overwrite each other’s spa.",
        ],
        "Collected automatically:",
        [
          "Game activity (Firebase Analytics): for example opening the game, tutorial steps, visits to the shop, purchases (product and price), reward videos offered and watched (and what Google estimates they earned), and cloud save steps such as signing in or loading a spa. Each event comes with a random app ID, device model, operating system, game version, language, and country or region (worked out from your IP address, which isn’t kept). Firebase Analytics doesn’t use your advertising ID unless you’ve allowed tracking on iPhone.",
          "Crash reports (Firebase Crashlytics): when the game crashes or hits an error, what went wrong and where, the last few game events before it, a random installation ID, device model, operating system, game version, and details such as free memory and storage.",
          "Advertising data (Google AdMob): when an ad is loaded or shown, your device’s advertising ID (on iPhone only if you allow tracking; the advertising ID on Android), your IP address and the rough location it suggests, how you interact with the ad, and device and app details.",
        ],
        "We don’t collect your precise location, contacts, photos, microphone or health information.",
      ],
    },
    {
      h: "Cloud save",
      id: "cloud",
      blocks: [
        "Your spa is saved on your phone, and the phone’s copy is always the one you play. To keep it safe, the game also copies it to Google Cloud Firestore when you leave the game and right after a purchase, over an encrypted connection.",
        [
          "We keep the latest copy and one copy for each of the last 7 days, so a spa that something went wrong with can be brought back. Each daily copy is deleted after 7 days.",
          "Sign in with Apple or Google in Settings and you can load your spa on another phone, or after reinstalling the game.",
          "Your save is never shared with other players and never used for ads.",
          "Settings shows a short support code made from your account ID. Include it when you email us, so we can find your save.",
        ],
      ],
    },
    {
      h: "How we use it",
      blocks: [
        [
          "To run Tiny Spa: save your spa, back it up, and bring it back when you ask.",
          "To deliver what you buy, restore it, and make sure a coin pack is never given twice.",
          "To show the optional reward videos, and to measure them.",
          "To understand how the game is played and what to improve, for example where new players get stuck or which offers are useful, and to find and fix crashes.",
          "To answer you when you contact us.",
          "To keep the game working, prevent abuse and follow the law.",
        ],
        "We don’t make decisions about you based only on automated processing that have legal or similarly significant effects.",
      ],
    },
    {
      h: "Who handles it",
      blocks: [
        "The companies that help us run Tiny Spa:",
        [
          "Google (Firebase Authentication and Cloud Firestore): your account, sign-in with Apple or Google, and your cloud save. Google stores them for us and doesn’t use them for its own purposes.",
          "Google (Firebase Analytics and Firebase Crashlytics): game activity and crash reports, processed for us.",
          "Google AdMob: the optional reward videos, Google’s consent message where the law requires one, and ad measurement. Google uses this data as described in its privacy policy (policies.google.com/privacy) and at policies.google.com/technologies/partner-sites.",
          "Apple and Google: sign-in, if you choose it, and payments through the App Store and Google Play. They handle your payment; we only learn which products you own.",
        ],
        "We may also share information if the law requires it, to protect people’s safety or our rights, or as part of a merger or sale of the business (we’ll tell you first if this policy would change).",
        "We don’t sell your personal information for money. But like most free games, Tiny Spa lets Google AdMob use your device’s advertising ID to show and measure ads. Some US state laws call this “selling” or “sharing” personal information for targeted advertising. You can turn it off anytime (see “Your choices about ads”).",
      ],
    },
    {
      h: "Your choices about ads",
      id: "choices",
      blocks: [
        "Ads in Tiny Spa only play when you tap to watch one for a reward. There are no banner ads and no ads between screens.",
        [
          "On iPhone, the first time you tap to watch an ad, the game explains why and then asks for permission to track (App Tracking Transparency). If you say no, ads are still shown but aren’t personalized. You can change this anytime in Settings → Privacy & Security → Tracking.",
          "On Android, you can delete your advertising ID in your phone’s settings (Settings → Privacy → Ads, or Settings → Google → Ads). Without it, ads aren’t personalized.",
          "In the EEA, the UK and Switzerland, Google’s consent message is shown the first time you tap to watch an ad. You can change your answer anytime in Tiny Spa: Settings → Ad privacy choices.",
          "In the US, these settings are how you opt out of the “sale” or “sharing” of your information for targeted ads.",
        ],
      ],
    },
    {
      h: "How long we keep it",
      blocks: [
        [
          "Your save on your phone: until you delete the game. It may also be in your phone’s own backup (iCloud or Google), which you control.",
          "Your account and cloud save: until you delete them in Settings or ask us to. Daily copies: 7 days.",
          "Game activity (Firebase Analytics): 14 months.",
          "Crash reports (Firebase Crashlytics): 90 days.",
          "Support emails: as long as we need them to help you, and no longer than 3 years.",
          "Advertising data: Google keeps it as described in its privacy policy.",
        ],
      ],
    },
    {
      h: "Deleting your data",
      id: "delete",
      blocks: [
        "In the game: Settings → Cloud save → delete your cloud save. This deletes your cloud save, its daily copies and your account right away, and on iPhone it also ends Tiny Spa’s access to your Sign in with Apple account. The spa on your phone stays, and you can keep playing; the game stops backing it up until you sign in again.",
        `No longer have the game? Email ${email} with the subject “Delete my Tiny Spa data”, and the email address of the Apple or Google account you signed in with, or your support code. We’ll delete your account and cloud save within 30 days and tell you when it’s done.`,
        "Game activity and crash reports are tied to random IDs, not to your account, so we can’t look them up by your email; they’re deleted on the schedule above. Deleting the game from your phone deletes the save on it, and the game gets new random IDs if you install it again.",
        "Deleting your data doesn’t cancel or refund purchases. One-time purchases stay with your App Store or Google Play account and can be restored again.",
      ],
    },
    {
      h: "Your rights",
      blocks: [
        `Depending on where you live, you may have the right to access, correct, download or delete your personal information, to object to or limit some uses, and to withdraw consent. Email ${email} and we’ll help. We’ll answer within one month, or sooner where your local law requires (for example, 10 days in Korea and 15 days in Brazil), and we may extend this where the law allows. We may need to confirm it’s you first. We won’t treat you differently for using these rights.`,
        "EEA, UK and Switzerland. Here’s the legal basis for each way we use your information:",
        [
          "Saving and backing up your spa, your account, purchases and the optional reward videos: to provide the game you asked for (contract).",
          "Crash reports, keeping the game safe, answering your messages, and non-personalized ads: our legitimate interests, which we’ve weighed against yours. You can object anytime by emailing us.",
          "Game analytics and personalized ads: your consent, given in Google’s consent message. You can withdraw it anytime in Settings → Ad privacy choices. Withdrawing doesn’t affect what happened before.",
        ],
        "You can also ask for a copy of your information in a portable format, and you can complain to your local data protection authority.",
        "United States. Depending on your state, you can ask what personal information we collect, use and disclose; get a copy; correct or delete it; and opt out of “sale”, “sharing” and targeted advertising (see “Your choices about ads”). You can use an authorized agent. If we turn down your request, you can appeal by replying to our answer with “Appeal”, and if you’re still not happy you can contact your state attorney general.",
        "Canada. We handle personal information under Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA) and, for people in Quebec, Quebec’s private-sector privacy law. If you’re not happy with our answer, you can complain to the Office of the Privacy Commissioner of Canada (priv.gc.ca) or, in Quebec, the Commission d’accès à l’information (cai.gouv.qc.ca).",
        "Korea. The Korean version of this policy (한국어) sets out what Korea’s Personal Information Protection Act asks for, and applies if you live in Korea.",
        "Japan. Your information is stored in the United States. Our providers are bound by contract to protect it to the standard of Japanese law, and we’ll give you details on request.",
        "Brazil. Our data protection contact (encarregado) is our Privacy Officer (see below).",
      ],
    },
    {
      h: "Children",
      blocks: [
        "Tiny Spa isn’t directed at children under 13 (under 14 in Korea), and we don’t knowingly collect personal information from them. If you think a child has signed in or sent us personal information, email us and we’ll delete it.",
      ],
    },
    {
      h: "Security and where data is stored",
      blocks: [
        "Your account, cloud save, game activity and crash reports are stored by Google in the United States. They’re encrypted in transit, and Google encrypts them at rest. Only the people at Miuu Studio who need it can see them. No system is perfectly secure, so please keep your Apple or Google account safe.",
        "We’re based in Canada. If you live in Canada, this means your information is stored and used outside your province and outside Canada, and it may be accessed there by courts, law enforcement and national security authorities under US law. Where the law requires, we use safeguards such as standard contractual clauses for transfers.",
      ],
    },
    {
      h: "Changes",
      blocks: ["If we change this policy, we’ll update the date at the top. If the change is significant, we’ll also tell you in the game."],
    },
    {
      h: "Privacy Officer",
      blocks: [
        `The owner of Miuu Studio is responsible for protecting personal information at Tiny Spa (in Quebec: the person in charge of the protection of personal information; in Brazil: the encarregado). Contact: ${email}.`,
      ],
    },
    {
      h: "Contact",
      blocks: [`${TINYSPA.who.en}. Email ${email}. We’re happy to help. Our mailing address is available on request.`],
    },
  ],
};

const PRIVACY_KO: LegalDoc = {
  title: "개인정보처리방침",
  updated: TINYSPA.updated.ko,
  intro: [
    `${TINYSPA.who.ko}(이하 “회사”)는 타이니 스파(이하 “게임”) 이용자의 개인정보를 「개인정보 보호법」 등 관련 법령에 따라 처리합니다. 이 방침은 회사가 어떤 개인정보를 왜 처리하는지, 누구에게 처리를 맡기는지, 이용자가 무엇을 선택할 수 있는지 알려 드립니다. 문의: ${email}`,
  ],
  sections: [
    {
      h: "한눈에 보기",
      blocks: [
        [
          "게임은 로그인 없이 할 수 있습니다. 스파는 휴대폰에 저장됩니다.",
          "게임은 스파를 클라우드에도 백업합니다. 이때 게임이 자동으로 만드는 익명 계정(무작위 ID, 이름·이메일 없음)을 씁니다. 설정에서 Apple 또는 Google로 로그인하면 새 휴대폰에서도 스파를 불러올 수 있습니다.",
          "게임 이용 현황과 오류는 Google Firebase로 확인합니다. 이 정보에는 이름이 아닌 무작위 ID만 쓰입니다.",
          "광고는 이용자가 보상을 받으려고 직접 선택할 때만 나옵니다. iPhone에서는 추적을 허용한 경우에만 맞춤형 광고가 나옵니다.",
          "회사는 개인정보를 판매하지 않습니다. 클라우드 저장과 계정은 언제든지 설정에서 삭제할 수 있습니다.",
        ],
      ],
    },
    {
      h: "1. 처리하는 개인정보 항목과 수집 방법",
      blocks: [
        "게임 이용 정보 (게임이 직접 생성):",
        [
          "저장 데이터: 스파 진행 상황, 코인·아이템, 설정, 구매한 코인 팩의 스토어 거래 ID(같은 상품이 두 번 지급되지 않도록). 휴대폰에 저장되고, 사본이 클라우드에 저장됩니다.",
          "구매 정보: 이용자가 보유한 상품. 구매하거나 복원할 때 App Store 또는 Google Play에서 받아 옵니다. 카드 번호 등 결제 정보는 받지 않습니다.",
          "문의 정보: 이용자가 보낸 이메일 주소, 문의 내용, 지원 코드.",
        ],
        "클라우드 저장을 위한 계정:",
        [
          "익명 계정: 게임을 처음 실행할 때 자동으로 만드는 무작위 사용자 ID. 이름·이메일·비밀번호는 없습니다.",
          "Apple 또는 Google로 로그인한 경우(선택): Apple 또는 Google이 제공하는 이메일 주소(Apple은 실제 주소 대신 비공개 전달 주소를 줄 수 있습니다), Apple·Google의 사용자 식별자, 해당 계정이 제공하는 경우 이름과 프로필 사진. 로그인과 이용자 문의 시 계정 확인에만 씁니다.",
          "클라우드 저장 시: 저장 요약(별, 코인, 저장 시각, 게임 버전, iPhone/Android 구분)과 설치할 때 만드는 무작위 기기 ID(광고 식별자가 아닙니다). 두 휴대폰이 서로의 스파를 덮어쓰지 않게 하는 데 씁니다.",
        ],
        "자동으로 수집되는 정보:",
        [
          "게임 이용 기록(Firebase 애널리틱스): 게임 실행, 튜토리얼 진행, 상점 방문, 구매(상품과 가격), 보상형 광고 제안·시청 여부와 Google이 추정한 광고 수익, 로그인·불러오기 같은 클라우드 저장 단계 등. 각 기록에는 무작위 앱 ID, 기기 모델, 운영체제, 게임 버전, 언어, IP 주소로 추정한 국가·지역이 함께 수집됩니다(IP 주소 자체는 보관하지 않습니다). Firebase 애널리틱스는 iPhone에서 추적을 허용한 경우가 아니면 광고 식별자를 쓰지 않습니다.",
          "오류 기록(Firebase Crashlytics): 게임이 멈추거나 오류가 났을 때 무엇이 어디서 잘못됐는지, 직전의 게임 기록 몇 건, 무작위 설치 ID, 기기 모델, 운영체제, 게임 버전, 남은 메모리·저장 공간 등.",
          "광고 정보(Google AdMob): 광고를 불러오거나 보여줄 때 광고 식별자(iPhone은 추적을 허용한 경우에만, Android는 광고 ID), IP 주소와 그로 추정한 대략적 위치, 광고 이용 기록, 기기·앱 정보.",
        ],
        "정확한 위치, 연락처, 사진, 마이크, 건강 정보, 주민등록번호는 수집하지 않습니다.",
      ],
    },
    {
      h: "2. 처리 목적",
      blocks: [
        [
          "게임 제공: 스파 저장·백업, 이용자가 요청할 때 스파 복원",
          "구매한 상품 지급·복원, 같은 코인 팩의 중복 지급 방지",
          "선택형 보상 광고 제공과 광고 측정",
          "게임 이용 분석과 개선(새 이용자가 어디서 막히는지, 어떤 상품이 도움이 되는지 등), 오류 확인과 수정",
          "문의 응대",
          "서비스 안정성 유지, 부정 이용 방지, 법령 준수",
        ],
        "회사는 이용자에게 법적 효력이나 그에 준하는 중대한 영향을 미치는 결정을 자동화된 처리만으로 하지 않습니다.",
      ],
    },
    {
      h: "3. 보유 및 이용 기간",
      blocks: [
        [
          "휴대폰의 저장 데이터: 게임을 삭제할 때까지. 이용자가 관리하는 휴대폰 백업(iCloud, Google)에 포함될 수 있습니다.",
          "계정과 클라우드 저장: 이용자가 설정에서 삭제하거나 삭제를 요청할 때까지. 일별 사본은 7일.",
          "게임 이용 기록(Firebase 애널리틱스): 14개월",
          "오류 기록(Firebase Crashlytics): 90일",
          "문의 이메일: 응대에 필요한 기간, 최대 3년",
          "광고 정보: Google 개인정보처리방침에 따름",
        ],
        "다른 법령에서 보관을 요구하는 경우에는 그 기간 동안 보관합니다.",
      ],
    },
    {
      h: "4. 파기 절차 및 방법",
      blocks: [
        "보유 기간이 끝나거나 처리 목적을 달성한 개인정보는 지체 없이 파기합니다. 전자적 파일은 복구할 수 없는 방법으로 삭제하며, 종이 문서는 만들지 않습니다.",
      ],
    },
    {
      h: "5. 개인정보의 제3자 제공",
      blocks: [
        "회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 법령에 따라 요구되는 경우에는 예외로 합니다. 보상형 광고를 위해 Google이 게임 안에서 직접 수집하는 정보는 아래 ‘8. 자동 수집 장치와 행태정보’에서 안내합니다.",
      ],
    },
    {
      h: "6. 개인정보 처리 위탁",
      blocks: [
        "회사는 게임 운영을 위해 다음과 같이 개인정보 처리를 위탁합니다. 수탁자가 개인정보를 안전하게 처리하도록 계약으로 정하고 관리합니다.",
        [
          "Google LLC — Firebase Authentication(계정, Apple·Google 로그인), Cloud Firestore(클라우드 저장), Firebase 애널리틱스(게임 이용 분석), Firebase Crashlytics(오류 분석)",
        ],
      ],
    },
    {
      h: "7. 개인정보의 국외 이전",
      blocks: [
        "게임 제공(계약의 이행)을 위해 다음과 같이 개인정보를 국외로 이전합니다.",
        [
          "이전받는 자: Google LLC (개인정보 문의: support.google.com/policies/contact/general_privacy_form)",
          "이전 국가: 미국",
          "이전 일시와 방법: 게임을 이용할 때 수시로, 암호화된 네트워크를 통해 전송",
          "이전 항목: 익명 계정 ID, 로그인한 경우 이메일 주소·Apple/Google 사용자 식별자·이름·프로필 사진, 저장 데이터와 저장 요약, 기기 ID, 게임 이용 기록, 오류 기록, 광고 식별자, 기기·앱 정보, IP 주소",
          "이전 목적: 계정과 클라우드 저장 보관, 게임 이용 분석, 오류 분석, 보상형 광고 제공과 측정",
          "보유 기간: ‘3. 보유 및 이용 기간’과 같음",
        ],
        "국외 이전을 거부하려면 게임 이용을 중단하거나, 설정에서 클라우드 저장을 삭제하면 됩니다. 클라우드 저장을 삭제해도 휴대폰에서는 계속 게임할 수 있지만, 스파를 새 휴대폰으로 옮길 수 없습니다. 맞춤형 광고는 ‘8. 자동 수집 장치와 행태정보’의 방법으로 끌 수 있습니다. 게임 이용 기록과 오류 기록은 게임 운영에 필요해, 이 이전을 거부하면 게임을 이용할 수 없습니다.",
      ],
    },
    {
      h: "8. 자동 수집 장치와 행태정보",
      id: "choices",
      blocks: [
        "게임은 웹 쿠키를 쓰지 않습니다. 대신 위에서 설명한 앱 안의 무작위 ID와 기기의 광고 식별자를 씁니다.",
        "광고는 이용자가 보상을 받으려고 직접 누를 때만 나옵니다. 배너 광고나 화면 사이 광고는 없습니다. 보상형 광고를 위해 Google LLC(AdMob)가 게임 안에서 광고 식별자, 광고 이용 기록 등 행태정보를 직접 수집하고, Google 개인정보처리방침(policies.google.com/privacy)에 따라 맞춤형 광고와 광고 측정에 이용합니다.",
        "맞춤형 광고를 거부하는 방법:",
        [
          "iPhone: 처음 광고를 보려고 누르면 게임이 이유를 설명한 뒤 추적 허용 여부를 묻습니다(앱 추적 투명성). 허용하지 않으면 광고는 나오지만 맞춤형이 아닙니다. 언제든지 설정 → 개인정보 보호 및 보안 → 추적에서 바꿀 수 있습니다.",
          "Android: 휴대폰 설정 → 개인정보 보호 → 광고(또는 설정 → Google → 광고)에서 광고 ID를 삭제할 수 있습니다. 광고 ID가 없으면 맞춤형 광고가 나오지 않습니다.",
          "유럽경제지역·영국·스위스에서는 처음 광고를 보려고 누를 때 Google의 동의 안내가 나옵니다. 답은 언제든지 게임의 설정 → 광고 개인정보 설정에서 바꿀 수 있습니다.",
        ],
      ],
    },
    {
      h: "9. 이용자의 권리와 행사 방법",
      blocks: [
        `이용자(만 14세 미만은 법정대리인)는 언제든지 개인정보의 열람, 정정, 삭제, 처리 정지를 요구하거나 동의를 철회할 수 있습니다. ${email}로 요청하시면 본인임을 확인한 뒤 10일 안에 답변하고 조치합니다. 대리인을 통해 요청할 수도 있습니다.`,
      ],
    },
    {
      h: "10. 계정과 클라우드 저장 삭제",
      id: "delete",
      blocks: [
        "게임 안에서: 설정 → 클라우드 저장에서 클라우드 저장을 삭제하면 클라우드 저장, 일별 사본, 계정이 바로 삭제됩니다. iPhone에서는 Apple로 로그인 연결도 해제됩니다. 휴대폰의 스파는 그대로 남아 계속 게임할 수 있고, 다시 로그인할 때까지 백업은 멈춥니다.",
        `게임이 없다면: ${email}로 제목을 “타이니 스파 데이터 삭제”로 하고, 로그인에 쓴 Apple 또는 Google 계정의 이메일 주소나 지원 코드를 함께 보내 주세요. 10일 안에 계정과 클라우드 저장을 삭제하고 알려 드립니다.`,
        "게임 이용 기록과 오류 기록은 계정이 아닌 무작위 ID에 연결되어 있어 이메일로 찾을 수 없으며, 보유 기간이 지나면 삭제됩니다. 게임을 삭제하면 휴대폰의 저장 데이터가 삭제되고, 다시 설치하면 새 무작위 ID가 만들어집니다.",
        "데이터를 삭제해도 구매가 취소되거나 환불되지는 않습니다. 한 번만 사는 상품은 App Store 또는 Google Play 계정에 남아 다시 복원할 수 있습니다.",
      ],
    },
    {
      h: "11. 안전성 확보 조치",
      blocks: [
        [
          "전송 구간 암호화, 저장 시 암호화(Google 기본 제공)",
          "개인정보에 접근할 수 있는 사람을 필요한 인원으로 제한",
          "수탁자(Google)의 보안 통제 활용",
        ],
      ],
    },
    {
      h: "12. 만 14세 미만 아동",
      blocks: [
        "게임은 만 14세 미만 아동을 대상으로 하지 않으며, 회사는 만 14세 미만 아동의 개인정보를 알면서 수집하지 않습니다. 아동이 로그인했거나 개인정보를 보냈다고 생각되면 알려 주세요. 바로 삭제합니다.",
      ],
    },
    {
      h: "13. 개인정보 보호책임자",
      blocks: [`개인정보 보호책임자: 미우 스튜디오 대표 · ${email}`],
    },
    {
      h: "14. 권익 침해 구제 방법",
      blocks: [
        "개인정보 침해에 대한 상담이나 피해 구제가 필요하면 다음 기관에 문의할 수 있습니다.",
        [
          "개인정보분쟁조정위원회: kopico.go.kr, 1833-6972",
          "개인정보침해신고센터(한국인터넷진흥원): privacy.kisa.or.kr, 국번 없이 118",
          "대검찰청: spo.go.kr, 국번 없이 1301",
          "경찰청: ecrm.police.go.kr, 국번 없이 182",
        ],
      ],
    },
    {
      h: "15. 방침의 변경",
      blocks: [
        `이 방침은 ${TINYSPA.updated.ko}부터 적용됩니다. 내용이 바뀌면 위의 날짜를 고치고, 중요한 변경은 게임 안에서도 알려 드립니다.`,
      ],
    },
  ],
};

// ---------------------------------------------------------------- Terms of Use

const TERMS_EN: LegalDoc = {
  title: "Terms of Use",
  updated: TINYSPA.updated.en,
  intro: [
    `These terms are an agreement between you and ${TINYSPA.who.en} (“we”, “us”) for playing Tiny Spa (the game and this website). By playing, you agree to them and to our Privacy Policy. If you don’t agree, please don’t play.`,
  ],
  sections: [
    {
      h: "Who can play",
      blocks: [
        "Anyone can play Tiny Spa. If you’re under the age of majority where you live, please ask a parent or guardian before you buy anything or sign in with an account; they agree to these terms for you.",
      ],
    },
    {
      h: "Your spa and cloud save",
      blocks: [
        "Your spa is saved on your phone. The game also keeps a copy in the cloud, and if you sign in with Apple or Google in Settings you can load it on another phone. Keep access to that Apple or Google account: it’s the key to your cloud save.",
        `We work hard to keep your spa safe, but we can’t promise a save will never be lost or damaged, for example if your phone is lost before the game could back it up, or after you delete your cloud save. If something goes wrong, email ${email}: we keep daily copies for 7 days and will help where we can.`,
      ],
    },
    {
      h: "Purchases",
      blocks: [
        "Tiny Spa is free to play. In the Shop you can buy optional items with real money: one-time purchases (for example packs, decorations, a new guest, or Ad-free rewards) and items that are used up (for example coin packs and snack boxes). Prices are shown in the game before you buy, and the App Store or Google Play handles the payment.",
        [
          "One-time purchases belong to the App Store or Google Play account that bought them. If they’re missing, for example after reinstalling, tap Settings → Restore purchases while signed in to that store account.",
          "Coins and items that are used up can’t be restored by the store. They’re kept in your save, so keep your spa backed up with cloud save.",
          `Refunds: App Store purchases are refunded by Apple (reportaproblem.apple.com) and Google Play purchases by Google, under their own policies. If something you bought didn’t arrive or doesn’t work, email ${email} and we’ll fix it.`,
          "In Korea, you can withdraw from a purchase within 7 days of buying it if you haven’t used it, as Korea’s consumer law provides. Coins you’ve spent and items you’ve used can’t be withdrawn. Ask Apple or Google, or email us.",
        ],
      ],
    },
    {
      h: "Coins and items",
      blocks: [
        "Coins, items, decorations, outfits and guests in Tiny Spa, earned or bought, are a license to use them in the game. They have no cash value, can’t be exchanged for money, and can’t be sold or transferred outside the game. Purchased coins are used up when spent and are non-refundable except where the law says otherwise.",
      ],
    },
    {
      h: "Ads",
      blocks: [
        "Tiny Spa has no banner ads. You can choose to watch short videos for rewards, up to a daily limit. Ad-free rewards, a one-time purchase, gives you the same rewards without the videos, with the same daily limits.",
      ],
    },
    {
      h: "Play fair",
      blocks: [
        "Tiny Spa is for your own personal, non-commercial use. Don’t copy, modify, reverse engineer or resell it, and don’t try to get around its limits, purchases or security. If you edit your save, we can’t promise to fix what breaks.",
      ],
    },
    {
      h: "Our stuff",
      blocks: ["Tiny Spa, its art, characters, music and design belong to us or our licensors."],
    },
    {
      h: "Changes and ending",
      blocks: [
        "We keep improving Tiny Spa, so features, items and prices may change. We may change these terms; if a change is significant, we’ll tell you in the game. You can stop playing anytime and delete your cloud save in Settings. We may suspend or end access if you break these terms or to protect others. If we ever stop offering Tiny Spa or cloud save, we’ll tell you in the game beforehand.",
      ],
    },
    {
      h: "Disclaimers and liability",
      blocks: [
        "We work hard to keep Tiny Spa running well, but we can’t promise it will always be available or free of errors.",
        "To the extent the law where you live allows: Tiny Spa is provided “as is” and “as available”; we don’t give warranties beyond those in these terms; we aren’t liable for indirect, incidental or consequential losses, or for lost data or profits; and our total liability to you for all claims is limited to the greater of what you paid for Tiny Spa in the 12 months before the claim and CA$100.",
        "None of this limits liability that the law doesn’t allow us to limit, such as for fraud, gross negligence, wilful misconduct, or death or personal injury caused by our negligence. It also doesn’t take away rights you have as a consumer that your local law gives you and that can’t be excluded.",
      ],
    },
    {
      h: "If something goes wrong",
      blocks: [
        `Please email us first at ${email}. Most things can be sorted out quickly. If you’re in the US, you can also bring a claim in your local small claims court.`,
      ],
    },
    {
      h: "Governing law",
      blocks: [
        "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there, without regard to conflict-of-law rules. Any dispute will be handled by the courts of Ontario, unless the law where you live gives you the right to bring it in your local courts. Nothing here takes away rights you have under the consumer protection laws of where you live.",
        "These terms are in English and Korean. If the two differ, the English version applies, except where your local law says otherwise.",
      ],
    },
    {
      h: "Apple App Store",
      blocks: [
        "If you got Tiny Spa from Apple’s App Store, these extra terms apply:",
        [
          "These terms are between you and us, not Apple. We alone are responsible for Tiny Spa and its content. Your use of Tiny Spa must also follow the App Store’s Usage Rules in the Apple Media Services Terms and Conditions.",
          "Apple has no obligation to provide maintenance or support for Tiny Spa.",
          "If Tiny Spa fails to meet any warranty that applies, you can tell Apple, and Apple will refund the purchase price (if any). Apple has no other warranty obligation.",
          "We, not Apple, are responsible for any claims by you or anyone else about Tiny Spa or your use of it, including product liability claims, claims that it doesn’t meet a legal or regulatory requirement, and claims under consumer protection, privacy or similar laws.",
          "If anyone claims that Tiny Spa or your use of it infringes their intellectual property, we, not Apple, will investigate, defend, settle and discharge that claim.",
          "You confirm that you aren’t in a country under a US government embargo or designated as “terrorist supporting”, and that you aren’t on any US government list of prohibited or restricted parties.",
          "When you use Tiny Spa, you must also follow any third-party terms that apply, such as your mobile carrier’s.",
          "Apple and its subsidiaries are third-party beneficiaries of these terms. Once you accept them, Apple may enforce them against you.",
        ],
      ],
    },
    {
      h: "Contact",
      blocks: [`Questions about these terms: ${email}. ${TINYSPA.who.en}.`],
    },
  ],
};

const TERMS_KO: LegalDoc = {
  title: "이용약관",
  updated: TINYSPA.updated.ko,
  intro: [
    `이 약관은 이용자와 ${TINYSPA.who.ko}(이하 “회사”) 사이에 타이니 스파(게임과 이 웹사이트, 이하 “게임”) 이용에 관해 정한 것입니다. 게임을 이용하면 이 약관과 개인정보처리방침에 동의한 것으로 봅니다. 동의하지 않으면 게임을 이용하지 말아 주세요.`,
  ],
  sections: [
    {
      h: "이용 대상",
      blocks: [
        "누구나 게임을 할 수 있습니다. 거주 국가의 성년 나이가 되지 않았다면, 상품을 구매하거나 계정으로 로그인하기 전에 부모님 등 법정대리인의 동의를 받아 주세요. 법정대리인이 이용자를 대신해 이 약관에 동의하는 것으로 봅니다.",
      ],
    },
    {
      h: "스파와 클라우드 저장",
      blocks: [
        "스파는 휴대폰에 저장됩니다. 게임은 사본을 클라우드에도 보관하며, 설정에서 Apple 또는 Google로 로그인하면 다른 휴대폰에서도 불러올 수 있습니다. 로그인한 Apple 또는 Google 계정을 잘 지켜 주세요. 클라우드 저장을 여는 열쇠입니다.",
        `회사는 스파를 안전하게 지키려고 노력하지만, 저장 데이터가 절대 사라지거나 손상되지 않는다고 보장할 수는 없습니다. 예를 들어 게임이 백업하기 전에 휴대폰을 잃어버렸거나, 클라우드 저장을 삭제한 뒤라면 복구할 수 없습니다. 문제가 생기면 ${email}로 알려 주세요. 일별 사본을 7일 동안 보관하며, 할 수 있는 만큼 돕겠습니다.`,
      ],
    },
    {
      h: "유료 구매",
      blocks: [
        "게임은 무료입니다. 상점에서 원하는 상품을 실제 돈으로 살 수 있습니다. 한 번만 사는 상품(팩, 꾸미기 아이템, 새 손님, 광고 없는 보상 등)과 쓰면 없어지는 상품(코인 팩, 간식 상자 등)이 있습니다. 가격은 구매 전에 게임에 표시되며, 결제는 App Store 또는 Google Play가 처리합니다.",
        [
          "한 번만 사는 상품은 구매한 App Store 또는 Google Play 계정에 속합니다. 다시 설치한 뒤 등으로 상품이 보이지 않으면, 그 스토어 계정으로 로그인한 상태에서 설정 → 구매 복원을 눌러 주세요.",
          "코인처럼 쓰면 없어지는 상품은 스토어에서 복원되지 않습니다. 저장 데이터에 들어 있으니, 클라우드 저장으로 스파를 백업해 두세요.",
          `환불: App Store 구매는 Apple(reportaproblem.apple.com)이, Google Play 구매는 Google이 각자의 정책에 따라 처리합니다. 구매한 상품이 들어오지 않았거나 작동하지 않으면 ${email}로 알려 주세요. 해결해 드립니다.`,
          "청약철회: 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라, 사용하지 않은 상품은 구매일로부터 7일 안에 청약을 철회할 수 있습니다. 이미 쓴 코인이나 사용한 아이템은 철회할 수 없습니다. Apple이나 Google, 또는 회사 이메일로 요청해 주세요.",
        ],
      ],
    },
    {
      h: "코인과 아이템",
      blocks: [
        "게임 안의 코인, 아이템, 꾸미기 아이템, 의상, 손님은 획득했든 구매했든 게임 안에서 쓸 수 있는 이용권입니다. 현금 가치가 없고, 돈으로 바꾸거나 게임 밖에서 팔거나 넘길 수 없습니다. 구매한 코인은 쓰면 소진되며, 법령이 따로 정한 경우를 빼고는 환불되지 않습니다.",
      ],
    },
    {
      h: "광고",
      blocks: [
        "게임에는 배너 광고가 없습니다. 원할 때 짧은 영상을 보고 보상을 받을 수 있으며, 하루 횟수에 제한이 있습니다. 한 번만 사는 상품인 ‘광고 없는 보상’을 사면 영상 없이 같은 보상을 받으며, 하루 제한도 같습니다.",
      ],
    },
    {
      h: "공정한 이용",
      blocks: [
        "게임은 개인적·비상업적 용도로만 이용할 수 있습니다. 게임을 복제, 변경, 역설계, 재판매하거나 제한·결제·보안을 우회하려 해서는 안 됩니다. 저장 데이터를 직접 고쳐서 생긴 문제는 회사가 해결해 드리지 못할 수 있습니다.",
      ],
    },
    {
      h: "회사의 권리",
      blocks: ["게임과 게임의 그림, 캐릭터, 음악, 디자인에 대한 권리는 회사 또는 회사에 이용을 허락한 권리자에게 있습니다."],
    },
    {
      h: "변경과 종료",
      blocks: [
        "회사는 게임을 계속 개선하므로 기능, 아이템, 가격이 바뀔 수 있습니다. 회사는 이 약관을 바꿀 수 있으며, 중요한 변경은 게임 안에서 알려 드립니다. 이용자는 언제든지 게임 이용을 그만두고 설정에서 클라우드 저장을 삭제할 수 있습니다. 이용자가 이 약관을 어기거나 다른 사람을 보호해야 할 때 회사는 이용을 제한하거나 중단할 수 있습니다. 게임이나 클라우드 저장 제공을 끝내게 되면 게임 안에서 미리 알려 드립니다.",
      ],
    },
    {
      h: "책임의 제한",
      blocks: [
        "회사는 게임이 잘 운영되도록 노력하지만, 항상 이용할 수 있거나 오류가 없다고 보장하지는 않습니다.",
        "거주 국가의 법이 허용하는 범위에서: 게임은 “있는 그대로” 제공되며, 회사는 이 약관에 적힌 것 외의 보증을 하지 않습니다. 회사는 간접적·부수적·결과적 손해, 데이터나 이익의 손실에 대해 책임지지 않으며, 모든 청구에 대한 회사의 책임은 청구 전 12개월 동안 이용자가 게임에 낸 금액과 100캐나다달러 중 큰 금액으로 제한됩니다.",
        "다만 사기, 고의 또는 중대한 과실, 회사의 과실로 인한 사망·신체 상해처럼 법이 책임 제한을 허용하지 않는 경우에는 그렇지 않습니다. 또한 이용자가 거주 국가의 소비자 보호 법령에 따라 가지는 권리는 이 약관으로 줄어들지 않습니다.",
      ],
    },
    {
      h: "분쟁 해결",
      blocks: [
        `문제가 생기면 먼저 ${email}로 알려 주세요. 대부분은 빠르게 해결할 수 있습니다.`,
        "이 약관은 캐나다 온타리오주 법률과 그곳에 적용되는 캐나다 연방 법률을 따르며, 분쟁은 온타리오주 법원이 관할합니다. 다만 거주 국가의 법이 이용자에게 그 나라 법원에서 다툴 권리를 주는 경우에는 그에 따릅니다. 대한민국에 거주하는 이용자에게는 대한민국 소비자 보호 법령이 정한 권리가 그대로 적용됩니다.",
        "이 약관은 영어와 한국어로 제공됩니다. 두 내용이 다르면 영어판이 우선하며, 거주 국가의 법이 달리 정한 경우에는 그에 따릅니다.",
      ],
    },
    {
      h: "Apple App Store",
      blocks: [
        "Apple App Store에서 게임을 받은 경우 다음이 추가로 적용됩니다.",
        [
          "이 약관은 Apple이 아닌 이용자와 회사 사이의 약관이며, 게임과 그 내용에 대한 책임은 회사에 있습니다. 게임 이용은 Apple 미디어 서비스 이용 약관의 App Store 이용 규칙도 따라야 합니다.",
          "Apple은 게임의 유지보수나 지원을 제공할 의무가 없습니다.",
          "게임이 적용되는 보증을 지키지 못하면 Apple에 알릴 수 있으며, Apple은 구매 가격(있는 경우)을 환불합니다. Apple에는 그 밖의 보증 의무가 없습니다.",
          "게임이나 그 이용에 관한 이용자 또는 다른 사람의 청구(제조물 책임, 법령·규제 요건 미충족, 소비자 보호·개인정보 보호 등 관련 법령에 따른 청구 포함)에 대한 책임은 Apple이 아닌 회사에 있습니다.",
          "게임이나 그 이용이 다른 사람의 지식재산권을 침해한다는 청구가 있으면, Apple이 아닌 회사가 조사, 방어, 합의, 해결을 맡습니다.",
          "이용자는 미국 정부의 금수 조치 대상국이나 “테러 지원국”으로 지정된 국가에 있지 않으며, 미국 정부의 거래 금지·제한 대상 명단에 올라 있지 않음을 확인합니다.",
          "게임을 이용할 때 이동통신사 약관 등 적용되는 제3자 약관도 지켜야 합니다.",
          "Apple과 그 자회사는 이 약관의 제3자 수익자이며, 이용자가 약관에 동의하면 Apple은 이용자에게 이 약관을 집행할 수 있습니다.",
        ],
      ],
    },
    {
      h: "문의",
      blocks: [`약관 문의: ${email} · ${TINYSPA.who.ko}`],
    },
  ],
};

export const PRIVACY: Record<Lang, LegalDoc> = { en: PRIVACY_EN, ko: PRIVACY_KO };
export const TERMS: Record<Lang, LegalDoc> = { en: TERMS_EN, ko: TERMS_KO };

// ---------------------------------------------------------------- Support page (/tinyspa/)

export type SupportCopy = {
  title: string;
  body: string;
  emailCta: string;
  emailSubject: string;
  include: string;
  faqTitle: string;
  faq: readonly (readonly [string, string])[];
  deleteTitle: string;
  delete: readonly Block[];
  privacy: string;
  terms: string;
};

export const SUPPORT: Record<Lang, SupportCopy> = {
  en: {
    title: "Tiny Spa support",
    body: "Tiny Spa: Cozy Cat Bathhouse. Run a tiny bathhouse with cats, pamper animal guests and grow your cozy spa. Something not working, or have an idea? Email us. We read every message.",
    emailCta: "Email support",
    emailSubject: "Tiny Spa support",
    include: "Please tell us your phone model, the game version (at the bottom of Settings), and the support code from Settings → Cloud save.",
    faqTitle: "Common questions",
    faq: [
      [
        "I got a new phone or reinstalled the game. How do I get my spa back?",
        "If you signed in with Apple or Google in Settings → Cloud save on your old phone, install Tiny Spa, open Settings → Cloud save and load your spa with the same account. If you didn’t sign in, email us with your support code if you have it, and we’ll see what we can do.",
      ],
      [
        "Can I move between iPhone and Android?",
        "Yes. Sign in with Google on both: Sign in with Apple only works on iPhone.",
      ],
      [
        "Something I bought is missing.",
        "One-time purchases: tap Settings → Restore purchases while signed in to the App Store or Google Play account you bought with. Coins or snack boxes that didn’t arrive: email us the order number from your store receipt.",
      ],
      [
        "Can I get a refund?",
        "Purchases are refunded by the store: Apple at reportaproblem.apple.com, Google in Google Play → Order history. If something you bought didn’t work, email us first and we’ll fix it.",
      ],
      [
        "How do I turn off personalized ads?",
        "Ads only play when you tap to watch one. See “Your choices about ads” in our Privacy Policy for iPhone, Android and the EEA.",
      ],
    ],
    deleteTitle: "Delete your account and data",
    delete: [
      [
        "In the game: Settings → Cloud save → delete your cloud save. Your account, cloud save and its daily copies are deleted right away. The spa on your phone stays.",
        `Without the game: email ${email} with the subject “Delete my Tiny Spa data”, and the email address of the Apple or Google account you signed in with, or your support code. We delete your account and cloud save within 30 days and tell you when it’s done.`,
      ],
      "Game activity and crash reports use random IDs and are deleted after 14 months and 90 days. Purchases aren’t cancelled or refunded. More in the Privacy Policy.",
    ],
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
  ko: {
    title: "타이니 스파 고객 지원",
    body: "타이니 스파: 고양이 목욕탕. 고양이들과 작은 목욕탕을 운영하며 동물 손님을 돌보는 게임이에요. 잘 안 되는 게 있거나 아이디어가 있다면 메일 주세요. 모든 메일을 꼼꼼히 읽어요.",
    emailCta: "메일 보내기",
    emailSubject: "타이니 스파 문의",
    include: "휴대폰 기종, 게임 버전(설정 맨 아래), 설정 → 클라우드 저장에 있는 지원 코드를 함께 알려 주세요.",
    faqTitle: "자주 묻는 질문",
    faq: [
      [
        "휴대폰을 바꿨거나 게임을 다시 설치했어요. 스파를 되찾으려면요?",
        "예전 휴대폰에서 설정 → 클라우드 저장으로 Apple 또는 Google에 로그인했다면, 게임을 설치하고 설정 → 클라우드 저장에서 같은 계정으로 스파를 불러오세요. 로그인하지 않았다면 지원 코드가 있을 경우 메일로 보내 주세요. 할 수 있는 방법을 찾아볼게요.",
      ],
      [
        "iPhone과 Android를 오가며 할 수 있나요?",
        "네. 두 휴대폰 모두 Google로 로그인하세요. Apple로 로그인은 iPhone에서만 돼요.",
      ],
      [
        "구매한 상품이 안 보여요.",
        "한 번만 사는 상품은 구매한 App Store 또는 Google Play 계정으로 로그인한 상태에서 설정 → 구매 복원을 눌러 주세요. 코인이나 간식 상자가 들어오지 않았다면 스토어 영수증의 주문 번호를 메일로 보내 주세요.",
      ],
      [
        "환불받을 수 있나요?",
        "환불은 스토어에서 처리해요. Apple은 reportaproblem.apple.com, Google은 Google Play → 주문 내역에서 요청할 수 있어요. 구매한 상품이 제대로 작동하지 않으면 먼저 메일 주세요. 바로 해결해 드릴게요.",
      ],
      [
        "맞춤형 광고를 끄려면요?",
        "광고는 직접 눌러야만 나와요. iPhone, Android, 유럽에서 끄는 방법은 개인정보처리방침의 ‘자동 수집 장치와 행태정보’를 봐 주세요.",
      ],
    ],
    deleteTitle: "계정과 데이터 삭제",
    delete: [
      [
        "게임에서: 설정 → 클라우드 저장에서 클라우드 저장을 삭제하세요. 계정, 클라우드 저장, 일별 사본이 바로 삭제되고, 휴대폰의 스파는 그대로 남아요.",
        `게임이 없다면: ${email}로 제목을 “타이니 스파 데이터 삭제”로 하고, 로그인에 쓴 Apple 또는 Google 계정의 이메일 주소나 지원 코드를 보내 주세요. 10일 안에 계정과 클라우드 저장을 삭제하고 알려 드려요.`,
      ],
      "게임 이용 기록과 오류 기록은 무작위 ID로 남고 각각 14개월, 90일 뒤 삭제돼요. 구매는 취소되거나 환불되지 않아요. 자세한 내용은 개인정보처리방침에 있어요.",
    ],
    privacy: "개인정보처리방침",
    terms: "이용약관",
  },
};
