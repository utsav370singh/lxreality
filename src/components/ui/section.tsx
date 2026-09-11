import { cn } from "@/lib/utils";
import type { SectionIntro } from "@/lib/cms";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "navy",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "navy" | "navy-dark" | "light" | "cream";
  id?: string;
}) {
  const tones = {
    navy: "bg-navy-900 text-[#f3f6fa]",
    "navy-dark": "bg-navy-950 text-[#f3f6fa]",
    light: "bg-white text-ink-900",
    cream: "section-light",
  } as const;
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}

interface HeadingProps {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  tone?: "dark" | "light";
}

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "left",
  as: Tag = "h2",
  className,
  tone = "dark",
}: HeadingProps) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      {(title || titleAccent) && (
        <Tag
          className={cn(
            "font-display leading-[1.1] tracking-tight",
            Tag === "h1"
              ? "text-4xl sm:text-5xl lg:text-[3.4rem]"
              : "text-3xl sm:text-4xl lg:text-[2.75rem]",
            tone === "dark" ? "text-white" : "text-ink-900",
          )}
        >
          {title}
          {title && titleAccent ? " " : ""}
          {titleAccent && <span className="gold-text-gradient">{titleAccent}</span>}
        </Tag>
      )}
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "dark" ? "text-mist-300" : "text-ink-700",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Convenience: render a CMS SectionIntro. */
export function SectionHeadingFrom({
  intro,
  ...rest
}: { intro?: SectionIntro } & Omit<HeadingProps, "eyebrow" | "title" | "titleAccent" | "description">) {
  return (
    <SectionHeading
      eyebrow={intro?.eyebrow}
      title={intro?.title}
      titleAccent={intro?.titleAccent}
      description={intro?.description}
      {...rest}
    />
  );
}
