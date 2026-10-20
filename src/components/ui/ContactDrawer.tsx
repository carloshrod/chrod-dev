import { useState, useEffect } from "react";
import { ui } from "../../i18n/ui";
import type { Locale } from "../../i18n/ui";
import { getRouteUrl } from "../../i18n/routes";
import ContactFormBody from "./ContactFormBody";
import { CloseIcon } from "./icons";

const ContactDrawer = ({ lang = "en" }: { lang?: Locale }) => {
  const t = (key: string) =>
    (ui[lang] as Record<string, string>)[key] ??
    (ui["en"] as Record<string, string>)[key] ??
    key;
  const [isOpen, setIsOpen] = useState(false);
  const [openedFrom, setOpenedFrom] = useState("unattributed");
  // Bumped on close so the form remounts: it owns its own state, and reopening
  // the drawer should not show the last message still typed in, or the success
  // screen from the message before.
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const handler = (event: Event) => {
      // Which CTA opened it, so `contact_submit` is attributable too. Falls
      // back rather than going blank if the drawer is ever opened by
      // something that does not pass one.
      const detail = (event as CustomEvent<{ location?: string }>).detail;
      setOpenedFrom(detail?.location ?? "unattributed");
      setIsOpen(true);
    };
    document.addEventListener("open-contact-drawer", handler);
    return () => document.removeEventListener("open-contact-drawer", handler);
  }, []);

  // Trap focus & block body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setFormKey((k) => k + 1);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-60 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("drawer.title")}
        className={`fixed inset-y-0 right-0 z-70 flex w-full max-w-md flex-col bg-surface shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b border-border px-6 py-4"
          data-drawer-header={isOpen ? "true" : undefined}
        >
          <div className="flex items-center gap-3">
            <img
              src="/chrod-logo.png"
              alt="chrod dev logo"
              className="h-8 w-auto"
            />
            <h2 className="text-lg font-semibold text-slate-100">
              {t("drawer.title")}
            </h2>
          </div>
          <button
            onClick={close}
            aria-label={t("drawer.close.label")}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-border hover:text-slate-200 cursor-pointer"
            data-drawer-close={isOpen ? "true" : undefined}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <ContactFormBody
            key={formKey}
            lang={lang}
            idPrefix="drawer"
            location={openedFrom}
            // `data-drawer-form` drives the staggered field entrance in
            // global.css, which belongs to the panel sliding in. The contact
            // page mounts the same form without it, since nothing slides.
            formAttrs={{ "data-drawer-form": isOpen ? "true" : undefined }}
            successAction={
              <>
                <button
                  onClick={close}
                  className="mt-4 rounded-lg bg-surface-alt border border-border px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-surface-raised hover:border-border-muted cursor-pointer"
                >
                  {t("drawer.success.close")}
                </button>
              </>
            }
          />

          {/* The one thing the drawer cannot do is show a calendar, so this
              offers the page that can, at the moment intent is highest. It is
              not a competing CTA: it serves the visitor who would rather talk
              than write. No `#schedule`: the calendar is already in view at
              the top of the contact page. It closes the drawer because on the
              contact page itself the panel would otherwise stay open over the
              calendar. */}
          <p className="mt-6 border-t border-border pt-5 text-center text-xs text-slate-500">
            {t("drawer.schedule.prefix")}
            <a
              href={getRouteUrl(lang, "contact")}
              onClick={close}
              data-schedule-cta
              data-analytics-location="drawer"
              className="underline decoration-slate-600 underline-offset-2 transition-colors hover:text-slate-300"
            >
              {t("drawer.schedule.link")}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactDrawer;
