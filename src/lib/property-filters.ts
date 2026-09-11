import type { Property } from "@/lib/cms";

/** Parses the leading crore figure out of a price label like "₹ 6.5 Cr* Onwards" -> 6.5. */
export function parseCrore(priceLabel: string): number | null {
  const m = priceLabel.replace(/,/g, "").match(/([\d.]+)\s*Cr/i);
  return m ? Number(m[1]) : null;
}

export const BUDGET_RANGES = [
  { value: "0-3", label: "Up to ₹ 3 Cr", min: 0, max: 3 },
  { value: "3-6", label: "₹ 3 – 6 Cr", min: 3, max: 6 },
  { value: "6-99", label: "₹ 6 Cr +", min: 6, max: Infinity },
] as const;

export const PROPERTY_TYPE_OPTIONS = [
  "BHK Homes",
  "Villas",
  "Office Spaces",
  "Retail",
  "Luxury",
] as const;

/** Everything about a property, lowercased, for loose free-text matching. */
function haystack(p: Property): string {
  return [p.title, p.locality, p.city, p.configuration, p.developer, p.status, p.badge, ...p.tags]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/** "Villas" -> also matches "villa"; "BHK Homes" -> matches "bhk"; etc. */
function typeKeywords(type: string): string[] {
  const t = type.toLowerCase();
  if (t.includes("bhk")) return ["bhk"];
  if (t.includes("villa")) return ["villa"];
  if (t.includes("office")) return ["office"];
  if (t.includes("retail")) return ["retail"];
  if (t.includes("luxury")) return ["luxury", "premium", "exclusive"];
  return [t];
}

export interface PropertySearchParams {
  location?: string;
  type?: string;
  budget?: string;
}

export function filterProperties(properties: Property[], params: PropertySearchParams): Property[] {
  const location = params.location?.trim().toLowerCase();
  const type = params.type?.trim();
  const range = BUDGET_RANGES.find((r) => r.value === params.budget);

  return properties.filter((p) => {
    if (location && !haystack(p).includes(location)) return false;
    if (type) {
      const keywords = typeKeywords(type);
      const hay = haystack(p);
      if (!keywords.some((k) => hay.includes(k))) return false;
    }
    if (range) {
      const price = parseCrore(p.priceLabel);
      if (price == null || price < range.min || price > range.max) return false;
    }
    return true;
  });
}

/** True if any recognized filter param is actually set. */
export function hasActiveFilters(params: PropertySearchParams): boolean {
  return Boolean(params.location || params.type || params.budget);
}
