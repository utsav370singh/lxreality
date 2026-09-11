import Image from "next/image";
import type { Partner } from "@/lib/cms";
import { cn } from "@/lib/utils";

/**
 * Continuously scrolling logo strip. The list is duplicated so the CSS
 * translateX(-50%) loop is seamless. Falls back to static wrap if reduced-motion.
 */
export function PartnerMarquee({
  partners,
  tone = "light",
  className,
}: {
  partners: Partner[];
  tone?: "dark" | "light";
  className?: string;
}) {
  if (!partners.length) return null;
  const loop = [...partners, ...partners];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex w-max animate-marquee items-center gap-12">
        {loop.map((p, i) => (
          <div key={`${p.id}-${i}`} className="flex h-14 w-32 shrink-0 items-center justify-center">
            <Image
              src={p.logo.url}
              alt={p.logo.alt}
              width={128}
              height={56}
              className={cn(
                "max-h-12 w-auto object-contain opacity-70 transition-opacity hover:opacity-100",
                tone === "light" ? "" : "brightness-0 invert",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
