import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Sparkles } from "lucide-react";
import type { Property } from "@/lib/cms";
import { cn } from "@/lib/utils";

export function PropertyCard({ property, className }: { property: Property; className?: string }) {
  return (
    <Link
      href={`/projects/${property.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-gold-500/15 bg-navy-850 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image.url}
          alt={property.image.alt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
        {property.badge && (
          <span className="absolute left-4 top-4 rounded-sm bg-navy-950/85 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-300 backdrop-blur">
            {property.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-xl font-semibold text-white">{property.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-mist-400">
            <MapPin className="size-3.5 text-gold-400" aria-hidden />
            {property.locality}, {property.city}
          </p>
        </div>

        <p className="font-display text-lg font-semibold text-gold-300">{property.priceLabel}</p>

        <div className="mt-auto flex flex-wrap gap-2 border-t border-white/5 pt-3">
          {property.tags.map((tag, i) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/20 px-2.5 py-1 text-[0.65rem] text-mist-300"
            >
              {i === 0 ? (
                <Building2 className="size-3 text-gold-400" aria-hidden />
              ) : (
                <Sparkles className="size-3 text-gold-400" aria-hidden />
              )}
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
