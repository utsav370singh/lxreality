import type { Metadata } from "next";
import { ProjectsListing } from "@/components/projects/projects-listing";
import { whyInvestPlots } from "@/content/page-extras";
import type { PropertySearchParams } from "@/lib/property-filters";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Plots & Land",
  description: "RERA-registered plots and land parcels in high-growth corridors across India.",
};

export default async function PlotsProjectsPage({
  searchParams,
}: {
  searchParams: Promise<PropertySearchParams>;
}) {
  return (
    <ProjectsListing
      pageKey="projects-plots"
      segment="plots"
      whyItems={whyInvestPlots}
      whyColumns={5}
      searchParams={await searchParams}
    />
  );
}
