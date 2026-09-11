import type {
  CmsProvider,
  InsightQuery,
  PageKey,
  PartnerGroup,
  PropertyQuery,
} from "../types";
import { siteSettings } from "./site";
import { navigation } from "./navigation";
import { sitePages } from "@/content/site-pages";
import { properties } from "./properties";
import {
  advisoryServices,
  awards,
  insights,
  jobs,
  leaders,
  offices,
  partners,
  perspectives,
  resources,
  services,
  testimonials,
  values,
} from "./collections";

const clone = <T>(value: T): T =>
  typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));

const allInsights = [...insights, ...perspectives];

export const mockProvider: CmsProvider = {
  async getSiteSettings() {
    return clone(siteSettings);
  },

  async getNavigation() {
    return clone(navigation);
  },

  async getPage(key: PageKey) {
    return clone(sitePages[key]);
  },

  async getProperties(query: PropertyQuery = {}) {
    let list = properties.slice();
    if (query.segment) list = list.filter((p) => p.segment === query.segment);
    if (query.featured != null) list = list.filter((p) => p.featured === query.featured);
    list.sort((a, b) => a.order - b.order);
    if (query.limit) list = list.slice(0, query.limit);
    return clone(list);
  },

  async getProperty(slug: string) {
    return clone(properties.find((p) => p.slug === slug) ?? null);
  },

  async getLeaders() {
    return clone(leaders.slice().sort((a, b) => a.order - b.order));
  },

  async getJobs() {
    return clone(jobs.slice());
  },

  async getJob(slug: string) {
    return clone(jobs.find((j) => j.slug === slug) ?? null);
  },

  async getTestimonials(group?: string) {
    let list = testimonials.slice();
    if (group) list = list.filter((t) => t.group === group);
    list.sort((a, b) => a.order - b.order);
    return clone(list);
  },

  async getInsights(query: InsightQuery = {}) {
    let list =
      query.kind === "perspective"
        ? perspectives.slice()
        : query.kind === "article"
          ? insights.slice()
          : allInsights.slice();
    if (query.topic) list = list.filter((i) => i.topics.includes(query.topic!));
    list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (query.limit) list = list.slice(0, query.limit);
    return clone(list);
  },

  async getInsight(slug: string) {
    return clone(allInsights.find((i) => i.slug === slug) ?? null);
  },

  async getResources() {
    return clone(resources.slice());
  },

  async getServices() {
    return clone(services.slice().sort((a, b) => a.order - b.order));
  },

  async getAdvisoryServices() {
    return clone(advisoryServices.slice().sort((a, b) => a.order - b.order));
  },

  async getOffices() {
    return clone(offices.slice().sort((a, b) => a.order - b.order));
  },

  async getPartners(group?: PartnerGroup) {
    let list = partners.slice();
    if (group) list = list.filter((p) => p.group === group);
    list.sort((a, b) => a.order - b.order);
    return clone(list);
  },

  async getAwards() {
    return clone(awards.slice().sort((a, b) => a.order - b.order));
  },

  async getValues() {
    return clone(values.slice().sort((a, b) => a.order - b.order));
  },
};

export { advisoryServices };

