import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPage, getPartners, getServices, getSiteSettings } from "@/lib/cms";
import { PageHero } from "@/components/sections/page-hero";
import { Section, Container, SectionHeadingFrom } from "@/components/ui/section";
import { StatBar } from "@/components/ui/stat-bar";
import { ProcessSteps } from "@/components/sections/process-steps";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceIcon } from "@/components/ui/service-icon";
import { servicesProcess } from "@/content/page-extras";

export const revalidate = 300;
export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const [page, settings, services, partners] = await Promise.all([
    getPage("services"),
    getSiteSettings(),
    getServices(),
    getPartners("developer"),
  ]);

  return (
    <>
      <PageHero hero={page.hero} />

      <Section tone="cream" edge="top">
        <Container>
          <SectionHeadingFrom intro={page.sections.services} tone="light" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li
                key={s.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 p-6">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cream-100">
                    <ServiceIcon icon={s.icon} className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink-900">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{s.excerpt}</p>
                  </div>
                </div>
                {s.image && (
                  <div className="relative mx-6 mb-6 aspect-[16/9] overflow-hidden rounded-xl">
                    <Image
                      src={s.image.url}
                      alt={s.image.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, 380px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <Link
                  href="/contact"
                  className="mx-6 mb-6 mt-auto inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-600"
                >
                  Learn More <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="navy" className="py-0">
        <Container>
          <StatBar stats={settings.stats} tone="panel" className="-mt-10 relative z-10 mb-16" />
        </Container>
      </Section>

      <Section tone="cream" className="pt-0">
        <Container>
          <SectionHeadingFrom intro={page.sections.approach} tone="light" />
          <ProcessSteps steps={servicesProcess} tone="light" className="mt-12" />
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <p className="eyebrow mb-6">{page.sections.partners?.eyebrow}</p>
          <PartnerMarquee partners={partners} tone="light" />
        </Container>
      </Section>

      {page.cta && <CtaBand cta={page.cta} />}
    </>
  );
}
