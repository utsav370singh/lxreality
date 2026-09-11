import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getInsight, getInsights } from "@/lib/cms";
import { Section, Container } from "@/components/ui/section";
import { InsightCard } from "@/components/cards/insight-card";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export async function generateStaticParams() {
  const all = await getInsights();
  return all.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return { title: "Article Not Found" };
  return {
    title: insight.title,
    description: insight.excerpt,
    openGraph: { images: [insight.image.url], type: "article" },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  const related = (await getInsights({ limit: 4 })).filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden hero-navy pt-28 pb-14 sm:pt-32">
        <div className="absolute inset-0 -z-10">
          <Image src={insight.image.url} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40" />
        </div>
        <Container className="relative max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-mist-400">
            <Link href="/" className="hover:text-gold-300">Home</Link>
            <ChevronRight className="size-3 text-gold-500/60" aria-hidden />
            <Link href="/insights" className="hover:text-gold-300">Insights</Link>
            <ChevronRight className="size-3 text-gold-500/60" aria-hidden />
            <span className="text-gold-300">{insight.category}</span>
          </nav>
          <p className="eyebrow mb-3">{insight.category}</p>
          <h1 className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-[2.9rem]">
            {insight.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-mist-400">
            <time>{formatDate(insight.date)}</time>
            {insight.readingTime && <span>· {insight.readingTime}</span>}
            {insight.author && <span>· {insight.author}</span>}
          </div>
        </Container>
      </section>

      <Section tone="cream">
        <Container className="max-w-3xl">
          <div
            className="prose-lx space-y-5 text-base leading-relaxed text-ink-700 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_p]:m-0"
            dangerouslySetInnerHTML={{ __html: insight.body ?? `<p>${insight.excerpt}</p>` }}
          />

          {insight.topics.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-ink-900/10 pt-6">
              {insight.topics.map((t) => (
                <Link
                  key={t}
                  href={`/insights?topic=${encodeURIComponent(t)}#topics`}
                  className="rounded-full border border-ink-900/15 bg-white px-3 py-1 text-xs text-ink-700"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="cream" edge="bottom">
          <Container>
            <p className="eyebrow mb-6">Related Insights</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((i) => (
                <InsightCard key={i.id} insight={i} tone="light" />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
