import { FormEvent, useState } from "react";
import { Locale, UI } from "@/lib/i18n";

// Tiny Us waitlist: posts the email to a Google Form ("Tiny Us waitlist", owned by kjparkdavid@gmail.com).
// Responses land in the form's Responses tab / linked sheet. Google doesn't send CORS headers,
// so the request is fire-and-forget (no-cors) and we show the thank-you right away.
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc08pJ06M3LzqCHsT7mHMCl4_M91ykJGh1Wm5QzZY1naP9fuA/formResponse";
const EMAIL_FIELD = "entry.2117171086";

export default function Waitlist({ locale }: { locale: Locale }) {
  const t = UI[locale];
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = new FormData();
    body.append(EMAIL_FIELD, email.trim());
    fetch(FORM_URL, { method: "POST", mode: "no-cors", body }).catch(() => {});
    setDone(true);
  };

  if (done) {
    return <p className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm font-semibold">{t.waitlistDone}</p>;
  }

  return (
    <form onSubmit={submit} className="mt-5 flex max-w-sm gap-2">
      <label className="sr-only" htmlFor={`waitlist-${locale}`}>
        Email
      </label>
      <input
        id={`waitlist-${locale}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.waitlistPlaceholder}
        className="min-w-0 flex-1 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-violet"
      />
      <button type="submit" className="pill shrink-0 bg-ink text-white hover:bg-violet">
        {t.waitlistCta}
      </button>
    </form>
  );
}
