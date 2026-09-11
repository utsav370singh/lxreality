import Link from "next/link";
import { X } from "lucide-react";
import {
  getPage,
  getPartners,
  getProperties,
  getSiteSettings,
  getTestimonials,
  type PageKey,
  type PropertySegment,
} from "@/lib/cms";
import { PageHero } from "@/components/sections/page-hero";
import { Section, Container, SectionHeadingFrom } from "@/components/ui/section";
import { StatBar } from "@/components/ui/stat-bar";
import { Carousel } from "@/components/ui/carousel";
import { PropertyCard } from "@/components/cards/property-card";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { CtaBand } from "@/components/sections/cta-band";
import { ArrowLink } from "@/components/ui/arrow-link";
import type { Feature } from "@/content/page-extras";
import { filterProperties, hasActiveFilters, type PropertySearchParams } from "@/lib/property-filters";

const BUDGET_LABELS: Record<string, string> = {
  "0-3": "Up to ₹ 3 Cr",
  "3-6": "₹ 3 – 6 Cr",
  "6-99": "₹ 6 Cr +",
};

export async function ProjectsListing({
  pageKey,
  segment,
  whyItems,
  whyColumns,
  searchParams,
}: {
  pageKey: Extract<PageKey, "projects-residential" | "projects-commercial">;
  segment: PropertySegment;
  whyItems: Feature[];
  whyColumns: 5 | 6;
  searchParams: PropertySearchParams;
}) {
  const [page, settings, properties, partners, testimonials] = await Promise.all([
    getPage(pageKey),
    getSiteSettings(),
    getProperties({ segment }),
    getPartners(segment === "commercial" ? "client" : "developer"),
    getTestimonials(segment),
  ]);

  const filtersActive = hasActiveFilters(searchParams);
  const results = filtersActive ? filterProperties(properties, searchParams) : properties;
  const featured = properties.filter((p) => p.featured);
  const clientsIntro = page.sections.clients ?? page.sections.partners;

  const appliedFilters = [
    searchParams.location && { key: "location", label: searchParams.location },
    searchParams.type && { key: "type", label: searchParams.type },
    searchParams.budget && { key: "budget", label: BUDGET_LABELS[searchParams.budget] ?? searchParams.budget },
  ].filter((f): f is { key: string; label: string } => Boolean(f));

  return (
    <>
      <PageHero hero={page.hero} />

      <Section tone="navy" className="py-0">
        <Container>
          <StatBar stats={settings.stats} tone="panel" className="-mt-10 relative z-10 mb-16" />
        </Container>
      </Section>

      {filtersActive ? (
        <Section tone="navy" id="all" className="pt-0">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow mb-2">Search Results</p>
                <h2 className="font-display text-2xl text-white sm:text-3xl">
                  {results.length} {results.length === 1 ? "property" : "properties"} found
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {appliedFilters.map((f) => (
                  <span
                    key={f.key}
                    className="rounded-full border border-gold-500/30 bg-navy-850 px-3 py-1.5 text-xs text-mist-200"
                  >
                    {f.label}
                  </span>
                ))}
                <Link
                  href={`/projects/${segment}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-300 hover:bg-gold-500/10"
                >
                  <X className="size-3.5" aria-hidden /> Clear
                </Link>
              </div>
            </div>

            {results.length > 0 ? (
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((p) => (
                  <li key={p.id}>
                    <PropertyCard property={p} className="h-full" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-10 rounded-2xl border border-gold-500/15 bg-navy-850 p-10 text-center">
                <p className="text-lg font-semibold text-white">No properties match this search.</p>
                <p className="mt-2 text-sm text-mist-400">
                  Try a different location, type or budget — or browse everything below.
                </p>
                <Link
                  href={`/projects/${segment}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg gold-gradient px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-950"
                >
                  View All {segment === "commercial" ? "Commercial" : "Residential"} Projects
                </Link>
              </div>
            )}
          </Container>
        </Section>
      ) : (
        <Section tone="navy" id="featured" className="pt-0">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeadingFrom intro={page.sections.featured} />
              <ArrowLink href={`/projects/${segment}#all`}>View All Projects</ArrowLink>
            </div>
            <Carousel className="mt-10" slideClassName="w-[280px] sm:w-[300px]" ariaLabel="Featured projects">
              {(featured.length ? featured : properties).map((p) => (
                <PropertyCard key={p.id} property={p} className="h-full" />
              ))}
            </Carousel>
          </Container>
        </Section>
      )}

      {!filtersActive && (
        <Section tone="cream" id="all">
          <Container>
            <SectionHeadingFrom
              intro={{
                eyebrow: "All Projects",
                title: segment === "commercial" ? "Every Commercial Address We Represent" : "Every Home We Represent",
              }}
              tone="light"
            />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <li key={p.id}>
                  <PropertyCard property={p} className="h-full" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <section className="relative isolate overflow-hidden bg-navy-950 pt-6 pb-6 sm:pt-7 sm:pb-7 lg:pt-[30px] lg:pb-[30px]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(44,90,131,0.3),transparent_55%)]" />
        <Container>
          <SectionHeadingFrom intro={page.sections.why} className="mb-10" />
          <FeatureGrid items={whyItems} columns={whyColumns} />
        </Container>
      </section>

      <Section tone="navy">
        <Container>
          <p className="eyebrow mb-6">{clientsIntro?.eyebrow ?? "Our Partners"}</p>
          <PartnerMarquee partners={partners} tone="light" />
        </Container>
      </Section>

      {testimonials[0] && (
        <Section tone="cream">
          <Container>
            <p className="eyebrow mb-6">{page.sections.testimonials?.eyebrow ?? "What Our Clients Say"}</p>
            <div className="max-w-3xl">
              <TestimonialCard testimonial={testimonials[0]} tone="light" />
            </div>
          </Container>
        </Section>
      )}

      {page.cta && <CtaBand cta={page.cta} />}
    </>
  );
}
