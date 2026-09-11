import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube, Globe } from "lucide-react";
import type { FooterColumn, SiteSettings } from "@/lib/cms";
import { Logo } from "./logo";

const socialIcons = { linkedin: Linkedin, instagram: Instagram, facebook: Facebook, youtube: Youtube };

export function SiteFooter({
  settings,
  columns,
}: {
  settings: SiteSettings;
  columns: FooterColumn[];
}) {
  const year = new Date().getFullYear();

  // Explicit grid tracks (brand | one per nav column | contact) sized from the
  // actual column count, so any number of WordPress footer columns lays out
  // in one clean row on desktop instead of the leftover-space flex columns
  // starved for width.
  const gridStyle = {
    "--lxr-nav-cols": columns.length || 1,
  } as React.CSSProperties;

  return (
    <footer className="bg-navy-950 text-mist-300">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-6 lg:px-10">
        <div
          className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[260px_repeat(var(--lxr-nav-cols),minmax(120px,1fr))_240px] lg:gap-x-10"
          style={gridStyle}
        >
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo image={settings.logo} />
            <p className="mt-5 text-sm leading-relaxed text-mist-400">{settings.footerBlurb}</p>
            <div className="mt-6 flex gap-3">
              {Object.entries(socialIcons).map(([key, Icon]) => {
                const href = settings.socials[key as keyof typeof settings.socials];
                if (!href) return null;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={key}
                    className="flex size-9 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 transition-colors hover:bg-gold-500/10"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav columns — count is whatever WordPress' "footer" menu defines. */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-mist-400 transition-colors hover:text-gold-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="eyebrow mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-mist-400">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                <span>{settings.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-gold-300">
                  {settings.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                <a href={`mailto:${settings.email}`} className="hover:text-gold-300">
                  {settings.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Globe className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                <span>{settings.website}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-mist-400 sm:flex-row">
          <p>© {year} {settings.companyName}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-gold-300">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-gold-300">Terms of Use</Link>
            <Link href="/disclaimer" className="hover:text-gold-300">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
