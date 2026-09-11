/**
 * Domain model for the LX Realty site.
 *
 * These types are the single contract between the front-end and *any* CMS.
 * The mock provider and the WordPress (WPGraphQL) provider both return exactly
 * these shapes, so pages never import anything WordPress-specific.
 */

export interface CmsImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  /** Small blurred data-URI for <Image placeholder="blur">, when available. */
  blurDataURL?: string;
}

export interface Stat {
  value: string;
  label: string;
  /** lucide-react icon name, e.g. "Building2". */
  icon?: string;
}

export interface IconFeature {
  icon?: string;
  title: string;
  description?: string;
}

export interface LabelValue {
  label: string;
  value: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon?: string;
}

/* ------------------------------------------------------------------ */
/*  Page-level content (hero + section intros), one record per page.   */
/* ------------------------------------------------------------------ */

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "projects-residential"
  | "projects-commercial"
  | "advisory"
  | "advisory-post-handover"
  | "insights"
  | "careers"
  | "contact";

export interface PageHero {
  eyebrow?: string;
  title: string;
  /** Portion of the title rendered in gold. */
  titleAccent?: string;
  description?: string;
  image: CmsImage;
  /** Breadcrumb trail, last item is the current page. */
  breadcrumb: string[];
  /** The small icon row under the hero copy. */
  features: IconFeature[];
  /** The floating "BY NUMBERS" panel. */
  statsPanelTitle?: string;
  stats: Stat[];
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
}

export interface SectionIntro {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface PageContent {
  key: PageKey;
  hero: PageHero;
  /** Keyed section intros, e.g. sections["featured"] = { title, ... }. */
  sections: Record<string, SectionIntro>;
  /** Optional closing CTA band. */
  cta?: {
    title: string;
    titleAccent?: string;
    description?: string;
    image?: CmsImage;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
  };
}

/* ------------------------------------------------------------------ */
/*  Collections                                                        */
/* ------------------------------------------------------------------ */

export type PropertySegment = "residential" | "commercial";

export interface Property {
  id: string;
  slug: string;
  title: string;
  segment: PropertySegment;
  /** Ribbon label: "New Launch", "Premium", "Iconic", "Pre-Launch"… */
  badge?: string;
  locality: string;
  city: string;
  /** "₹ 6.5 Cr* Onwards" */
  priceLabel: string;
  image: CmsImage;
  gallery: CmsImage[];
  /** Chips under the card, e.g. ["4 BHK", "Luxury Living"]. */
  tags: string[];
  configuration?: string;
  developer?: string;
  status?: string;
  reraId?: string;
  featured: boolean;
  order: number;
  description: string;
  overview: string;
  amenities: string[];
  specifications: LabelValue[];
  connectivity: LabelValue[];
  brochureUrl?: string;
  location?: { lat: number; lng: number; mapEmbedUrl?: string };
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  photo: CmsImage;
  linkedin?: string;
  bio?: string;
  order: number;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  applyUrl: string;
  postedAt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  photo?: CmsImage;
  rating?: number;
  /** Which page/carousel this belongs to: "home", "about", "careers"… */
  group: string;
  order: number;
}

export type InsightKind = "article" | "perspective" | "report";

export interface Insight {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: CmsImage;
  kind: InsightKind;
  body?: string;
  readingTime?: string;
  author?: string;
  authorRole?: string;
  authorPhoto?: CmsImage;
  topics: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  description: string;
  image: CmsImage;
  fileUrl: string;
  fileSize: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** An SVG uploaded by the admin in WordPress (Media Library) — not a fixed icon-font name. */
  icon?: CmsImage;
  image?: CmsImage;
  bullets: string[];
  order: number;
}

export type OfficeKind = "corporate" | "branch";

export interface Office {
  id: string;
  name: string;
  kind: OfficeKind;
  address: string;
  city: string;
  phone: string;
  image?: CmsImage;
  features: string[];
  mapEmbedUrl?: string;
  directionsUrl?: string;
  order: number;
}

export type PartnerGroup =
  | "developer"
  | "bank"
  | "interior"
  | "client"
  | "general";

export interface Partner {
  id: string;
  name: string;
  logo: CmsImage;
  group: PartnerGroup;
  order: number;
}

export interface Award {
  id: string;
  title: string;
  year: string;
  image?: CmsImage;
  order: number;
}

export interface Value {
  icon?: string;
  title: string;
  description: string;
  order: number;
}

/* ------------------------------------------------------------------ */
/*  Navigation — static, defined in src/content/navigation.ts, never   */
/*  sourced from a CMS. Types live here only because the layout/header/ */
/*  footer components share them.                                      */
/* ------------------------------------------------------------------ */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  /** One level of sub-items — dropdown in the header, sub-links in the footer. */
  children?: NavItem[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

/* ------------------------------------------------------------------ */
/*  Global site settings                                               */
/* ------------------------------------------------------------------ */

export interface SiteSettings {
  companyName: string;
  logo?: CmsImage;
  phone: string;
  email: string;
  whatsapp: string;
  website: string;
  address: string;
  officeHours: string;
  footerBlurb: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  /** The global stat bar reused across pages. */
  stats: Stat[];
}

/* ------------------------------------------------------------------ */
/*  Provider contract                                                  */
/* ------------------------------------------------------------------ */

export interface PropertyQuery {
  segment?: PropertySegment;
  featured?: boolean;
  limit?: number;
}

export interface InsightQuery {
  kind?: InsightKind;
  topic?: string;
  limit?: number;
}

export interface CmsProvider {
  getSiteSettings(): Promise<SiteSettings>;
  getPage(key: PageKey): Promise<PageContent>;

  getProperties(query?: PropertyQuery): Promise<Property[]>;
  getProperty(slug: string): Promise<Property | null>;

  getLeaders(): Promise<Leader[]>;
  getJobs(): Promise<Job[]>;
  getJob(slug: string): Promise<Job | null>;
  getTestimonials(group?: string): Promise<Testimonial[]>;

  getInsights(query?: InsightQuery): Promise<Insight[]>;
  getInsight(slug: string): Promise<Insight | null>;
  getResources(): Promise<Resource[]>;

  getServices(): Promise<Service[]>;
  /** The Advisory page's service list (distinct from the main Services grid). */
  getAdvisoryServices(): Promise<Service[]>;
  getOffices(): Promise<Office[]>;
  getPartners(group?: PartnerGroup): Promise<Partner[]>;
  getAwards(): Promise<Award[]>;
  getValues(): Promise<Value[]>;
}
