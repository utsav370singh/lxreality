import Image from "next/image";
import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import type { PageContent } from "@/lib/cms";

export function CtaBand({ cta }: { cta: NonNullable<PageContent["cta"]> }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-16 sm:py-20">
      {cta.image && (
        <div className="absolute inset-0 -z-10">
          <Image src={cta.image.url} alt="" fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/50" />
        </div>
      )}
      <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
            {cta.title}
            {cta.titleAccent && (
              <>
                {" "}
                <span className="gold-text-gradient">{cta.titleAccent}</span>
              </>
            )}
          </h2>
          {cta.description && (
            <p className="mt-4 text-base leading-relaxed text-mist-300">{cta.description}</p>
          )}
        </div>
        {(cta.primaryCta || cta.secondaryCta) && (
          <div className="flex flex-wrap gap-4">
            {cta.primaryCta && (
              <Button href={cta.primaryCta.href} size="lg">
                {cta.primaryCta.label}
              </Button>
            )}
            {cta.secondaryCta && (
              <Button href={cta.secondaryCta.href} size="lg" variant="outline">
                {cta.secondaryCta.label}
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
