import "server-only";
import type {
  CmsProvider,
  PageKey,
  PartnerGroup,
  PropertyQuery,
  InsightQuery,
} from "./types";
import { mockProvider } from "./mock/provider";

export * from "./types";

/**
 * Resolve which CMS backs the site.
 *
 *   NEXT_PUBLIC_CMS_SOURCE=mock       -> local sample data
 *   NEXT_PUBLIC_CMS_SOURCE=wordpress  -> live WPGraphQL endpoint
 *
 * The WordPress provider is imported lazily so a mock build never needs the
 * `graphql` request code path or a reachable endpoint.
 */
let providerPromise: Promise<CmsProvider> | null = null;

function resolveProvider(): Promise<CmsProvider> {
  if (providerPromise) return providerPromise;

  const source = (process.env.NEXT_PUBLIC_CMS_SOURCE ?? "mock").toLowerCase();

  providerPromise =
    source === "wordpress"
      ? import("./wordpress/provider").then((m) => m.wordpressProvider)
      : Promise.resolve(mockProvider);

  return providerPromise;
}

/* Thin pass-through helpers so pages can `import { getProperties } from "@/lib/cms"`. */

export const getSiteSettings = () => resolveProvider().then((p) => p.getSiteSettings());
export const getPage = (key: PageKey) => resolveProvider().then((p) => p.getPage(key));

export const getProperties = (q?: PropertyQuery) =>
  resolveProvider().then((p) => p.getProperties(q));
export const getProperty = (slug: string) =>
  resolveProvider().then((p) => p.getProperty(slug));

export const getLeaders = () => resolveProvider().then((p) => p.getLeaders());
export const getJobs = () => resolveProvider().then((p) => p.getJobs());
export const getJob = (slug: string) => resolveProvider().then((p) => p.getJob(slug));
export const getTestimonials = (group?: string) =>
  resolveProvider().then((p) => p.getTestimonials(group));

export const getInsights = (q?: InsightQuery) =>
  resolveProvider().then((p) => p.getInsights(q));
export const getInsight = (slug: string) =>
  resolveProvider().then((p) => p.getInsight(slug));
export const getResources = () => resolveProvider().then((p) => p.getResources());

export const getServices = () => resolveProvider().then((p) => p.getServices());
export const getAdvisoryServices = () =>
  resolveProvider().then((p) => p.getAdvisoryServices());
export const getOffices = () => resolveProvider().then((p) => p.getOffices());
export const getPartners = (group?: PartnerGroup) =>
  resolveProvider().then((p) => p.getPartners(group));
export const getAwards = () => resolveProvider().then((p) => p.getAwards());
export const getValues = () => resolveProvider().then((p) => p.getValues());
