import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em]",
        tone === "dark" ? "text-gold-300" : "text-gold-600",
        className,
      )}
    >
      {children}
      <span className="flex size-8 items-center justify-center rounded-full border border-current transition-transform group-hover:translate-x-1">
        <ArrowRight className="size-3.5" aria-hidden />
      </span>
    </Link>
  );
}
