import type {
  Award,
  CmsImage,
  FooterColumn,
  Insight,
  Job,
  Leader,
  NavItem,
  Navigation,
  Office,
  PageContent,
  Partner,
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

const list = (rows: any[] | null | undefined, key = "item"): string[] =>
  (rows ?? []).map((r) => decode(r?.[key])).filter(Boolean);

const labelList = (rows: any[] | null | undefined): string[] =>
  (rows ?? []).map((r) => decode(r?.label)).filter(Boolean);

const pairs = (rows: any[] | null | undefined) =>
  (rows ?? [])
    .map((r) => ({ label: decode(r?.label), value: decode(r?.value) }))
    .filter((p) => p.label || p.value);

export function mapProperty(node: any): Property {
  const f = node.propertyFields ?? {};
  return {
    id: String(node.databaseId),
    slug: node.slug,
    title: decode(node.title),
    segment: f.segment === "commercial" ? "commercial" : "residential",
    badge: f.badge || undefined,
    locality: decode(f.locality),
    city: decode(f.city),
    priceLabel: decode(f.priceLabel),
    image: mapImage(f.image, decode(node.title)),
    gallery: (f.gallery?.nodes ?? []).map((g: any) => mapImage(g, decode(node.title))),
    tags: labelList(f.tags),
    configuration: f.configuration || undefined,
    developer: f.developer || undefined,
    status: f.status || undefined,
    reraId: f.reraId || undefined,
    featured: Boolean(f.featured),
    order: Number(f.displayOrder ?? 999),
    description: decode(f.description),
    overview: decode(f.overview),
    amenities: list(f.amenities),
    specifications: pairs(f.specifications),
    connectivity: pairs(f.connectivity),
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
    responsibilities: list(f.responsibilities),
    requirements: list(f.requirements),
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
    group: (f.group || "home").toLowerCase(),
    order: Number(f.displayOrder ?? 999),
  };
}

export function mapInsight(node: any): Insight {
  const f = node.insightFields ?? {};
  const kind =
    f.kind === "perspective" ? "perspective" : f.kind === "report" ? "report" : "article";
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
    topics: labelList(f.topics),
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
    bullets: list(f.bullets),
    order: Number(f.displayOrder ?? 999),
  };
}

export function mapOffice(node: any): Office {
  const f = node.officeFields ?? {};
  return {
    id: String(node.databaseId),
    name: decode(node.title),
    kind: f.kind === "corporate" ? "corporate" : "branch",
    address: decode(f.address),
    city: decode(f.city),
    phone: decode(f.phone),
    image: f.image?.node ? mapImage(f.image, decode(node.title)) : undefined,
    features: list(f.features),
    mapEmbedUrl: f.mapEmbedUrl || undefined,
    directionsUrl: f.directionsUrl || undefined,
    order: Number(f.displayOrder ?? 999),
  };
}

export function mapPartner(node: any): Partner {
  const f = node.partnerFields ?? {};
  const group = (f.group || "general").toLowerCase();
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
    stats: (s.stats ?? []).map((r: any) => ({
      value: decode(r.value),
      label: decode(r.label),
      icon: r.icon || undefined,
    })),
  };
}

export function mapSitePage(node: any): PageContent {
  const f = node.pageFields ?? {};
  const sections: PageContent["sections"] = {};
  for (const s of f.sections ?? []) {
    if (!s?.slug) continue;
    sections[s.slug] = {
      eyebrow: decode(s.eyebrow) || undefined,
      title: decode(s.title) || undefined,
      titleAccent: decode(s.titleAccent) || undefined,
      description: decode(s.description) || undefined,
    };
  }

  return {
    key: f.key,
    hero: {
      eyebrow: decode(f.heroEyebrow) || undefined,
      title: decode(f.heroTitle),
      titleAccent: decode(f.heroTitleAccent) || undefined,
      description: decode(f.heroDescription) || undefined,
      image: mapImage(f.heroImage, decode(f.heroTitle)),
      breadcrumb: labelList(f.heroBreadcrumb),
      features: (f.heroFeatures ?? []).map((x: any) => ({
        icon: x.icon || undefined,
        title: decode(x.title),
        description: decode(x.description) || undefined,
      })),
      statsPanelTitle: decode(f.heroStatsPanelTitle) || undefined,
      stats: (f.heroStats ?? []).map((x: any) => ({
        value: decode(x.value),
        label: decode(x.label),
        icon: x.icon || undefined,
      })),
      primaryCta: f.heroPrimaryCtaLabel
        ? { label: decode(f.heroPrimaryCtaLabel), href: f.heroPrimaryCtaHref || "#" }
        : undefined,
      secondaryCta: f.heroSecondaryCtaLabel
        ? { label: decode(f.heroSecondaryCtaLabel), href: f.heroSecondaryCtaHref || "#" }
        : undefined,
    },
    sections,
    cta: f.ctaTitle
      ? {
          title: decode(f.ctaTitle),
          titleAccent: decode(f.ctaTitleAccent) || undefined,
          description: decode(f.ctaDescription) || undefined,
          image: f.ctaImage?.node ? mapImage(f.ctaImage) : undefined,
          primaryCta: f.ctaPrimaryLabel
            ? { label: decode(f.ctaPrimaryLabel), href: f.ctaPrimaryHref || "#" }
            : undefined,
          secondaryCta: f.ctaSecondaryLabel
            ? { label: decode(f.ctaSecondaryLabel), href: f.ctaSecondaryHref || "#" }
            : undefined,
        }
      : undefined,
  };
}

/* ------------------------------------------------------------------ */
/*  Navigation — WordPress' native menus, flat list -> one-level tree  */
/* ------------------------------------------------------------------ */

const navHref = (path?: string | null): string => {
  if (!path) return "#";
  if (/^https?:\/\//.test(path)) return path;
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : withSlash;
};

interface RawMenuNode {
  databaseId: number;
  parentDatabaseId: number | null;
  label: string;
  path: string | null;
  description: string | null;
  order: number | null;
}

const sortByOrder = (a: RawMenuNode, b: RawMenuNode) => (a.order ?? 0) - (b.order ?? 0);

export function mapPrimaryNav(nodes: RawMenuNode[]): NavItem[] {
  const sorted = [...nodes].sort(sortByOrder);
  const byParent = new Map<number, RawMenuNode[]>();
  for (const n of sorted) {
    const key = n.parentDatabaseId ?? 0;
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key)!.push(n);
  }
  const toItem = (n: RawMenuNode): NavItem => {
    const children = (byParent.get(n.databaseId) ?? []).map(toItem);
    return {
      label: decode(n.label),
      href: navHref(n.path),
      description: decode(n.description) || undefined,
      children: children.length ? children : undefined,
    };
  };
  return (byParent.get(0) ?? []).map(toItem);
}

/**
 * A top-level "footer" menu item becomes a column heading; its children
 * become the links in that column (build the column in Appearance → Menus by
 * nesting links under a parent item — the parent's own link is unused).
 */
export function mapFooterNav(nodes: RawMenuNode[]): FooterColumn[] {
  const sorted = [...nodes].sort(sortByOrder);
  const topLevel = sorted.filter((n) => !n.parentDatabaseId);
  return topLevel
    .map((col) => ({
      title: decode(col.label),
      links: sorted
        .filter((n) => n.parentDatabaseId === col.databaseId)
        .map((n) => ({ label: decode(n.label), href: navHref(n.path) })),
    }))
    .filter((col) => col.links.length > 0);
}

export function mapNavigation(data: any): Navigation {
  return {
    primary: mapPrimaryNav(data?.primary?.nodes ?? []),
    footer: mapFooterNav(data?.footer?.nodes ?? []),
  };
}
