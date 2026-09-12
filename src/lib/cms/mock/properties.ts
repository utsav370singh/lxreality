import type { Property } from "../types";
import { img } from "./media";

/** Keyless OpenStreetMap embed centred on a marker. */
export function osmEmbed(lat: number, lng: number): string {
  const d = 0.012;
  const bbox = [lng - d, lat - d * 0.7, lng + d, lat + d * 0.7].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
}

type Seed = Omit<Property, "image" | "gallery" | "overview" | "amenities" | "specifications" | "connectivity"> &
  Partial<Pick<Property, "overview" | "amenities" | "specifications" | "connectivity">>;

const RESIDENTIAL_AMENITIES = [
  "Grand double-height lobby",
  "Infinity-edge swimming pool",
  "Fully-equipped fitness studio",
  "Landscaped central greens",
  "Kids' play zone & crèche",
  "Multipurpose banquet hall",
  "Indoor games & yoga deck",
  "24×7 security with CCTV & video door phone",
];

const COMMERCIAL_AMENITIES = [
  "Triple-height entrance lobby",
  "High-speed destination-control elevators",
  "100% power back-up",
  "Multi-level basement parking",
  "Landscaped plaza & F&B court",
  "Smart building management system",
  "EV charging infrastructure",
  "24×7 manned security & access control",
];

const PLOTS_AMENITIES = [
  "Gated entry with boundary wall",
  "Tree-lined internal roads",
  "Underground electrical & water lines",
  "Rainwater harvesting pits",
  "Landscaped central park",
  "24×7 security with CCTV",
];

function build(seed: Seed): Property {
  const isResidential = seed.segment === "residential";
  const isPlots = seed.segment === "plots";
  const location = seed.location
    ? {
        ...seed.location,
        mapEmbedUrl: seed.location.mapEmbedUrl ?? osmEmbed(seed.location.lat, seed.location.lng),
      }
    : undefined;
  return {
    ...seed,
    location,
    image: img(`prop-${seed.slug}`, 1200, 900, seed.title),
    gallery: [
      img(`prop-${seed.slug}-1`, 1600, 1000, `${seed.title} — exterior`),
      img(`prop-${seed.slug}-2`, 1600, 1000, `${seed.title} — lobby`),
      img(`prop-${seed.slug}-3`, 1600, 1000, `${seed.title} — interior`),
      img(`prop-${seed.slug}-4`, 1600, 1000, `${seed.title} — amenities`),
    ],
    overview:
      seed.overview ??
      `${seed.title} at ${seed.locality}, ${seed.city} is a ${
        isResidential ? "landmark residential address" : isPlots ? "meticulously planned plotted development" : "Grade-A commercial destination"
      } developed by ${seed.developer ?? "a leading developer"}. ${seed.description} Every detail — from the master plan to the specification sheet — has been curated to protect and grow long-term value for owners and investors.`,
    amenities: seed.amenities ?? (isResidential ? RESIDENTIAL_AMENITIES : isPlots ? PLOTS_AMENITIES : COMMERCIAL_AMENITIES),
    specifications:
      seed.specifications ??
      (isResidential
        ? [
            { label: "Configuration", value: seed.configuration ?? "3 & 4 BHK" },
            { label: "Land parcel", value: "18.5 acres" },
            { label: "Towers", value: "6 towers, G + 42 floors" },
            { label: "Open area", value: "82% open & green" },
            { label: "Possession", value: "Q4 2028" },
            { label: "RERA", value: seed.reraId ?? "RERA-GGM-XXXX-2024" },
          ]
        : isPlots
          ? [
              { label: "Plot sizes", value: seed.tags.join(" · ") },
              { label: "Total parcel", value: "12 acres" },
              { label: "Road width", value: "24 – 60 ft. internal roads" },
              { label: "Title status", value: "Clear & registration-ready" },
              { label: "Possession", value: "Immediate" },
              { label: "RERA", value: seed.reraId ?? "RERA-GGM-XXXX-2024" },
            ]
          : [
              { label: "Asset type", value: seed.tags.join(" · ") },
              { label: "Typical floor plate", value: "22,000 – 45,000 sq. ft." },
              { label: "Efficiency", value: "68% carpet efficiency" },
              { label: "Certification", value: seed.status ?? "IGBC Gold pre-certified" },
              { label: "Possession", value: "Q2 2027" },
              { label: "RERA", value: seed.reraId ?? "RERA-GGM-XXXX-2024" },
            ]),
    connectivity:
      seed.connectivity ??
      [
        { label: "Airport", value: "35 – 45 min drive" },
        { label: "Metro / Rapid Metro", value: "8 – 12 min drive" },
        { label: "Business district", value: "Within 6 km" },
        { label: "Schools & hospitals", value: "2 – 5 km radius" },
      ],
  };
}

const seeds: Seed[] = [
  {
    id: "p-dlf-privana-west",
    slug: "dlf-privana-west",
    title: "DLF Privana West",
    segment: "residential",
    badge: "New Launch",
    locality: "Sector 76",
    city: "Gurugram",
    priceLabel: "₹ 6.5 Cr* Onwards",
    tags: ["4 BHK", "Luxury Living"],
    configuration: "4 BHK + Utility",
    developer: "DLF Limited",
    status: "New Launch",
    reraId: "RERA-GGM-1642-2024",
    featured: true,
    order: 1,
    description:
      "A gated low-density enclave wrapped by the Aravalli greens, with expansive four-bedroom residences and a resort-grade clubhouse.",
    location: { lat: 28.3921, lng: 76.9835 },
    brochureUrl: "#",
  },
  {
    id: "p-m3m-crown",
    slug: "m3m-crown",
    title: "M3M Crown",
    segment: "residential",
    badge: "Premium",
    locality: "Sector 111",
    city: "Gurugram",
    priceLabel: "₹ 4.2 Cr* Onwards",
    tags: ["3 & 4 BHK", "World-Class Amenities"],
    configuration: "3 & 4 BHK",
    developer: "M3M India",
    status: "Under Construction",
    reraId: "RERA-GGM-1490-2023",
    featured: true,
    order: 2,
    description:
      "Twin-tower high-rise living on the Dwarka Expressway with sky decks, a 1.5-acre central court and direct expressway access.",
    location: { lat: 28.5083, lng: 77.0431 },
    brochureUrl: "#",
  },
  {
    id: "p-godrej-miraya",
    slug: "godrej-miraya",
    title: "Godrej Miraya",
    segment: "residential",
    badge: "Luxury",
    locality: "Sector 43",
    city: "Gurugram",
    priceLabel: "₹ 3.8 Cr* Onwards",
    tags: ["3 & 4 BHK", "Green Living"],
    configuration: "3 & 4 BHK",
    developer: "Godrej Properties",
    status: "Under Construction",
    reraId: "RERA-GGM-1521-2023",
    featured: true,
    order: 3,
    description:
      "An IGBC-aligned address off Golf Course Road with biophilic landscaping, rainwater harvesting and low-VOC interiors throughout.",
    location: { lat: 28.4498, lng: 77.0916 },
    brochureUrl: "#",
  },
  {
    id: "p-signature-global-daxin-vistas",
    slug: "signature-global-daxin-vistas",
    title: "Signature Global Daxin Vistas",
    segment: "residential",
    badge: "Iconic",
    locality: "Sohna Expressway",
    city: "Gurugram",
    priceLabel: "₹ 2.6 Cr* Onwards",
    tags: ["2, 3 & 4 BHK", "Smart Homes"],
    configuration: "2, 3 & 4 BHK",
    developer: "Signature Global",
    status: "Under Construction",
    reraId: "RERA-GGM-1388-2023",
    featured: true,
    order: 4,
    description:
      "Smart-home residences with app-controlled utilities, EV-ready parking and a 45,000 sq. ft. clubhouse on the Sohna growth corridor.",
    location: { lat: 28.3487, lng: 77.0631 },
    brochureUrl: "#",
  },
  {
    id: "p-whiteland-blissville",
    slug: "whiteland-blissville",
    title: "Whiteland Blissville",
    segment: "residential",
    badge: "Exclusive",
    locality: "Sector 76",
    city: "Gurugram",
    priceLabel: "₹ 2.3 Cr* Onwards",
    tags: ["2 & 3 BHK", "Modern Lifestyle"],
    configuration: "2 & 3 BHK",
    developer: "Whiteland Corporation",
    status: "New Launch",
    reraId: "RERA-GGM-1655-2024",
    featured: true,
    order: 5,
    description:
      "Compact luxury apartments with Hermès-curated interiors, a wellness spa and a rooftop observation lounge in New Gurugram.",
    location: { lat: 28.3901, lng: 76.9701 },
    brochureUrl: "#",
  },
  {
    id: "p-birla-arika",
    slug: "birla-arika",
    title: "Birla Arika",
    segment: "residential",
    badge: "Hot Deal",
    locality: "Sector 31",
    city: "Gurugram",
    priceLabel: "₹ 5.1 Cr* Onwards",
    tags: ["3 & 4 BHK", "Ultra Luxury"],
    configuration: "3 & 4 BHK",
    developer: "Birla Estates",
    status: "New Launch",
    reraId: "RERA-GGM-1660-2024",
    featured: true,
    order: 6,
    description:
      "Ultra-luxury residences steps from Galleria Market, with private lift lobbies, a signature spa and concierge-managed services.",
    location: { lat: 28.4595, lng: 77.0723 },
    brochureUrl: "#",
  },

  {
    id: "p-signature-global-business-hub",
    slug: "signature-global-business-hub",
    title: "Signature Global Business Hub",
    segment: "commercial",
    badge: "Premium",
    locality: "Sector 81",
    city: "Gurugram",
    priceLabel: "₹ 2.8 Cr* Onwards",
    tags: ["Retail & Office", "Grade A"],
    developer: "Signature Global",
    status: "IGBC Gold pre-certified",
    reraId: "RERA-GGM-C-0421-2024",
    featured: false,
    order: 1,
    description:
      "A mixed retail-and-office landmark on NH-8 with double-height showroom frontage and institutional-grade upper floors.",
    location: { lat: 28.3993, lng: 76.9612 },
    brochureUrl: "#",
  },
  {
    id: "p-m3m-urbana-business-park",
    slug: "m3m-urbana-business-park",
    title: "M3M Urbana Business Park",
    segment: "commercial",
    badge: "Iconic",
    locality: "Sector 67",
    city: "Gurugram",
    priceLabel: "₹ 1.9 Cr* Onwards",
    tags: ["Office Spaces", "LEED Gold"],
    developer: "M3M India",
    status: "LEED Gold certified",
    reraId: "RERA-GGM-C-0388-2023",
    featured: false,
    order: 2,
    description:
      "Boutique office suites above a high-footfall high-street on Golf Course Extension Road, ideal for GCC and professional-services tenants.",
    location: { lat: 28.3948, lng: 77.0521 },
    brochureUrl: "#",
  },
  {
    id: "p-godrej-riverine",
    slug: "godrej-riverine",
    title: "Godrej Riverine",
    segment: "commercial",
    badge: "Pre-Launch",
    locality: "Sector 44",
    city: "Noida",
    priceLabel: "₹ 2.5 Cr* Onwards",
    tags: ["Mixed Use", "IGBC Certified"],
    developer: "Godrej Properties",
    status: "IGBC certified",
    reraId: "UPRERAPRJ-C-XXXX-2024",
    featured: false,
    order: 3,
    description:
      "A mixed-use riverfront development in the Noida CBD combining retail, managed offices and serviced residences.",
    location: { lat: 28.5691, lng: 77.3273 },
    brochureUrl: "#",
  },
  {
    id: "p-dlf-downtown",
    slug: "dlf-downtown",
    title: "DLF Downtown",
    segment: "commercial",
    badge: "Luxury",
    locality: "Sector 25A",
    city: "Gurugram",
    priceLabel: "₹ 3.6 Cr* Onwards",
    tags: ["Premium Offices", "Grade A+"],
    developer: "DLF Limited",
    status: "Grade A+",
    reraId: "RERA-GGM-C-0301-2022",
    featured: false,
    order: 4,
    description:
      "A 27-acre integrated office campus near Cyber Hub with metro connectivity, large column-free floor plates and a retail boulevard.",
    location: { lat: 28.4949, lng: 77.0876 },
    brochureUrl: "#",
  },
  {
    id: "p-whiteland-the-aspen-hub",
    slug: "whiteland-the-aspen-hub",
    title: "Whiteland The Aspen Hub",
    segment: "commercial",
    badge: "Exclusive",
    locality: "Sector 25A",
    city: "Gurugram",
    priceLabel: "₹ 2.6 Cr* Onwards",
    tags: ["Retail & Office", "Smart Building"],
    developer: "Whiteland Corporation",
    status: "Smart building",
    reraId: "RERA-GGM-C-0455-2024",
    featured: false,
    order: 5,
    description:
      "An IoT-enabled retail-and-office block adjacent to DLF Downtown with app-based access, smart parking and a curated F&B plaza.",
    location: { lat: 28.4931, lng: 77.0902 },
    brochureUrl: "#",
  },

  {
    id: "p-signature-global-city-84",
    slug: "signature-global-city-84",
    title: "Signature Global City 84",
    segment: "plots",
    badge: "New Launch",
    locality: "Sector 84",
    city: "Gurugram",
    priceLabel: "₹ 1.8 Cr* Onwards",
    tags: ["150 – 300 Sq. Yd. Plots", "Gated Community"],
    developer: "Signature Global",
    status: "New Launch",
    reraId: "RERA-GGM-P-0512-2024",
    featured: false,
    order: 1,
    description:
      "A licensed, gated plotted development on Dwarka Expressway with wide internal roads and a central landscaped park.",
    location: { lat: 28.3654, lng: 76.9587 },
    brochureUrl: "#",
  },
  {
    id: "p-whiteland-la-verdi",
    slug: "whiteland-la-verdi",
    title: "Whiteland La Verdi",
    segment: "plots",
    badge: "Exclusive",
    locality: "Sector 76",
    city: "Gurugram",
    priceLabel: "₹ 2.4 Cr* Onwards",
    tags: ["200 – 400 Sq. Yd. Plots", "Corner Plots Available"],
    developer: "Whiteland Corporation",
    status: "Registration-ready",
    reraId: "RERA-GGM-P-0587-2024",
    featured: false,
    order: 2,
    description:
      "Freehold, RERA-registered plots in New Gurugram's fastest-growing corridor, ready for immediate construction.",
    location: { lat: 28.3877, lng: 76.9722 },
    brochureUrl: "#",
  },
];

export const properties: Property[] = seeds.map(build);
