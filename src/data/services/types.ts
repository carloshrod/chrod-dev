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

export interface Service {
  slug: string;
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
