"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Scroll-snap carousel with prev/next controls. Children are the slides;
 * width per slide is set by the caller via `slideClassName`. When `autoPlay`
 * is set, it advances by itself on that interval, loops back to the start,
 * and pauses while the pointer is over it or it holds focus — a manual click
 * on prev/next resets the timer instead of fighting it. Disabled automatically
 * for prefers-reduced-motion (the manual controls still work).
 */
export function Carousel({
  children,
  slideClassName,
  className,
  controlsTone = "dark",
  ariaLabel = "Carousel",
  autoPlay,
}: {
  children: React.ReactNode[];
  slideClassName?: string;
  className?: string;
  controlsTone?: "dark" | "light";
  ariaLabel?: string;
  /** Auto-advance interval in ms, e.g. 5000. Omit to leave it manual-only. */
  autoPlay?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);

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

  useEffect(() => {
    if (!autoPlay || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const atLastSlide = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atLastSlide) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: Math.max(el.clientWidth * 0.8, 280), behavior: "smooth" });
      }
    }, autoPlay);

    return () => window.clearInterval(id);
  }, [autoPlay, paused]);

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
      onMouseEnter={autoPlay ? () => setPaused(true) : undefined}
      onMouseLeave={autoPlay ? () => setPaused(false) : undefined}
      onFocus={autoPlay ? () => setPaused(true) : undefined}
      onBlur={autoPlay ? () => setPaused(false) : undefined}
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
