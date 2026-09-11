import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileText, Quote } from "lucide-react";
import { getInsights, getPage, getResources } from "@/lib/cms";
import { PageHero } from "@/components/sections/page-hero";
import { Section, Container, SectionHeadingFrom } from "@/components/ui/section";
import { StatBar } from "@/components/ui/stat-bar";
import { Carousel } from "@/components/ui/carousel";
import { InsightCard } from "@/components/cards/insight-card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { InsightsBrowser } from "@/components/insights/insights-browser";

export const revalidate = 300;
export const metadata: Metadata = { title: "Insights" };

const INSIGHTS_STAT_BAR = [
  { value: "100+", label: "In-Depth Research Reports", icon: "FileText" },
  { value: "25+", label: "Expert Contributors", icon: "Users" },
  { value: "5000+", label: "Insights Delivered", icon: "Send" },
  { value: "1M+", label: "Professionals Reached", icon: "Building2" },
  { value: "15+", label: "Years of Market Intelligence", icon: "Award" },
];

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const [page, articles, perspectives, resources, allInsights, { topic }] = await Promise.all([
    getPage("insights"),
    getInsights({ kind: "article", limit: 4 }),
    getInsights({ kind: "perspective" }),
    getResources(),
    getInsights(),
    searchParams,
  ]);

  return (
    <>
      <PageHero hero={page.hero} />

      <Section tone="cream" className="py-0">
        <Container>
          <StatBar stats={INSIGHTS_STAT_BAR} tone="light" className="-mt-10 relative z-10 mb-16" />
        </Container>
      </Section>

      {/* Market insights */}
      <Section tone="cream" className="pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_2.2fr]">
            <div>
              <SectionHeadingFrom intro={page.sections.market} tone="light" />
              <ArrowLink href="/insights#topics" tone="light" className="mt-6">
                View All Insights
              </ArrowLink>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {articles.map((i) => (
                <InsightCard key={i.id} insight={i} tone="light" />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Expert perspectives */}
      <Section tone="navy">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_2.2fr] lg:items-center">
            <SectionHeadingFrom intro={page.sections.perspectives} />
            <Carousel slideClassName="w-[300px] sm:w-[340px]" ariaLabel="Expert perspectives">
              {perspectives.map((p) => (
                <figure key={p.id} className="flex h-full flex-col gap-4 rounded-2xl border border-gold-500/15 bg-navy-850 p-6">
                  <div className="flex items-center gap-4">
                    {p.authorPhoto && (
                      <Image src={p.authorPhoto.url} alt={p.authorPhoto.alt} width={56} height={56} className="size-14 rounded-full object-cover" />
                    )}
                    <figcaption>
                      <span className="block font-display text-lg font-semibold text-white">{p.author}</span>
                      <span className="block text-xs text-gold-300">{p.authorRole}</span>
                    </figcaption>
                  </div>
                  <Quote className="size-6 text-gold-400" aria-hidden />
                  <blockquote className="flex-1 text-sm leading-relaxed text-mist-200">{p.excerpt}</blockquote>
                  <Link
                    href={`/insights/${p.slug}`}
                    className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-400"
                  >
                    Read Perspective <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </figure>
              ))}
            </Carousel>
          </div>
        </Container>
      </Section>

      {/* Reports & resources */}
      <Section tone="cream" id="resources">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_2.2fr]">
            <div>
              <SectionHeadingFrom intro={page.sections.resources} tone="light" />
              <ArrowLink href="/insights#topics" tone="light" className="mt-6">
                View All Resources
              </ArrowLink>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {resources.map((r) => (
                <article key={r.id} className="flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
                  <div className="relative aspect-[16/10]">
                    <Image src={r.image.url} alt={r.image.alt} fill sizes="(max-width: 1024px) 45vw, 260px" className="object-cover" />
                    <span className="absolute left-3 top-3 bg-navy-950/85 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-gold-300">
                      {r.type}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-semibold leading-snug text-ink-900">{r.title}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-700">{r.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-ink-900/5 pt-3">
                      <span className="flex items-center gap-1.5 text-[0.7rem] text-ink-500">
                        <FileText className="size-3.5 text-gold-500" aria-hidden /> {r.fileSize}
                      </span>
                      <a
                        href={r.fileUrl}
                        aria-label={`Download ${r.title}`}
                        className="flex size-8 items-center justify-center rounded-full border border-ink-900/15 text-ink-700 hover:bg-ink-900/5"
                      >
                        <Download className="size-4" aria-hidden />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Topics — the full library, filterable by tag */}
      <Section tone="cream" id="topics">
        <Container>
          <SectionHeadingFrom intro={page.sections.topics} tone="light" />
          <div className="mt-8">
            <InsightsBrowser insights={allInsights} resources={resources} initialTopic={topic} />
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      {page.cta && (
        <section className="relative isolate overflow-hidden bg-navy-950 pt-8 pb-8 sm:pt-9 sm:pb-9 lg:pt-10 lg:pb-10">
          {page.cta.image && (
            <div className="absolute inset-0 -z-10">
              <Image src={page.cta.image.url} alt="" fill sizes="100vw" className="object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950 to-navy-950/60" />
            </div>
          )}
          <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-lg">
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                {page.cta.title} <span className="gold-text-gradient">{page.cta.titleAccent}</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mist-300">{page.cta.description}</p>
            </div>
            <NewsletterForm />
          </Container>
        </section>
      )}
    </>
  );
}
