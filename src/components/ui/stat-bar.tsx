import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import type { Stat } from "@/lib/cms";

export function StatBar({
  stats,
  className,
  tone = "panel",
}: {
  stats: Stat[];
  className?: string;
  tone?: "panel" | "light" | "bare";
}) {
  if (!stats.length) return null;
  const tones = {
    panel: "panel rounded-2xl",
    light: "bg-white rounded-2xl shadow-[var(--shadow-card)] border border-ink-900/10",
    bare: "",
  } as const;
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 divide-gold-500/15",
        tone !== "bare" && "px-6 py-7 sm:px-8",
        tones[tone],
        className,
      )}
    >
      {stats.map((s, i) => (
        <div
          key={`${s.label}-${i}`}
          className={cn(
            "flex flex-col items-center gap-1 text-center lg:px-3",
            i !== 0 && "lg:border-l lg:border-gold-500/15",
          )}
        >
          {s.icon && (
            <Icon
              name={s.icon}
              className={cn(
                "mb-1 size-6",
                tone === "light" ? "text-gold-500" : "text-gold-400",
              )}
              strokeWidth={1.5}
              aria-hidden
            />
          )}
          <dd
            className={cn(
              "font-display text-2xl font-semibold sm:text-[1.75rem]",
              tone === "light" ? "text-ink-900" : "text-white",
            )}
          >
            {s.value}
          </dd>
          <dt
            className={cn(
              "text-[0.7rem] font-medium uppercase tracking-[0.12em]",
              tone === "light" ? "text-ink-500" : "text-mist-400",
            )}
          >
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
