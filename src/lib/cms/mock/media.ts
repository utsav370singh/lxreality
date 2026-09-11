import type { CmsImage } from "../types";

/**
 * Deterministic placeholder media for mock mode.
 *
 * - photos  -> picsum.photos (stable seed => stable image)
 * - avatars -> i.pravatar.cc (real faces, seeded)
 * - logos   -> inline SVG wordmark data-URI (looks like a real logo lockup)
 *
 * When WordPress is the source, these are all replaced by real URLs from the
 * WP media library — no other code changes.
 */
export function img(seed: string, width: number, height: number, alt: string): CmsImage {
  const s = encodeURIComponent(seed);
  return {
    url: `https://picsum.photos/seed/${s}/${width}/${height}`,
    alt,
    width,
    height,
  };
}

export function avatar(seed: string, alt: string, size = 240): CmsImage {
  return {
    url: `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`,
    alt,
    width: size,
    height: size,
  };
}

const LOGO_BG = ["#0f2942", "#14202e", "#1e466b", "#3a3a3a", "#2c2c2c"];

export function logo(name: string): CmsImage {
  const initials = name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  const bg = LOGO_BG[Math.abs(hash(name)) % LOGO_BG.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="96" viewBox="0 0 220 96">
    <rect width="220" height="96" rx="10" fill="${bg}"/>
    <text x="110" y="46" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="26" font-weight="700" fill="#e4c884">${initials}</text>
    <text x="110" y="68" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="9" letter-spacing="2" fill="#f4f1ea">${escapeXml(
      name.toUpperCase(),
    )}</text>
  </svg>`;
  return {
    url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    alt: `${name} logo`,
    width: 220,
    height: 96,
  };
}

/**
 * Hand-authored line-icon glyphs (24×24, gold stroke), standing in for what
 * an admin would upload as an SVG file in WordPress (Services → icon field).
 * Nothing here depends on a bundled icon library — swap `SERVICE_ICON_GLYPHS`
 * for a real uploaded SVG URL and the rendering component doesn't change.
 */
const SERVICE_ICON_GLYPHS: Record<string, string> = {
  home: '<path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />',
  building:
    '<rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" /><path d="M10 21v-4h4v4" />',
  "trending-up": '<path d="M4 16l6-6 4 4 6-8" /><path d="M15 6h5v5" />',
  megaphone:
    '<path d="M4 10v4a1 1 0 0 0 1 1h2l8 4V5L7 9H5a1 1 0 0 0-1 1Z" /><path d="M17 9.5a3.5 3.5 0 0 1 0 5" />',
  chart: '<path d="M4 20V10M11 20V4M18 20v-7" /><path d="M4 20h16" />',
  handshake: '<path d="M3 12h4l3-3 3 3 3-3 4 3" /><path d="M7 12l3 5 2-1.5L14 17l3-5" />',
  search: '<circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.8-4.8" />',
  pie: '<path d="M12 3v9l7.5 4.3" /><path d="M12 3a9 9 0 1 0 7.79 13.5L12 12Z" />',
  pin: '<path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.3" />',
};

export function serviceIcon(glyph: keyof typeof SERVICE_ICON_GLYPHS, label: string): CmsImage {
  const inner = SERVICE_ICON_GLYPHS[glyph] ?? SERVICE_ICON_GLYPHS.pin;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c69a46" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  return {
    url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    alt: `${label} icon`,
    width: 48,
    height: 48,
  };
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return h;
}

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);
}
