import type { Metadata } from "next";
import { ProjectsListing } from "@/components/projects/projects-listing";
import { whyInvestCommercial } from "@/content/page-extras";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Commercial Projects",
  description: "Grade-A offices, retail and mixed-use — commercial projects built for business success.",
};

export default function CommercialProjectsPage() {
  return (
    <ProjectsListing
      pageKey="projects-commercial"
      segment="commercial"
      whyItems={whyInvestCommercial}
      whyColumns={6}
    />
  );
}
