import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { getOffices, getPage, getSiteSettings } from "@/lib/cms";
import { PageHero } from "@/components/sections/page-hero";
import { Section, Container, SectionHeadingFrom } from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { Icon } from "@/components/ui/icon";
import { enquiryOptions, contactChannels } from "@/content/page-extras";

export const revalidate = 300;
export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const [page, settings, offices] = await Promise.all([
    getPage("contact"),
    getSiteSettings(),
    getOffices(),
  ]);

  const corporate = offices.find((o) => o.kind === "corporate");
  const branches = offices.filter((o) => o.kind === "branch");

  const channelValues = [
    settings.phone,
    settings.email,
    settings.whatsapp,
    settings.website,
    "Pick a slot that works for you.",
  ];

  return (
    <>
      <PageHero hero={page.hero} />

      {/* Get in touch */}
      <Section tone="navy">
        <Container>
          <SectionHeadingFrom intro={page.sections.getInTouch} align="center" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {contactChannels.map((c, i) => (
              <li key={c.title} className="rounded-2xl border border-gold-500/15 bg-navy-850 p-5">
                <Icon name={c.icon} className="size-6 text-gold-400" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-3 text-sm font-semibold text-white">{c.title}</h3>
                <p className="mt-1 font-display text-lg text-gold-300">{channelValues[i]}</p>
                <p className="mt-1 text-xs leading-relaxed text-mist-400">{c.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Corporate office + map */}
      {corporate && (
        <Section tone="navy" className="pt-0">
          <Container>
            <SectionHeadingFrom intro={page.sections.office} />
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
              <div className="rounded-2xl border border-gold-500/15 bg-navy-850 p-6">
                <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
                  <MapPin className="size-5 text-gold-400" aria-hidden /> {corporate.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-300">{corporate.address}</p>
                <ul className="mt-5 space-y-2.5">
                  {corporate.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-mist-300">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              {corporate.mapEmbedUrl && (
                <div className="aspect-[16/10] min-h-[320px] overflow-hidden rounded-2xl border border-gold-500/15 bg-mist-100">
                  <iframe
                    src={corporate.mapEmbedUrl}
                    title="LX Realty corporate office map"
                    className="size-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* Branches */}
      <Section tone="navy" className="pt-0">
        <Container>
          <p className="eyebrow mb-6">{page.sections.branches?.eyebrow}</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {branches.map((b) => (
              <li key={b.id} className="overflow-hidden rounded-2xl border border-gold-500/15 bg-navy-850">
                {b.image && (
                  <div className="relative aspect-[16/10]">
                    <Image src={b.image.url} alt={b.image.alt} fill sizes="(max-width: 1024px) 45vw, 220px" className="object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-300">{b.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist-400">{b.address}</p>
                  <p className="mt-3 flex items-center gap-1.5 border-t border-white/5 pt-3 text-xs text-mist-300">
                    <Phone className="size-3.5 text-gold-400" aria-hidden /> {b.phone}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Form + enquire */}
      <Section tone="navy-dark">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeadingFrom intro={page.sections.form} />
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
            <div>
              <SectionHeadingFrom intro={page.sections.enquire} />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {enquiryOptions.map((o) => (
                  <li key={o} className="flex items-center gap-2.5 rounded-lg border border-gold-500/15 bg-navy-850 px-4 py-3 text-sm text-mist-200">
                    <CheckCircle2 className="size-4 shrink-0 text-gold-400" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gold-500/25 bg-navy-850 p-5">
                <p className="text-sm text-mist-200">
                  Need immediate assistance? Our team is ready to help you.
                </p>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-lg gold-gradient px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-950"
                >
                  <Phone className="size-4" aria-hidden /> Call Us Now
                </a>
              </div>
              <p className="mt-6 flex items-center gap-2 text-xs text-mist-400">
                <Mail className="size-4 text-gold-400" aria-hidden />
                {settings.email} · {settings.officeHours}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
