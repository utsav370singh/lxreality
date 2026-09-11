/**
 * Reusable GraphQL fragments.
 *
 * These assume the schema created by the companion `lx-realty-cms` WordPress
 * plugin (see /wordpress/README.md), which needs only free plugins:
 *   - WPGraphQL
 *   - Advanced Custom Fields (the free version — no Pro features used)
 *   - WPGraphQL for ACF
 *
 * ACF's free tier has no Repeater, Gallery, Flexible Content or Options Page
 * fields, so any "list" field here is a single Textarea the admin fills one
 * item per line (or "Label: Value" per line for pairs) — plain strings over
 * GraphQL, parsed client-side in map.ts. Every ACF field group is exposed
 * with a predictable `graphql_field_name` (e.g. `propertyFields`), and every
 * image field returns `{ node { ... } }`.
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
      tags
      amenities
      specifications
      connectivity
      image { node { ...ImageFields } }
      gallery1 { node { ...ImageFields } }
      gallery2 { node { ...ImageFields } }
      gallery3 { node { ...ImageFields } }
      gallery4 { node { ...ImageFields } }
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
      responsibilities
      requirements
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
      topics
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
      topics
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
      bullets
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
      features
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

/**
 * Optional per-page hero override. Everything else about a page (section
 * intros, the closing CTA, feature/stat rows) comes from
 * src/content/site-pages.ts — see that file's header comment for why.
 * A page with no matching "Site Pages" post in WordPress (or one where these
 * are all left blank) just keeps the built-in hero unchanged.
 */
export const SITE_PAGE_FIELDS = /* GraphQL */ `
  fragment SitePageFields on SitePage {
    databaseId
    slug
    pageHeroFields {
      eyebrow
      title
      titleAccent
      description
      image { node { ...ImageFields } }
    }
  }
`;

/**
 * Note: no ...ImageFields spread here — that fragment targets WPGraphQL's
 * native `MediaItem` type, but lxSiteSettings.logo.node is our own hand-rolled
 * `LXMediaNode` type (see wordpress/lx-realty-cms/includes/graphql-settings.php),
 * which a MediaItem-typed fragment can't be spread onto even though the shape
 * is identical.
 */
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
      stats
      logo {
        node {
          sourceUrl
          altText
          mediaDetails { width height }
        }
      }
    }
  }
`;
