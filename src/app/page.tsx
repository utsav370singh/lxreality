import Image from "next/image";
import {
  getAwards,
  getInsights,
  getPage,
  getPartners,
  getProperties,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/lib/cms";
import { HomeHero } from "@/components/home/home-hero";
import { Section, Container, SectionHeadingFrom } from "@/components/ui/section";
import { Carousel } from "@/components/ui/carousel";
import { PropertyCard } from "@/components/cards/property-card";
import { InsightCard } from "@/components/cards/insight-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { CtaBand } from "@/components/sections/cta-band";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ServiceIcon } from "@/components/ui/service-icon";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { whyChooseResults } from "@/content/page-extras";

export default async function HomePage() {
  const [page, settings, featured, services, insights, testimonials, partners, awards] =
    await Promise.all([
      getPage("home"),
      getSiteSettings(),
      getProperties({ featured: true, limit: 6 }),
      getServices(),
      getInsights({ kind: "article", limit: 4 }),
      getTestimonials("home"),
      getPartners("developer"),
      getAwards(),
    ]);

  return (
    <>
      <HomeHero hero={page.hero} stats={settings.stats} />

      {/* Featured projects */}
      <Section tone="cream">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeadingFrom intro={page.sections.featured} tone="light" />
            <ArrowLink href="/projects/residential" tone="light">
              View All Projects
            </ArrowLink>
          </div>
          <Carousel
            className="mt-10"
            slideClassName="w-[280px] sm:w-[300px]"
            controlsTone="light"
            ariaLabel="Featured projects"
          >
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} className="h-full" />
            ))}
          </Carousel>
        </Container>
      </Section>

      {/* Services */}
      <Section tone="cream" className="pt-0">
        <Container>
          <SectionHeadingFrom intro={page.sections.services} tone="light" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {services.map((s) => (
              <li
                key={s.id}
                className="flex flex-col items-center gap-3 rounded-xl border border-ink-900/10 bg-white p-6 text-center"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-cream-100">
                  <ServiceIcon icon={s.icon} className="size-6" />
                </span>
                <span className="text-sm font-semibold text-ink-900">{s.title}</span>
                <span className="text-xs leading-relaxed text-ink-500">{s.excerpt}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Why choose */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="absolute inset-0 -z-10">
          <Image src={page.cta?.image?.url ?? "/placeholder.svg"} alt="" fill sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-950/70" />
        </div>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-center">
            <SectionHeadingFrom intro={page.sections.why} />
            <FeatureGrid items={whyChooseResults} columns={5} />
          </div>
        </Container>
      </section>

      {/* Insights + testimonial */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.9fr_1fr]">
            <div>
              <SectionHeadingFrom intro={page.sections.insights} tone="light" />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {insights.map((i) => (
                  <InsightCard key={i.id} insight={i} tone="light" />
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow mb-4">{page.sections.testimonials?.eyebrow}</p>
              {testimonials[0] && <TestimonialCard testimonial={testimonials[0]} tone="light" />}
            </div>
          </div>
        </Container>
      </Section>

      {/* Partners + awards */}
      <Section tone="cream" className="pt-0">
        <Container>
          <p className="eyebrow mb-6">{page.sections.partners?.eyebrow}</p>
          <PartnerMarquee partners={partners} tone="light" />
          <p className="eyebrow mb-6 mt-14">{page.sections.awards?.eyebrow}</p>
          <ul className="flex flex-wrap items-center gap-8">
            {awards.map((a) => (
              <li key={a.id} className="flex items-center gap-3">
                {a.image && (
                  <Image src={a.image.url} alt={a.image.alt} width={56} height={56} className="size-14 object-contain" />
                )}
                <span className="text-sm">
                  <span className="block font-semibold text-ink-900">{a.title}</span>
                  <span className="block text-xs text-ink-500">{a.year}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {page.cta && <CtaBand cta={page.cta} />}
    </>
  );
}
