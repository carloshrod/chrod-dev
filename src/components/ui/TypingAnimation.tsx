import { useEffect, useState } from "react";
import type { Locale } from "../../i18n/ui";

const TYPING_SPEED = 60;
const DELETING_SPEED = 35;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_DELETE = 400;

const PHRASES: Record<Locale, string[]> = {
  en: [
    "Modern websites",
    "Custom applications",
    "Process automation",
    "API integrations",
    "Fast, scalable experiences",
  ],
  es: [
    "Sitios web modernos",
    "Aplicaciones a medida",
    "Automatización de procesos",
    "Integraciones con APIs",
    "Experiencias rápidas y escalables",
  ],
};

export interface Props {
  lang?: Locale;
}

export default function TypingAnimation({ lang = "en" }: Props) {
  const phrases = PHRASES[lang];
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (!isDeleting && displayedText === currentPhrase) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayedText === "") {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => {
        setDisplayedText(
          isDeleting
            ? currentPhrase.slice(0, displayedText.length - 1)
            : currentPhrase.slice(0, displayedText.length + 1),
        );
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED,
    );
    return () => clearTimeout(t);
  }, [displayedText, phraseIndex, isDeleting, phrases]);

  return (
    <p className="mb-8 text-lg md:text-xl leading-relaxed text-slate-400">
      <span className="text-xl md:text-2xl text-red-400">{"> "}</span>
      <span className="font-semibold text-slate-100">
        {displayedText}
        <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-red-400 align-middle text-transparent">
          |
        </span>
      </span>
    </p>
  );
}
