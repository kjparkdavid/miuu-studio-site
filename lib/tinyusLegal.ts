import { TINYUS } from "@/lib/tinyus";

// Tiny Us Privacy Policy + Terms of Use. DRAFT (2026-10-14): written from the dev's app (kjparkdavid/tiny-us
// apps/mobile/package.json, via the Lead) and the product rules in design-review/tinyus-pixel/HANDOFF.md.
// Needs the developer's review (every "dev" flag) and a lawyer's review (every "law" flag) before launch.
//
// Block syntax: a string is a paragraph; a string[] is a bullet list; "!dev …" / "!law …" is a review flag shown
// on the page while DRAFT is true. Remove a flag once it's answered, and flip DRAFT when the review is done.

export const LEGAL_DRAFT = true;
export const LEGAL_UPDATED = "October 14, 2026";

export type Block = string | readonly string[];
export type LegalSection = { h: string; blocks: readonly Block[] };
export type LegalDoc = { title: string; intro: readonly Block[]; sections: readonly LegalSection[] };

const email = TINYUS.supportEmail;

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  intro: [
    `This policy explains what Tiny Us collects, why, who it’s shared with, and the choices you have. Tiny Us is made by ${TINYUS.company} (“we”, “us”). Questions: ${email}.`,
    "!law Add the legal entity name and postal address of the company that publishes the app (the App Store / Play seller name).",
  ],
  sections: [
    {
      h: "The short version",
      blocks: [
        [
          "Tiny Us is an app for two. What you write, share and save is shown to the person you link with. That’s the point of the app.",
          "We use your information to run Tiny Us, keep it working and improve it. We don’t sell it.",
          "Free Tiny Us shows ads. Ads and ad measurement use your device’s advertising ID only if you allow it.",
          "You can delete your account and your data from inside the app at any time.",
        ],
      ],
    },
    {
      h: "What we collect",
      blocks: [
        "Things you give us:",
        [
          "Account details: when you sign in with Apple or Google, we get a user ID and, depending on what you allow, your name and email address. Apple may give us a private relay email instead of your real one.",
          "Profile details: the name you go by, your person’s name, your pet, your start date and, if you add it, a birthday.",
          "What you create in the app: answers to daily questions, replies and reactions, diary and journal entries, notes, lists, moods and status lines, gifts, places and stamps, and how you decorate your home.",
          "Photos: only the photos you pick from your library or take with the camera to add to Tiny Us.",
          "Places: when you save a place, we store the place you chose (its name and location on the map). If you allow location access, the app uses your location to suggest nearby places while you’re saving one.",
          "Messages you send us, for example a support email.",
        ],
        "!dev Confirm: email/password sign-in exists or not; which profile fields exist; whether location is ever read in the background (we assume never); what exactly is stored for a place.",
        "Things collected automatically:",
        [
          "App activity: which screens and features are used, events like “answered today’s question”, and purchases made (not your card details), via Google Firebase Analytics.",
          "Device details: device model, operating system, app version, language, time zone and a rough region based on your IP address.",
          "A push token, so we can send notifications you’ve allowed (for example when your person answers).",
          "Advertising data: your device’s advertising identifier (IDFA on iPhone, only if you allow tracking; the Google advertising ID on Android) and how you interact with ads.",
        ],
      ],
    },
    {
      h: "How we use it",
      blocks: [
        [
          "To run Tiny Us: create your account, link you with your person, show each of you the other’s answers once you’ve both answered, grow your home, keep your diary and sync it across your devices.",
          "To send notifications you’ve allowed.",
          "To handle purchases and share Plus with your linked person.",
          "To show ads in the free version and reward you for optional video ads.",
          "To understand what works, fix bugs and improve the app.",
          "To keep Tiny Us safe, prevent abuse and follow the law.",
          "To answer you when you contact us.",
        ],
        "!law For users in the EEA/UK, map each use to a legal basis (contract, legitimate interests, consent for ads/tracking).",
      ],
    },
    {
      h: "Who sees it",
      blocks: [
        "Your person. Once you link, the person you link with can see what you share in Tiny Us: answers (after you’ve both answered), diary entries, notes, photos, moods and status, places and your home. Please only share what you’re comfortable with them seeing.",
        "The companies that help us run Tiny Us, under contracts that limit what they can do with your data:",
        [
          "Google Firebase (Authentication, Firestore and Realtime Database, Cloud Storage for photos, Cloud Functions, Cloud Messaging for push, Analytics): hosting, sign-in, sync, notifications and app analytics.",
          "Google AdMob: showing ads and rewarded video ads, and measuring them.",
          "Apple and Google: sign-in, and payments through the App Store and Google Play.",
          "RevenueCat: managing subscriptions and purchases. (Planned)",
          "Meta (Facebook SDK): measuring which of our ads lead to installs and purchases. (Planned)",
        ],
        "!dev Confirm the final SDK list before launch: RevenueCat and the Meta SDK are planned but not in the code yet. Sentry and Crashlytics are not used; add them here if that changes.",
        "We may also share information if the law requires it, to protect people’s safety or our rights, or as part of a merger or sale of the business (we’ll tell you first if this policy would change).",
        "We don’t sell your personal information for money.",
        "!law Under California law (CCPA/CPRA), using an advertising ID for ad measurement/targeting can count as “sharing”. Decide whether to add a “Do not sell or share my personal information” notice and how users opt out.",
      ],
    },
    {
      h: "Ads and tracking",
      blocks: [
        "On iPhone, we ask permission before using your advertising identifier to track you across other companies’ apps and websites (App Tracking Transparency). If you say no, ads are still shown, but they aren’t personalized based on that tracking. You can change this anytime in Settings → Privacy & Security → Tracking.",
        "On Android, you can reset or delete your advertising ID in your device settings (Settings → Privacy → Ads, or Google → Ads).",
        "!dev Confirm whether the app shows Google’s consent form (UMP) to users in the EEA/UK, and whether ads are non-personalized without consent.",
      ],
    },
    {
      h: "How long we keep it",
      blocks: [
        "We keep your information while your account is active. If you delete your account, we delete your personal information within 30 days, except what we must keep for legal, tax or fraud-prevention reasons. Copies in backups are removed on their normal cycle.",
        "!dev Confirm the 30-day deletion window and the backup cycle.",
      ],
    },
    {
      h: "Unlinking and deleting",
      blocks: [
        "If you unlink, you each keep your own copies of what you created. What you shared before unlinking may stay in your person’s diary.",
        "You can delete your account in the app: Settings → Account → Delete account. This deletes your account and your data. It doesn’t cancel a subscription; cancel that in your App Store or Google Play settings.",
        `You can also ask us to delete your data by emailing ${email} from the email address on your account.`,
        "!dev Confirm the in-app delete path (Apple requires one) and what happens to shared content (answers, photos) in the partner’s diary after unlink and after deletion.",
      ],
    },
    {
      h: "Your rights",
      blocks: [
        `Depending on where you live, you may have the right to access, correct, download or delete your personal information, to object to or limit some uses, and to withdraw consent. Email ${email} and we’ll help. We won’t treat you differently for using these rights.`,
        "!law Review region-specific wording: California (CCPA/CPRA), other US states, EEA/UK (GDPR, including the right to complain to a supervisory authority), Korea (PIPA) if Tiny Us launches there.",
      ],
    },
    {
      h: "Children",
      blocks: [
        "Tiny Us is not for children. It isn’t directed at children under 13 (under 16 in the EEA/UK), and we don’t knowingly collect their information. If you think a child has given us information, email us and we’ll delete it.",
        "!law Confirm the minimum age and the store age rating.",
      ],
    },
    {
      h: "Security and where data is stored",
      blocks: [
        "We use the security measures built into our providers (encryption in transit, access controls) to protect your information. No system is perfectly secure, so please keep your sign-in account safe.",
        "Your information is stored on Google Cloud servers, which may be in the United States or other countries. Where the law requires, we use safeguards such as standard contractual clauses for transfers.",
        "!dev Confirm the Firebase project region(s).",
      ],
    },
    {
      h: "Changes",
      blocks: [
        "If we change this policy, we’ll update the date at the top. If the change is significant, we’ll also tell you in the app.",
      ],
    },
    {
      h: "Contact",
      blocks: [`Email ${email}. We’re happy to help.`],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: "Terms of Use",
  intro: [
    `These terms are an agreement between you and ${TINYUS.company} (“we”, “us”) for using Tiny Us (the app and this website). By using Tiny Us, you agree to them and to our Privacy Policy. If you don’t agree, please don’t use Tiny Us.`,
    "!law Add the legal entity name and address, and decide whether these terms are the app’s EULA (then keep the App Store section below) or whether we use Apple’s standard EULA.",
  ],
  sections: [
    {
      h: "Who can use Tiny Us",
      blocks: [
        "You must be at least 13 years old (16 in the EEA/UK) and old enough to agree to these terms where you live. If you’re under the age of majority, a parent or guardian must agree to them for you.",
        "!law Confirm the minimum age (a couple app may want 17+/18+ to match the store rating).",
      ],
    },
    {
      h: "Your account and your person",
      blocks: [
        "You sign in with Apple or Google and are responsible for what happens on your account. Tiny Us is made for two: you can link with one person at a time by sharing an invite code. Either of you can unlink at any time.",
        "Once you link, the person you link with can see what you share in Tiny Us. Only link with someone you trust, and don’t use Tiny Us to monitor, pressure or harm anyone.",
      ],
    },
    {
      h: "Your content",
      blocks: [
        "What you write and upload (answers, notes, diary entries, photos and so on) stays yours. You give us a limited license to store, copy, display and send it only to run Tiny Us for you and your person, for example to sync it and show it in their app.",
        "Don’t share anything that’s illegal, that you don’t have the right to share, or that harms someone else. We may remove content or suspend accounts that break these terms.",
      ],
    },
    {
      h: "Tiny Us Plus",
      blocks: [
        "Tiny Us is free to use. Tiny Us Plus is an optional paid upgrade, offered as a monthly or yearly subscription or a one-time lifetime purchase. Prices are shown in the app before you buy.",
        [
          "Plus is shared: when one of you buys it, your linked person gets Plus too, for as long as you stay linked and the purchase is active.",
          "Subscriptions renew automatically unless you cancel at least 24 hours before the end of the current period. Your account is charged for the renewal within 24 hours before the period ends.",
          "Manage or cancel your subscription in your App Store account settings or in Google Play → Subscriptions. Deleting the app or your Tiny Us account doesn’t cancel it.",
          "Payments and refunds are handled by Apple or Google under their terms. We can’t issue refunds for purchases made through them.",
          "Lifetime means for as long as we offer Tiny Us. It isn’t transferable to another person outside your link.",
        ],
        "!dev Confirm: what the partner keeps after unlinking or when Plus ends, and how Plus sharing works if both partners have bought it.",
      ],
    },
    {
      h: "Coins and items",
      blocks: [
        "Coins and in-app items (furniture, outfits, gifts, seasonal boxes and so on) are a license to use them inside Tiny Us. They have no cash value, can’t be exchanged for money, and can’t be sold or transferred outside the app. Coins are shared by you and your linked person. Purchased coins are used up when spent and are non-refundable except where the law says otherwise.",
        "!dev Confirm what happens to the shared wallet and items when a couple unlinks.",
      ],
    },
    {
      h: "Ads",
      blocks: ["The free version of Tiny Us shows ads, including optional video ads that reward you with coins."],
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
        "Tiny Us is provided “as is”. To the extent the law allows, we don’t make warranties beyond those stated here, and we aren’t liable for indirect or consequential losses. Our total liability is limited to the amount you paid us in the 12 months before the claim. Some places don’t allow these limits, so they may not apply to you.",
        "!law Review disclaimers, the liability cap, governing law and venue, and whether to add an arbitration clause for US users.",
      ],
    },
    {
      h: "Apple App Store",
      blocks: [
        "If you got Tiny Us from the Apple App Store: these terms are between you and us, not Apple. Apple has no obligation to provide maintenance or support for the app. If the app fails to meet any applicable warranty, you may notify Apple for a refund of the purchase price (if any); Apple has no other warranty obligation. We, not Apple, are responsible for handling any claims about the app, including product liability, legal compliance and intellectual property claims. You confirm you’re not in a country under a U.S. embargo or on a U.S. restricted-party list. Apple and its subsidiaries are third-party beneficiaries of these terms and may enforce them against you.",
      ],
    },
    {
      h: "Contact",
      blocks: [`Questions about these terms: ${email}.`],
    },
  ],
};
