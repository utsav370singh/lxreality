"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/cms";
import { TestimonialCard } from "./testimonial-card";
import { cn } from "@/lib/utils";

/**
 * A single testimonial slot that automatically cycles through the list every
 * few seconds (cross-fade), instead of freezing on testimonials[0] forever.
 * Renders nothing special for a single-item list — it just shows that one,
 * no pointless rotation.
 */
export function AutoTestimonial({
  testimonials,
  tone = "dark",
  intervalMs = 6000,
  className,
}: {
  testimonials: Testimonial[];
  tone?: "dark" | "light";
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [testimonials.length, intervalMs]);

  const current = testimonials[index];
  if (!current) return null;

  return (
    <div key={current.id} className={cn("animate-fade-in", className)}>
      <TestimonialCard testimonial={current} tone={tone} />
    </div>
  );
}
