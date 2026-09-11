import "server-only";
import type {
  Award,
  CmsProvider,
  Insight,
  InsightQuery,
  Job,
  Leader,
  Office,
  PageKey,
  Partner,
  PartnerGroup,
  Property,
  PropertyQuery,
  Resource,
  Service,
  Testimonial,
  Value,
} from "../types";
import { wpQuery, WordPressError } from "./client";
import * as F from "./fragments";
import * as map from "./map";
import { mockProvider, advisoryServices as mockAdvisoryServices } from "../mock/provider";

/* eslint-disable @typescript-eslint/no-explicit-any */

const ALL = "first: 1000, where: { status: PUBLISH }";

async function safeList<T>(fn: () => Promise<T[]>, label: string): Promise<T[]> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[cms:wordpress] ${label} failed:`, (err as Error).message);
    return [];
  }
}

const nodesOf = (data: any, field: string): any[] => data?.[field]?.nodes ?? [];

export const wordpressProvider: CmsProvider = {
  async getSiteSettings() {
    try {
      const data = await wpQuery<any>(F.SITE_SETTINGS_QUERY, {}, ["cms", "settings"]);
      if (!data?.lxSiteSettings) throw new WordPressError("lxSiteSettings missing");
      return map.mapSiteSettings(data);
    } catch (err) {
      console.error("[cms:wordpress] getSiteSettings -> mock:", (err as Error).message);
      return mockProvider.getSiteSettings();
    }
  },

  async getPage(key: PageKey) {
    // Section intros, the closing CTA and feature/stat rows always come from
    // src/content/site-pages.ts (see that file's header comment for why) —
    // this call never fails, so the page always has full content even before
    // WordPress is wired up or reachable.
    const base = await mockProvider.getPage(key);
    try {
      // The seeder sets each Site Page's slug === its page key.
      const query = /* GraphQL */ `
        query Page($key: ID!) {
          sitePage(id: $key, idType: SLUG) { ...SitePageFields }
        }
        ${F.IMAGE_FIELDS}
        ${F.SITE_PAGE_FIELDS}
      `;
      const data = await wpQuery<any>(query, { key }, ["cms", `page:${key}`]);
      if (!data?.sitePage) return base;

      const { hasImage, ...override } = map.mapPageHeroOverride(data.sitePage);
      return { ...base, hero: { ...base.hero, ...override, image: hasImage ? override.image! : base.hero.image } };
    } catch (err) {
      console.error(`[cms:wordpress] getPage(${key}) hero override skipped:`, (err as Error).message);
      return base;
    }
  },

  async getProperties(query: PropertyQuery = {}) {
    const list = await safeList<Property>(async () => {
      const gql = `query Properties { properties(${ALL}) { nodes { ...PropertyCard } } } ${F.IMAGE_FIELDS} ${F.PROPERTY_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "properties"]);
      return nodesOf(data, "properties").map(map.mapProperty);
    }, "getProperties");

    let result = list;
    if (query.segment) result = result.filter((p) => p.segment === query.segment);
    if (query.featured != null) result = result.filter((p) => p.featured === query.featured);
    result.sort((a, b) => a.order - b.order);
    if (query.limit) result = result.slice(0, query.limit);
    return result;
  },

  async getProperty(slug: string) {
    try {
      const gql = `query Property($slug: ID!) { property(id: $slug, idType: SLUG) { ...PropertyCard } } ${F.IMAGE_FIELDS} ${F.PROPERTY_FIELDS}`;
      const data = await wpQuery<any>(gql, { slug }, ["cms", `property:${slug}`]);
      return data?.property ? map.mapProperty(data.property) : null;
    } catch (err) {
      console.error(`[cms:wordpress] getProperty(${slug}):`, (err as Error).message);
      return null;
    }
  },

  async getLeaders() {
    const list = await safeList<Leader>(async () => {
      const gql = `query Leaders { leaders(${ALL}) { nodes { ...LeaderFields } } } ${F.IMAGE_FIELDS} ${F.LEADER_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "leaders"]);
      return nodesOf(data, "leaders").map(map.mapLeader);
    }, "getLeaders");
    return list.sort((a, b) => a.order - b.order);
  },

  async getJobs() {
    return safeList<Job>(async () => {
      const gql = `query Jobs { jobs(${ALL}) { nodes { ...JobFields } } } ${F.JOB_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "jobs"]);
      return nodesOf(data, "jobs").map(map.mapJob);
    }, "getJobs");
  },

  async getJob(slug: string) {
    try {
      const gql = `query Job($slug: ID!) { job(id: $slug, idType: SLUG) { ...JobFields } } ${F.JOB_FIELDS}`;
      const data = await wpQuery<any>(gql, { slug }, ["cms", `job:${slug}`]);
      return data?.job ? map.mapJob(data.job) : null;
    } catch (err) {
      console.error(`[cms:wordpress] getJob(${slug}):`, (err as Error).message);
      return null;
    }
  },

  async getTestimonials(group?: string) {
    const list = await safeList<Testimonial>(async () => {
      const gql = `query Testimonials { testimonials(${ALL}) { nodes { ...TestimonialFields } } } ${F.IMAGE_FIELDS} ${F.TESTIMONIAL_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "testimonials"]);
      return nodesOf(data, "testimonials").map(map.mapTestimonial);
    }, "getTestimonials");
    return list.filter((t) => !group || t.group === group).sort((a, b) => a.order - b.order);
  },

  async getInsights(query: InsightQuery = {}) {
    const list = await safeList<Insight>(async () => {
      const gql = `query Insights { insights(${ALL}) { nodes { ...InsightFields } } } ${F.IMAGE_FIELDS} ${F.INSIGHT_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "insights"]);
      return nodesOf(data, "insights").map(map.mapInsight);
    }, "getInsights");

    let result = list;
    if (query.kind) result = result.filter((i) => i.kind === query.kind);
    if (query.topic) result = result.filter((i) => i.topics.includes(query.topic!));
    result.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (query.limit) result = result.slice(0, query.limit);
    return result;
  },

  async getInsight(slug: string) {
    try {
      const gql = `query Insight($slug: ID!) { insight(id: $slug, idType: SLUG) { ...InsightFields } } ${F.IMAGE_FIELDS} ${F.INSIGHT_FIELDS}`;
      const data = await wpQuery<any>(gql, { slug }, ["cms", `insight:${slug}`]);
      return data?.insight ? map.mapInsight(data.insight) : null;
    } catch (err) {
      console.error(`[cms:wordpress] getInsight(${slug}):`, (err as Error).message);
      return null;
    }
  },

  async getResources() {
    return safeList<Resource>(async () => {
      const gql = `query Resources { resources(${ALL}) { nodes { ...ResourceFields } } } ${F.IMAGE_FIELDS} ${F.RESOURCE_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "resources"]);
      return nodesOf(data, "resources").map(map.mapResource);
    }, "getResources");
  },

  async getServices() {
    const list = await safeList<Service>(async () => {
      const gql = `query Services { services(${ALL}) { nodes { ...ServiceFields } } } ${F.IMAGE_FIELDS} ${F.SERVICE_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "services"]);
      return nodesOf(data, "services")
        .filter((n: any) => (map.selectValue(n.serviceFields?.list) || "main") !== "advisory")
        .map(map.mapService);
    }, "getServices");
    return list.sort((a, b) => a.order - b.order);
  },

  async getAdvisoryServices() {
    const list = await safeList<Service>(async () => {
      const gql = `query AdvisoryServices { services(${ALL}) { nodes { ...ServiceFields } } } ${F.IMAGE_FIELDS} ${F.SERVICE_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "services"]);
      return nodesOf(data, "services")
        .filter((n: any) => map.selectValue(n.serviceFields?.list) === "advisory")
        .map(map.mapService);
    }, "getAdvisoryServices");
    return list.length ? list.sort((a, b) => a.order - b.order) : mockAdvisoryServices;
  },

  async getOffices() {
    const list = await safeList<Office>(async () => {
      const gql = `query Offices { offices(${ALL}) { nodes { ...OfficeFields } } } ${F.IMAGE_FIELDS} ${F.OFFICE_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "offices"]);
      return nodesOf(data, "offices").map(map.mapOffice);
    }, "getOffices");
    return list.sort((a, b) => a.order - b.order);
  },

  async getPartners(group?: PartnerGroup) {
    const list = await safeList<Partner>(async () => {
      const gql = `query Partners { partners(${ALL}) { nodes { ...PartnerFields } } } ${F.IMAGE_FIELDS} ${F.PARTNER_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "partners"]);
      return nodesOf(data, "partners").map(map.mapPartner);
    }, "getPartners");
    return list.filter((p) => !group || p.group === group).sort((a, b) => a.order - b.order);
  },

  async getAwards() {
    const list = await safeList<Award>(async () => {
      const gql = `query Awards { awards(${ALL}) { nodes { ...AwardFields } } } ${F.IMAGE_FIELDS} ${F.AWARD_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "awards"]);
      return nodesOf(data, "awards").map(map.mapAward);
    }, "getAwards");
    return list.sort((a, b) => a.order - b.order);
  },

  async getValues() {
    const list = await safeList<Value>(async () => {
      const gql = `query Values { values(${ALL}) { nodes { ...ValueFields } } } ${F.VALUE_FIELDS}`;
      const data = await wpQuery<any>(gql, {}, ["cms", "values"]);
      return nodesOf(data, "values").map(map.mapValue);
    }, "getValues");
    return list.sort((a, b) => a.order - b.order);
  },
};
