"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Scroll-snap carousel with prev/next controls. Children are the slides;
 * width per slide is set by the caller via `slideClassName`.
 */
export function Carousel({
  children,
  slideClassName,
  className,
  controlsTone = "dark",
  ariaLabel = "Carousel",
}: {
  children: React.ReactNode[];
  slideClassName?: string;
  className?: string;
  controlsTone?: "dark" | "light";
  ariaLabel?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 280);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const btn = cn(
    "flex size-10 items-center justify-center rounded-full border transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
    controlsTone === "dark"
      ? "border-gold-500/40 text-gold-300 hover:bg-gold-500/10"
      : "border-ink-900/20 text-ink-700 hover:bg-ink-900/5",
  );

  return (
    <div
      className={cn("relative min-w-0", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:px-0 sm:scroll-px-0"
      >
        {children.map((child, i) => (
          <div key={i} className={cn("shrink-0 snap-start", slideClassName)}>
            {child}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button type="button" className={btn} onClick={() => scrollBy(-1)} disabled={atStart} aria-label="Previous">
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" className={btn} onClick={() => scrollBy(1)} disabled={atEnd} aria-label="Next">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
