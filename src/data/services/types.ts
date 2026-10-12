export interface LocalizedText {
  en: string;
  es: string;
}

export type FormFieldType = "text" | "select" | "radio" | "textarea" | "number";

export interface ServiceFormFieldOption {
  value: string;
  label: LocalizedText;
}

export interface ServiceFormField {
  name: string;
  label: LocalizedText;
  type: FormFieldType;
  required?: boolean;
  placeholder?: LocalizedText;
  options?: ServiceFormFieldOption[];
}

export interface ServiceProcessStep {
  title: LocalizedText;
  description: LocalizedText;
}

export interface ServiceTechGroup {
  category: LocalizedText;
  items: string[];
}

export interface ServiceFAQItem {
  question: LocalizedText;
  answer: LocalizedText;
}

/**
 * One row of a side-by-side comparison between two ways of buying the same
 * service.
 */
export interface ServiceModeRow {
  label: LocalizedText;
  /** Value under the first option. */
  a: LocalizedText;
  /** Value under the second option. */
  b: LocalizedText;
  /** Renders `a` emphasised, for the row that carries the main reassurance. */
  highlightA?: boolean;
}

/**
 * Optional comparison section, for a service whose buyer has to pick between
 * two mutually exclusive setups before anything can be built. Only WhatsApp
 * needs it today (coexistence vs a dedicated number), which is why it is not
 * part of the base shape.
 */
export interface ServiceModes {
  heading: LocalizedText;
  optionA: LocalizedText;
  optionB: LocalizedText;
  rows: ServiceModeRow[];
  /** Closing reassurance under the table. */
  note: LocalizedText;
}

export interface Service {
  /**
   * Stable identifier. Never appears in a URL — it is what Sanity stores in a
   * project's `services` array and what the overview anchors key off, so it
   * must not change once content references it.
   */
  id: string;
  /** URL segment, per language. See `src/i18n/routes.ts`. */
  slug: LocalizedText;
  icon: string;
  card: {
    title: LocalizedText;
    description: LocalizedText;
  };
  hero: {
    headline: LocalizedText;
    subheadline: LocalizedText;
    ctaLabel?: LocalizedText;
  };
  problemSolution: {
    intro?: LocalizedText;
    problems: LocalizedText[];
    solutions: LocalizedText[];
  };
  includes: LocalizedText[];
  includesNote?: LocalizedText;
  /** See `ServiceModes`. Rendered between problem/solution and `includes`. */
  modes?: ServiceModes;
  process: ServiceProcessStep[];
  processNote?: LocalizedText;
  techStack: string[];
  testimonialQuote?: LocalizedText;
  faq: ServiceFAQItem[];
  budgetOptions: ServiceFormFieldOption[];
  timelineOptions: ServiceFormFieldOption[];
  messagePlaceholder: LocalizedText;
  seo: {
    title: LocalizedText;
    description: LocalizedText;
  };
}
