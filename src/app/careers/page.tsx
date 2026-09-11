import type { Metadata } from "next";
import Image from "next/image";
import { getJobs, getPage, getTestimonials } from "@/lib/cms";
import { PageHero } from "@/components/sections/page-hero";
import { Section, Container, SectionHeadingFrom } from "@/components/ui/section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { JobBoard } from "@/components/careers/job-board";
import { Carousel } from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { CtaBand } from "@/components/sections/cta-band";
import { ArrowLink } from "@/components/ui/arrow-link";
import { img } from "@/lib/cms/mock/media";
import { careersWhy, lifeAtItems } from "@/content/page-extras";
import { Button } from "@/components/ui/button";

export const revalidate = 300;
export const metadata: Metadata = { title: "Careers" };

export default async function CareersPage() {
  const [page, jobs, voices] = await Promise.all([
    getPage("careers"),
    getJobs(),
    getTestimonials("careers"),
  ]);

  return (
    <>
      <PageHero hero={page.hero} />

      <Section tone="cream">
        <Container>
          <SectionHeadingFrom intro={page.sections.why} align="center" tone="light" />
          <FeatureGrid items={careersWhy} columns={6} tone="light" variant="card" className="mt-10" />
        </Container>
      </Section>

      <Section tone="navy" id="positions">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeadingFrom intro={page.sections.positions} />
            <ArrowLink href="#positions">View All Positions</ArrowLink>
          </div>
          <div className="mt-8">
            <JobBoard jobs={jobs} />
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr] lg:items-center">
            <div>
              <SectionHeadingFrom intro={page.sections.life} tone="light" />
              <Button href="/contact" size="md" className="mt-6">
                Explore Life at LX Realty
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {lifeAtItems.map((item) => {
                const image = img(item.image, 480, 600, item.title);
                return (
                  <figure key={item.title} className="relative aspect-[4/5] overflow-hidden rounded-xl">
                    <Image src={image.url} alt={image.alt} fill sizes="(max-width: 640px) 45vw, 220px" className="object-cover" />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-3 text-xs font-medium text-white">
                      {item.title}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy" className="pt-0">
        <Container>
          <SectionHeadingFrom intro={page.sections.voices} />
          <Carousel className="mt-10" slideClassName="w-[300px] sm:w-[360px]" ariaLabel="What our people say">
            {voices.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} className="h-full" />
            ))}
          </Carousel>
        </Container>
      </Section>

      {page.cta && <CtaBand cta={page.cta} />}
    </>
  );
}
