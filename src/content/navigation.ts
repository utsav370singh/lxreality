import type { FooterColumn, NavItem } from "@/lib/cms/types";

/**
 * Header + footer navigation.
 *
 * Deliberately static, in code, not sourced from WordPress — the site
 * structure (which pages exist, how they nest) is a code-level concern, not
 * editorial content, and changing it always requires a matching route to
 * exist anyway. See src/app/layout.tsx for where this is used.
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Projects",
    href: "/projects/residential",
    children: [
      { label: "Residential Projects", href: "/projects/residential", description: "Homes across 58 cities" },
      { label: "Commercial Projects", href: "/projects/commercial", description: "Grade-A offices & retail" },
      { label: "Plots & Land", href: "/projects/plots", description: "RERA-registered plots & land parcels" },
    ],
  },
  {
    label: "Advisory",
    href: "/advisory",
    children: [
      { label: "Advisory Services", href: "/advisory", description: "Investment, research & transactions" },
      {
        label: "Post-Handover Services",
        href: "/advisory/post-handover-services",
        description: "Loans, interiors, leasing & management",
      },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  // { label: "Contact", href: "/contact" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Leadership", href: "/about#leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Media & Press", href: "/insights" },
      { label: "Awards & Recognition", href: "/about#awards" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Residential Advisory", href: "/services" },
      { label: "Commercial Advisory", href: "/services" },
      { label: "Investment Advisory", href: "/services" },
      { label: "Project Marketing", href: "/services" },
      { label: "Research & Valuation", href: "/services" },
      { label: "Transaction Management", href: "/services" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Residential Projects", href: "/projects/residential" },
      { label: "Commercial Projects", href: "/projects/commercial" },
      { label: "Plots & Land", href: "/projects/plots" },
      { label: "New Launches", href: "/projects/residential" },
      { label: "Luxury Projects", href: "/projects/residential" },
      { label: "All Projects", href: "/projects/residential" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Market Insights", href: "/insights" },
      { label: "Blog", href: "/insights" },
      { label: "Reports", href: "/insights#resources" },
      { label: "News & Updates", href: "/insights" },
    ],
  },
];
