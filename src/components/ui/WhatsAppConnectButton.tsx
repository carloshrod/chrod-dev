import { useEffect, useRef, useState } from "react";
import { useTranslations } from "../../i18n/utils";
import { WhatsAppIcon } from "./icons";
import type { OnboardMode } from "../../lib/whatsappOnboard";

interface WhatsAppConnectButtonProps {
  lang: "en" | "es";
  clientName: string;
  mode: OnboardMode;
  ts: string;
  clientEmail: string;
  sig: string;
}

declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: {
      init: (opts: Record<string, unknown>) => void;
      login: (
        callback: (response: {
          authResponse?: { code?: string };
          status?: string;
        }) => void,
        opts: Record<string, unknown>,
      ) => void;
    };
  }
}

type Status = "idle" | "connecting" | "finishing" | "success" | "error";

const SDK_SRC_PREFIX = "https://connect.facebook.net/";
const APP_ID = import.meta.env.PUBLIC_WHATSAPP_APP_ID;
const CONFIG_ID = import.meta.env.PUBLIC_WHATSAPP_CONFIG_ID;
// Official WhatsApp FAQ, not a specific in-app click path: the exact menu
// wording/location (e.g. whether it reads "Delete my account" or something
// else under Account) varies enough across app versions/platforms that
// asserting one ourselves risks sending clients down the wrong menu.
const OFFICIAL_DELETE_ACCOUNT_GUIDE_URL =
  "https://faq.whatsapp.com/2138577903196467";

// Informed-consent copy for the card, kept here (not in ui.ts) since it's
// only used by this component and needs to vary by mode + lang together.
// No step-by-step walkthrough of what Embedded Signup does on screen: we
// don't control that UI and it varies (login prompt only if not already
// signed in, the client types their own number rather than picking one from
// a list, etc). What we do know for certain is what changes for the client,
// so that's what this tells them before they authorize anything.
const MODE_LABEL: Record<"en" | "es", Record<OnboardMode, string>> = {
  es: { coexistence: "Coexistence", api_only: "Solo API" },
  en: { coexistence: "Coexistence", api_only: "API Only" },
};

const COPY: Record<
  "en" | "es",
  Record<
    OnboardMode,
    { benefits: string[]; implications: string[] }
  > & {
    trustNote: string;
    browserHint: string;
    benefitsHeading: string;
    implicationsHeading: string;
    officialGuideLabel: string;
  }
> = {
  es: {
    benefitsHeading: "Qué ganas",
    implicationsHeading: "Qué debes saber",
    trustNote:
      "La conexión se hace directo con Meta. Nunca vemos ni guardamos tu contraseña.",
    // Links like this one are usually tapped from inside a WhatsApp message,
    // which opens them in WhatsApp's own in-app browser — a known case where
    // Facebook's login popup fails to open or gets stuck with no feedback.
    // Short on purpose: at max-w-xs/text-xs a longer sentence orphaned a
    // single word onto its own line.
    browserHint: "¿No pasa nada al tocar el botón? Ábrelo en Chrome o Safari.",
    officialGuideLabel: "Cómo eliminar tu cuenta de WhatsApp (guía oficial)",
    coexistence: {
      benefits: [
        "Tu número queda conectado a la API de WhatsApp de Meta, sin dejar de funcionar en la app de WhatsApp Business.",
        "Tus contactos y tu historial no se pierden ni se reemplazan.",
        "Tu negocio puede automatizar respuestas, notificaciones e integraciones con tus sistemas.",
      ],
      implications: [
        "Se desactivan de forma permanente, solo en tus chats individuales: mensajes temporales, ver una vez y listas de difusión.",
        "Los grupos no se ven afectados en la app, pero no pasan por la automatización.",
        "Para conectar, vas a autorizar el acceso con tu cuenta de Facebook.",
      ],
    },
    api_only: {
      benefits: [
        "Tu número queda conectado por completo a la API de WhatsApp de Meta.",
        "Tu negocio puede automatizar respuestas, notificaciones e integraciones con tus sistemas.",
      ],
      implications: [
        "El número que vayas a conectar debe estar libre: que no esté funcionando actualmente en la app de WhatsApp ni en WhatsApp Business.",
        "Si hoy lo tienes activo en alguna de esas apps, debes eliminar esa cuenta antes de iniciar el proceso. Una vez conectado, dejará de funcionar ahí tal como lo usas ahora.",
        "Para conectar, vas a autorizar el acceso con tu cuenta de Facebook.",
      ],
    },
  },
  en: {
    benefitsHeading: "What you get",
    implicationsHeading: "What you should know",
    trustNote:
      "The connection happens directly with Meta. We never see or store your password.",
    browserHint: "Nothing happens when you tap? Open this in Chrome or Safari.",
    officialGuideLabel: "How to delete your WhatsApp account (official guide)",
    coexistence: {
      benefits: [
        "Your number gets connected to Meta's WhatsApp API, without losing its place in the WhatsApp Business app.",
        "Your contacts and chat history are not lost or replaced.",
        "Your business can automate replies, notifications and integrations with your systems.",
      ],
      implications: [
        "These get permanently disabled, only in your individual chats: disappearing messages, view once and broadcast lists.",
        "Groups are not affected in the app, but they do not go through automation.",
        "To connect, you will authorize access with your Facebook account.",
      ],
    },
    api_only: {
      benefits: [
        "Your number gets fully connected to Meta's WhatsApp API.",
        "Your business can automate replies, notifications and integrations with your systems.",
      ],
      implications: [
        "The number you connect needs to be free: not currently active on the WhatsApp app or WhatsApp Business.",
        "If it's active on either app today, you need to delete that account before starting. Once connected, it will stop working there exactly as it does now.",
        "To connect, you will authorize access with your Facebook account.",
      ],
    },
  },
};

export default function WhatsAppConnectButton({
  lang,
  clientName,
  mode,
  ts,
  clientEmail,
  sig,
}: WhatsAppConnectButtonProps) {
  const t = useTranslations(lang);
  const copy = COPY[lang];
  const modeCopy = copy[mode];
  const [status, setStatus] = useState<Status>("idle");
  // Embedded Signup reports the WABA/phone IDs via postMessage while the
  // popup is open; FB.login's own callback only hands back the auth code
  // once it closes. A ref survives both without triggering re-renders.
  const sessionInfo = useRef<{ wabaId?: string; phoneNumberId?: string }>({});

  // The page's intro copy ("let's connect your number...") stops making
  // sense once the connection succeeds; the page listens for this to hide
  // it (same pattern as ReviewForm's "review-submitted" event).
  useEffect(() => {
    if (status === "success") {
      document.dispatchEvent(new CustomEvent("whatsapp-connected"));
    }
  }, [status]);

  useEffect(() => {
    const locale = lang === "es" ? "es_LA" : "en_US";
    const initFB = () => {
      window.FB?.init({
        appId: APP_ID,
        cookie: true,
        xfbml: false,
        version: "v23.0",
      });
    };

    // NOTE: this only affects the classic FB.login consent dialog's chrome
    // (its "Continue/Cancel" button text etc). It does NOT control the
    // Embedded Signup flow itself (phone entry, QR step...) — that content
    // follows the language of the Facebook account the person is logged in
    // with, not this SDK URL's locale segment nor this page's language.
    // Verified: switching this page to English did not change the signup
    // flow's language for an account set to Spanish. There is no documented
    // override for that, so a client whose Facebook is in Spanish will see
    // the signup steps in Spanish regardless of which /es//en page sent them
    // here — not a bug, just not something we control.
    //
    // Still worth keeping correct in case the chrome text matters to anyone
    // and to avoid the previous bug: View Transitions (astro:transitions)
    // can navigate between /es/conectar and /en/connect without a full page
    // reload, so a script tag injected by a previous mount can stick around.
    // Matching only the SDK prefix (not the locale segment) meant that
    // leftover tag's locale silently won regardless of the new page's lang.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-fb-sdk]`,
    );

    if (existing?.dataset.fbLocale === locale) {
      if (window.FB) initFB();
      else window.fbAsyncInit = initFB;
    } else {
      existing?.remove();
      delete (window as { FB?: unknown }).FB;
      window.fbAsyncInit = initFB;
      const script = document.createElement("script");
      script.src = `${SDK_SRC_PREFIX}${locale}/sdk.js`;
      script.async = true;
      script.defer = true;
      script.dataset.fbSdk = "true";
      script.dataset.fbLocale = locale;
      document.body.appendChild(script);
    }

    const onMessage = (event: MessageEvent) => {
      if (!event.origin.endsWith("facebook.com")) return;
      try {
        // Some Meta surfaces post an already-parsed object rather than a
        // JSON string — JSON.parse on a non-string throws, which the catch
        // below would otherwise swallow as "not ours" and silently drop it.
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.type !== "WA_EMBEDDED_SIGNUP") return;

        if (
          data.event === "FINISH" ||
          data.event === "FINISH_ONLY_WABA" ||
          data.event === "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING"
        ) {
          sessionInfo.current = {
            wabaId: data.data?.waba_id,
            phoneNumberId: data.data?.phone_number_id,
          };
        }
        if (data.event === "CANCEL" || data.event === "ERROR") {
          setStatus((s) => (s === "connecting" ? "idle" : s));
        }
      } catch {
        // Non-JSON messages from other facebook.com embeds — ignore.
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [lang]);

  const finishOnboarding = async (code: string) => {
    setStatus("finishing");
    try {
      const res = await fetch("/api/whatsapp-onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          clientName,
          mode,
          ts,
          clientEmail,
          lang,
          sig,
          wabaId: sessionInfo.current.wabaId,
          phoneNumberId: sessionInfo.current.phoneNumberId,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleClick = () => {
    if (!window.FB) return;
    setStatus("connecting");
    sessionInfo.current = {};

    // featureType is what makes Embedded Signup take the coexistence branch
    // (number stays usable in the WhatsApp Business app). Omitting it is
    // what gives the standard flow: the number gets dedicated to the Cloud
    // API and verified from scratch inside the same popup.
    const extras: Record<string, unknown> = {
      setup: {},
      sessionInfoVersion: "3",
    };
    if (mode === "coexistence") {
      extras.featureType = "whatsapp_business_app_onboarding";
    }

    window.FB.login(
      (response) => {
        const code = response.authResponse?.code;
        if (code) {
          finishOnboarding(code);
        } else {
          setStatus("idle");
        }
      },
      {
        config_id: CONFIG_ID,
        response_type: "code",
        override_default_response_type: true,
        extras,
      },
    );
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400 mb-6">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-3">
          {t("onboarding.success.heading")}
        </h2>
        <p className="text-slate-400 max-w-sm leading-relaxed">
          {t("onboarding.success.body")}
        </p>
      </div>
    );
  }

  const busy = status === "connecting" || status === "finishing";

  return (
    <div className="flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-600/10 px-4 py-2 text-emerald-400 mb-6">
        <WhatsAppIcon />
        <span className="text-sm font-medium">{MODE_LABEL[lang][mode]}</span>
      </div>

      <div className="w-full space-y-5 text-left mb-8">
        <div>
          <h2 className="text-sm font-semibold text-slate-200 mb-2">
            {copy.benefitsHeading}
          </h2>
          <ul className="space-y-1.5">
            {modeCopy.benefits.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-slate-400 leading-relaxed"
              >
                <span className="text-emerald-400 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-200 mb-2">
            {copy.implicationsHeading}
          </h2>
          <ul className="space-y-1.5">
            {modeCopy.implications.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-slate-400 leading-relaxed"
              >
                <span className="text-slate-600 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {mode === "api_only" && (
            <a
              href={OFFICIAL_DELETE_ACCOUNT_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-emerald-400 underline decoration-emerald-600/50 underline-offset-2 transition-colors hover:text-emerald-300"
            >
              {copy.officialGuideLabel}
            </a>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className="flex w-full max-w-xs cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {t("onboarding.connecting")}
          </>
        ) : (
          <>
            <WhatsAppIcon />
            {t("onboarding.button")}
          </>
        )}
      </button>

      {status === "error" && (
        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 w-full max-w-xs">
          <p className="text-sm text-red-400">{t("onboarding.error")}</p>
        </div>
      )}

      <p className="mt-5 text-center text-xs text-slate-500 max-w-xs">
        {copy.trustNote}
      </p>
      <p className="mt-2 text-center text-xs text-slate-600 max-w-xs text-balance">
        {copy.browserHint}
      </p>
    </div>
  );
}
