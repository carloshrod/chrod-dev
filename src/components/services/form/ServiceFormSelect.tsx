import { useEffect, useRef, useState } from "react";
import type { ServiceFormFieldOption } from "../../../data/services/types";
import type { Locale } from "../../../i18n/ui";
import { ChevronDownIcon } from "../../ui/icons";

interface Props {
  id: string;
  value: string;
  options: ServiceFormFieldOption[];
  placeholder?: string;
  lang: Locale;
  invalid?: boolean;
  onChange: (value: string) => void;
}

const ServiceFormSelect = ({
  id,
  value,
  options,
  placeholder,
  lang,
  invalid,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    const toFocus =
      listRef.current?.querySelector<HTMLButtonElement>('[data-selected="true"]') ??
      listRef.current?.querySelector<HTMLButtonElement>("button");
    toFocus?.focus();

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const focusSibling = (current: HTMLElement, direction: 1 | -1) => {
    const buttons = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [],
    );
    const index = buttons.indexOf(current as HTMLButtonElement);
    const next = buttons[index + direction];
    next?.focus();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-controls={`${id}-listbox`}
        aria-expanded={open}
        aria-invalid={invalid}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border ${invalid ? "border-red-500" : "border-border"} bg-surface-alt px-4 py-2.5 text-left text-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-300/30 ${selected ? "text-slate-200" : "text-slate-600"}`}
      >
        <span className="truncate">{selected ? selected.label[lang] : placeholder}</span>
        <ChevronDownIcon />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-60 w-full overflow-auto rounded-lg border border-border bg-surface-alt p-1 shadow-lg shadow-black/40"
        >
          {options.map((opt) => (
            <li key={opt.value} role="option" aria-selected={value === opt.value}>
              <button
                type="button"
                data-selected={value === opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    focusSibling(e.currentTarget, 1);
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    focusSibling(e.currentTarget, -1);
                  }
                }}
                className={`block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  value === opt.value
                    ? "bg-red-600/10 text-red-300"
                    : "text-slate-300 hover:bg-red-600/10 hover:text-red-300"
                }`}
              >
                {opt.label[lang]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceFormSelect;
