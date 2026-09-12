/**
 * Editorial content that is text + icon only (no images, rarely edited).
 *
 * Everything with an image or that behaves like a list of records
 * (properties, leaders, jobs, testimonials, insights, resources, services,
 * offices, partners, awards, values, page heroes) comes from the CMS instead —
 * see src/lib/cms. Move any of the below into WordPress later if editors need
 * to change it without a deploy.
 */

export interface Feature {
  icon: string;
  title: string;
  description?: string;
}

/* ---- Home / Services: "Why choose LX Realty" ---- */
export const whyChooseResults: Feature[] = [
  { icon: "Building2", title: "Market Leaders", description: "Strong network & deep market understanding" },
  { icon: "HeartHandshake", title: "Trusted by Thousands", description: "Relationships built on trust & transparency" },
  { icon: "Database", title: "Data-Driven Approach", description: "Insights backed by research & analytics" },
  { icon: "Workflow", title: "End-to-End Solutions", description: "From strategy to execution & beyond" },
  { icon: "MapPin", title: "Pan India Presence", description: "Serving clients across key markets" },
];

/* ---- Services: 5-step approach ---- */
export const servicesProcess = [
  { step: "01", title: "Understand", description: "We listen to your goals and understand your requirements.", icon: "MessageCircle" },
  { step: "02", title: "Research", description: "Our experts analyze the market and shortlist the best opportunities.", icon: "Search" },
  { step: "03", title: "Advise", description: "We provide strategic advice tailored to your needs.", icon: "ClipboardList" },
  { step: "04", title: "Execute", description: "Our team ensures smooth transactions and best outcomes.", icon: "Handshake" },
  { step: "05", title: "Support", description: "We offer post-transaction support for long-term relationships.", icon: "Award" },
];

/* ---- Advisory ---- */
export const advisoryValueProps: Feature[] = [
  { icon: "Database", title: "Data-Backed Decisions", description: "We leverage deep market data and proprietary research." },
  { icon: "Settings2", title: "Customized Strategies", description: "Tailored solutions aligning with your goals and risk appetite." },
  { icon: "Workflow", title: "End-to-End Support", description: "From opportunity identification to execution and beyond." },
  { icon: "Network", title: "Strong Industry Network", description: "Extensive connections across developers, investors & stakeholders." },
  { icon: "Eye", title: "Transparent Process", description: "Clear communication, ethical practices, and complete transparency." },
  { icon: "BarChart3", title: "Measurable Impact", description: "Focused on delivering tangible outcomes and long-term value." },
];

export const advisoryProcess = [
  { step: "01", title: "Understand", description: "We understand your objectives, requirements, and constraints.", icon: "MessageCircle" },
  { step: "02", title: "Research & Analyze", description: "Our experts conduct in-depth market research and data analysis.", icon: "Search" },
  { step: "03", title: "Strategize", description: "We develop a customized strategy aligned with your goals.", icon: "Target" },
  { step: "04", title: "Execute", description: "We assist in execution with precision, ensuring best outcomes.", icon: "Rocket" },
  { step: "05", title: "Support Beyond", description: "We continue to support you for sustained growth and success.", icon: "TrendingUp" },
];

export const advisoryCaseStudies = [
  {
    title: "Office Portfolio Optimization",
    description: "Advised a leading corporation on portfolio restructuring, resulting in 20% cost savings and improved ROI.",
    image: "case-office",
  },
  {
    title: "Residential Investment Advisory",
    description: "Identified high-growth residential markets for an investor, delivering 30%+ returns in 3 years.",
    image: "case-residential",
  },
  {
    title: "Industrial Park Feasibility",
    description: "Conducted feasibility and due diligence for a 50-acre industrial development project.",
    image: "case-industrial",
  },
  {
    title: "Retail Asset Strategy",
    description: "Provided strategic advisory for a retail asset acquisition & repositioning, enhancing value by 18%.",
    image: "case-retail",
  },
];

/* ---- Advisory / Post-Handover ---- */
export const postHandoverServices = [
  {
    icon: "Landmark",
    title: "Home Loans",
    bullets: ["Balance Transfer", "Top-up Loans", "Loan Against Property", "Builder Tie-ups", "Lowest Interest Rate Assistance"],
  },
  {
    icon: "CircleDollarSign",
    title: "Funding Solutions",
    bullets: ["Business Funding", "Working Capital", "Project Funding", "Private Funding", "Structured Finance"],
  },
  {
    icon: "Sofa",
    title: "Interior Design & Fit-outs",
    bullets: ["Luxury Interiors", "Turnkey Execution", "Modular Kitchen", "Smart Home Automation", "Office Interiors"],
  },
  {
    icon: "Building",
    title: "Leasing & Tenant Management",
    bullets: ["Residential Leasing", "Commercial Leasing", "Tenant Verification", "Rent Agreement", "Corporate Leasing"],
  },
  {
    icon: "Wrench",
    title: "Property Management",
    bullets: ["Maintenance", "Renovation", "Rental Collection", "Annual Maintenance", "Vendor Management"],
  },
  {
    icon: "FileText",
    title: "Legal & Documentation",
    bullets: ["Registration", "Mutation", "Property Tax", "Sale Agreement", "Due Diligence"],
  },
];

export const postHandoverWhy: Feature[] = [
  { icon: "Handshake", title: "One Trusted Partner" },
  { icon: "Landmark", title: "Verified Banking Partners" },
  { icon: "Sofa", title: "Interior Experts" },
  { icon: "Scale", title: "Legal Professionals" },
  { icon: "Users", title: "Leasing Specialists" },
  { icon: "Timer", title: "Faster Processing" },
  { icon: "Workflow", title: "End-to-End Support" },
  { icon: "Eye", title: "Transparent Advisory" },
];

export const postHandoverProcess = [
  { step: "1", title: "Consultation", description: "Tell us your requirements.", icon: "MessageCircle" },
  { step: "2", title: "Requirement Analysis", description: "We analyze and suggest the best solutions.", icon: "Search" },
  { step: "3", title: "Partner Selection", description: "We connect you with verified partners.", icon: "Users" },
  { step: "4", title: "Documentation", description: "We assist in all necessary documentation.", icon: "ClipboardList" },
  { step: "5", title: "Execution", description: "Smooth execution with timely updates.", icon: "Settings" },
  { step: "6", title: "Ongoing Support", description: "Continuous support even after service delivery.", icon: "Headset" },
];

/* ---- Projects: "Why invest" ---- */
export const whyInvestResidential: Feature[] = [
  { icon: "Search", title: "Best Market Insight", description: "In-depth market research for informed decisions" },
  { icon: "TrendingUp", title: "High Appreciation", description: "Projects with strong potential for capital growth" },
  { icon: "ShieldCheck", title: "Transparent Process", description: "End-to-end transparency in every transaction" },
  { icon: "UserCheck", title: "Personalized Guidance", description: "Tailored solutions aligned with your goals" },
  { icon: "LifeBuoy", title: "After Sales Support", description: "Dedicated support even after possession" },
];

export const whyInvestCommercial: Feature[] = [
  { icon: "MapPin", title: "Prime Locations", description: "Projects in high-growth corridors with excellent connectivity" },
  { icon: "TrendingUp", title: "High Appreciation", description: "Asset value growth backed by strong market demand" },
  { icon: "Handshake", title: "Trusted Partners", description: "Collaborations with India's most reputed developers" },
  { icon: "ShieldCheck", title: "Transparent Process", description: "Clear documentation and seamless transactions" },
  { icon: "CircleDollarSign", title: "High Rental Yield", description: "Attractive rental returns for consistent income" },
  { icon: "Headset", title: "End-to-End Support", description: "From site visits to possession and beyond, we're with you" },
];

export const whyInvestPlots: Feature[] = [
  { icon: "FileCheck2", title: "Clear Titles", description: "RERA-registered plots with verified titles and documentation" },
  { icon: "TrendingUp", title: "High Appreciation", description: "Land in high-growth corridors ahead of infrastructure build-out" },
  { icon: "ShieldCheck", title: "Transparent Process", description: "End-to-end transparency in every transaction" },
  { icon: "Landmark", title: "Build on Your Terms", description: "Freedom to design and construct at your own pace" },
  { icon: "UserCheck", title: "Personalized Guidance", description: "Tailored solutions aligned with your goals" },
];

/* ---- Careers ---- */
export const careersWhy: Feature[] = [
  { icon: "Target", title: "Purpose Driven", description: "Work on impactful projects that shape communities and create value." },
  { icon: "BookOpen", title: "Learning & Growth", description: "Continuous learning, mentorship, and access to industry-leading resources." },
  { icon: "TrendingUp", title: "Career Advancement", description: "Clear career paths and opportunities to grow and lead." },
  { icon: "Users", title: "Collaborative Culture", description: "A supportive and inclusive environment built on trust and teamwork." },
  { icon: "Trophy", title: "Recognition & Rewards", description: "Celebrate achievements and be rewarded for your contributions." },
  { icon: "Scale", title: "Work-Life Balance", description: "Flexible policies that encourage balance, well-being and personal growth." },
];

export const lifeAtItems = [
  { title: "Collaborative Teams", image: "life-collaborative" },
  { title: "Learning & Development", image: "life-learning" },
  { title: "Celebrate Together", image: "life-celebrate" },
  { title: "Team Outings", image: "life-outings" },
];

/* ---- Contact ---- */
export const contactChannels: Feature[] = [
  { icon: "Phone", title: "Call Us", description: "Mon – Sat: 9:30 AM – 7:30 PM · Sunday: Closed" },
  { icon: "Mail", title: "Email Us", description: "We aim to respond to all queries within 24 hours." },
  { icon: "MessageCircle", title: "WhatsApp", description: "Chat with our experts for quick assistance." },
  { icon: "Globe", title: "Visit Our Website", description: "Explore our services, projects & insights." },
  { icon: "CalendarClock", title: "Book a Meeting", description: "Schedule a one-on-one meeting with our advisory experts." },
];

export const enquiryOptions = [
  "Commercial Advisory",
  "Investment Advisory",
  "Project Marketing",
  "Land Advisory",
  "Transaction Advisory",
  "Residential Projects",
  "Partnerships & Collaborations",
  "Portfolio Advisory",
  "Market Insights",
  "Other Enquiries",
];
