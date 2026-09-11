import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Download, MapPin, Check } from "lucide-react";
import { getProperties, getProperty } from "@/lib/cms";
import { Section, Container, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/cards/property-card";
import { Carousel } from "@/components/ui/carousel";

export const revalidate = 300;

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return { title: "Project Not Found" };
  return {
    title: `${property.title} — ${property.locality}, ${property.city}`,
    description: property.description,
    openGraph: { images: [property.image.url] },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const related = (await getProperties({ segment: property.segment }))
    .filter((p) => p.slug !== property.slug)
    .slice(0, 4);

  const segmentLabel = property.segment === "commercial" ? "Commercial" : "Residential";

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden hero-navy">
        <div className="absolute inset-0 -z-10">
          <Image src={property.image.url} alt={property.image.alt} fill priority sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
        </div>
        <Container className="relative pt-28 pb-14 sm:pt-32">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-mist-400">
            {["Home", "Projects", segmentLabel].map((c, i) => (
              <span key={c} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3 text-gold-500/60" aria-hidden />}
                <Link
                  href={i === 0 ? "/" : i === 1 ? "/projects/residential" : `/projects/${property.segment}`}
                  className="hover:text-gold-300"
                >
                  {c}
                </Link>
              </span>
            ))}
            <ChevronRight className="size-3 text-gold-500/60" aria-hidden />
            <span className="text-gold-300">{property.title}</span>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              {property.badge && (
                <span className="mb-4 inline-block rounded-sm bg-gold-500/15 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
                  {property.badge}
                </span>
              )}
              <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">{property.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-sm text-mist-300">
                <MapPin className="size-4 text-gold-400" aria-hidden />
                {property.locality}, {property.city}
                {property.developer && <span className="text-mist-400">· by {property.developer}</span>}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {property.tags.map((t) => (
                  <span key={t} className="rounded-full border border-gold-500/25 px-3 py-1 text-xs text-mist-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="panel rounded-2xl p-6">
              <p className="text-[0.7rem] uppercase tracking-[0.14em] text-mist-400">Starting Price</p>
              <p className="mt-1 font-display text-3xl font-semibold text-gold-300">{property.priceLabel}</p>
              <div className="mt-4 flex flex-col gap-3">
                <Button href="/contact" size="sm">Enquire Now</Button>
                {property.brochureUrl && (
                  <a
                    href={property.brochureUrl}
                    className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300"
                  >
                    <Download className="size-4" aria-hidden /> Download Brochure
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      {property.gallery.length > 0 && (
        <Section tone="navy" className="py-10">
          <Container>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {property.gallery.map((g, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={g.url} alt={g.alt} fill sizes="(max-width: 1024px) 45vw, 280px" className="object-cover" />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Overview + specs */}
      <Section tone="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <SectionHeading eyebrow="Overview" title="About the Project" tone="light" as="h2" />
              <p className="mt-5 text-base leading-relaxed text-ink-700">{property.overview}</p>

              {property.amenities.length > 0 && (
                <>
                  <h3 className="mt-10 font-display text-2xl font-semibold text-ink-900">Amenities</h3>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {property.amenities.map((a) => (
                      <li key={a} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold-500" aria-hidden />
                        {a}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <aside className="space-y-8">
              {property.specifications.length > 0 && (
                <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
                  <h3 className="font-display text-xl font-semibold text-ink-900">Specifications</h3>
                  <dl className="mt-4 divide-y divide-ink-900/5">
                    {property.specifications.map((s) => (
                      <div key={s.label} className="flex justify-between gap-4 py-2.5 text-sm">
                        <dt className="text-ink-500">{s.label}</dt>
                        <dd className="text-right font-medium text-ink-900">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {property.connectivity.length > 0 && (
                <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
                  <h3 className="font-display text-xl font-semibold text-ink-900">Connectivity</h3>
                  <dl className="mt-4 divide-y divide-ink-900/5">
                    {property.connectivity.map((s) => (
                      <div key={s.label} className="flex justify-between gap-4 py-2.5 text-sm">
                        <dt className="text-ink-500">{s.label}</dt>
                        <dd className="text-right font-medium text-ink-900">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {property.reraId && (
                <p className="text-xs text-ink-500">RERA: {property.reraId}</p>
              )}
            </aside>
          </div>
        </Container>
      </Section>

      {/* Location */}
      {property.location?.mapEmbedUrl && (
        <Section tone="cream" className="pt-0">
          <Container>
            <SectionHeading eyebrow="Location" title={`${property.locality}, ${property.city}`} tone="light" as="h2" />
            <div className="mt-6 aspect-[16/7] overflow-hidden rounded-2xl border border-ink-900/10 bg-mist-100">
              <iframe
                src={property.location.mapEmbedUrl}
                title={`Map of ${property.title}`}
                className="size-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Container>
        </Section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <Section tone="navy">
          <Container>
            <SectionHeading eyebrow="More Projects" title={`Other ${segmentLabel} Projects`} as="h2" />
            <Carousel className="mt-10" slideClassName="w-[280px]" ariaLabel="Related projects">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} className="h-full" />
              ))}
            </Carousel>
          </Container>
        </Section>
      )}
    </>
  );
}
