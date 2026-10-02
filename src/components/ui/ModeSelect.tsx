import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "./icons";

interface Option {
  value: string;
  label: string;
}

interface Props {
  /** The admin-links.astro plain-JS script reads/listens to this id, same as it would a native <select>. */
  id: string;
  options: Option[];
  defaultValue: string;
}

// Same visual pattern as ServiceFormSelect (trigger + absolute listbox), just
// trimmed for a fixed, non-localized pair of options. Bridges to the
// surrounding vanilla-JS form via a hidden input: admin-links.astro's script
// reads `.value` off it and listens for `change`, exactly like it would on a
// native <select>, so nothing else about that page needed to change.
export default function ModeSelect({ id, options, defaultValue }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);
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
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!hiddenRef.current) return;
    hiddenRef.current.value = value;
    hiddenRef.current.dispatchEvent(new Event("change", { bubbles: true }));
  }, [value]);

  return (
    <div ref={rootRef} className="relative">
      <input ref={hiddenRef} type="hidden" id={id} defaultValue={defaultValue} />

      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-controls={`${id}-listbox`}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-border bg-surface-alt px-4 py-2.5 text-left text-sm text-slate-200 outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-300/30"
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDownIcon />
      </button>

      {open && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-60 w-full overflow-auto rounded-lg border border-border bg-surface-alt p-1 shadow-lg shadow-black/40"
        >
          {options.map((opt) => (
            <li key={opt.value} role="option" aria-selected={value === opt.value}>
              <button
                type="button"
                onClick={() => {
                  setValue(opt.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className={`block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  value === opt.value
                    ? "bg-red-600/10 text-red-300"
                    : "text-slate-300 hover:bg-red-600/10 hover:text-red-300"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
