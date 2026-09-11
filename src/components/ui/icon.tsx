import { icons, type LucideProps } from "lucide-react";

/**
 * Render a lucide icon by name (the string stored in the CMS, e.g. "Building2").
 * Falls back to a neutral dot so a typo in WordPress never crashes a page.
 */
export function Icon({
  name,
  fallback = "Circle",
  ...props
}: { name?: string | null; fallback?: keyof typeof icons } & LucideProps) {
  const Cmp = (name && icons[name as keyof typeof icons]) || icons[fallback];
  return <Cmp {...props} />;
}
