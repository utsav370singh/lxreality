import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAdvisoryServices, getPage, getSiteSettings } from "@/lib/cms";
import { PageHero } from "@/components/sections/page-hero";
import { Section, Container, SectionHeadingFrom } from "@/components/ui/section";
import { StatBar } from "@/components/ui/stat-bar";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceIcon } from "@/components/ui/service-icon";
import { img } from "@/lib/cms/mock/media";
import { advisoryValueProps, advisoryProcess, advisoryCaseStudies } from "@/content/page-extras";

export const revalidate = 300;
export const metadata: Metadata = { title: "Advisory" };

export default async function AdvisoryPage() {
  const [page, settings, advisoryServices] = await Promise.all([
    getPage("advisory"),
    getSiteSettings(),
    getAdvisoryServices(),
  ]);

  return (
    <>
      <PageHero hero={page.hero} />

      <Section tone="cream">
        <Container>
          <SectionHeadingFrom intro={page.sections.services} tone="light" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {advisoryServices.map((s) => (
              <li key={s.id} className="flex flex-col rounded-2xl border border-ink-900/10 bg-white p-6 shadow-[var(--shadow-card)]">
                <span className="flex size-12 items-center justify-center rounded-full bg-cream-100">
                  <ServiceIcon icon={s.icon} className="size-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">{s.excerpt}</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-600"
                >
                  Learn More <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="cream" className="pt-0">
        <Container>
          <SectionHeadingFrom intro={page.sections.value} tone="light" />
          <FeatureGrid items={advisoryValueProps} columns={6} tone="light" variant="card" className="mt-10" />
        </Container>
      </Section>

      <Section tone="navy-dark">
        <Container>
          <SectionHeadingFrom intro={page.sections.process} />
          <ProcessSteps steps={advisoryProcess} className="mt-12" />
          <StatBar stats={settings.stats} tone="light" className="mt-16" />
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeadingFrom intro={page.sections.caseStudies} tone="light" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advisoryCaseStudies.map((c) => {
              const image = img(c.image, 640, 420, c.title);
              return (
                <li key={c.title} className="flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
                  <div className="relative aspect-[16/10]">
                    <Image src={image.url} alt={image.alt} fill sizes="(max-width: 1024px) 45vw, 280px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold text-ink-900">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">{c.description}</p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-600"
                    >
                      View Case Study <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {page.cta && <CtaBand cta={page.cta} />}
    </>
  );
}
