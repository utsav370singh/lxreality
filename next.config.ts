import type { NextConfig } from "next";

/**
 * Image host allow-list.
 *
 * picsum.photos / i.pravatar.cc power placeholder imagery while the site runs on
 * mock data. Once WordPress is live, set `WORDPRESS_IMAGE_HOSTNAME`
 * (e.g. `cms.lxrealty.in`) and every uploaded media item served by WP is allowed.
 */
const wpImageHost = process.env.WORDPRESS_IMAGE_HOSTNAME;

const nextConfig: NextConfig = {
  // Cross-links are composed dynamically (e.g. `/projects/${slug}` and CMS-driven
  // CTA hrefs), so the generic-string href on <Button> is intentional.
  typedRoutes: false,
  images: {
    // Partner logo placeholders are self-generated inline SVG data-URIs.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
      ...(wpImageHost
        ? [
            { protocol: "https" as const, hostname: wpImageHost },
            { protocol: "http" as const, hostname: wpImageHost },
          ]
        : []),
    ],
  },
};

export default nextConfig;
