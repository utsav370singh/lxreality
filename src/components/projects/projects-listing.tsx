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

export async function ProjectsListing({
  pageKey,
  segment,
  whyItems,
  whyColumns,
}: {
  pageKey: Extract<PageKey, "projects-residential" | "projects-commercial">;
  segment: PropertySegment;
  whyItems: Feature[];
  whyColumns: 5 | 6;
}) {
  const [page, settings, properties, partners, testimonials] = await Promise.all([
    getPage(pageKey),
    getSiteSettings(),
    getProperties({ segment }),
    getPartners(segment === "commercial" ? "client" : "developer"),
    getTestimonials(segment),
  ]);

  const featured = properties.filter((p) => p.featured);
  const clientsIntro = page.sections.clients ?? page.sections.partners;

  return (
    <>
      <PageHero hero={page.hero} />

      <Section tone="navy" className="py-0">
        <Container>
          <StatBar stats={settings.stats} tone="panel" className="-mt-10 relative z-10 mb-16" />
        </Container>
      </Section>

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

      <section className="relative isolate overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,rgba(44,90,131,0.3),transparent_55%)]" />
        <Container>
          <SectionHeadingFrom intro={page.sections.why} className="mb-10" />
          <FeatureGrid items={whyItems} columns={whyColumns} />
        </Container>
      </section>

      <Section tone="navy" className="pt-0">
        <Container>
          <p className="eyebrow mb-6">{clientsIntro?.eyebrow ?? "Our Partners"}</p>
          <PartnerMarquee partners={partners} tone="light" />
        </Container>
      </Section>

      {testimonials[0] && (
        <Section tone="cream" className="pt-0">
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
