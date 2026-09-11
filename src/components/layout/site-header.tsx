"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import type { NavItem, SiteSettings } from "@/lib/cms";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader({ settings, nav }: { settings: SiteSettings; nav: NavItem[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  // Close the mobile menu when the route changes. Adjusted directly during
  // render (React's recommended pattern for "state changed because a prop
  // changed") rather than in an effect, which would cause an extra render pass.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setOpen(false);
    setOpenGroup(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0].replace(/\/residential|\/commercial/, ""));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-gold-500/15 bg-navy-950/95 backdrop-blur supports-[backdrop-filter]:bg-navy-950/80"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-4 lg:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.12em] transition-colors",
                  isActive(item.href) ? "text-gold-400" : "text-white/85 hover:text-gold-300",
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="size-3.5 opacity-70" aria-hidden />}
              </Link>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="panel overflow-hidden rounded-xl p-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2.5 hover:bg-gold-500/10"
                      >
                        <span className="block text-sm font-medium text-white">{child.label}</span>
                        {child.description && (
                          <span className="block text-xs text-mist-400">{child.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-5 xl:flex">
          <a
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 whitespace-nowrap text-[0.78rem] font-semibold text-white/85 hover:text-gold-300"
          >
            <Phone className="size-4 text-gold-400" aria-hidden />
            {settings.phone}
          </a>
          <Button href="/contact" size="sm" variant="outline">
            Connect With Us
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-md border border-gold-500/30 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-gold-500/15 bg-navy-950 px-4 pb-8 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-white/5">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="flex-1 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-white"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                      className="p-3 text-gold-300"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <ChevronDown
                        className={cn("size-4 transition-transform", openGroup === item.label && "rotate-180")}
                      />
                    </button>
                  )}
                </div>
                {item.children && openGroup === item.label && (
                  <div className="pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2.5 pl-4 text-sm text-mist-300"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-4">
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm font-semibold text-white"
            >
              <Phone className="size-4 text-gold-400" aria-hidden />
              {settings.phone}
            </a>
            <Button href="/contact" size="sm">
              Connect With Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
