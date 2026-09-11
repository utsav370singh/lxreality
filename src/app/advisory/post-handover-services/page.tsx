import type { Metadata } from "next";
import { getPage, getPartners } from "@/lib/cms";
import { PageHero } from "@/components/sections/page-hero";
import { Section, Container, SectionHeadingFrom } from "@/components/ui/section";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CtaBand } from "@/components/sections/cta-band";
import { Icon } from "@/components/ui/icon";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { postHandoverServices, postHandoverWhy, postHandoverProcess } from "@/content/page-extras";

export const revalidate = 300;
export const metadata: Metadata = { title: "Post-Handover Services" };

export default async function PostHandoverPage() {
  const [page, banks, interior] = await Promise.all([
    getPage("advisory-post-handover"),
    getPartners("bank"),
    getPartners("interior"),
  ]);

  return (
    <>
      <PageHero hero={page.hero} />

      <Section tone="cream">
        <Container>
          <SectionHeadingFrom intro={page.sections.services} align="center" tone="light" />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {postHandoverServices.map((s) => (
              <li key={s.title} className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-[var(--shadow-card)]">
                <span className="flex size-12 items-center justify-center rounded-full bg-cream-100">
                  <Icon name={s.icon} className="size-6 text-gold-500" strokeWidth={1.5} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">{s.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-700">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="size-1 rounded-full bg-gold-500" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="cream" className="pt-0">
        <Container>
          <SectionHeadingFrom intro={page.sections.why} align="center" tone="light" />
          <FeatureGrid items={postHandoverWhy} columns={4} tone="light" className="mt-10" />
        </Container>
      </Section>

      <Section tone="navy-dark">
        <Container>
          <SectionHeadingFrom intro={page.sections.process} align="center" />
          <ProcessSteps steps={postHandoverProcess} className="mt-12" />
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeadingFrom intro={page.sections.partners} align="center" tone="light" />
          <div className="mt-10 space-y-10">
            <div>
              <p className="eyebrow mb-4 text-center">Our Banking Partners</p>
              <PartnerMarquee partners={banks} tone="light" />
            </div>
            <div>
              <p className="eyebrow mb-4 text-center">Our Interior Partners</p>
              <PartnerMarquee partners={interior} tone="light" />
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-ink-500">
            *We have tie-ups with 50+ banks and 200+ interior &amp; service partners across India.
          </p>
        </Container>
      </Section>

      {page.cta && <CtaBand cta={page.cta} />}
    </>
  );
}
