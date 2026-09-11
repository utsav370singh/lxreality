import type { Metadata } from "next";
import { ProjectsListing } from "@/components/projects/projects-listing";
import { whyInvestCommercial } from "@/content/page-extras";
import type { PropertySearchParams } from "@/lib/property-filters";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Commercial Projects",
  description: "Grade-A offices, retail and mixed-use — commercial projects built for business success.",
};

export default async function CommercialProjectsPage({
  searchParams,
}: {
  searchParams: Promise<PropertySearchParams>;
}) {
  return (
    <ProjectsListing
      pageKey="projects-commercial"
      segment="commercial"
      whyItems={whyInvestCommercial}
      whyColumns={6}
      searchParams={await searchParams}
    />
  );
}
