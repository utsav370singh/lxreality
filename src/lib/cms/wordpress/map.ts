import type {
  Award,
  CmsImage,
  Insight,
  Job,
  Leader,
  Office,
  Partner,
  PageHero,
  Property,
  Resource,
  Service,
  SiteSettings,
  Testimonial,
  Value,
} from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const decode = (s?: string | null) =>
  (s ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/<\/?[^>]+>/g, "")
    .trim();

const PLACEHOLDER: CmsImage = { url: "/placeholder.svg", alt: "" };

/**
 * WPGraphQL for ACF returns every ACF `select` field as a list (to support
 * multi-select uniformly), even when the field only ever holds one value —
 * `segment`, `group`, `list`, `kind` all come back as e.g. `["commercial"]`
 * rather than `"commercial"`. Unwrap to a plain string either way.
 */
export const selectValue = (v: unknown): string =>
  Array.isArray(v) ? String(v[0] ?? "") : String(v ?? "");

export function mapImage(node: any, fallbackAlt = ""): CmsImage {
  const n = node?.node ?? node;
  if (!n?.sourceUrl) return { ...PLACEHOLDER, alt: fallbackAlt };
  return {
    url: n.sourceUrl,
    alt: n.altText || fallbackAlt,
    width: n.mediaDetails?.width ?? undefined,
    height: n.mediaDetails?.height ?? undefined,
  };
}

/**
 * ACF Free has no Repeater/Gallery field, so every "list" below is a plain
 * Textarea the admin fills in one item per line (see the field's
 * `instructions` text in includes/acf-fields.php for the exact format shown
 * in wp-admin). These helpers turn that back into structured data.
 */

/** One value per line — amenities, bullets, responsibilities, features, etc. */
const lines = (text?: string | null): string[] =>
  decode(text)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

/** Comma-separated short list — tags, topics. */
const commaList = (text?: string | null): string[] =>
  decode(text)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

/** One "Label: Value" pair per line — specifications, connectivity. */
const linePairs = (text?: string | null) =>
  lines(text)
    .map((line) => {
      const i = line.indexOf(":");
      return i === -1
        ? { label: line, value: "" }
        : { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() };
    })
    .filter((p) => p.label || p.value);

/** One "Icon | Value | Label" stat per line — the global stat bar. */
const statLines = (text?: string | null) =>
  lines(text)
    .map((line) => {
      const [icon, value, label] = line.split("|").map((s) => s.trim());
      return { icon: icon || undefined, value: value ?? "", label: label ?? "" };
    })
    .filter((s) => s.value || s.label);

export function mapProperty(node: any): Property {
  const f = node.propertyFields ?? {};
  const gallery = [f.gallery1, f.gallery2, f.gallery3, f.gallery4]
    .filter((g) => g?.node)
    .map((g) => mapImage(g, decode(node.title)));
  return {
    id: String(node.databaseId),
    slug: node.slug,
    title: decode(node.title),
    segment: selectValue(f.segment) === "commercial" ? "commercial" : "residential",
    badge: f.badge || undefined,
    locality: decode(f.locality),
    city: decode(f.city),
    priceLabel: decode(f.priceLabel),
    image: mapImage(f.image, decode(node.title)),
    gallery,
    tags: commaList(f.tags),
    configuration: f.configuration || undefined,
    developer: f.developer || undefined,
    status: f.status || undefined,
    reraId: f.reraId || undefined,
    featured: Boolean(f.featured),
    order: Number(f.displayOrder ?? 999),
    description: decode(f.description),
    overview: decode(f.overview),
    amenities: lines(f.amenities),
    specifications: linePairs(f.specifications),
    connectivity: linePairs(f.connectivity),
    brochureUrl: f.brochureUrl || undefined,
    location:
      f.locationLat && f.locationLng
        ? {
            lat: Number(f.locationLat),
            lng: Number(f.locationLng),
            mapEmbedUrl: f.mapEmbedUrl || undefined,
          }
        : undefined,
  };
}

export function mapLeader(node: any): Leader {
  const f = node.leaderFields ?? {};
  return {
    id: String(node.databaseId),
    name: decode(node.title),
    role: decode(f.role),
    photo: mapImage(f.photo, decode(node.title)),
    linkedin: f.linkedin || undefined,
    bio: decode(f.bio) || undefined,
    order: Number(f.displayOrder ?? 999),
  };
}

export function mapJob(node: any): Job {
  const f = node.jobFields ?? {};
  return {
    id: String(node.databaseId),
    slug: node.slug,
    title: decode(node.title),
    department: decode(f.department),
    location: decode(f.location),
    experience: decode(f.experience),
    type: decode(f.type) || "Full-time",
    summary: decode(f.summary),
    responsibilities: lines(f.responsibilities),
    requirements: lines(f.requirements),
    applyUrl: f.applyUrl || "mailto:careers@lxrealty.in",
    postedAt: node.date,
  };
}

export function mapTestimonial(node: any): Testimonial {
  const f = node.testimonialFields ?? {};
  return {
    id: String(node.databaseId),
    quote: decode(f.quote),
    name: decode(f.personName),
    role: decode(f.personRole),
    photo: f.photo?.node ? mapImage(f.photo, decode(f.personName)) : undefined,
    rating: f.rating ? Number(f.rating) : undefined,
    group: (selectValue(f.group) || "home").toLowerCase(),
    order: Number(f.displayOrder ?? 999),
  };
}

export function mapInsight(node: any): Insight {
  const f = node.insightFields ?? {};
  const kindValue = selectValue(f.kind);
  const kind = kindValue === "perspective" ? "perspective" : kindValue === "report" ? "report" : "article";
  return {
    id: String(node.databaseId),
    slug: node.slug,
    title: decode(node.title),
    category: decode(f.category),
    date: node.date,
    excerpt: decode(f.excerpt),
    image: mapImage(f.image, decode(node.title)),
    kind,
    body: f.body || undefined,
    readingTime: f.readingTime || undefined,
    author: decode(f.author) || undefined,
    authorRole: decode(f.authorRole) || undefined,
    authorPhoto: f.authorPhoto?.node ? mapImage(f.authorPhoto, decode(f.author)) : undefined,
    topics: commaList(f.topics),
  };
}

export function mapResource(node: any): Resource {
  const f = node.resourceFields ?? {};
  return {
    id: String(node.databaseId),
    title: decode(node.title),
    type: decode(f.type),
    description: decode(f.description),
    image: mapImage(f.image, decode(node.title)),
    fileUrl: f.fileUrl || "#",
    fileSize: decode(f.fileSize),
  };
}

export function mapService(node: any): Service {
  const f = node.serviceFields ?? {};
  return {
    id: String(node.databaseId),
    slug: node.slug,
    title: decode(node.title),
    excerpt: decode(f.excerpt),
    icon: f.icon?.node ? mapImage(f.icon, `${decode(node.title)} icon`) : undefined,
    image: f.image?.node ? mapImage(f.image, decode(node.title)) : undefined,
    bullets: lines(f.bullets),
    order: Number(f.displayOrder ?? 999),
  };
}

export function mapOffice(node: any): Office {
  const f = node.officeFields ?? {};
  return {
    id: String(node.databaseId),
    name: decode(node.title),
    kind: selectValue(f.kind) === "corporate" ? "corporate" : "branch",
    address: decode(f.address),
    city: decode(f.city),
    phone: decode(f.phone),
    image: f.image?.node ? mapImage(f.image, decode(node.title)) : undefined,
    features: lines(f.features),
    mapEmbedUrl: f.mapEmbedUrl || undefined,
    directionsUrl: f.directionsUrl || undefined,
    order: Number(f.displayOrder ?? 999),
  };
}

export function mapPartner(node: any): Partner {
  const f = node.partnerFields ?? {};
  const group = (selectValue(f.group) || "general").toLowerCase();
  return {
    id: String(node.databaseId),
    name: decode(node.title),
    logo: mapImage(f.logo, decode(node.title)),
    group: (["developer", "bank", "interior", "client"].includes(group)
      ? group
      : "general") as Partner["group"],
    order: Number(f.displayOrder ?? 999),
  };
}

export function mapAward(node: any): Award {
  const f = node.awardFields ?? {};
  return {
    id: String(node.databaseId),
    title: decode(node.title),
    year: decode(f.year),
    image: f.image?.node ? mapImage(f.image, decode(node.title)) : undefined,
    order: Number(f.displayOrder ?? 999),
  };
}

export function mapValue(node: any): Value {
  const f = node.valueFields ?? {};
  return {
    icon: f.icon || undefined,
    title: decode(node.title),
    description: decode(f.description),
    order: Number(f.displayOrder ?? 999),
  };
}

export function mapSiteSettings(data: any): SiteSettings {
  const s = data.lxSiteSettings ?? {};
  return {
    companyName: decode(s.companyName) || "LX Realty",
    logo: s.logo?.node ? mapImage(s.logo, "LX Realty") : undefined,
    phone: decode(s.phone),
    email: decode(s.email),
    whatsapp: decode(s.whatsapp),
    website: decode(s.website),
    address: decode(s.address),
    officeHours: decode(s.officeHours),
    footerBlurb: decode(s.footerBlurb),
    socials: {
      linkedin: s.linkedin || undefined,
      instagram: s.instagram || undefined,
      facebook: s.facebook || undefined,
      youtube: s.youtube || undefined,
    },
    stats: statLines(s.stats),
  };
}

/**
 * A page's optional hero override (photo + copy) from its "Site Pages" post —
 * everything else about the page (section intros, CTA, feature/stat rows)
 * comes from src/content/site-pages.ts and never from WordPress. Returns only
 * the fields that were actually filled in, so the caller can merge this over
 * the static default without clobbering anything left blank.
 */
export function mapPageHeroOverride(node: any): Partial<PageHero> & { hasImage: boolean } {
  const f = node?.pageHeroFields ?? {};
  const override: Partial<PageHero> & { hasImage: boolean } = { hasImage: false };
  if (f.eyebrow) override.eyebrow = decode(f.eyebrow);
  if (f.title) override.title = decode(f.title);
  if (f.titleAccent) override.titleAccent = decode(f.titleAccent);
  if (f.description) override.description = decode(f.description);
  if (f.image?.node) {
    override.image = mapImage(f.image, override.title);
    override.hasImage = true;
  }
  return override;
}

