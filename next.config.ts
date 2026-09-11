import type { NextConfig } from "next";

/**
 * Image host allow-list.
 *
 * picsum.photos / i.pravatar.cc power placeholder imagery while the site runs on
 * mock data. Once WordPress is live, media comes from wherever WORDPRESS_API_URL
 * points (same host/port unless WORDPRESS_IMAGE_HOSTNAME overrides it — e.g. when
 * media is served from a separate CDN host).
 */
function wpImagePattern(): { protocol: "http" | "https"; hostname: string; port?: string }[] {
  const apiUrl = process.env.WORDPRESS_API_URL;
  const overrideHost = process.env.WORDPRESS_IMAGE_HOSTNAME;

  if (overrideHost) {
    return [
      { protocol: "https", hostname: overrideHost },
      { protocol: "http", hostname: overrideHost },
    ];
  }
  if (!apiUrl) return [];

  try {
    const u = new URL(apiUrl);
    return [
      {
        protocol: u.protocol === "https:" ? "https" : "http",
        hostname: u.hostname,
        port: u.port || undefined,
      },
    ];
  } catch {
    return [];
  }
}

const wpIsLocalIP = (() => {
  try {
    const host = new URL(process.env.WORDPRESS_API_URL ?? "").hostname;
    return host === "127.0.0.1" || host === "localhost" || host.startsWith("192.168.") || host.startsWith("10.");
  } catch {
    return false;
  }
})();

const nextConfig: NextConfig = {
  // Cross-links are composed dynamically (e.g. `/projects/${slug}` and CMS-driven
  // CTA hrefs), so the generic-string href on <Button> is intentional.
  typedRoutes: false,
  images: {
    // Partner logo placeholders are self-generated inline SVG data-URIs.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Next 16 blocks image-optimizing local/private IPs by default (an SSRF
    // guard) even when remotePatterns matches them — only relevant here
    // because local WordPress dev setups (XAMPP, `wp server`, Local) run on
    // 127.0.0.1/localhost/a LAN IP. Never set this for a public deployment.
    ...(wpIsLocalIP ? { dangerouslyAllowLocalIP: true } : {}),
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "images.unsplash.com" },
      ...wpImagePattern(),
    ],
  },
};

export default nextConfig;
