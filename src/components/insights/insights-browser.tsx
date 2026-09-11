"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Download, FileText } from "lucide-react";
import type { Insight, Resource } from "@/lib/cms";
import { InsightCard } from "@/components/cards/insight-card";
import { cn } from "@/lib/utils";

/**
 * "Explore Insights by Topics" — the site's full library (articles,
 * leadership perspectives, and downloadable resources together), browsable
 * by tag. Pills are the union of whatever topics insights and resources
 * actually carry in the CMS (never a topic with zero matches), and clicking
 * one filters both lists in place, no page reload.
 */
export function InsightsBrowser({
  insights,
  resources,
  initialTopic,
}: {
  insights: Insight[];
  resources: Resource[];
  initialTopic?: string;
}) {
  const topics = useMemo(
    () =>
      Array.from(new Set([...insights.flatMap((i) => i.topics), ...resources.flatMap((r) => r.topics)])).sort(),
    [insights, resources],
  );

  const [active, setActive] = useState<string | null>(
    initialTopic && topics.includes(initialTopic) ? initialTopic : null,
  );

  const filteredInsights = useMemo(
    () => (active ? insights.filter((i) => i.topics.includes(active)) : insights),
    [insights, active],
  );
  const filteredResources = useMemo(
    () => (active ? resources.filter((r) => r.topics.includes(active)) : resources),
    [resources, active],
  );
  const isEmpty = filteredInsights.length === 0 && filteredResources.length === 0;

  return (
    <div>
      <ul className="flex flex-wrap gap-3">
        <li>
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              active === null
                ? "border-gold-500 bg-gold-500/15 text-gold-600 font-semibold"
                : "border-ink-900/15 bg-white text-ink-700 hover:border-gold-500/50",
            )}
          >
            All
          </button>
        </li>
        {topics.map((t) => (
          <li key={t}>
            <button
              type="button"
              onClick={() => setActive(t)}
              aria-pressed={active === t}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                active === t
                  ? "border-gold-500 bg-gold-500/15 text-gold-600 font-semibold"
                  : "border-ink-900/15 bg-white text-ink-700 hover:border-gold-500/50",
              )}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>

      {isEmpty && (
        <p className="mt-8 rounded-2xl border border-ink-900/10 bg-white p-8 text-center text-sm text-ink-500">
          Nothing tagged &ldquo;{active}&rdquo; yet — check back soon.
        </p>
      )}

      {filteredInsights.length > 0 && (
        <div className={cn(resources.length > 0 && "mt-8")}>
          {resources.length > 0 && <p className="eyebrow mb-4">Articles & Perspectives</p>}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredInsights.map((i) => (
              <InsightCard key={i.id} insight={i} tone="light" />
            ))}
          </div>
        </div>
      )}

      {filteredResources.length > 0 && (
        <div className={cn(filteredInsights.length > 0 ? "mt-10" : "mt-8")}>
          {insights.length > 0 && <p className="eyebrow mb-4">Reports & Downloads</p>}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredResources.map((r) => (
              <article key={r.id} className="flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
                <div className="relative aspect-[16/10]">
                  <Image src={r.image.url} alt={r.image.alt} fill sizes="(max-width: 1024px) 45vw, 260px" className="object-cover" />
                  <span className="absolute left-3 top-3 bg-navy-950/85 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-gold-300">
                    {r.type}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold leading-snug text-ink-900">{r.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-700">{r.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-ink-900/5 pt-3">
                    <span className="flex items-center gap-1.5 text-[0.7rem] text-ink-500">
                      <FileText className="size-3.5 text-gold-500" aria-hidden /> {r.fileSize}
                    </span>
                    <a
                      href={r.fileUrl}
                      aria-label={`Download ${r.title}`}
                      className="flex size-8 items-center justify-center rounded-full border border-ink-900/15 text-ink-700 hover:bg-ink-900/5"
                    >
                      <Download className="size-4" aria-hidden />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
