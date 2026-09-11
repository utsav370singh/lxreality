import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Insight } from "@/lib/cms";
import { formatDate, cn } from "@/lib/utils";

export function InsightCard({
  insight,
  tone = "dark",
  className,
}: {
  insight: Insight;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1",
        tone === "dark"
          ? "border-gold-500/15 bg-navy-850 hover:border-gold-500/40"
          : "border-ink-900/10 bg-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={insight.image.url}
          alt={insight.image.alt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {insight.category && (
          <span className="absolute left-3 top-3 bg-navy-950/85 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold-300 backdrop-blur">
            {insight.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <time className={cn("text-[0.7rem] uppercase tracking-wide", tone === "dark" ? "text-mist-400" : "text-ink-500")}>
          {formatDate(insight.date)}
        </time>
        <h3 className={cn("font-display text-lg font-semibold leading-snug", tone === "dark" ? "text-white" : "text-ink-900")}>
          {insight.title}
        </h3>
        <p className={cn("text-sm leading-relaxed", tone === "dark" ? "text-mist-400" : "text-ink-700")}>
          {insight.excerpt}
        </p>
        <Link
          href={`/insights/${insight.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-400"
        >
          Read More
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
