import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The site wordmark — a static asset (public/logo.png), not sourced from
 * WordPress: header/footer content is deliberately static Next.js code.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label="LX Realty — home">
      <Image src="/logo.png" alt="LX Realty" width={132} height={132} className="h-12 w-auto" priority />
    </Link>
  );
}
