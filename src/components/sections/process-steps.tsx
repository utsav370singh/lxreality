import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface Step {
  step: string;
  title: string;
  description: string;
  icon?: string;
}

export function ProcessSteps({
  steps,
  tone = "dark",
  className,
}: {
  steps: Step[];
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3",
        steps.length % 5 === 0 && "xl:grid-cols-5",
        steps.length === 6 && "xl:grid-cols-6",
        className,
      )}
    >
      {steps.map((s, i) => (
        <li key={s.step} className="relative flex flex-col items-center text-center">
          <div className="relative mb-4">
            <span
              className={cn(
                "flex size-16 items-center justify-center rounded-full border",
                tone === "dark"
                  ? "border-gold-500/30 bg-navy-800 text-gold-300"
                  : "border-ink-900/10 bg-cream-50 text-gold-500",
              )}
            >
              <Icon name={s.icon} className="size-6" strokeWidth={1.5} aria-hidden />
            </span>
            <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full gold-gradient text-[0.7rem] font-bold text-navy-950">
              {s.step}
            </span>
          </div>
          <h3 className={cn("font-display text-lg font-semibold", tone === "dark" ? "text-white" : "text-ink-900")}>
            {s.title}
          </h3>
          <p className={cn("mt-1.5 text-xs leading-relaxed", tone === "dark" ? "text-mist-400" : "text-ink-500")}>
            {s.description}
          </p>
          {i < steps.length - 1 && (
            <span
              className="pointer-events-none absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-5rem)] bg-gradient-to-r from-gold-500/40 to-transparent lg:block"
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}
