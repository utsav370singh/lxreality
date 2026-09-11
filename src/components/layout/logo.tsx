import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CmsImage } from "@/lib/cms";

/**
 * Wordmark. If the CMS provides a logo image it is used; otherwise the
 * built-in "LX / REALTY" lockup renders (matches the mockups).
 */
export function Logo({
  image,
  className,
  tone = "light",
}: {
  image?: CmsImage;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label="LX Realty — home">
      {image?.url ? (
        <Image src={image.url} alt={image.alt || "LX Realty"} width={132} height={56} className="h-12 w-auto" />
      ) : (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.9rem] font-semibold tracking-[0.14em]",
              tone === "light" ? "text-white" : "text-navy-900",
            )}
          >
            LX
          </span>
          <span
            className={cn(
              "text-[0.6rem] font-medium tracking-[0.5em]",
              tone === "light" ? "text-gold-400" : "text-gold-600",
            )}
          >
            REALTY
          </span>
        </span>
      )}
    </Link>
  );
}
