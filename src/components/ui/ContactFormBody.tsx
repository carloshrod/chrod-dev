import { useState, type ReactNode } from "react";
import { ui } from "../../i18n/ui";
import type { Locale } from "../../i18n/ui";
import { getRouteUrl } from "../../i18n/routes";
import { EVENTS, track } from "../../lib/analytics";
import { ErrorIcon, SuccessIcon } from "./icons";

/**
 * The contact form itself, without any surrounding chrome.
 *
 * Extracted so `ContactDrawer` and the contact page share one implementation.
 * Writing a second form for the page would have duplicated the validation
 * rules, the honeypot, the privacy notice and the submit event, and those
 * copies drift: the same class of bug as the service list that fell out of
 * step with Sanity and the redirect comment that stopped being true.
 */

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  lang: Locale;
  /**
   * Prefixes every field id. Both copies are mounted at once on the contact
   * page, since the drawer lives in `MainLayout`, and duplicate ids would
   * break every `label for=` on the page.
   */
  idPrefix: string;
  /** Reported as `location` on `contact_submit`. */
  location: string;
  /** Shown under the success message. The drawer passes its close button. */
  successAction?: ReactNode;
  /** Marks the inputs for the drawer's own verification hooks. */
  formAttrs?: Record<string, string | undefined>;
}

const ContactFormBody = ({
  lang,
  idPrefix,
  location,
  successAction,
  formAttrs,
}: Props) => {
  const t = (key: string) =>
    (ui[lang] as Record<string, string>)[key] ??
    (ui["en"] as Record<string, string>)[key] ??
    key;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = t("drawer.error.name.required");
    if (!form.email.trim()) {
      errs.email = t("drawer.error.email.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t("drawer.error.email.invalid");
    }
    if (!form.message.trim()) {
      errs.message = t("drawer.error.message.required");
    } else if (form.message.trim().length < 10) {
      errs.message = t("drawer.error.message.short");
    }
    return errs;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromName: form.name,
          fromEmail: form.email,
          message: form.message,
          website: form.website,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      // Fires on a delivered message only, so the number is comparable with
      // `contact_open` as a real completion rate rather than an attempt rate.
      track(EVENTS.contactSubmit, { location });
      setForm({ name: "", email: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-lg border ${
      hasError ? "border-red-500" : "border-border"
    } bg-surface-alt px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-300/30`;

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400">
          <SuccessIcon />
        </div>
        <h3 className="text-xl font-semibold text-slate-100">
          {t("drawer.success.title")}
        </h3>
        <p className="text-slate-400">{t("drawer.success.body")}</p>
        {successAction}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate {...formAttrs}>
      <p className="text-sm text-slate-400">{t("drawer.form.intro")}</p>

      {/* Honeypot: hidden from sighted and screen-reader users alike
          (aria-hidden + unreachable by tab), left for bots that
          auto-fill every input. */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="space-y-1.5">
        <label
          htmlFor={`${idPrefix}-name`}
          className="block text-sm font-medium text-slate-300"
        >
          {t("drawer.name.label")}
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t("drawer.name.placeholder")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${idPrefix}-error-name` : undefined}
          className={fieldClass(!!errors.name)}
        />
        {errors.name && (
          <p
            id={`${idPrefix}-error-name`}
            className="mt-1 text-xs text-red-400"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`${idPrefix}-email`}
          className="block text-sm font-medium text-slate-300"
        >
          {t("drawer.email.label")}
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("drawer.email.placeholder")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${idPrefix}-error-email` : undefined}
          className={fieldClass(!!errors.email)}
        />
        {errors.email && (
          <p
            id={`${idPrefix}-error-email`}
            className="mt-1 text-xs text-red-400"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`${idPrefix}-message`}
          className="block text-sm font-medium text-slate-300"
        >
          {t("drawer.message.label")}
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={t("drawer.message.placeholder")}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? `${idPrefix}-error-message` : undefined
          }
          className={`resize-none ${fieldClass(!!errors.message)}`}
        />
        {errors.message && (
          <p
            id={`${idPrefix}-error-message`}
            className="mt-1 text-xs text-red-400"
          >
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <ErrorIcon />
          <p className="text-sm text-red-400">{t("drawer.error")}</p>
        </div>
      )}

      <p className="text-xs text-slate-500">
        {t("form.privacy.notice.prefix")}
        <a
          href={getRouteUrl(lang, "privacyPolicy")}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-slate-600 underline-offset-2 transition-colors hover:text-slate-300"
        >
          {t("form.privacy.notice.link")}
        </a>
        {t("form.privacy.notice.suffix")}
      </p>

      <button
        id={`${idPrefix}-submit`}
        data-wiggle-trigger
        type="submit"
        disabled={status === "sending"}
        className={`w-full rounded-lg bg-red-600 py-3 text-sm font-semibold text-white transition-all hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${status === "sending" ? "animate-pulse" : ""}`}
      >
        {status === "sending" ? t("drawer.sending") : t("drawer.submit")}
      </button>
    </form>
  );
};

export default ContactFormBody;
