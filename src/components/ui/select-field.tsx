"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A fully custom-styled dropdown standing in for a native <select>.
 *
 * Native selects can't be restyled where it matters most — the open popup —
 * so on mobile it renders as the browser/OS's own (often jarring, off-brand)
 * picker. This renders entirely in our own markup instead, and mirrors the
 * chosen value into a hidden input so it still serializes into a normal GET
 * form submission (`name`/`value`) exactly like a native select would.
 */
export function SelectField({
  name,
  label,
  placeholder,
  options,
  defaultValue = "",
}: {
  name: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div ref={rootRef} className="relative flex flex-col gap-1 rounded-lg bg-navy-850 px-4 py-2.5">
      <span className="text-[0.62rem] uppercase tracking-wide text-mist-400">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center justify-between gap-2 text-left text-sm text-white outline-none"
      >
        <span className={cn("truncate", !selectedLabel && "text-mist-400")}>
          {selectedLabel ?? placeholder}
        </span>
        <ChevronDown className={cn("size-4 shrink-0 text-mist-400 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <input type="hidden" name={name} value={value} />

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="no-scrollbar absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-xl border border-gold-500/25 bg-navy-900 p-1.5 shadow-[var(--shadow-lift)]"
        >
          <li role="option" aria-selected={value === ""}>
            <button
              type="button"
              onClick={() => {
                setValue("");
                setOpen(false);
              }}
              className={cn(
                "block w-full rounded-lg px-3 py-2 text-left text-sm text-mist-400 hover:bg-gold-500/10",
                value === "" && "bg-gold-500/10 text-gold-300",
              )}
            >
              {placeholder}
            </button>
          </li>
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={value === o.value}>
              <button
                type="button"
                onClick={() => {
                  setValue(o.value);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-gold-500/10",
                  value === o.value && "bg-gold-500/15 text-gold-300",
                )}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
