import { TINYUS } from "@/lib/tinyus";

// Tiny Us Privacy Policy + Terms of Use, checked against what the app ships (kjparkdavid/tiny-us origin/main,
// 2026-10-15) and against the privacy laws of its launch markets. Not reviewed by a lawyer.
//
// Block syntax: a string is a paragraph; a string[] is a bullet list; "!dev …" / "!law …" is a review flag shown
// on the page only while LEGAL_DRAFT is true. Add a flag when something needs checking, and set DRAFT back to true.

export const LEGAL_DRAFT = false;
export const LEGAL_UPDATED = "October 15, 2026";

export type Block = string | readonly string[];
export type LegalSection = { h: string; blocks: readonly Block[] };
export type LegalDoc = { title: string; intro: readonly Block[]; sections: readonly LegalSection[] };

const email = TINYUS.supportEmail;
const who = `${TINYUS.legal.name}, ${TINYUS.legal.entity}`;

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  intro: [
    `This policy explains what Tiny Us collects, why, who it’s shared with, and the choices you have. Tiny Us is made by ${who} (“we”, “us”), which is responsible for your personal information. Questions or privacy requests: ${email}.`,
  ],
  sections: [
    {
      h: "The short version",
      blocks: [
        [
          "Tiny Us is an app for two. What you write, share and save is shown to the person you link with. That’s the point of the app.",
          "We use your information to run Tiny Us, keep it working and improve it. We don’t sell it, and we never use what you write for ads.",
          "Tiny Us has no banner ads. You can choose to watch short videos for coins. Those ads, and our ad measurement, use your device’s advertising ID only if you allow it.",
          "You can delete your account and your data from inside the app at any time.",
        ],
      ],
    },
    {
      h: "What we collect",
      blocks: [
        "Things you give us:",
        [
          "Account details: you can start as a guest, with no name or email. If you save your account, we get a user ID and, depending on how you sign in, your email address and name: Sign in with Apple (iPhone), Google, or an email and password. Apple may give us a private relay email instead of your real one.",
          "Profile details: the name you go by, what you call your person before you link, your pet and its outfit, a profile photo if you add one, your start date, a birthday if you add it, your mood and status, and your time zone. When you start, we also ask your age group (you can choose not to say) and what you hope to get from Tiny Us. Only you can see those two answers.",
          "What you create in the app: answers to daily questions, replies and reactions, journal entries, notes, lists, gifts and their messages, places, stamps and the lines you leave on them, planned dates, room snapshots, and how you decorate your home.",
          "Photos: only the photos you pick from your library, or take with the camera for your profile photo.",
          "Places: for a place you find by search, we keep Google’s ID for it and the name you give it. We keep its spot on the map for up to 28 days, then fetch it again when you need it. For a pin you drop, we keep its spot, its address and the area your phone gives it. Each stamp keeps the country, region and city, and how far it is from home, never the exact spot.",
          "Purchases: what you bought, its price, currency and store country, and the store’s receipt, so we can give you Plus or coins. We never see your card details.",
          "Messages you send us, for example a support email.",
        ],
        "Things collected automatically:",
        [
          "App activity: which screens and features are used, events like “answered today’s question” or “bought Plus”, via Google Firebase Analytics. App analytics start when you open the app. They never include what you write.",
          "Device details: an ID for each phone you use, device model, operating system, app version, language, time zone, your app store’s country, and a rough region based on your IP address.",
          "A push token, so we can send notifications to your phone (for example when your person answers).",
          "Location: only while you’re using the app, and only if you allow it: to start the map where you are, find places near you, save the place you’re at, and remind you of a date when you get there. We never read your location in the background, and we don’t store where you are, except a place you choose to save.",
          "Advertising data: if you watch a video for coins, your device’s advertising identifier (on iPhone only if you allow tracking; the Google advertising ID on Android) and how you interact with the ad.",
        ],
      ],
    },
    {
      h: "What you write",
      blocks: [
        "What you write in Tiny Us can be very personal, and sometimes it may reveal things like your health, sex life or sexual orientation. You choose what to write, and we use it only to store it, sync it and show it to you and your person. We never use it for ads or analytics, never sell it, and never use it to train AI. We don’t read it, except when you ask us for help with something specific, or when the law or someone’s safety requires it.",
      ],
    },
    {
      h: "How we use it",
      blocks: [
        [
          "To run Tiny Us: create your account, link you with your person, show each of you the other’s answers once you’ve both answered, grow your home, keep your diary and sync it across your devices.",
          "To send notifications: about your person and your day together, and reminders you can turn off in Settings → Notifications.",
          "To handle purchases, share Plus with your linked person, and keep the records the law requires.",
          "To show the optional videos that reward you with coins, and to measure our own ads.",
          "To understand what works, fix bugs and improve the app, including trying out changes with some couples before everyone.",
          "To keep Tiny Us safe, prevent abuse and follow the law.",
          "To answer you when you contact us.",
        ],
        "We don’t make decisions about you based only on automated processing that have legal or similarly significant effects.",
      ],
    },
    {
      h: "Who sees it",
      blocks: [
        "Your person. Once you link, the person you link with can see what you share in Tiny Us: answers (after you’ve both answered), journal entries, notes, photos, moods and status, places and your home. Please only share what you’re comfortable with them seeing.",
        "Your home screen. If you add the Tiny Us widget, it shows your person’s name, mood and today’s question on your phone, so anyone who sees your phone can see them.",
        "The companies that help us run Tiny Us, under contracts that limit what they can do with your data:",
        [
          "Google Firebase (Authentication, Firestore and Realtime Database, Cloud Storage for photos, Cloud Functions, Cloud Messaging for push, Remote Config, Analytics): hosting, sign-in, sync, notifications, app settings and app analytics.",
          "Google Places and Google Maps: searching for places and showing the map. Your search and an approximate location go to Google through our server. Turning a spot into an address uses your phone’s own maps service.",
          "Google AdMob: showing the optional videos you watch for coins, checking you watched them (with your Tiny Us user ID), and measuring them.",
          "Meta: measuring which of our ads on Meta lead to installs and purchases. The Meta SDK tells Meta when the app is installed and opened. Our server tells Meta about each purchase (type, price and currency) with Meta’s anonymous ID, never your name or email, and only if you allowed it.",
          "Apple and Google: sign-in, and payments through the App Store and Google Play. Our server checks each purchase with them using a code made from your account, not your name or email.",
        ],
        "We may also share information if the law requires it, to protect people’s safety or our rights, or as part of a merger or sale of the business (we’ll tell you first if this policy would change).",
        "We don’t sell your personal information for money. But like most free apps, Tiny Us lets Google AdMob and Meta use your device’s advertising ID to show and measure ads. Some US state laws call this “selling” or “sharing” personal information for targeted advertising. You can turn it off anytime (see “Your choices about ads”).",
      ],
    },
    {
      h: "Your choices about ads",
      blocks: [
        [
          "On iPhone, we ask permission before using your advertising identifier to track you across other companies’ apps and websites (App Tracking Transparency). If you say no, the videos are still shown, but they aren’t personalized, and Meta learns nothing from your phone beyond the app being installed and opened. You can change this anytime in Settings → Privacy & Security → Tracking.",
          "On Android, you can delete your advertising ID in your phone’s settings (Settings → Privacy → Ads, or Google → Ads). Without it, ads aren’t personalized.",
          "In the EEA, UK and Switzerland, Google’s consent form shows before your first video. You can change your answer anytime in Tiny Us: Settings → Privacy & security → Ad privacy choices.",
          `In the US, these settings are how you opt out of the “sale” or “sharing” of your information for targeted ads. Questions: ${email}.`,
        ],
      ],
    },
    {
      h: "How long we keep it",
      blocks: [
        [
          "Your account and what you create: while your account is active. If you unlink, your couple is kept (hidden) until either of you deletes it or deletes their account (see below).",
          "Notifications in your in-app inbox: 30 days.",
          "A searched place’s spot on the map: 28 days.",
          "App analytics: 14 months.",
          "Purchase records: 6 years, because tax law requires it. They don’t include what you write.",
        ],
        "When something is deleted, it’s gone from our systems. We don’t keep backup copies of your data.",
      ],
    },
    {
      h: "Unlinking and deleting",
      blocks: [
        "Unlinking deletes nothing. Your home, diary, notes, places, coins and streak are kept but hidden from both of you. Re-link with a new invite and everything comes back just as it was. Either of you can delete an old couple for good in Settings → Account → Past couples.",
        "While you’re linked, you can download a copy of what you share in Settings → Account → Export our data.",
        "You can delete your account in the app: Settings → Account → Delete account. This deletes your account and every couple you’ve been part of, for both of you: answers, journal entries, notes, places, photos and your home.",
        [
          "If you’re not linked, your account is deleted right away.",
          "If you’re linked, your person is told right away and can export what you share. Your account and your couple are deleted after 7 days. Changed your mind? Tap Cancel deletion in Settings before then.",
          "On iPhone, deleting also cuts Tiny Us’s access to your Sign in with Apple account.",
          "Deleting doesn’t cancel a subscription; cancel that in your App Store or Google Play settings.",
        ],
        `No app? Email ${email} from your account’s email address with the subject “Delete my Tiny Us account”. Step by step: miuustudio.com/tinyus/delete-account.`,
      ],
    },
    {
      h: "Your rights",
      blocks: [
        `Depending on where you live, you may have the right to access, correct, download or delete your personal information, to object to or limit some uses, and to withdraw consent. Email ${email} and we’ll help. We’ll answer within one month, or sooner where your local law requires (for example, 10 days in Korea and 15 days in Brazil), and we may extend this where the law allows. We may need to confirm it’s you first. We won’t treat you differently for using these rights.`,
        `Canada. We handle personal information under Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA) and, for people in Quebec, Quebec’s private-sector privacy law. You can ask to see and correct your information, and withdraw consent (for example, turn off personalized ads as described in “Your choices about ads”). If you’re not happy with our answer, you can complain to the Office of the Privacy Commissioner of Canada (priv.gc.ca) or, in Quebec, the Commission d’accès à l’information (cai.gouv.qc.ca).`,
        "United States. Depending on your state, you can ask what personal information we collect, use and disclose; get a copy; correct or delete it; and opt out of “sale”, “sharing” and targeted advertising (see “Your choices about ads”). We use sensitive information (such as what you write to your person, or your location while you’re using the map) only to provide Tiny Us to you, never for ads. You can use an authorized agent. If we turn down your request, you can appeal by replying to our answer with “Appeal”. We’ll answer within the time your state’s law sets, and if you’re still not happy you can contact your state attorney general.",
        "EEA, UK and Switzerland. Here’s the legal basis for each way we use your information:",
        [
          "Running Tiny Us (your account, linking with your person, showing answers, your home, your diary, sync, notifications), Plus, coins and rewards for optional videos: to provide the service you asked for (contract).",
          "Keeping purchase and tax records: to follow the law (legal obligation).",
          "Keeping Tiny Us safe and preventing abuse, app analytics to fix problems and improve the app, answering your messages, and non-personalized ads: our legitimate interests, which we’ve weighed against yours. You can object anytime by emailing us.",
          "Personalized ads and ad measurement (Google AdMob, Meta): your consent, which you can withdraw anytime as described in “Your choices about ads”. Withdrawing doesn’t affect what happened before.",
        ],
        "You can also ask us to send you a copy of your information in a portable format, and you can complain to your local data protection authority.",
        "Japan. Your information is stored in the United States. We use contracts that require our providers to protect it to the standard of Japanese law, and we’ll give you details on request.",
        "Brazil. Our data protection contact (encarregado) is our Privacy Officer (see below).",
      ],
    },
    {
      h: "Korea",
      blocks: [
        "If you live in Korea, the following also applies under Korea’s Personal Information Protection Act.",
        [
          "What we collect and why, and how long we keep it: as described in “What we collect”, “How we use it” and “How long we keep it”.",
          "How we destroy it: electronic files are deleted in a way that can’t be restored. We don’t keep paper records.",
          "Giving information to others: we don’t give your personal information to third parties, except what you choose to share with your linked person and where the law requires.",
          "Automatic collection: we use the advertising ID and Firebase’s app identifier for analytics and ads. You can refuse as described in “Your choices about ads”.",
          "Your rights: you (or your legal representative) can ask to see, correct, delete or stop the processing of your information by emailing us. We’ll answer within 10 days.",
          "Safety measures: encryption in transit, access limited to the people who need it, and the security controls of our providers.",
          "Privacy officer: our Privacy Officer (see below).",
          "Children under 14: Tiny Us is for people 18 and over, and we don’t knowingly collect information from children under 14.",
          "Help: you can also contact the Personal Information Dispute Mediation Committee (kopico.go.kr, 1833-6972) or KISA’s Privacy Infringement Report Center (privacy.kisa.or.kr, 118).",
        ],
        "Service providers and transfers outside Korea. To provide Tiny Us, your information is sent over encrypted connections, as you use the app, to service providers who store and process it for us in the United States:",
        [
          "Google LLC (USA; support.google.com/policies/contact/general_privacy_form): Firebase hosting, sign-in, sync, push and analytics, Google Maps Platform place search, and AdMob ads. Items: account and profile details, what you create in Tiny Us, device details, push token, advertising ID, app activity. Kept until you delete your account, or as described in this policy.",
          "Meta Platforms, Inc. (USA; facebook.com/help/contact/540977946302970): ad measurement. Items: advertising ID if you allow it, device details, install and app-open events, purchases (type, price and currency). Kept as described in Meta’s privacy policy.",
          "Apple Inc. (USA) and Google LLC (USA): sign-in and store payments.",
        ],
        "You can refuse these transfers by not using Tiny Us or by deleting your account. Personalized ads and ad measurement can be turned off as described in “Your choices about ads” without affecting the rest of the app. Because Tiny Us runs on these services, you can’t use it without the other transfers.",
      ],
    },
    {
      h: "Children",
      blocks: [
        "Tiny Us is only for adults (18 and over). We don’t knowingly collect information from anyone under 18. If you think someone under 18 is using Tiny Us, email us and we’ll delete their account and information.",
      ],
    },
    {
      h: "Security and where data is stored",
      blocks: [
        "We use the security measures built into our providers (encryption in transit, access controls) to protect your information. No system is perfectly secure, so please keep your sign-in account safe.",
        "We’re based in Canada, and your information is stored on Google Cloud servers in the United States. If you live in Quebec or elsewhere in Canada, this means your information is stored and used outside your province and outside Canada. It may be accessed there by courts, law enforcement and national security authorities under US law. Where the law requires, we use safeguards such as standard contractual clauses for transfers.",
      ],
    },
    {
      h: "Changes",
      blocks: [
        "If we change this policy, we’ll update the date at the top. If the change is significant, we’ll also tell you in the app.",
      ],
    },
    {
      h: "Privacy Officer",
      blocks: [
        `The owner of ${TINYUS.legal.name} is responsible for protecting personal information at Tiny Us (in Quebec: the person in charge of the protection of personal information; in Brazil: the encarregado). Contact: ${email}.`,
      ],
    },
    {
      h: "Contact",
      blocks: [`${who}. Email ${email}. We’re happy to help. Our mailing address is available on request.`],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: "Terms of Use",
  intro: [
    `These terms are an agreement between you and ${who} (“we”, “us”) for using Tiny Us (the app and this website). By using Tiny Us, you agree to them and to our Privacy Policy. If you don’t agree, please don’t use Tiny Us.`,
  ],
  sections: [
    {
      h: "Who can use Tiny Us",
      blocks: ["You must be 18 or older to use Tiny Us. By using it, you confirm you are."],
    },
    {
      h: "Your account and your person",
      blocks: [
        "You can start as a guest and save your account with Apple, Google or an email and password. A guest account lives only on your phone, so save it to keep it. You’re responsible for what happens on your account. Tiny Us is made for two: you can link with one person at a time by sharing an invite code. Either of you can unlink at any time.",
        "Once you link, the person you link with can see what you share in Tiny Us. Only link with someone you trust, and don’t use Tiny Us to monitor, pressure or harm anyone.",
      ],
    },
    {
      h: "Your content",
      blocks: [
        "What you write and upload (answers, notes, journal entries, photos and so on) stays yours. You give us a limited license to store, copy, display and send it only to run Tiny Us for you and your person, for example to sync it and show it in their app.",
        `Don’t share anything that’s illegal, that you don’t have the right to share, or that harms someone else. If you see something like that in Tiny Us, tell us at ${email}. We may remove content or suspend accounts that break these terms, and we’ll tell you why.`,
      ],
    },
    {
      h: "Tiny Us Plus",
      blocks: [
        "Tiny Us is free to use. Tiny Us Plus is an optional paid upgrade, offered as a monthly or yearly subscription or a one-time lifetime purchase. Prices are shown in the app before you buy.",
        [
          "Plus is shared: when one of you buys it, your linked person gets Plus too, for as long as you stay linked and the purchase is active. If you unlink, Plus stays with the person who paid, and the other person’s Plus ends right away. If you both buy Plus, one is enough: cancel the other in your store settings.",
          "Subscriptions renew automatically unless you cancel at least 24 hours before the end of the current period. Your account is charged for the renewal within 24 hours before the period ends.",
          "Manage or cancel your subscription in your App Store account settings or in Google Play → Subscriptions. Deleting the app or your Tiny Us account doesn’t cancel it.",
          `Refunds: App Store purchases are refunded by Apple (reportaproblem.apple.com). Google Play purchases can be refunded by Google within its refund window, and we review other requests case by case at ${email}. Unlinking or deleting your account doesn’t refund or cancel anything by itself.`,
          "Lifetime means for as long as we offer Tiny Us. It belongs to the store account that bought it: restoring it on another Tiny Us account moves it there.",
        ],
      ],
    },
    {
      h: "Coins and items",
      blocks: [
        "Coins and in-app items (furniture, outfits, gifts, seasonal boxes and so on) are a license to use them inside Tiny Us. They have no cash value, can’t be exchanged for money, and can’t be sold or transferred outside the app. Coins and items belong to your couple: you and your linked person share them. If you unlink, they stay with your couple and come back if you re-link. If your couple is deleted, they’re deleted too. Purchased coins are used up when spent and are non-refundable except where the law says otherwise.",
      ],
    },
    {
      h: "Ads",
      blocks: ["Tiny Us has no banner ads. You can choose to watch short videos that reward you with coins, up to twice a day."],
    },
    {
      h: "Our stuff",
      blocks: [
        "Tiny Us, its art, characters, questions and design belong to us or our licensors. You may use the app for your own personal, non-commercial use. Don’t copy, modify, reverse engineer or resell it, and don’t try to get around its limits or security.",
      ],
    },
    {
      h: "Changes and ending",
      blocks: [
        "We keep improving Tiny Us, so features may change or be removed. We may change these terms; if a change is significant, we’ll tell you in the app. You can stop using Tiny Us and delete your account anytime. We may suspend or end access if you break these terms or to protect others.",
      ],
    },
    {
      h: "Disclaimers and liability",
      blocks: [
        "We work hard to keep Tiny Us running well, but we can’t promise it will always be available, free of errors, or that nothing you store will ever be lost.",
        "To the extent the law where you live allows: Tiny Us is provided “as is” and “as available”; we don’t give warranties beyond those in these terms; we aren’t liable for indirect, incidental or consequential losses, or for lost data or profits; and our total liability to you for all claims is limited to the greater of what you paid for Tiny Us in the 12 months before the claim and CA$100.",
        "None of this limits liability that the law doesn’t allow us to limit, such as for fraud, gross negligence, wilful misconduct, or death or personal injury caused by our negligence. It also doesn’t take away rights you have as a consumer, including guarantees about the quality of services that your local law gives you and that can’t be excluded.",
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
        "If these terms are translated and a translation differs from this English version, the English version applies, except where your local law says otherwise.",
      ],
    },
    {
      h: "Apple App Store",
      blocks: [
        "If you got Tiny Us from Apple’s App Store, these extra terms apply:",
        [
          "These terms are between you and us, not Apple. We alone are responsible for Tiny Us and its content. Your use of Tiny Us must also follow the App Store’s Usage Rules in the Apple Media Services Terms and Conditions.",
          "Apple has no obligation to provide maintenance or support for Tiny Us.",
          "If Tiny Us fails to meet any warranty that applies, you can tell Apple, and Apple will refund the purchase price (if any). Apple has no other warranty obligation.",
          "We, not Apple, are responsible for any claims by you or anyone else about Tiny Us or your use of it, including product liability claims, claims that it doesn’t meet a legal or regulatory requirement, and claims under consumer protection, privacy or similar laws.",
          "If anyone claims that Tiny Us or your use of it infringes their intellectual property, we, not Apple, will investigate, defend, settle and discharge that claim.",
          "You confirm that you aren’t in a country under a US government embargo or designated as “terrorist supporting”, and that you aren’t on any US government list of prohibited or restricted parties.",
          "When you use Tiny Us, you must also follow any third-party terms that apply, such as your mobile carrier’s.",
          "Apple and its subsidiaries are third-party beneficiaries of these terms. Once you accept them, Apple may enforce them against you.",
        ],
      ],
    },
    {
      h: "Contact",
      blocks: [`Questions about these terms: ${email}. ${who}.`],
    },
  ],
};
