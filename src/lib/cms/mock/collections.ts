import type {
  Award,
  Insight,
  Job,
  Leader,
  Office,
  Partner,
  Resource,
  Service,
  Testimonial,
  Value,
} from "../types";
import { img, logo, avatar, serviceIcon } from "./media";
import { osmEmbed } from "./properties";

/* ------------------------------------------------------------------ */
/*  Leadership                                                         */
/* ------------------------------------------------------------------ */

export const leaders: Leader[] = [
  {
    id: "l-aakash-sharma",
    name: "Aakash Sharma",
    role: "Founder & CEO",
    photo: avatar("leader-aakash", "Aakash Sharma", 400),
    linkedin: "https://www.linkedin.com/in/lxrealty-aakash",
    bio: "Aakash founded LX Realty with a conviction that real estate advice should be data-led, transparent and genuinely client-first. He has advised on transactions worth over ₹2000 Cr across residential and commercial mandates.",
    order: 1,
  },
  {
    id: "l-abhishek-sharma",
    name: "Abhishek Sharma",
    role: "Director – Sales",
    photo: avatar("leader-abhishek", "Abhishek Sharma", 400),
    linkedin: "https://www.linkedin.com/in/lxrealty-abhishek",
    bio: "Abhishek leads LX Realty's sales organisation across 25+ cities, building high-performing teams and long-term developer relationships.",
    order: 2,
  },
  {
    id: "l-anirudh-choukar",
    name: "Anirudh Choukar",
    role: "Director – Strategy",
    photo: avatar("leader-anirudh", "Anirudh Choukar", 400),
    linkedin: "https://www.linkedin.com/in/lxrealty-anirudh",
    bio: "Anirudh heads research, valuation and strategy, translating market data into decisions clients can act on with confidence.",
    order: 3,
  },
  {
    id: "l-mohd-faisal",
    name: "Mohd. Faisal",
    role: "Director – Partnerships",
    photo: avatar("leader-faisal", "Mohd. Faisal", 400),
    linkedin: "https://www.linkedin.com/in/lxrealty-faisal",
    bio: "Faisal manages LX Realty's developer and institutional partnerships, ensuring clients get first access to the best inventory in every micro-market.",
    order: 4,
  },
];

/* ------------------------------------------------------------------ */
/*  Careers                                                            */
/* ------------------------------------------------------------------ */

const jobSeeds: Array<
  Omit<Job, "responsibilities" | "requirements" | "postedAt"> &
    Partial<Pick<Job, "responsibilities" | "requirements">>
> = [
  {
    id: "j-senior-sales-manager",
    slug: "senior-sales-manager",
    title: "Senior Sales Manager",
    department: "Sales & Business Development",
    location: "Gurugram",
    experience: "5–8 Years",
    type: "Full-time",
    summary:
      "Own revenue for a portfolio of premium residential and commercial mandates, lead a team of sales advisors and deepen relationships with our developer partners.",
    applyUrl: "mailto:careers@lxrealty.in?subject=Senior Sales Manager",
  },
  {
    id: "j-investment-advisory-associate",
    slug: "investment-advisory-associate",
    title: "Investment Advisory Associate",
    department: "Advisory",
    location: "Gurugram / Noida",
    experience: "2–4 Years",
    type: "Full-time",
    summary:
      "Support senior advisors on investment mandates — market analysis, financial modelling, due diligence and client presentations.",
    applyUrl: "mailto:careers@lxrealty.in?subject=Investment Advisory Associate",
  },
  {
    id: "j-marketing-manager",
    slug: "marketing-manager",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Gurugram",
    experience: "4–6 Years",
    type: "Full-time",
    summary:
      "Lead brand, performance and project-marketing campaigns; own the content and lead-generation engine across digital and offline channels.",
    applyUrl: "mailto:careers@lxrealty.in?subject=Marketing Manager",
  },
  {
    id: "j-portfolio-management-executive",
    slug: "portfolio-management-executive",
    title: "Portfolio Management Executive",
    department: "Advisory",
    location: "Noida",
    experience: "2–3 Years",
    type: "Full-time",
    summary:
      "Track and report on client portfolios, coordinate rental and resale mandates, and prepare periodic performance reviews.",
    applyUrl: "mailto:careers@lxrealty.in?subject=Portfolio Management Executive",
  },
  {
    id: "j-hr-business-partner",
    slug: "hr-business-partner",
    title: "HR Business Partner",
    department: "Human Resources",
    location: "Gurugram",
    experience: "4–6 Years",
    type: "Full-time",
    summary:
      "Partner with business leaders on hiring, performance, engagement and org design as LX Realty scales across new cities.",
    applyUrl: "mailto:careers@lxrealty.in?subject=HR Business Partner",
  },
];

export const jobs: Job[] = jobSeeds.map((seed, i) => ({
  ...seed,
  postedAt: new Date(2024, 4, 20 - i * 3).toISOString(),
  responsibilities:
    seed.responsibilities ?? [
      "Deliver against quarterly targets and KPIs for your function.",
      "Work cross-functionally with advisory, marketing and operations teams.",
      "Maintain accurate records in the CRM and reporting systems.",
      "Represent LX Realty's values of integrity and transparency with every client.",
    ],
  requirements:
    seed.requirements ?? [
      `${seed.experience} of relevant experience, ideally in real estate or professional services.`,
      "Strong communication and stakeholder-management skills.",
      "Comfort with data, spreadsheets and presentation tools.",
      "A collaborative, ownership-driven mindset.",
    ],
}));

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */

export const testimonials: Testimonial[] = [
  {
    id: "t-home-rahul",
    group: "home",
    order: 1,
    quote:
      "LX Realty's team understood our requirements perfectly and guided us to the right investment. Their expertise and transparency are truly commendable.",
    name: "Rahul Mehta",
    role: "Investor, Gurugram",
    photo: avatar("t-rahul", "Rahul Mehta", 160),
    rating: 5,
  },
  {
    id: "t-about-rohit",
    group: "about",
    order: 1,
    quote:
      "LX Realty's market understanding and professionalism helped us find the perfect investment. Their guidance at every step was exceptional.",
    name: "Rohit Mehta",
    role: "Investor, Gurugram",
    photo: avatar("t-rohit", "Rohit Mehta", 160),
    rating: 5,
  },
  {
    id: "t-about-neha",
    group: "about",
    order: 2,
    quote:
      "The team is highly responsive and transparent. They deliver what they commit and always put the client first.",
    name: "Neha Arora",
    role: "Homebuyer, Noida",
    photo: avatar("t-neha", "Neha Arora", 160),
    rating: 5,
  },
  {
    id: "t-about-karan",
    group: "about",
    order: 3,
    quote:
      "Excellent advisory on our commercial investment. Their insights and data-backed approach made all the difference.",
    name: "Karan Malhotra",
    role: "Business Owner, Delhi NCR",
    photo: avatar("t-karan", "Karan Malhotra", 160),
    rating: 5,
  },
  {
    id: "t-careers-priya",
    group: "careers",
    order: 1,
    quote:
      "LX Realty has given me the platform to learn, grow, and contribute to impactful projects. The leadership truly empowers you to excel.",
    name: "Priya Sharma",
    role: "Senior Investment Advisor",
    photo: avatar("t-priya", "Priya Sharma", 160),
    rating: 5,
  },
  {
    id: "t-careers-rohit",
    group: "careers",
    order: 2,
    quote:
      "The culture here is collaborative, supportive and performance-driven. Every day brings a new learning and a new opportunity.",
    name: "Rohit Mehta",
    role: "Sales Manager",
    photo: avatar("t-rohit-2", "Rohit Mehta", 160),
    rating: 5,
  },
  {
    id: "t-careers-anjali",
    group: "careers",
    order: 3,
    quote:
      "I love the trust and flexibility that LX Realty offers. It's a place where your ideas are heard and your growth is a priority.",
    name: "Anjali Verma",
    role: "Marketing Specialist",
    photo: avatar("t-anjali", "Anjali Verma", 160),
    rating: 5,
  },
  {
    id: "t-residential-neha",
    group: "residential",
    order: 1,
    quote:
      "LX Realty helped us find our dream home in the perfect location. Their guidance, transparency and support throughout the journey was truly commendable.",
    name: "Neha Arora",
    role: "Homebuyer, Noida",
    photo: avatar("t-neha-2", "Neha Arora", 160),
    rating: 5,
  },
  {
    id: "t-commercial-rahul",
    group: "commercial",
    order: 1,
    quote:
      "LX Realty's market knowledge and professionalism helped us find the perfect commercial space for our business. Their transparency and support made the entire process seamless.",
    name: "Rahul Mehta",
    role: "Business Owner, Gurugram",
    photo: avatar("t-rahul-2", "Rahul Mehta", 160),
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Insights, perspectives, resources                                  */
/* ------------------------------------------------------------------ */

const articleSeeds: Array<Omit<Insight, "image" | "body" | "kind"> & Partial<Pick<Insight, "body">>> = [
  {
    id: "i-investment-hotspots-2024",
    slug: "top-real-estate-investment-hotspots-india-2024",
    title: "Top Real Estate Investment Hotspots in India – 2024",
    category: "Market Trend",
    date: "2024-05-20",
    excerpt:
      "Key cities and micro-markets poised for high growth and strong returns in the year ahead.",
    readingTime: "6 min read",
    topics: ["Market Trends", "Investment"],
  },
  {
    id: "i-commercial-outlook-2024",
    slug: "commercial-real-estate-outlook-2024-and-beyond",
    title: "Commercial Real Estate Outlook 2024 & Beyond",
    category: "Market Outlook",
    date: "2024-05-12",
    excerpt:
      "An outlook on demand, supply, and future growth across key commercial sectors.",
    readingTime: "8 min read",
    topics: ["Commercial", "Market Trends"],
  },
  {
    id: "i-luxury-living-trends",
    slug: "luxury-living-evolving-trends-in-india",
    title: "Luxury Living: Evolving Trends in India",
    category: "Residential Insights",
    date: "2024-05-05",
    excerpt:
      "How luxury homebuyers' preferences are shaping new developments across metros.",
    readingTime: "5 min read",
    topics: ["Luxury Living", "Residential"],
  },
  {
    id: "i-economic-indicators",
    slug: "economic-indicators-impacting-real-estate",
    title: "Economic Indicators Impacting Real Estate",
    category: "Economy Watch",
    date: "2024-04-28",
    excerpt:
      "Key economic factors influencing real estate decisions in 2024.",
    readingTime: "7 min read",
    topics: ["Policy & Economy", "Market Trends"],
  },
  {
    id: "i-gurugram-market-update",
    slug: "gurugram-real-estate-market-update-2024",
    title: "Gurugram Real Estate Market Update 2024",
    category: "Market Trend",
    date: "2024-05-27",
    excerpt:
      "Pricing, absorption and new-launch trends across Gurugram's key residential corridors.",
    readingTime: "6 min read",
    topics: ["Market Trends", "Residential"],
  },
  {
    id: "i-delhi-ncr-hotspots",
    slug: "top-5-investment-hotspots-in-delhi-ncr",
    title: "Top 5 Investment Hotspots in Delhi NCR",
    category: "Market Outlook",
    date: "2024-05-20",
    excerpt:
      "Where capital appreciation and rental yields are converging across the National Capital Region.",
    readingTime: "5 min read",
    topics: ["Investment", "Market Trends"],
  },
  {
    id: "i-why-invest-now",
    slug: "why-now-is-the-right-time-to-invest-in-real-estate",
    title: "Why Now is the Right Time to Invest in Real Estate",
    category: "Economy Watch",
    date: "2024-05-10",
    excerpt:
      "Interest rates, supply cycles and buyer sentiment all point to a favourable window.",
    readingTime: "4 min read",
    topics: ["Investment", "Policy & Economy"],
  },
];

const LOREM_BODY = `
<p>India's real estate market is entering a decisive phase. After a multi-year correction and consolidation, demand has broadened beyond the traditional metros, developer balance sheets are healthier, and buyers are back with genuine intent rather than speculative interest.</p>
<h2>What the data shows</h2>
<p>Across the top eight cities, residential absorption has stayed above the ten-year average for six consecutive quarters. Unsold inventory has compressed to roughly 20 months of sales — the tightest it has been since 2014 — and price growth has been steady rather than frothy.</p>
<h2>Where the opportunity is</h2>
<p>The strongest risk-adjusted returns are in infrastructure-led micro-markets: corridors where a new expressway, metro line or employment hub is under construction but not yet operational. These locations typically re-rate sharply once connectivity goes live.</p>
<h2>How LX Realty helps</h2>
<p>Our advisory team combines proprietary transaction data with on-ground diligence — checking approvals, developer track record, construction progress and exit liquidity — so clients invest with a clear view of both upside and risk.</p>
`;

export const insights: Insight[] = articleSeeds.map((seed) => ({
  ...seed,
  kind: "article",
  image: img(`insight-${seed.slug}`, 1200, 800, seed.title),
  body: seed.body ?? LOREM_BODY,
  author: "LX Realty Research",
  authorRole: "Market Intelligence Team",
}));

export const perspectives: Insight[] = [
  {
    id: "pv-aakash",
    slug: "perspective-aakash-sharma",
    title: "Real estate is about long-term value, not just space",
    category: "Leadership Perspective",
    date: "2024-05-18",
    excerpt:
      "Real estate in India is not just about spaces, it's about creating long-term value for communities and investors alike.",
    image: avatar("leader-aakash", "Aakash Sharma", 600),
    kind: "perspective",
    author: "Aakash Sharma",
    authorRole: "Founder & CEO, LX Realty",
    authorPhoto: avatar("leader-aakash", "Aakash Sharma", 200),
    topics: ["Market Trends"],
    body: LOREM_BODY,
  },
  {
    id: "pv-anirudh",
    slug: "perspective-anirudh-choukar",
    title: "Data and research are the core of every real estate decision",
    category: "Leadership Perspective",
    date: "2024-05-11",
    excerpt:
      "Data and research are at the core of every successful real estate decision. That's where the future lies.",
    image: avatar("leader-anirudh", "Anirudh Choukar", 600),
    kind: "perspective",
    author: "Anirudh Choukar",
    authorRole: "Director – Strategy",
    authorPhoto: avatar("leader-anirudh", "Anirudh Choukar", 200),
    topics: ["Technology", "Market Trends"],
    body: LOREM_BODY,
  },
  {
    id: "pv-faisal",
    slug: "perspective-mohd-faisal",
    title: "Transparency, trust and technology will define the next era",
    category: "Leadership Perspective",
    date: "2024-05-04",
    excerpt:
      "Transparency, trust, and technology will define the next era of real estate in India.",
    image: avatar("leader-faisal", "Mohd. Faisal", 600),
    kind: "perspective",
    author: "Mohd. Faisal",
    authorRole: "Director – Partnerships",
    authorPhoto: avatar("leader-faisal", "Mohd. Faisal", 200),
    topics: ["Technology"],
    body: LOREM_BODY,
  },
];

export const resources: Resource[] = [
  {
    id: "r-market-report-2024",
    title: "India Real Estate Market Report 2024",
    type: "Research Report",
    description: "Comprehensive analysis of market performance, trends, and forecasts.",
    image: img("resource-market-report", 800, 560, "India Real Estate Market Report 2024"),
    fileUrl: "/resources/india-real-estate-market-report-2024.pdf",
    fileSize: "PDF 5.2 MB",
    topics: ["Market Trends", "Investment"],
  },
  {
    id: "r-smart-real-estate",
    title: "The Future of Smart Real Estate",
    type: "Whitepaper",
    description: "How technology and innovation are transforming the real estate landscape.",
    image: img("resource-smart", 800, 560, "The Future of Smart Real Estate"),
    fileUrl: "/resources/future-of-smart-real-estate.pdf",
    fileSize: "PDF 3.8 MB",
    topics: ["Technology", "Market Trends"],
  },
  {
    id: "r-quarterly-update-q1",
    title: "Quarterly Market Update – Q1 2024",
    type: "Market Update",
    description: "Key updates on residential, commercial, and land markets in India.",
    image: img("resource-quarterly", 800, 560, "Quarterly Market Update Q1 2024"),
    fileUrl: "/resources/quarterly-market-update-q1-2024.pdf",
    fileSize: "PDF 2.4 MB",
    topics: ["Market Trends", "Commercial", "Residential"],
  },
  {
    id: "r-investor-guide",
    title: "Investor's Guide to Real Estate in India",
    type: "Guide",
    description: "A practical guide for investors to make informed real estate investment decisions.",
    image: img("resource-guide", 800, 560, "Investor's Guide to Real Estate in India"),
    fileUrl: "/resources/investors-guide-to-real-estate-in-india.pdf",
    fileSize: "PDF 4.6 MB",
    topics: ["Investment", "Policy & Economy"],
  },
];

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

export const services: Service[] = [
  {
    id: "s-residential-advisory",
    slug: "residential-advisory",
    title: "Residential Advisory",
    excerpt:
      "Helping homebuyers find the right homes and investors build high-performing portfolios.",
    icon: serviceIcon("home", "Residential Advisory"),
    image: img("service-residential", 900, 560, "Residential Advisory"),
    bullets: [
      "Curated shortlists matched to your budget and lifestyle",
      "Independent, developer-agnostic recommendations",
      "Price benchmarking and negotiation support",
      "End-to-end paperwork and handover assistance",
    ],
    order: 1,
  },
  {
    id: "s-commercial-advisory",
    slug: "commercial-advisory",
    title: "Commercial Advisory",
    excerpt:
      "Advising businesses and investors on office spaces, retail, and industrial investments.",
    icon: serviceIcon("building", "Commercial Advisory"),
    image: img("service-commercial", 900, 560, "Commercial Advisory"),
    bullets: [
      "Site selection and workplace strategy",
      "Lease vs. buy financial modelling",
      "Pre-leased and Grade-A investment opportunities",
      "Exit and re-leasing advisory",
    ],
    order: 2,
  },
  {
    id: "s-investment-advisory",
    slug: "investment-advisory",
    title: "Investment Advisory",
    excerpt:
      "Identifying high-potential investment opportunities and delivering maximum returns.",
    icon: serviceIcon("trending-up", "Investment Advisory"),
    image: img("service-investment", 900, 560, "Investment Advisory"),
    bullets: [
      "Micro-market research and entry timing",
      "Risk-adjusted return projections",
      "Portfolio diversification strategy",
      "Ongoing performance monitoring",
    ],
    order: 3,
  },
  {
    id: "s-project-marketing",
    slug: "project-marketing",
    title: "Project Marketing",
    excerpt:
      "Strategic marketing solutions for developers to drive faster sales and brand positioning.",
    icon: serviceIcon("megaphone", "Project Marketing"),
    image: img("service-marketing", 900, 560, "Project Marketing"),
    bullets: [
      "Positioning, pricing and launch strategy",
      "Channel-partner activation and management",
      "Digital demand generation",
      "Sales-gallery experience design",
    ],
    order: 4,
  },
  {
    id: "s-research-valuation",
    slug: "research-valuation",
    title: "Research & Valuation",
    excerpt:
      "Market research and accurate property valuation for informed decision making.",
    icon: serviceIcon("chart", "Research & Valuation"),
    image: img("service-research", 900, 560, "Research & Valuation"),
    bullets: [
      "RICS-aligned valuation methodology",
      "Feasibility and highest-and-best-use studies",
      "Demand-supply and absorption analysis",
      "Custom research mandates",
    ],
    order: 5,
  },
  {
    id: "s-transaction-management",
    slug: "transaction-management",
    title: "Transaction Management",
    excerpt:
      "End-to-end transaction support ensuring a smooth and successful closure.",
    icon: serviceIcon("handshake", "Transaction Management"),
    image: img("service-transaction", 900, 560, "Transaction Management"),
    bullets: [
      "Due diligence and title verification",
      "Documentation and registration support",
      "Coordination with banks and legal teams",
      "Post-closure handover and compliance",
    ],
    order: 6,
  },
];

export const advisoryServices: Service[] = [
  {
    id: "as-investment",
    slug: "investment-advisory",
    title: "Investment Advisory",
    excerpt:
      "Identify high-potential investment opportunities across asset classes and locations.",
    icon: serviceIcon("trending-up", "Investment Advisory"),
    bullets: [],
    order: 1,
  },
  {
    id: "as-market-research",
    slug: "market-research-intelligence",
    title: "Market Research & Intelligence",
    excerpt:
      "In-depth market analysis, data insights, and trend forecasting to support smarter decisions.",
    icon: serviceIcon("chart", "Market Research & Intelligence"),
    bullets: [],
    order: 2,
  },
  {
    id: "as-feasibility",
    slug: "project-feasibility-due-diligence",
    title: "Project Feasibility & Due Diligence",
    excerpt:
      "Comprehensive feasibility studies and due diligence to evaluate viability and mitigate risk.",
    icon: serviceIcon("search", "Project Feasibility & Due Diligence"),
    bullets: [],
    order: 3,
  },
  {
    id: "as-transaction",
    slug: "transaction-advisory",
    title: "Transaction Advisory",
    excerpt:
      "End-to-end support across buying, selling, leasing, and joint ventures.",
    icon: serviceIcon("handshake", "Transaction Advisory"),
    bullets: [],
    order: 4,
  },
  {
    id: "as-portfolio",
    slug: "portfolio-advisory",
    title: "Portfolio Advisory",
    excerpt:
      "Optimize your real estate portfolio for performance, diversification, and long-term growth.",
    icon: serviceIcon("pie", "Portfolio Advisory"),
    bullets: [],
    order: 5,
  },
  {
    id: "as-land",
    slug: "land-advisory",
    title: "Land Advisory",
    excerpt:
      "Strategic land evaluation, acquisition advisory, and highest & best use analysis.",
    icon: serviceIcon("pin", "Land Advisory"),
    bullets: [],
    order: 6,
  },
];

/* ------------------------------------------------------------------ */
/*  Offices                                                            */
/* ------------------------------------------------------------------ */

export const offices: Office[] = [
  {
    id: "o-corporate",
    name: "Corporate Office",
    kind: "corporate",
    address: "DLF Corporate Greens, Sector 74A, Gurugram, Haryana 122004, India",
    city: "Gurugram",
    phone: "+91 99999 99999",
    features: [
      "Prime location with excellent connectivity",
      "Spacious, modern workspace",
      "Ample parking available",
      "Visitor-friendly environment",
    ],
    mapEmbedUrl: osmEmbed(28.3846, 77.027),
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=DLF+Corporate+Greens+Sector+74A+Gurugram",
    order: 0,
  },
  {
    id: "o-gurugram",
    name: "Gurugram",
    kind: "branch",
    address: "DLF Corporate Greens, Sector 74A, Gurugram, Haryana 122004",
    city: "Gurugram",
    phone: "+91 99999 99999",
    image: img("office-gurugram", 800, 500, "Gurugram office"),
    features: [],
    order: 1,
  },
  {
    id: "o-noida",
    name: "Noida",
    kind: "branch",
    address: "Unit 804, 8th Floor, Advant Navis Business Park, Sector 142, Noida, UP 201305",
    city: "Noida",
    phone: "+91 99999 99999",
    image: img("office-noida", 800, 500, "Noida office"),
    features: [],
    order: 2,
  },
  {
    id: "o-delhi",
    name: "Delhi",
    kind: "branch",
    address: "Unit No. 12, 1st Floor, Okhla Industrial Area, Phase III, New Delhi 110020",
    city: "New Delhi",
    phone: "+91 99999 99999",
    image: img("office-delhi", 800, 500, "Delhi office"),
    features: [],
    order: 3,
  },
  {
    id: "o-mumbai",
    name: "Mumbai",
    kind: "branch",
    address: "Bandra Kurla Complex, Unit No. 215, 2nd Floor, Bandra East, Mumbai 400051",
    city: "Mumbai",
    phone: "+91 99999 99999",
    image: img("office-mumbai", 800, 500, "Mumbai office"),
    features: [],
    order: 4,
  },
  {
    id: "o-bengaluru",
    name: "Bengaluru",
    kind: "branch",
    address: "Prestige Atlanta, Unit 505, 5th Floor, Koramangala, Bengaluru, Karnataka 560034",
    city: "Bengaluru",
    phone: "+91 99999 99999",
    image: img("office-bengaluru", 800, 500, "Bengaluru office"),
    features: [],
    order: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Partners & awards                                                  */
/* ------------------------------------------------------------------ */

const developerNames = [
  "DLF",
  "M3M",
  "Godrej Properties",
  "Signature Global",
  "Whiteland",
  "Smartworld",
  "Bhutani Infra",
  "Elan Group",
  "Birla Estates",
];
const bankNames = [
  "HDFC Bank",
  "ICICI Bank",
  "SBI",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "IDFC First Bank",
  "Bajaj Housing Finance",
  "PNB Housing",
];
const interiorNames = ["Godrej Interio", "Livspace", "HomeLane", "Asian Paints"];
const clientNames = [
  "DLF",
  "M3M",
  "Godrej Properties",
  "Signature Global",
  "Whiteland",
  "Smartworld",
  "Bhutani Infra",
  "Elan Group",
];

export const partners: Partner[] = [
  ...developerNames.map((name, i) => ({
    id: `partner-dev-${i}`,
    name,
    logo: logo(name),
    group: "developer" as const,
    order: i,
  })),
  ...bankNames.map((name, i) => ({
    id: `partner-bank-${i}`,
    name,
    logo: logo(name),
    group: "bank" as const,
    order: i,
  })),
  ...interiorNames.map((name, i) => ({
    id: `partner-int-${i}`,
    name,
    logo: logo(name),
    group: "interior" as const,
    order: i,
  })),
  ...clientNames.map((name, i) => ({
    id: `partner-client-${i}`,
    name,
    logo: logo(`${name} client`),
    group: "client" as const,
    order: i,
  })),
];

export const awards: Award[] = [
  {
    id: "a-2023",
    title: "Best Real Estate Consultancy",
    year: "2023",
    image: img("award-2023", 240, 240, "Best Real Estate Consultancy 2023"),
    order: 1,
  },
  {
    id: "a-2022",
    title: "Excellence in Advisory Services",
    year: "2022",
    image: img("award-2022", 240, 240, "Excellence in Advisory Services 2022"),
    order: 2,
  },
  {
    id: "a-2021",
    title: "Fastest Growing Real Estate Firm",
    year: "2021",
    image: img("award-2021", 240, 240, "Fastest Growing Real Estate Firm 2021"),
    order: 3,
  },
];

/* ------------------------------------------------------------------ */
/*  Values                                                             */
/* ------------------------------------------------------------------ */

export const values: Value[] = [
  { icon: "ShieldCheck", title: "Integrity", description: "We do what's right, always.", order: 1 },
  { icon: "Gem", title: "Excellence", description: "We strive for the highest standards.", order: 2 },
  { icon: "Users", title: "Transparency", description: "Clear communication at every step.", order: 3 },
  { icon: "UserCheck", title: "Client First", description: "Your success is our priority.", order: 4 },
  { icon: "Lightbulb", title: "Innovation", description: "Forward-thinking solutions.", order: 5 },
];
