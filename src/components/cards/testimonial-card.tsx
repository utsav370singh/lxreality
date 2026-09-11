import Image from "next/image";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/cms";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  testimonial,
  tone = "dark",
  className,
}: {
  testimonial: Testimonial;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col gap-5 rounded-2xl border p-6 sm:p-7",
        tone === "dark"
          ? "border-gold-500/15 bg-navy-850"
          : "border-ink-900/10 bg-white shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <Quote className="size-7 shrink-0 text-gold-400" aria-hidden />
      {testimonial.rating ? (
        <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                i < testimonial.rating! ? "fill-gold-400 text-gold-400" : "text-mist-400/40",
              )}
              aria-hidden
            />
          ))}
        </div>
      ) : null}
      <blockquote
        className={cn(
          "flex-1 text-[0.95rem] leading-relaxed",
          tone === "dark" ? "text-mist-200" : "text-ink-700",
        )}
      >
        {testimonial.quote}
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-white/5 pt-4">
        {testimonial.photo && (
          <Image
            src={testimonial.photo.url}
            alt={testimonial.photo.alt}
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
        )}
        <span>
          <span className={cn("block text-sm font-semibold", tone === "dark" ? "text-white" : "text-ink-900")}>
            {testimonial.name}
          </span>
          <span className="block text-xs text-mist-400">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
