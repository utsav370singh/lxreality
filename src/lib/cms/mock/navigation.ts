import type { Navigation } from "../types";

/**
 * Header + footer navigation.
 *
 * In WordPress this is edited natively under Appearance → Menus — two menus
 * assigned to the "primary" and "footer" theme locations (see
 * wordpress/lx-realty-cms/includes/menus.php). A footer top-level item with no
 * useful link becomes a column heading; its sub-items become the links in that
 * column. This mock mirrors that exact shape so swapping providers is a no-op.
 */
export const navigation: Navigation = {
  primary: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    {
      label: "Projects",
      href: "/projects/residential",
      children: [
        { label: "Residential Projects", href: "/projects/residential", description: "Homes across 58 cities" },
        { label: "Commercial Projects", href: "/projects/commercial", description: "Grade-A offices & retail" },
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
    { label: "Contact", href: "/contact" },
  ],
  footer: [
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
        { label: "New Launches", href: "/projects/residential" },
        { label: "Luxury Projects", href: "/projects/residential" },
        { label: "Ready to Move", href: "/projects/residential" },
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
  ],
};
