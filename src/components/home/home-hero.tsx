"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import type { PageHero, Stat } from "@/lib/cms";
import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/ui/stat-bar";
import { SelectField } from "@/components/ui/select-field";
import { BUDGET_RANGES, SEGMENT_LABELS } from "@/lib/property-filters";
import { cn } from "@/lib/utils";

const TABS = ["Buy", "Lease", "Invest"] as const;
type Tab = (typeof TABS)[number];

const PROPERTY_TYPE_OPTIONS = Object.values(SEGMENT_LABELS);

export function HomeHero({
  hero,
  stats,
  locations,
}: {
  hero: PageHero;
  stats: Stat[];
  /** Distinct cities pulled from real listings, so every option actually matches something. */
  locations: string[];
}) {
  const [tab, setTab] = useState<Tab>("Buy");
  const [propertyType, setPropertyType] = useState("");
  const targetHref =
    propertyType === "Commercial"
      ? "/projects/commercial"
      : propertyType === "Plots/Land"
        ? "/projects/plots"
        : "/projects/residential";

  return (
    <section className="relative isolate overflow-hidden hero-navy">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.image.url}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
      </div>

      <Container className="relative pt-28 pb-12 sm:pt-32 sm:pb-14 lg:pt-30 lg:pb-16">
        <div className="max-w-2xl">
          {hero.eyebrow && <p className="eyebrow mb-4">{hero.eyebrow}</p>}
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
            {hero.title}
            <br />
            <span className="gold-text-gradient">{hero.titleAccent}</span>
          </h1>
          {hero.description && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-300">{hero.description}</p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {hero.primaryCta && (
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
              </Button>
            )}
            {hero.secondaryCta && (
              <Button href={hero.secondaryCta.href} size="lg" variant="outline">
                {hero.secondaryCta.label}
              </Button>
            )}
          </div>
        </div>

        {/* Search widget — tabs are intent-only (Buy/Lease/Invest all search the same listings);
            Property Type picks the segment and so the destination page (Residential/Commercial/
            Plots & Land). Submitting is a real GET navigation, so the results page receives
            ?location=&budget=. */}
        <form
          action={targetHref}
          method="get"
          className="mt-10 max-w-4xl rounded-2xl border border-gold-500/20 bg-navy-900/80 p-2 backdrop-blur sm:mt-12"
        >
          <div role="tablist" aria-label="Search intent" className="flex flex-wrap gap-1 px-2 pt-2">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
                  tab === t ? "bg-gold-500/15 text-gold-300" : "text-mist-400 hover:text-mist-200",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid gap-2 p-2 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
            <SelectField
              name="location"
              label="Location"
              placeholder="Select Location"
              options={locations.map((loc) => ({ value: loc, label: loc }))}
            />
            <SelectField
              name="segment"
              label="Property Type"
              placeholder="Select Type"
              options={PROPERTY_TYPE_OPTIONS.map((t) => ({ value: t, label: t }))}
              onChange={setPropertyType}
            />
            <SelectField
              name="budget"
              label="Budget"
              placeholder="Min – Max"
              options={BUDGET_RANGES.map((r) => ({ value: r.value, label: r.label }))}
            />
            <button
              type="submit"
              className="flex h-full min-h-[3.25rem] items-center justify-center gap-2 rounded-lg gold-gradient px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-950"
            >
              <Search className="size-4" aria-hidden />
              Search
            </button>
          </div>
        </form>

        <StatBar stats={stats} className="mt-10" tone="panel" />
      </Container>
    </section>
  );
}
