import type { CmsImage } from "@/lib/cms";
import { cn } from "@/lib/utils";

/**
 * Renders a service's icon as a plain image — never a bundled icon-font/react
 * component. The icon is whatever SVG the admin uploaded to the Media Library
 * in WordPress (Services → [entry] → Icon), so no code change or lucide name
 * is ever needed to add or change a service icon.
 *
 * Falls back to a neutral placeholder mark when a service hasn't had an icon
 * uploaded yet, rather than substituting a bundled icon.
 */
export function ServiceIcon({ icon, className }: { icon?: CmsImage; className?: string }) {
  if (!icon?.url) {
    return (
      <svg viewBox="0 0 24 24" className={cn("text-gold-500/40", className)} aria-hidden>
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-uploaded SVG, not an optimizable raster asset
  return <img src={icon.url} alt={icon.alt ?? ""} className={className} aria-hidden={!icon.alt} />;
}
