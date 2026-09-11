import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import type { PageHero as PageHeroData } from "@/lib/cms";
import { Container } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/**
 * The shared inner-page hero: navy gradient, breadcrumb, serif headline with a
 * gold accent, an icon feature row, and the floating "BY NUMBERS" panel.
 * Matches the Advisory / Projects / Careers / Contact / Insights layouts.
 */
export function PageHero({ hero }: { hero: PageHeroData }) {
  const hasPanel = hero.stats.length > 0;

  return (
    <section className="relative isolate overflow-hidden hero-navy">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.image.url}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/70" />
      </div>

      <Container className="relative pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
        {hero.breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-mist-400">
            {hero.breadcrumb.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3 text-gold-500/60" aria-hidden />}
                <span className={cn(i === hero.breadcrumb.length - 1 && "text-gold-300")}>
                  {crumb}
                </span>
              </span>
            ))}
          </nav>
        )}

        <div className={cn("grid gap-10", hasPanel && "lg:grid-cols-[1fr_320px] lg:gap-12")}>
          <div className="max-w-2xl">
            {hero.eyebrow && <p className="eyebrow mb-4">{hero.eyebrow}</p>}
            <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              {hero.title}
              {hero.titleAccent && (
                <>
                  {" "}
                  <span className="gold-text-gradient">{hero.titleAccent}</span>
                </>
              )}
            </h1>
            {hero.description && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-300">
                {hero.description}
              </p>
            )}

            {(hero.primaryCta || hero.secondaryCta) && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {hero.primaryCta && (
                  <Button href={hero.primaryCta.href} size="lg">
                    {hero.primaryCta.label}
                  </Button>
                )}
                {hero.secondaryCta && (
                  <Link
                    href={hero.secondaryCta.href}
                    className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                  >
                    <span className="flex size-11 items-center justify-center rounded-full border border-gold-500/50 text-gold-300 transition-colors group-hover:bg-gold-500/10">
                      <Play className="size-4 fill-current" aria-hidden />
                    </span>
                    {hero.secondaryCta.label}
                  </Link>
                )}
              </div>
            )}

            {hero.features.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-5 border-t border-gold-500/15 pt-7">
                {hero.features.map((f) => (
                  <li key={f.title} className="flex items-center gap-3">
                    <Icon name={f.icon} className="size-6 shrink-0 text-gold-400" strokeWidth={1.5} aria-hidden />
                    <span>
                      <span className="block text-sm font-semibold text-white">{f.title}</span>
                      {f.description && (
                        <span className="block text-xs text-mist-400">{f.description}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {hasPanel && (
            <aside className="panel h-fit rounded-2xl p-6 lg:sticky lg:top-28">
              {hero.statsPanelTitle && (
                <p className="eyebrow mb-5 border-b border-gold-500/20 pb-4">
                  {hero.statsPanelTitle}
                </p>
              )}
              <ul className="space-y-5">
                {hero.stats.map((s) => (
                  <li key={s.label} className="flex items-center gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold-500/30 bg-navy-800">
                      <Icon name={s.icon} className="size-4 text-gold-400" strokeWidth={1.5} aria-hidden />
                    </span>
                    <span>
                      <span className="block font-display text-xl font-semibold text-white">
                        {s.value}
                      </span>
                      <span className="block text-[0.72rem] uppercase tracking-[0.1em] text-mist-400">
                        {s.label}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </Container>
    </section>
  );
}
