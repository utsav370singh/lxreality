<?php
/**
 * ACF field groups (registered in code — no manual field creation needed).
 *
 * Built entirely on the FREE version of Advanced Custom Fields — no Pro
 * features (Repeater, Gallery, Flexible Content, Options Pages) anywhere.
 * Any place that would naturally be a repeater instead uses a single Textarea
 * where the admin fills in one item per line (the field's on-screen
 * "instructions" text says exactly which format), parsed back into structured
 * data by src/lib/cms/wordpress/map.ts on the Next.js side.
 *
 * Each group sets `show_in_graphql` + `graphql_field_name`, so WPGraphQL for
 * ACF exposes it exactly as the Next.js fragments expect, e.g.
 *   query { properties { nodes { propertyFields { priceLabel image { node { sourceUrl } } } } } }
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ---------- tiny builders to keep this readable ---------- */

function lxr_f( $group, $name, $label, $type, $extra = array() ) {
	return array_merge(
		array(
			'key'   => "field_lxr_{$group}_{$name}",
			'name'  => $name,
			'label' => $label,
			'type'  => $type,
		),
		$extra
	);
}

function lxr_text( $g, $n, $l, $e = array() ) { return lxr_f( $g, $n, $l, 'text', $e ); }
function lxr_url( $g, $n, $l )                { return lxr_f( $g, $n, $l, 'url' ); }
function lxr_number( $g, $n, $l )             { return lxr_f( $g, $n, $l, 'number', array( 'default_value' => 0 ) ); }
function lxr_bool( $g, $n, $l )               { return lxr_f( $g, $n, $l, 'true_false', array( 'ui' => 1 ) ); }
function lxr_wysiwyg( $g, $n, $l )            { return lxr_f( $g, $n, $l, 'wysiwyg', array( 'media_upload' => 0, 'toolbar' => 'basic' ) ); }
function lxr_image( $g, $n, $l, $e = array() ) { return lxr_f( $g, $n, $l, 'image', array_merge( array( 'return_format' => 'id', 'preview_size' => 'medium' ), $e ) ); }

function lxr_textarea( $g, $n, $l, $instructions = '', $rows = 3 ) {
	return lxr_f( $g, $n, $l, 'textarea', array( 'rows' => $rows, 'instructions' => $instructions ) );
}

/** A short single-line, comma-separated list (tags, topics). */
function lxr_comma_list( $g, $n, $l, $example ) {
	return lxr_text( $g, $n, $l, array( 'instructions' => "Comma-separated. Example: {$example}" ) );
}

/** One value per line (amenities, bullets, responsibilities, requirements, features). */
function lxr_line_list( $g, $n, $l, $example ) {
	return lxr_textarea( $g, $n, $l, "One per line. Example:\n{$example}", 5 );
}

/** One "Label: Value" pair per line (specifications, connectivity). */
function lxr_pair_list( $g, $n, $l, $example ) {
	return lxr_textarea( $g, $n, $l, "One \"Label: Value\" pair per line. Example:\n{$example}", 5 );
}

/**
 * An SVG-only image field — the "admin can upload their own icon" field.
 * Requires SVG uploads to be enabled (see svg-uploads.php) and, strongly
 * recommended, an SVG-sanitizing plugin such as the free "Safe SVG" active.
 */
function lxr_svg_icon( $g, $n, $l ) {
	return lxr_image( $g, $n, $l, array(
		'mime_types'   => 'svg',
		'instructions' => 'Upload an SVG icon (square, transparent background works best). Any color the file already uses is kept as-is.',
	) );
}

function lxr_select( $g, $n, $l, $choices, $default = '' ) {
	return lxr_f( $g, $n, $l, 'select', array(
		'choices'       => $choices,
		'default_value' => $default,
		'allow_null'    => 1,
		'ui'            => 1,
	) );
}

function lxr_group( $key, $title, $post_type, $graphql_field, $fields, $location = null ) {
	if ( null === $location ) {
		$location = array(
			array(
				array( 'param' => 'post_type', 'operator' => '==', 'value' => $post_type ),
			),
		);
	}
	acf_add_local_field_group( array(
		'key'                   => "group_lxr_{$key}",
		'title'                 => $title,
		'fields'                => $fields,
		'location'              => $location,
		'menu_order'            => 0,
		'position'              => 'normal',
		'style'                 => 'default',
		'active'                => true,
		'show_in_graphql'       => 1,
		'graphql_field_name'    => $graphql_field,
		'map_graphql_types_from_location_rules' => 0,
	) );
}

add_action( 'acf/init', function () {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	/* ---------------- Property ---------------- */
	lxr_group( 'property', 'Project Details', 'lxr_property', 'propertyFields', array(
		lxr_select( 'property', 'segment', 'Segment', array( 'residential' => 'Residential', 'commercial' => 'Commercial' ), 'residential' ),
		lxr_text( 'property', 'badge', 'Badge (e.g. New Launch, Premium)' ),
		lxr_text( 'property', 'locality', 'Locality / Sector' ),
		lxr_text( 'property', 'city', 'City' ),
		lxr_text( 'property', 'priceLabel', 'Price label (e.g. ₹ 6.5 Cr* Onwards)' ),
		lxr_text( 'property', 'configuration', 'Configuration (e.g. 3 & 4 BHK)' ),
		lxr_text( 'property', 'developer', 'Developer' ),
		lxr_text( 'property', 'status', 'Status' ),
		lxr_text( 'property', 'reraId', 'RERA ID' ),
		lxr_bool( 'property', 'featured', 'Featured on listing/home' ),
		lxr_number( 'property', 'displayOrder', 'Display order' ),
		lxr_textarea( 'property', 'description', 'Short description (card / hero)' ),
		lxr_wysiwyg( 'property', 'overview', 'Overview (detail page)' ),
		lxr_image( 'property', 'image', 'Primary image' ),
		lxr_image( 'property', 'gallery1', 'Gallery image 1' ),
		lxr_image( 'property', 'gallery2', 'Gallery image 2' ),
		lxr_image( 'property', 'gallery3', 'Gallery image 3' ),
		lxr_image( 'property', 'gallery4', 'Gallery image 4' ),
		lxr_comma_list( 'property', 'tags', 'Tags / chips', '4 BHK, Luxury Living' ),
		lxr_line_list( 'property', 'amenities', 'Amenities', "Infinity-edge swimming pool\nFully-equipped fitness studio" ),
		lxr_pair_list( 'property', 'specifications', 'Specifications', "Configuration: 4 BHK + Utility\nPossession: Q4 2028" ),
		lxr_pair_list( 'property', 'connectivity', 'Connectivity', "Airport: 35 – 45 min drive\nMetro: 8 – 12 min drive" ),
		lxr_url( 'property', 'brochureUrl', 'Brochure URL' ),
		lxr_text( 'property', 'locationLat', 'Latitude' ),
		lxr_text( 'property', 'locationLng', 'Longitude' ),
		lxr_url( 'property', 'mapEmbedUrl', 'Map embed URL' ),
	) );

	/* ---------------- Leader ---------------- */
	lxr_group( 'leader', 'Leader Details', 'lxr_leader', 'leaderFields', array(
		lxr_text( 'leader', 'role', 'Role / designation' ),
		lxr_url( 'leader', 'linkedin', 'LinkedIn URL' ),
		lxr_textarea( 'leader', 'bio', 'Bio' ),
		lxr_number( 'leader', 'displayOrder', 'Display order' ),
		lxr_image( 'leader', 'photo', 'Photo' ),
	) );

	/* ---------------- Job ---------------- */
	lxr_group( 'job', 'Job Details', 'lxr_job', 'jobFields', array(
		lxr_text( 'job', 'department', 'Department' ),
		lxr_text( 'job', 'location', 'Location' ),
		lxr_text( 'job', 'experience', 'Experience (e.g. 4–6 Years)' ),
		lxr_text( 'job', 'type', 'Type (e.g. Full-time)' ),
		lxr_textarea( 'job', 'summary', 'Summary' ),
		lxr_url( 'job', 'applyUrl', 'Apply URL (or mailto:)' ),
		lxr_line_list( 'job', 'responsibilities', 'Responsibilities', "Deliver against quarterly targets.\nWork cross-functionally with other teams." ),
		lxr_line_list( 'job', 'requirements', 'Requirements', "4–6 years of relevant experience.\nStrong communication skills." ),
	) );

	/* ---------------- Testimonial ---------------- */
	lxr_group( 'testimonial', 'Testimonial Details', 'lxr_testimonial', 'testimonialFields', array(
		lxr_textarea( 'testimonial', 'quote', 'Quote' ),
		lxr_text( 'testimonial', 'personName', 'Person name' ),
		lxr_text( 'testimonial', 'personRole', 'Person role / location' ),
		lxr_number( 'testimonial', 'rating', 'Rating (1-5)' ),
		lxr_select( 'testimonial', 'group', 'Shown on', array(
			'home' => 'Home', 'about' => 'About', 'careers' => 'Careers',
			'residential' => 'Residential projects', 'commercial' => 'Commercial projects',
		), 'home' ),
		lxr_number( 'testimonial', 'displayOrder', 'Display order' ),
		lxr_image( 'testimonial', 'photo', 'Photo' ),
	) );

	/* ---------------- Insight ---------------- */
	lxr_group( 'insight', 'Insight Details', 'lxr_insight', 'insightFields', array(
		lxr_text( 'insight', 'category', 'Category (e.g. Market Trend)' ),
		lxr_textarea( 'insight', 'excerpt', 'Excerpt' ),
		lxr_select( 'insight', 'kind', 'Kind', array(
			'article' => 'Article', 'perspective' => 'Leadership perspective', 'report' => 'Report',
		), 'article' ),
		lxr_wysiwyg( 'insight', 'body', 'Body' ),
		lxr_text( 'insight', 'readingTime', 'Reading time' ),
		lxr_text( 'insight', 'author', 'Author' ),
		lxr_text( 'insight', 'authorRole', 'Author role' ),
		lxr_comma_list( 'insight', 'topics', 'Topics', 'Market Trends, Residential' ),
		lxr_image( 'insight', 'image', 'Cover image' ),
		lxr_image( 'insight', 'authorPhoto', 'Author photo' ),
	) );

	/* ---------------- Resource ---------------- */
	lxr_group( 'resource', 'Resource Details', 'lxr_resource', 'resourceFields', array(
		lxr_text( 'resource', 'type', 'Type (e.g. Whitepaper)' ),
		lxr_textarea( 'resource', 'description', 'Description' ),
		lxr_url( 'resource', 'fileUrl', 'File URL (upload to Media, paste link)' ),
		lxr_text( 'resource', 'fileSize', 'File size label (e.g. PDF 3.8 MB)' ),
		lxr_image( 'resource', 'image', 'Cover image' ),
	) );

	/* ---------------- Service ---------------- */
	lxr_group( 'service', 'Service Details', 'lxr_service', 'serviceFields', array(
		lxr_textarea( 'service', 'excerpt', 'Excerpt' ),
		lxr_svg_icon( 'service', 'icon', 'Icon' ),
		lxr_select( 'service', 'list', 'List', array( 'main' => 'Main services grid', 'advisory' => 'Advisory page' ), 'main' ),
		lxr_number( 'service', 'displayOrder', 'Display order' ),
		lxr_line_list( 'service', 'bullets', 'Bullets', "Curated shortlists matched to your budget.\nIndependent, developer-agnostic recommendations." ),
		lxr_image( 'service', 'image', 'Image' ),
	) );

	/* ---------------- Office ---------------- */
	lxr_group( 'office', 'Office Details', 'lxr_office', 'officeFields', array(
		lxr_select( 'office', 'kind', 'Kind', array( 'corporate' => 'Corporate', 'branch' => 'Branch' ), 'branch' ),
		lxr_textarea( 'office', 'address', 'Address' ),
		lxr_text( 'office', 'city', 'City' ),
		lxr_text( 'office', 'phone', 'Phone' ),
		lxr_url( 'office', 'mapEmbedUrl', 'Map embed URL' ),
		lxr_url( 'office', 'directionsUrl', 'Directions URL' ),
		lxr_number( 'office', 'displayOrder', 'Display order' ),
		lxr_line_list( 'office', 'features', 'Features', "Prime location with excellent connectivity\nAmple parking available" ),
		lxr_image( 'office', 'image', 'Image' ),
	) );

	/* ---------------- Partner ---------------- */
	lxr_group( 'partner', 'Partner Details', 'lxr_partner', 'partnerFields', array(
		lxr_select( 'partner', 'group', 'Group', array(
			'developer' => 'Developer', 'bank' => 'Bank', 'interior' => 'Interior',
			'client' => 'Client', 'general' => 'General',
		), 'developer' ),
		lxr_number( 'partner', 'displayOrder', 'Display order' ),
		lxr_image( 'partner', 'logo', 'Logo' ),
	) );

	/* ---------------- Award ---------------- */
	lxr_group( 'award', 'Award Details', 'lxr_award', 'awardFields', array(
		lxr_text( 'award', 'year', 'Year' ),
		lxr_number( 'award', 'displayOrder', 'Display order' ),
		lxr_image( 'award', 'image', 'Badge image' ),
	) );

	/* ---------------- Value ---------------- */
	lxr_group( 'value', 'Value Details', 'lxr_value', 'valueFields', array(
		lxr_text( 'value', 'icon', 'Icon name (lucide, e.g. ShieldCheck)' ),
		lxr_textarea( 'value', 'description', 'Description' ),
		lxr_number( 'value', 'displayOrder', 'Display order' ),
	) );

	/*
	 * ---------------- Site Page (hero override only) ----------------
	 * Everything else about a page — section intros, the closing CTA,
	 * feature/stat rows — lives in src/content/site-pages.ts, not here.
	 * Leave any of these blank to keep the site's built-in default for that
	 * page; the slug of this post (set by the seeder, or by you) must match
	 * one of: home, about, services, projects-residential,
	 * projects-commercial, advisory, advisory-post-handover, insights,
	 * careers, contact.
	 */
	lxr_group( 'page-hero', 'Hero Override (optional)', 'lxr_sitepage', 'pageHeroFields', array(
		lxr_image( 'page-hero', 'image', 'Hero background image' ),
		lxr_text( 'page-hero', 'eyebrow', 'Eyebrow (small gold label)' ),
		lxr_text( 'page-hero', 'title', 'Title' ),
		lxr_text( 'page-hero', 'titleAccent', 'Title accent (gold part)' ),
		lxr_textarea( 'page-hero', 'description', 'Description' ),
	) );

	/* ---------------- Settings (a single post — not an Options Page) ---------------- */
	lxr_group( 'settings', 'Site Settings', 'lxr_setting', 'settingFields', array(
		lxr_text( 'settings', 'companyName', 'Company name' ),
		lxr_image( 'settings', 'logo', 'Logo' ),
		lxr_text( 'settings', 'phone', 'Phone' ),
		lxr_text( 'settings', 'email', 'Email' ),
		lxr_text( 'settings', 'whatsapp', 'WhatsApp' ),
		lxr_text( 'settings', 'website', 'Website (display text)' ),
		lxr_textarea( 'settings', 'address', 'Address' ),
		lxr_text( 'settings', 'officeHours', 'Office hours' ),
		lxr_textarea( 'settings', 'footerBlurb', 'Footer blurb' ),
		lxr_url( 'settings', 'linkedin', 'LinkedIn URL' ),
		lxr_url( 'settings', 'instagram', 'Instagram URL' ),
		lxr_url( 'settings', 'facebook', 'Facebook URL' ),
		lxr_url( 'settings', 'youtube', 'YouTube URL' ),
		lxr_f( 'settings', 'stats', 'Global stat bar', 'textarea', array(
			'rows'         => 6,
			'instructions' => "One \"Icon | Value | Label\" stat per line — icon is an optional lucide.dev icon name. Example:\nAward | 10+ | Years of Excellence\nUsers | 5000+ | Happy Clients",
		) ),
	) );
} );
