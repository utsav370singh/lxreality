/**
 * Reusable GraphQL fragments.
 *
 * These assume the schema created by the companion `lx-realty-cms` WordPress
 * plugin (see /wordpress/README.md), which needs:
 *   - WPGraphQL
 *   - ACF Pro + "WPGraphQL for ACF" (v2)
 *
 * Every ACF field group is exposed with a predictable `graphql_field_name`
 * (e.g. `propertyFields`), and every image field returns `{ node { ... } }`.
 */

export const IMAGE_FIELDS = /* GraphQL */ `
  fragment ImageFields on MediaItem {
    sourceUrl
    altText
    mediaDetails { width height }
  }
`;

export const PROPERTY_FIELDS = /* GraphQL */ `
  fragment PropertyCard on Property {
    databaseId
    slug
    title
    propertyFields {
      segment
      badge
      locality
      city
      priceLabel
      configuration
      developer
      status
      reraId
      featured
      displayOrder
      description
      overview
      brochureUrl
      locationLat
      locationLng
      mapEmbedUrl
      image { node { ...ImageFields } }
      gallery { nodes { ...ImageFields } }
      tags { label }
      amenities { item }
      specifications { label value }
      connectivity { label value }
    }
  }
`;

export const LEADER_FIELDS = /* GraphQL */ `
  fragment LeaderFields on Leader {
    databaseId
    title
    leaderFields {
      role
      linkedin
      bio
      displayOrder
      photo { node { ...ImageFields } }
    }
  }
`;

export const JOB_FIELDS = /* GraphQL */ `
  fragment JobFields on Job {
    databaseId
    slug
    title
    date
    jobFields {
      department
      location
      experience
      type
      summary
      applyUrl
      responsibilities { item }
      requirements { item }
    }
  }
`;

export const TESTIMONIAL_FIELDS = /* GraphQL */ `
  fragment TestimonialFields on Testimonial {
    databaseId
    title
    testimonialFields {
      quote
      personName
      personRole
      rating
      group
      displayOrder
      photo { node { ...ImageFields } }
    }
  }
`;

export const INSIGHT_FIELDS = /* GraphQL */ `
  fragment InsightFields on Insight {
    databaseId
    slug
    title
    date
    insightFields {
      category
      excerpt
      kind
      body
      readingTime
      author
      authorRole
      topics { label }
      image { node { ...ImageFields } }
      authorPhoto { node { ...ImageFields } }
    }
  }
`;

export const RESOURCE_FIELDS = /* GraphQL */ `
  fragment ResourceFields on Resource {
    databaseId
    title
    resourceFields {
      type
      description
      fileUrl
      fileSize
      image { node { ...ImageFields } }
    }
  }
`;

export const SERVICE_FIELDS = /* GraphQL */ `
  fragment ServiceFields on Service {
    databaseId
    slug
    title
    serviceFields {
      excerpt
      list
      displayOrder
      bullets { item }
      icon { node { ...ImageFields } }
      image { node { ...ImageFields } }
    }
  }
`;

export const OFFICE_FIELDS = /* GraphQL */ `
  fragment OfficeFields on Office {
    databaseId
    title
    officeFields {
      kind
      address
      city
      phone
      mapEmbedUrl
      directionsUrl
      displayOrder
      features { item }
      image { node { ...ImageFields } }
    }
  }
`;

export const PARTNER_FIELDS = /* GraphQL */ `
  fragment PartnerFields on Partner {
    databaseId
    title
    partnerFields {
      group
      displayOrder
      logo { node { ...ImageFields } }
    }
  }
`;

export const AWARD_FIELDS = /* GraphQL */ `
  fragment AwardFields on Award {
    databaseId
    title
    awardFields {
      year
      displayOrder
      image { node { ...ImageFields } }
    }
  }
`;

export const VALUE_FIELDS = /* GraphQL */ `
  fragment ValueFields on Value {
    databaseId
    title
    valueFields {
      icon
      description
      displayOrder
    }
  }
`;

export const SITE_PAGE_FIELDS = /* GraphQL */ `
  fragment SitePageFields on SitePage {
    databaseId
    slug
    title
    pageFields {
      key
      heroEyebrow
      heroTitle
      heroTitleAccent
      heroDescription
      heroBreadcrumb { label }
      heroImage { node { ...ImageFields } }
      heroStatsPanelTitle
      heroPrimaryCtaLabel
      heroPrimaryCtaHref
      heroSecondaryCtaLabel
      heroSecondaryCtaHref
      heroFeatures { icon title description }
      heroStats { icon value label }
      sections { slug eyebrow title titleAccent description }
      ctaTitle
      ctaTitleAccent
      ctaDescription
      ctaPrimaryLabel
      ctaPrimaryHref
      ctaSecondaryLabel
      ctaSecondaryHref
      ctaImage { node { ...ImageFields } }
    }
  }
`;

export const SITE_SETTINGS_QUERY = /* GraphQL */ `
  query SiteSettings {
    lxSiteSettings {
      companyName
      phone
      email
      whatsapp
      website
      address
      officeHours
      footerBlurb
      linkedin
      instagram
      facebook
      youtube
      logo { node { ...ImageFields } }
      stats { icon value label }
    }
  }
  ${IMAGE_FIELDS}
`;

/**
 * Header + footer navigation — WordPress' native menus (Appearance → Menus),
 * assigned to the "primary" and "footer" theme locations registered by the
 * plugin (see wordpress/lx-realty-cms/includes/menus.php). No ACF involved:
 * WPGraphQL exposes registered menu locations out of the box.
 *
 * A menu item's optional "Description" (Screen Options → Description) becomes
 * the dropdown sub-text under a header child link.
 */
export const NAVIGATION_QUERY = /* GraphQL */ `
  query Navigation {
    primary: menuItems(where: { location: PRIMARY }, first: 100) {
      nodes { databaseId parentDatabaseId label path description order }
    }
    footer: menuItems(where: { location: FOOTER }, first: 100) {
      nodes { databaseId parentDatabaseId label path description order }
    }
  }
`;
