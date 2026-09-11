import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getSiteSettings } from "@/lib/cms";
import { footerColumns, mainNav } from "@/content/navigation";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lxrealty.in"),
  title: {
    default: "LX Realty — Redefining Real Estate. Delivering Excellence.",
    template: "%s | LX Realty",
  },
  description:
    "LX Realty is a platinum consultancy and advisory firm offering end-to-end real estate solutions across Residential, Commercial and Investment segments.",
  openGraph: {
    type: "website",
    siteName: "LX Realty",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-900 text-[#f3f6fa]">
        <SiteHeader settings={settings} nav={mainNav} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} columns={footerColumns} />
      </body>
    </html>
  );
}
