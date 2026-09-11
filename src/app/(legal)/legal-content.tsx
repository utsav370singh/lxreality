import { Section, Container, SectionHeading } from "@/components/ui/section";

export function LegalPage({
  title,
  updated = "January 2026",
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <Section tone="cream" className="pt-32">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={`Last updated ${updated}`} title={title} as="h1" tone="light" />
        <div className="prose-lx mt-8 space-y-4 text-sm leading-relaxed text-ink-700 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink-900">
          {children}
        </div>
      </Container>
    </Section>
  );
}
