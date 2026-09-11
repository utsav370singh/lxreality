import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "outline-light" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.14em] transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  gold: "gold-gradient text-navy-950 hover:brightness-105 shadow-[0_16px_40px_-18px_rgba(201,162,75,0.7)]",
  outline:
    "border border-gold-500/60 text-gold-300 hover:bg-gold-500/10 hover:border-gold-400",
  "outline-light":
    "border border-ink-900/20 text-ink-900 hover:bg-ink-900/5",
  ghost: "text-gold-300 hover:text-gold-100",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.68rem] px-4 py-2.5",
  md: "text-[0.72rem] px-6 py-3.5",
  lg: "text-[0.78rem] px-8 py-4",
};

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  type?: "button" | "submit";
}

export function Button({
  href,
  children,
  variant = "gold",
  size = "md",
  className,
  withArrow = true,
  type = "button",
}: ButtonProps) {
  const content = (
    <>
      {children}
      {withArrow && <ArrowRight className="size-4" aria-hidden />}
    </>
  );
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (external) {
      return (
        <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {content}
    </button>
  );
}
