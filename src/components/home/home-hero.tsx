import Image from "next/image";
import { Search } from "lucide-react";
import type { PageHero, Stat } from "@/lib/cms";
import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { StatBar } from "@/components/ui/stat-bar";

const TABS = ["Buy", "Rent", "Invest", "Commercial"];

export function HomeHero({ hero, stats }: { hero: PageHero; stats: Stat[] }) {
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

      <Container className="relative pt-32 pb-16 lg:pt-40">
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

        {/* Search widget — visual match to the mockup; submits to the listing page. */}
        <form
          action="/projects/residential"
          className="mt-12 max-w-4xl rounded-2xl border border-gold-500/20 bg-navy-900/80 p-2 backdrop-blur"
        >
          <div className="flex flex-wrap gap-1 px-2 pt-2">
            {TABS.map((tab, i) => (
              <span
                key={tab}
                className={`rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${
                  i === 0 ? "bg-gold-500/15 text-gold-300" : "text-mist-400"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
          <div className="grid gap-2 p-2 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
            <label className="flex flex-col gap-1 rounded-lg bg-navy-850 px-4 py-2.5">
              <span className="text-[0.62rem] uppercase tracking-wide text-mist-400">Location</span>
              <select name="location" className="bg-transparent text-sm text-white outline-none">
                <option className="bg-navy-900">Select Location</option>
                <option className="bg-navy-900">Gurugram</option>
                <option className="bg-navy-900">Noida</option>
                <option className="bg-navy-900">Delhi</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 rounded-lg bg-navy-850 px-4 py-2.5">
              <span className="text-[0.62rem] uppercase tracking-wide text-mist-400">Property Type</span>
              <select name="type" className="bg-transparent text-sm text-white outline-none">
                <option className="bg-navy-900">Select Type</option>
                <option className="bg-navy-900">Apartment</option>
                <option className="bg-navy-900">Villa</option>
                <option className="bg-navy-900">Office</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 rounded-lg bg-navy-850 px-4 py-2.5">
              <span className="text-[0.62rem] uppercase tracking-wide text-mist-400">Budget</span>
              <select name="budget" className="bg-transparent text-sm text-white outline-none">
                <option className="bg-navy-900">Min – Max</option>
                <option className="bg-navy-900">₹ 1 – 3 Cr</option>
                <option className="bg-navy-900">₹ 3 – 6 Cr</option>
                <option className="bg-navy-900">₹ 6 Cr +</option>
              </select>
            </label>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg gold-gradient px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-950"
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
