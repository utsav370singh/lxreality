import type { Metadata } from "next";
import { ProjectsListing } from "@/components/projects/projects-listing";
import { whyInvestResidential } from "@/content/page-extras";
import type { PropertySearchParams } from "@/lib/property-filters";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Residential Projects",
  description: "Exceptional homes across 58 cities — curated residential projects from India's top developers.",
};

export default async function ResidentialProjectsPage({
  searchParams,
}: {
  searchParams: Promise<PropertySearchParams>;
}) {
  return (
    <ProjectsListing
      pageKey="projects-residential"
      segment="residential"
      whyItems={whyInvestResidential}
      whyColumns={5}
      searchParams={await searchParams}
    />
  );
}
