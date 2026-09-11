import type { PageContent, PageKey } from "@/lib/cms/types";
import { img } from "@/lib/cms/mock/media";

/**
 * Page hero + section copy for all 10 pages.
 *
 * This is deliberately NOT stored in WordPress. Headlines, section intros and
 * closing CTAs are marketing copy that changes rarely and (like the rest of
 * `src/content/page-extras.ts`) reads better reviewed in code than hand-typed
 * into a CMS field. Both CMS providers use this file for the base content —
 * see `src/lib/cms/wordpress/provider.ts` `getPage()`, which additionally
 * lets WordPress override just the hero photo (and, optionally, the eyebrow/
 * title/description) per page via the lightweight "Site Pages" post type —
 * no deploy needed just to swap a hero photo.
 */
const HERO_SKYLINE = "hero-skyline";

export const sitePages: Record<PageKey, PageContent> = {
  home: {
    key: "home",
    hero: {
      eyebrow: "Platinum Consultancy & Advisory",
      title: "Redefining Real Estate.",
      titleAccent: "Delivering Excellence.",
      description:
        "LX Realty is a platinum consultancy and advisory firm offering comprehensive real estate solutions across Residential, Commercial and Investment segments.",
      image: img(HERO_SKYLINE, 1920, 1280, "LX Realty — waterfront city skyline at dusk"),
      breadcrumb: ["Home"],
      features: [],
      stats: [],
      primaryCta: { label: "Explore Opportunities", href: "/projects/residential" },
      secondaryCta: { label: "Watch Intro", href: "#" },
    },
    sections: {
      featured: {
        eyebrow: "Featured Projects",
        title: "Handpicked Spaces. Exceptional Value.",
      },
      services: {
        eyebrow: "Our Services",
        title: "Comprehensive Solutions. Maximum Value.",
      },
      why: {
        eyebrow: "Why Choose LX Realty?",
        title: "Expertise That Delivers Results.",
      },
      insights: {
        eyebrow: "Insights & Blogs",
        title: "Knowledge That Drives Decisions.",
      },
      testimonials: { eyebrow: "Client Testimonials" },
      partners: { eyebrow: "Our Partners" },
      awards: { eyebrow: "Awards & Recognitions" },
    },
    cta: {
      title: "Let's Build the Future",
      titleAccent: "of Real Estate Together.",
      description:
        "Connect with our experts today and discover opportunities tailored for you.",
      image: img("cta-ripple", 1600, 600, "Water ripple"),
      primaryCta: { label: "Connect With Us", href: "/contact" },
    },
  },

  about: {
    key: "about",
    hero: {
      eyebrow: "About LX Realty",
      title: "Redefining Real Estate.",
      titleAccent: "Delivering Excellence.",
      description:
        "LX Realty is a platinum consultancy and advisory firm delivering end-to-end real estate solutions across Residential, Commercial and Investment segments. We partner in your journey to find the right spaces, make smart decisions and create lasting value.",
      image: img("about-lobby", 1920, 1200, "LX Realty reception lobby"),
      breadcrumb: ["Home", "About Us"],
      features: [],
      stats: [],
      primaryCta: { label: "Connect With Our Experts", href: "/contact" },
      secondaryCta: { label: "Watch Our Story", href: "#" },
    },
    sections: {
      values: { eyebrow: "Our Values", title: "The Principles That Drive Us" },
      leadership: {
        eyebrow: "Our Leadership",
        title: "Driven by Vision. Guided by Expertise.",
      },
      why: {
        eyebrow: "Why Choose LX Realty?",
        title: "Expertise That",
        titleAccent: "Delivers Measurable Results.",
        description:
          "Our deep market knowledge, data-driven approach and end-to-end solutions ensure you get the best advice, the best spaces and the best outcomes.",
      },
      testimonials: {
        eyebrow: "Client Testimonials",
        title: "Trusted by Clients. Proven by Results.",
      },
      partners: { eyebrow: "Our Partners" },
      awards: { eyebrow: "Awards & Recognitions" },
    },
  },

  services: {
    key: "services",
    hero: {
      title: "Comprehensive Solutions.",
      titleAccent: "Maximum Value.",
      description:
        "Our services are designed to deliver end-to-end real estate solutions with deep market insight, strategic advisory and unmatched execution.",
      image: img("services-tower", 1920, 1100, "Glass office tower and waterfront"),
      breadcrumb: ["Home", "Services"],
      features: [],
      stats: [],
      primaryCta: { label: "Talk To Our Experts", href: "/contact" },
      secondaryCta: { label: "Watch Our Approach", href: "#" },
    },
    sections: {
      services: {
        eyebrow: "Our Services",
        title: "End-to-End Real Estate Solutions",
      },
      approach: {
        eyebrow: "Our Approach",
        title: "A Process Built on Expertise & Trust",
      },
      partners: { eyebrow: "Our Clients & Partners" },
    },
    cta: {
      title: "Let's Build the Future",
      titleAccent: "of Real Estate Together.",
      description:
        "Connect with our experts today and discover opportunities tailored for you.",
      image: img("cta-ripple", 1600, 600, "Water ripple"),
      primaryCta: { label: "Connect With Us", href: "/contact" },
    },
  },

  advisory: {
    key: "advisory",
    hero: {
      eyebrow: "Advisory",
      title: "Strategic Advice.",
      titleAccent: "Real Results.",
      description:
        "Our advisory services are designed to help investors, developers, landowners, and businesses make informed real estate decisions that drive value, minimize risk, and maximize returns.",
      image: img("advisory-towers", 1920, 1100, "Twin towers by the water at dusk"),
      breadcrumb: ["Home", "Advisory"],
      features: [
        { icon: "Target", title: "Market Intelligence" },
        { icon: "Compass", title: "Strategic Guidance" },
        { icon: "ShieldCheck", title: "Risk Mitigation" },
        { icon: "TrendingUp", title: "Maximum Returns" },
      ],
      statsPanelTitle: "Advisory by Numbers",
      stats: [
        { value: "15Mn+", label: "Sq. Ft. Advisory Delivered", icon: "Building2" },
        { value: "₹ 2000Cr+", label: "Assets Advised", icon: "Landmark" },
        { value: "500+", label: "Clients Advised", icon: "Users" },
        { value: "25+", label: "Cities Covered", icon: "MapPin" },
      ],
    },
    sections: {
      services: {
        eyebrow: "Our Advisory Services",
        title: "End-to-End Advisory Solutions",
      },
      value: {
        eyebrow: "How We Add Value",
        title: "Insight-led. Strategy-driven. Outcome-focused.",
      },
      process: {
        eyebrow: "Our Advisory Process",
        title: "A Structured Approach for Better Outcomes",
      },
      caseStudies: {
        eyebrow: "Case Studies",
        title: "Real Challenges. Real Solutions. Real Impact.",
      },
    },
    cta: {
      title: "Need Expert Advisory",
      titleAccent: "for Your Next Move?",
      description:
        "Partner with LX Realty for trusted advice and smarter real estate decisions.",
      image: img("cta-network", 1600, 500, "Connected network nodes"),
      primaryCta: { label: "Talk To Our Advisors", href: "/contact" },
    },
  },

  "advisory-post-handover": {
    key: "advisory-post-handover",
    hero: {
      eyebrow: "Post-Handover Services",
      title: "Your Property Journey Doesn't End at Possession.",
      titleAccent: "It Begins.",
      description:
        "From home loans and funding to interiors, leasing, and property management, LX Realty provides a complete ecosystem to help you maximize the value of your property.",
      image: img("post-handover-interior", 1920, 1100, "Furnished living room with skyline view"),
      breadcrumb: ["Home", "Advisory", "Post-Handover Services"],
      features: [
        { icon: "Workflow", title: "End-to-End Solutions" },
        { icon: "ShieldCheck", title: "Trusted Partners" },
        { icon: "UserCheck", title: "Expert Guidance" },
        { icon: "Settings", title: "Hassle-Free Process" },
        { icon: "TrendingUp", title: "Maximize Value" },
      ],
      stats: [],
    },
    sections: {
      services: {
        title: "Services Designed for You, After Handover",
        description:
          "Comprehensive solutions for every need that comes after you receive your property.",
      },
      why: { title: "Why Choose LX Realty?" },
      process: { title: "Our Simple Process" },
      partners: { title: "Our Banking & Interior Partners" },
    },
    cta: {
      title: "Everything You Need.",
      titleAccent: "One Trusted Partner.",
      description:
        "Whether you've just received possession or are planning your next investment, LX Realty ensures every step after handover is seamless.",
      image: img("cta-skyline-night", 1600, 500, "City skyline at night"),
      primaryCta: { label: "Talk To An Expert", href: "/contact" },
      secondaryCta: { label: "Schedule Consultation", href: "/contact" },
    },
  },

  "projects-residential": {
    key: "projects-residential",
    hero: {
      title: "Exceptional Homes.",
      titleAccent: "Extraordinary Living.",
      description:
        "Discover thoughtfully designed residential spaces that blend modern architecture, premium amenities and strategic locations to elevate your lifestyle and deliver long-term value.",
      image: img("residential-hero", 1920, 1200, "Residential towers beside a landscaped lake"),
      breadcrumb: ["Home", "Projects", "Residential"],
      features: [
        { icon: "BadgeCheck", title: "Curated Projects", description: "Handpicked for quality and potential" },
        { icon: "MapPin", title: "Prime Locations", description: "In the most sought-after neighbourhoods" },
        { icon: "Handshake", title: "Trusted Partners", description: "Collaborating with India's top developers" },
      ],
      stats: [
        { value: "120+", label: "Residential Projects", icon: "Building2" },
        { value: "58", label: "Cities Pan India", icon: "MapPin" },
        { value: "₹ 45,000 Cr+", label: "Total Project Value", icon: "Landmark" },
        { value: "25,000+", label: "Homes Delivered", icon: "Home" },
      ],
      primaryCta: { label: "Explore Residential Projects", href: "#featured" },
      secondaryCta: { label: "Watch Project Film", href: "#" },
    },
    sections: {
      featured: {
        eyebrow: "Featured Residential Projects",
        title: "Homes That Define Excellence",
      },
      why: {
        eyebrow: "Why Invest in Residential Projects with LX Realty?",
      },
      partners: { eyebrow: "Our Developer Partners" },
      testimonials: { eyebrow: "What Our Clients Say" },
    },
    cta: {
      title: "Find Your Dream Home",
      titleAccent: "With The Right Guidance.",
      description:
        "Our experts are here to help you find homes that fit your lifestyle and budget.",
      image: img("cta-ripple", 1600, 500, "Water ripple"),
      primaryCta: { label: "Connect With Our Experts", href: "/contact" },
    },
  },

  "projects-commercial": {
    key: "projects-commercial",
    hero: {
      title: "Commercial Spaces. Built for",
      titleAccent: "Business Success.",
      description:
        "Strategically located. Meticulously planned. Our commercial projects are designed to elevate businesses and deliver unmatched value.",
      image: img("commercial-hero", 1920, 1200, "Illuminated commercial office campus at dusk"),
      breadcrumb: ["Home", "Projects", "Commercial"],
      features: [
        { icon: "MapPin", title: "Prime Locations" },
        { icon: "Building2", title: "Modern Infrastructure" },
        { icon: "Leaf", title: "Sustainable Design" },
        { icon: "Award", title: "High ROI Potential" },
      ],
      stats: [
        { value: "80+", label: "Commercial Projects", icon: "Building2" },
        { value: "25Mn+", label: "Sq. Ft. Delivered", icon: "Ruler" },
        { value: "₹ 15000 Cr+", label: "Commercial Sales Facilitated", icon: "Landmark" },
        { value: "5000+", label: "Businesses Associated", icon: "Briefcase" },
      ],
      primaryCta: { label: "Explore Commercial Projects", href: "#featured" },
      secondaryCta: { label: "Watch Overview", href: "#" },
    },
    sections: {
      featured: {
        eyebrow: "Featured Commercial Projects",
        title: "Spaces that Inspire. Investments that Grow.",
      },
      why: { eyebrow: "Why Invest with LX Realty?" },
      clients: { eyebrow: "Our Esteemed Clients" },
      testimonials: {},
    },
    cta: {
      title: "Let's Create Spaces",
      titleAccent: "That Drive Success.",
      description:
        "Connect with our experts today and find the perfect commercial space for your business.",
      image: img("cta-ripple", 1600, 500, "Water ripple"),
      primaryCta: { label: "Connect With Our Experts", href: "/contact" },
    },
  },

  insights: {
    key: "insights",
    hero: {
      title: "Insights That Inform. Intelligence",
      titleAccent: "That Drives.",
      description:
        "Stay ahead with the latest market trends, expert opinions, and in-depth research on real estate. Our insights empower you to make smarter, data-driven decisions.",
      image: img("insights-hero", 1920, 1200, "High-rise city skyline with a terrace lounge"),
      breadcrumb: ["Home", "Insights"],
      features: [
        { icon: "Target", title: "Market Intelligence" },
        { icon: "Database", title: "Data-Driven Research" },
        { icon: "Users", title: "Expert Perspectives" },
        { icon: "Lightbulb", title: "Actionable Insights" },
      ],
      statsPanelTitle: "Insights by Numbers",
      stats: [
        { value: "100+", label: "Research Reports", icon: "FileText" },
        { value: "25+", label: "Expert Contributors", icon: "Users" },
        { value: "5000+", label: "Insights Delivered", icon: "Send" },
        { value: "1M+", label: "Professionals Reached", icon: "BarChart3" },
      ],
    },
    sections: {
      market: {
        eyebrow: "Market Insights",
        title: "Understanding Today. Preparing for Tomorrow.",
        description:
          "Explore the latest trends and opportunities shaping the real estate market.",
      },
      perspectives: {
        eyebrow: "Expert Perspectives",
        title: "Voices That Shape the Real Estate Future.",
        description:
          "Insights and opinions from industry leaders and domain experts.",
      },
      resources: {
        eyebrow: "Reports & Resources",
        title: "In-Depth Reports. Actionable Knowledge.",
        description:
          "Access our comprehensive research reports and resources to stay informed and ahead in the real estate market.",
      },
      topics: { eyebrow: "Explore Insights by Topics" },
    },
    cta: {
      title: "Stay Ahead with",
      titleAccent: "Exclusive Insights",
      description:
        "Subscribe to our newsletter and get the latest market insights, reports, and expert opinions delivered to your inbox.",
      image: img("cta-skyline-night", 1600, 500, "City skyline at night"),
    },
  },

  careers: {
    key: "careers",
    hero: {
      title: "Build Your Career.",
      titleAccent: "Shape the Future.",
      description:
        "At LX Realty, we believe our people are our greatest strength. Join a team that values innovation, integrity, and excellence, and grow with India's trusted real estate advisory firm.",
      image: img("careers-hero", 1920, 1200, "Team looking out over a city skyline at dusk"),
      breadcrumb: ["Home", "Careers"],
      features: [
        { icon: "Target", title: "Meaningful Work" },
        { icon: "TrendingUp", title: "Growth Opportunities" },
        { icon: "Users", title: "Collaborative Culture" },
        { icon: "Globe2", title: "Impact at Scale" },
      ],
      statsPanelTitle: "LX Realty by Numbers",
      stats: [
        { value: "10+", label: "Years of Excellence", icon: "Award" },
        { value: "500+", label: "Team Members", icon: "Users" },
        { value: "25+", label: "Cities Presence", icon: "MapPin" },
        { value: "2000Cr+", label: "Transactions Advisory", icon: "Landmark" },
        { value: "15M+", label: "Sq. Ft. Advisory Delivered", icon: "Building2" },
      ],
    },
    sections: {
      why: {
        eyebrow: "Why LX Realty?",
        title: "A Place to Grow. A Place to Belong.",
      },
      positions: {
        eyebrow: "Open Positions",
        title: "Explore Opportunities. Build Your Future.",
      },
      life: {
        eyebrow: "Life at LX Realty",
        title: "Where Ambition Meets Opportunity.",
        description:
          "We foster a culture of ownership, innovation, and trust. Our teams collaborate, challenge themselves, and celebrate success together.",
      },
      voices: {
        eyebrow: "What Our People Say",
        title: "Real People. Real Stories.",
      },
    },
    cta: {
      title: "Ready to Take",
      titleAccent: "the Next Step?",
      description:
        "Join LX Realty and be a part of a team that's building a better future in real estate.",
      image: img("cta-skyline-night", 1600, 500, "City skyline at night"),
      primaryCta: { label: "View All Open Positions", href: "#positions" },
    },
  },

  contact: {
    key: "contact",
    hero: {
      title: "Let's Connect.",
      titleAccent: "Let's Create Value.",
      description:
        "We're here to assist you with all your real estate needs. Reach out to us for expert guidance, partnerships, or any information you need.",
      image: img("contact-hero", 1920, 1200, "Modern commercial building at dusk"),
      breadcrumb: ["Home", "Contact"],
      features: [
        { icon: "Clock", title: "Quick Response" },
        { icon: "ShieldCheck", title: "Trusted Support" },
        { icon: "UserCheck", title: "Expert Guidance" },
        { icon: "Handshake", title: "Long-Term Partnership" },
      ],
      statsPanelTitle: "LX Realty by Numbers",
      stats: [
        { value: "15Mn+", label: "Sq. Ft. Advisory Delivered", icon: "Building2" },
        { value: "₹ 2000Cr+", label: "Assets Advised", icon: "Landmark" },
        { value: "5000+", label: "Happy Clients", icon: "Users" },
        { value: "25+", label: "Cities Covered", icon: "MapPin" },
        { value: "10+", label: "Years of Excellence", icon: "Award" },
      ],
    },
    sections: {
      getInTouch: {
        eyebrow: "Get In Touch",
        title: "We're Just a Message Away.",
      },
      office: {
        eyebrow: "Our Office",
        title: "Visit Us at Our Corporate Office",
      },
      branches: { eyebrow: "Our Branch Offices" },
      form: {
        eyebrow: "Send Us a Message",
        title: "We'd Love to Hear From You.",
      },
      enquire: {
        eyebrow: "Enquire About",
        title: "How Can We Help You?",
      },
    },
  },
};
