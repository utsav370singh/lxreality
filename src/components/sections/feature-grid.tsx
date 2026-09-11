import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface FeatureItem {
  icon?: string;
  title: string;
  description?: string;
}

/**
 * The recurring "why choose us" row/grid of icon + title (+ optional blurb).
 * `variant="card"` matches the Careers 6-up card grid; `variant="row"` matches
 * the thin bordered strip used on Advisory / Projects.
 */
export function FeatureGrid({
  items,
  variant = "row",
  columns = 6,
  tone = "dark",
  className,
}: {
  items: FeatureItem[];
  variant?: "row" | "card";
  columns?: 3 | 4 | 5 | 6;
  tone?: "dark" | "light";
  className?: string;
}) {
  const colClass = {
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "sm:grid-cols-3 lg:grid-cols-5",
    6: "sm:grid-cols-3 lg:grid-cols-6",
  }[columns];

  return (
    <ul className={cn("grid grid-cols-2 gap-px overflow-hidden", colClass, className)}>
      {items.map((item) => (
        <li
          key={item.title}
          className={cn(
            "flex flex-col items-center gap-3 p-6 text-center",
            variant === "card"
              ? tone === "dark"
                ? "rounded-xl border border-gold-500/15 bg-navy-850"
                : "rounded-xl border border-ink-900/10 bg-white"
              : tone === "dark"
                ? "bg-navy-850/60 outline outline-1 outline-gold-500/10"
                : "bg-cream-50 outline outline-1 outline-ink-900/5",
          )}
        >
          <Icon
            name={item.icon}
            className={cn("size-7", tone === "dark" ? "text-gold-400" : "text-gold-500")}
            strokeWidth={1.5}
            aria-hidden
          />
          <span
            className={cn(
              "text-sm font-semibold",
              tone === "dark" ? "text-white" : "text-ink-900",
            )}
          >
            {item.title}
          </span>
          {item.description && (
            <span className={cn("text-xs leading-relaxed", tone === "dark" ? "text-mist-400" : "text-ink-500")}>
              {item.description}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
