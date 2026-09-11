<?php
/**
 * Site Page seed content — mirrors src/lib/cms/mock/pages.ts exactly (text
 * only; hero/CTA images are sideloaded separately in seed.php). Included by
 * LXR_Seed_Command::pages().
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(

	'home' => array(
		'title' => 'Home',
		'hero'  => array(
			'eyebrow'     => 'Platinum Consultancy & Advisory',
			'title'       => 'Redefining Real Estate.',
			'titleAccent' => 'Delivering Excellence.',
			'description' => 'LX Realty is a platinum consultancy and advisory firm offering comprehensive real estate solutions across Residential, Commercial and Investment segments.',
			'breadcrumb'  => array( 'Home' ),
			'primaryCta'  => array( 'label' => 'Explore Opportunities', 'href' => '/projects/residential' ),
			'secondaryCta'=> array( 'label' => 'Watch Intro', 'href' => '#' ),
		),
		'sections' => array(
			'featured'     => array( 'eyebrow' => 'Featured Projects', 'title' => 'Handpicked Spaces. Exceptional Value.' ),
			'services'     => array( 'eyebrow' => 'Our Services', 'title' => 'Comprehensive Solutions. Maximum Value.' ),
			'why'          => array( 'eyebrow' => 'Why Choose LX Realty?', 'title' => 'Expertise That Delivers Results.' ),
			'insights'     => array( 'eyebrow' => 'Insights & Blogs', 'title' => 'Knowledge That Drives Decisions.' ),
			'testimonials' => array( 'eyebrow' => 'Client Testimonials' ),
			'partners'     => array( 'eyebrow' => 'Our Partners' ),
			'awards'       => array( 'eyebrow' => 'Awards & Recognitions' ),
		),
		'cta' => array(
			'title' => "Let's Build the Future", 'titleAccent' => 'of Real Estate Together.',
			'description' => 'Connect with our experts today and discover opportunities tailored for you.',
			'primaryCta' => array( 'label' => 'Connect With Us', 'href' => '/contact' ),
		),
	),

	'about' => array(
		'title' => 'About Us',
		'hero'  => array(
			'eyebrow'     => 'About LX Realty',
			'title'       => 'Redefining Real Estate.',
			'titleAccent' => 'Delivering Excellence.',
			'description' => 'LX Realty is a platinum consultancy and advisory firm delivering end-to-end real estate solutions across Residential, Commercial and Investment segments. We partner in your journey to find the right spaces, make smart decisions and create lasting value.',
			'breadcrumb'  => array( 'Home', 'About Us' ),
			'primaryCta'  => array( 'label' => 'Connect With Our Experts', 'href' => '/contact' ),
			'secondaryCta'=> array( 'label' => 'Watch Our Story', 'href' => '#' ),
		),
		'sections' => array(
			'values'       => array( 'eyebrow' => 'Our Values', 'title' => 'The Principles That Drive Us' ),
			'leadership'   => array( 'eyebrow' => 'Our Leadership', 'title' => 'Driven by Vision. Guided by Expertise.' ),
			'why'          => array( 'eyebrow' => 'Why Choose LX Realty?', 'title' => 'Expertise That', 'titleAccent' => 'Delivers Measurable Results.', 'description' => 'Our deep market knowledge, data-driven approach and end-to-end solutions ensure you get the best advice, the best spaces and the best outcomes.' ),
			'testimonials' => array( 'eyebrow' => 'Client Testimonials', 'title' => 'Trusted by Clients. Proven by Results.' ),
			'partners'     => array( 'eyebrow' => 'Our Partners' ),
			'awards'       => array( 'eyebrow' => 'Awards & Recognitions' ),
		),
	),

	'services' => array(
		'title' => 'Services',
		'hero'  => array(
			'title'       => 'Comprehensive Solutions.',
			'titleAccent' => 'Maximum Value.',
			'description' => 'Our services are designed to deliver end-to-end real estate solutions with deep market insight, strategic advisory and unmatched execution.',
			'breadcrumb'  => array( 'Home', 'Services' ),
			'primaryCta'  => array( 'label' => 'Talk To Our Experts', 'href' => '/contact' ),
			'secondaryCta'=> array( 'label' => 'Watch Our Approach', 'href' => '#' ),
		),
		'sections' => array(
			'services' => array( 'eyebrow' => 'Our Services', 'title' => 'End-to-End Real Estate Solutions' ),
			'approach' => array( 'eyebrow' => 'Our Approach', 'title' => 'A Process Built on Expertise & Trust' ),
			'partners' => array( 'eyebrow' => 'Our Clients & Partners' ),
		),
		'cta' => array(
			'title' => "Let's Build the Future", 'titleAccent' => 'of Real Estate Together.',
			'description' => 'Connect with our experts today and discover opportunities tailored for you.',
			'primaryCta' => array( 'label' => 'Connect With Us', 'href' => '/contact' ),
		),
	),

	'advisory' => array(
		'title' => 'Advisory',
		'hero'  => array(
			'eyebrow'     => 'Advisory',
			'title'       => 'Strategic Advice.',
			'titleAccent' => 'Real Results.',
			'description' => 'Our advisory services are designed to help investors, developers, landowners, and businesses make informed real estate decisions that drive value, minimize risk, and maximize returns.',
			'breadcrumb'  => array( 'Home', 'Advisory' ),
			'features'    => array(
				array( 'icon' => 'Target', 'title' => 'Market Intelligence' ),
				array( 'icon' => 'Compass', 'title' => 'Strategic Guidance' ),
				array( 'icon' => 'ShieldCheck', 'title' => 'Risk Mitigation' ),
				array( 'icon' => 'TrendingUp', 'title' => 'Maximum Returns' ),
			),
			'statsPanelTitle' => 'Advisory by Numbers',
			'stats' => array(
				array( 'icon' => 'Building2', 'value' => '15Mn+', 'label' => 'Sq. Ft. Advisory Delivered' ),
				array( 'icon' => 'Landmark', 'value' => '₹ 2000Cr+', 'label' => 'Assets Advised' ),
				array( 'icon' => 'Users', 'value' => '500+', 'label' => 'Clients Advised' ),
				array( 'icon' => 'MapPin', 'value' => '25+', 'label' => 'Cities Covered' ),
			),
		),
		'sections' => array(
			'services'    => array( 'eyebrow' => 'Our Advisory Services', 'title' => 'End-to-End Advisory Solutions' ),
			'value'       => array( 'eyebrow' => 'How We Add Value', 'title' => 'Insight-led. Strategy-driven. Outcome-focused.' ),
			'process'     => array( 'eyebrow' => 'Our Advisory Process', 'title' => 'A Structured Approach for Better Outcomes' ),
			'caseStudies' => array( 'eyebrow' => 'Case Studies', 'title' => 'Real Challenges. Real Solutions. Real Impact.' ),
		),
		'cta' => array(
			'title' => 'Need Expert Advisory', 'titleAccent' => 'for Your Next Move?',
			'description' => 'Partner with LX Realty for trusted advice and smarter real estate decisions.',
			'primaryCta' => array( 'label' => 'Talk To Our Advisors', 'href' => '/contact' ),
		),
	),

	'advisory-post-handover' => array(
		'title' => 'Post-Handover Services',
		'hero'  => array(
			'eyebrow'     => 'Post-Handover Services',
			'title'       => "Your Property Journey Doesn't End at Possession.",
			'titleAccent' => 'It Begins.',
			'description' => 'From home loans and funding to interiors, leasing, and property management, LX Realty provides a complete ecosystem to help you maximize the value of your property.',
			'breadcrumb'  => array( 'Home', 'Advisory', 'Post-Handover Services' ),
			'features'    => array(
				array( 'icon' => 'Workflow', 'title' => 'End-to-End Solutions' ),
				array( 'icon' => 'ShieldCheck', 'title' => 'Trusted Partners' ),
				array( 'icon' => 'UserCheck', 'title' => 'Expert Guidance' ),
				array( 'icon' => 'Settings', 'title' => 'Hassle-Free Process' ),
				array( 'icon' => 'TrendingUp', 'title' => 'Maximize Value' ),
			),
		),
		'sections' => array(
			'services' => array( 'title' => 'Services Designed for You, After Handover', 'description' => 'Comprehensive solutions for every need that comes after you receive your property.' ),
			'why'      => array( 'title' => 'Why Choose LX Realty?' ),
			'process'  => array( 'title' => 'Our Simple Process' ),
			'partners' => array( 'title' => 'Our Banking & Interior Partners' ),
		),
		'cta' => array(
			'title' => 'Everything You Need.', 'titleAccent' => 'One Trusted Partner.',
			'description' => "Whether you've just received possession or are planning your next investment, LX Realty ensures every step after handover is seamless.",
			'primaryCta' => array( 'label' => 'Talk To An Expert', 'href' => '/contact' ),
			'secondaryCta' => array( 'label' => 'Schedule Consultation', 'href' => '/contact' ),
		),
	),

	'projects-residential' => array(
		'title' => 'Residential Projects',
		'hero'  => array(
			'title'       => 'Exceptional Homes.',
			'titleAccent' => 'Extraordinary Living.',
			'description' => 'Discover thoughtfully designed residential spaces that blend modern architecture, premium amenities and strategic locations to elevate your lifestyle and deliver long-term value.',
			'breadcrumb'  => array( 'Home', 'Projects', 'Residential' ),
			'features'    => array(
				array( 'icon' => 'BadgeCheck', 'title' => 'Curated Projects', 'description' => 'Handpicked for quality and potential' ),
				array( 'icon' => 'MapPin', 'title' => 'Prime Locations', 'description' => 'In the most sought-after neighbourhoods' ),
				array( 'icon' => 'Handshake', 'title' => 'Trusted Partners', 'description' => "Collaborating with India's top developers" ),
			),
			'stats' => array(
				array( 'icon' => 'Building2', 'value' => '120+', 'label' => 'Residential Projects' ),
				array( 'icon' => 'MapPin', 'value' => '58', 'label' => 'Cities Pan India' ),
				array( 'icon' => 'Landmark', 'value' => '₹ 45,000 Cr+', 'label' => 'Total Project Value' ),
				array( 'icon' => 'Home', 'value' => '25,000+', 'label' => 'Homes Delivered' ),
			),
			'primaryCta'  => array( 'label' => 'Explore Residential Projects', 'href' => '#featured' ),
			'secondaryCta'=> array( 'label' => 'Watch Project Film', 'href' => '#' ),
		),
		'sections' => array(
			'featured'     => array( 'eyebrow' => 'Featured Residential Projects', 'title' => 'Homes That Define Excellence' ),
			'why'          => array( 'eyebrow' => 'Why Invest in Residential Projects with LX Realty?' ),
			'partners'     => array( 'eyebrow' => 'Our Developer Partners' ),
			'testimonials' => array( 'eyebrow' => 'What Our Clients Say' ),
		),
		'cta' => array(
			'title' => 'Find Your Dream Home', 'titleAccent' => 'With The Right Guidance.',
			'description' => 'Our experts are here to help you find homes that fit your lifestyle and budget.',
			'primaryCta' => array( 'label' => 'Connect With Our Experts', 'href' => '/contact' ),
		),
	),

	'projects-commercial' => array(
		'title' => 'Commercial Projects',
		'hero'  => array(
			'title'       => 'Commercial Spaces. Built for',
			'titleAccent' => 'Business Success.',
			'description' => 'Strategically located. Meticulously planned. Our commercial projects are designed to elevate businesses and deliver unmatched value.',
			'breadcrumb'  => array( 'Home', 'Projects', 'Commercial' ),
			'features'    => array(
				array( 'icon' => 'MapPin', 'title' => 'Prime Locations' ),
				array( 'icon' => 'Building2', 'title' => 'Modern Infrastructure' ),
				array( 'icon' => 'Leaf', 'title' => 'Sustainable Design' ),
				array( 'icon' => 'Award', 'title' => 'High ROI Potential' ),
			),
			'stats' => array(
				array( 'icon' => 'Building2', 'value' => '80+', 'label' => 'Commercial Projects' ),
				array( 'icon' => 'Ruler', 'value' => '25Mn+', 'label' => 'Sq. Ft. Delivered' ),
				array( 'icon' => 'Landmark', 'value' => '₹ 15000 Cr+', 'label' => 'Commercial Sales Facilitated' ),
				array( 'icon' => 'Briefcase', 'value' => '5000+', 'label' => 'Businesses Associated' ),
			),
			'primaryCta'  => array( 'label' => 'Explore Commercial Projects', 'href' => '#featured' ),
			'secondaryCta'=> array( 'label' => 'Watch Overview', 'href' => '#' ),
		),
		'sections' => array(
			'featured'     => array( 'eyebrow' => 'Featured Commercial Projects', 'title' => 'Spaces that Inspire. Investments that Grow.' ),
			'why'          => array( 'eyebrow' => 'Why Invest with LX Realty?' ),
			'clients'      => array( 'eyebrow' => 'Our Esteemed Clients' ),
			'testimonials' => array(),
		),
		'cta' => array(
			'title' => "Let's Create Spaces", 'titleAccent' => 'That Drive Success.',
			'description' => 'Connect with our experts today and find the perfect commercial space for your business.',
			'primaryCta' => array( 'label' => 'Connect With Our Experts', 'href' => '/contact' ),
		),
	),

	'insights' => array(
		'title' => 'Insights',
		'hero'  => array(
			'title'       => 'Insights That Inform. Intelligence',
			'titleAccent' => 'That Drives.',
			'description' => 'Stay ahead with the latest market trends, expert opinions, and in-depth research on real estate. Our insights empower you to make smarter, data-driven decisions.',
			'breadcrumb'  => array( 'Home', 'Insights' ),
			'features'    => array(
				array( 'icon' => 'Target', 'title' => 'Market Intelligence' ),
				array( 'icon' => 'Database', 'title' => 'Data-Driven Research' ),
				array( 'icon' => 'Users', 'title' => 'Expert Perspectives' ),
				array( 'icon' => 'Lightbulb', 'title' => 'Actionable Insights' ),
			),
			'statsPanelTitle' => 'Insights by Numbers',
			'stats' => array(
				array( 'icon' => 'FileText', 'value' => '100+', 'label' => 'Research Reports' ),
				array( 'icon' => 'Users', 'value' => '25+', 'label' => 'Expert Contributors' ),
				array( 'icon' => 'Send', 'value' => '5000+', 'label' => 'Insights Delivered' ),
				array( 'icon' => 'BarChart3', 'value' => '1M+', 'label' => 'Professionals Reached' ),
			),
		),
		'sections' => array(
			'market'       => array( 'eyebrow' => 'Market Insights', 'title' => 'Understanding Today. Preparing for Tomorrow.', 'description' => 'Explore the latest trends and opportunities shaping the real estate market.' ),
			'perspectives' => array( 'eyebrow' => 'Expert Perspectives', 'title' => 'Voices That Shape the Real Estate Future.', 'description' => 'Insights and opinions from industry leaders and domain experts.' ),
			'resources'    => array( 'eyebrow' => 'Reports & Resources', 'title' => 'In-Depth Reports. Actionable Knowledge.', 'description' => 'Access our comprehensive research reports and resources to stay informed and ahead in the real estate market.' ),
			'topics'       => array( 'eyebrow' => 'Explore Insights by Topics' ),
		),
		'cta' => array(
			'title' => 'Stay Ahead with', 'titleAccent' => 'Exclusive Insights',
			'description' => 'Subscribe to our newsletter and get the latest market insights, reports, and expert opinions delivered to your inbox.',
		),
	),

	'careers' => array(
		'title' => 'Careers',
		'hero'  => array(
			'title'       => 'Build Your Career.',
			'titleAccent' => 'Shape the Future.',
			'description' => 'At LX Realty, we believe our people are our greatest strength. Join a team that values innovation, integrity, and excellence, and grow with India&rsquo;s trusted real estate advisory firm.',
			'breadcrumb'  => array( 'Home', 'Careers' ),
			'features'    => array(
				array( 'icon' => 'Target', 'title' => 'Meaningful Work' ),
				array( 'icon' => 'TrendingUp', 'title' => 'Growth Opportunities' ),
				array( 'icon' => 'Users', 'title' => 'Collaborative Culture' ),
				array( 'icon' => 'Globe2', 'title' => 'Impact at Scale' ),
			),
			'statsPanelTitle' => 'LX Realty by Numbers',
			'stats' => array(
				array( 'icon' => 'Award', 'value' => '10+', 'label' => 'Years of Excellence' ),
				array( 'icon' => 'Users', 'value' => '500+', 'label' => 'Team Members' ),
				array( 'icon' => 'MapPin', 'value' => '25+', 'label' => 'Cities Presence' ),
				array( 'icon' => 'Landmark', 'value' => '2000Cr+', 'label' => 'Transactions Advisory' ),
				array( 'icon' => 'Building2', 'value' => '15M+', 'label' => 'Sq. Ft. Advisory Delivered' ),
			),
		),
		'sections' => array(
			'why'       => array( 'eyebrow' => 'Why LX Realty?', 'title' => 'A Place to Grow. A Place to Belong.' ),
			'positions' => array( 'eyebrow' => 'Open Positions', 'title' => 'Explore Opportunities. Build Your Future.' ),
			'life'      => array( 'eyebrow' => 'Life at LX Realty', 'title' => 'Where Ambition Meets Opportunity.', 'description' => 'We foster a culture of ownership, innovation, and trust. Our teams collaborate, challenge themselves, and celebrate success together.' ),
			'voices'    => array( 'eyebrow' => 'What Our People Say', 'title' => 'Real People. Real Stories.' ),
		),
		'cta' => array(
			'title' => 'Ready to Take', 'titleAccent' => 'the Next Step?',
			'description' => "Join LX Realty and be a part of a team that's building a better future in real estate.",
			'primaryCta' => array( 'label' => 'View All Open Positions', 'href' => '#positions' ),
		),
	),

	'contact' => array(
		'title' => 'Contact',
		'hero'  => array(
			'title'       => "Let's Connect.",
			'titleAccent' => "Let's Create Value.",
			'description' => "We're here to assist you with all your real estate needs. Reach out to us for expert guidance, partnerships, or any information you need.",
			'breadcrumb'  => array( 'Home', 'Contact' ),
			'features'    => array(
				array( 'icon' => 'Clock', 'title' => 'Quick Response' ),
				array( 'icon' => 'ShieldCheck', 'title' => 'Trusted Support' ),
				array( 'icon' => 'UserCheck', 'title' => 'Expert Guidance' ),
				array( 'icon' => 'Handshake', 'title' => 'Long-Term Partnership' ),
			),
			'statsPanelTitle' => 'LX Realty by Numbers',
			'stats' => array(
				array( 'icon' => 'Building2', 'value' => '15Mn+', 'label' => 'Sq. Ft. Advisory Delivered' ),
				array( 'icon' => 'Landmark', 'value' => '₹ 2000Cr+', 'label' => 'Assets Advised' ),
				array( 'icon' => 'Users', 'value' => '5000+', 'label' => 'Happy Clients' ),
				array( 'icon' => 'MapPin', 'value' => '25+', 'label' => 'Cities Covered' ),
				array( 'icon' => 'Award', 'value' => '10+', 'label' => 'Years of Excellence' ),
			),
		),
		'sections' => array(
			'getInTouch' => array( 'eyebrow' => 'Get In Touch', 'title' => "We're Just a Message Away." ),
			'office'     => array( 'eyebrow' => 'Our Office', 'title' => 'Visit Us at Our Corporate Office' ),
			'branches'   => array( 'eyebrow' => 'Our Branch Offices' ),
			'form'       => array( 'eyebrow' => 'Send Us a Message', 'title' => "We'd Love to Hear From You." ),
			'enquire'    => array( 'eyebrow' => 'Enquire About', 'title' => 'How Can We Help You?' ),
		),
	),

);
