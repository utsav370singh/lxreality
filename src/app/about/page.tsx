import type { Metadata } from "next";
import Image from "next/image";
import {
  getAwards,
  getLeaders,
  getPage,
  getPartners,
  getSiteSettings,
  getTestimonials,
  getValues,
} from "@/lib/cms";
import { PageHero } from "@/components/sections/page-hero";
import { Section, Container, SectionHeadingFrom } from "@/components/ui/section";
import { StatBar } from "@/components/ui/stat-bar";
import { Carousel } from "@/components/ui/carousel";
import { LeaderCard } from "@/components/cards/leader-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Icon } from "@/components/ui/icon";
import { whyChooseResults } from "@/content/page-extras";
import { Button } from "@/components/ui/button";

export const revalidate = 300;
export const metadata: Metadata = { title: "About Us" };

export default async function AboutPage() {
  const [page, settings, values, leaders, testimonials, partners, awards] = await Promise.all([
    getPage("about"),
    getSiteSettings(),
    getValues(),
    getLeaders(),
    getTestimonials("about"),
    getPartners("developer"),
    getAwards(),
  ]);

  return (
    <>
      <PageHero hero={{ ...page.hero, stats: [] }} />

      <Section tone="navy" className="pt-0">
        <Container>
          <StatBar stats={settings.stats} tone="panel" className="-mt-24 relative z-10" />
        </Container>
      </Section>

      {/* Values */}
      <Section tone="cream" className="pt-0">
        <Container>
          <SectionHeadingFrom intro={page.sections.values} tone="light" />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {values.map((v) => (
              <li
                key={v.title}
                className="flex flex-col items-center gap-3 rounded-xl border border-ink-900/10 bg-white p-6 text-center"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-cream-100">
                  <Icon name={v.icon} className="size-6 text-gold-500" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="text-sm font-semibold text-ink-900">{v.title}</span>
                <span className="text-xs leading-relaxed text-ink-500">{v.description}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Leadership */}
      <Section tone="navy" id="leadership">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeadingFrom intro={page.sections.leadership} />
            <ArrowLink href="/about#leadership">View All Leaders</ArrowLink>
          </div>
          <Carousel className="mt-10" slideClassName="w-[240px]" ariaLabel="Leadership team">
            {leaders.map((l) => (
              <LeaderCard key={l.id} leader={l} className="h-full" />
            ))}
          </Carousel>
        </Container>
      </Section>

      {/* Why choose */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_85%_0%,rgba(44,90,131,0.35),transparent_55%)]" />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:items-center">
            <SectionHeadingFrom intro={page.sections.why} />
            <FeatureGrid items={whyChooseResults} columns={5} />
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <Section tone="cream">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeadingFrom intro={page.sections.testimonials} tone="light" />
            <ArrowLink href="/about#testimonials" tone="light">
              View All Testimonials
            </ArrowLink>
          </div>
          <Carousel
            className="mt-10"
            slideClassName="w-[300px] sm:w-[360px]"
            controlsTone="light"
            ariaLabel="Client testimonials"
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} tone="light" className="h-full" />
            ))}
          </Carousel>
        </Container>
      </Section>

      {/* Partners + awards */}
      <Section tone="cream" className="pt-0" id="awards">
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
          <div className="mt-14">
            <Button href="/contact" size="lg">Connect With Our Experts</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
