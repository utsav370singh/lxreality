<?php
/**
 * ACF field groups (registered in code — no manual field creation needed).
 *
 * Each group sets `show_in_graphql` + `graphql_field_name`, so WPGraphQL for
 * ACF exposes it exactly as the Next.js fragments expect, e.g.
 *   query { properties { nodes { propertyFields { priceLabel image { node { sourceUrl } } } } } }
 *
 * Requires ACF PRO (repeater / gallery fields).
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

function lxr_text( $g, $n, $l, $e = array() )     { return lxr_f( $g, $n, $l, 'text', $e ); }
function lxr_textarea( $g, $n, $l )               { return lxr_f( $g, $n, $l, 'textarea', array( 'rows' => 3 ) ); }
function lxr_url( $g, $n, $l )                    { return lxr_f( $g, $n, $l, 'url' ); }
function lxr_number( $g, $n, $l )                 { return lxr_f( $g, $n, $l, 'number', array( 'default_value' => 0 ) ); }
function lxr_bool( $g, $n, $l )                   { return lxr_f( $g, $n, $l, 'true_false', array( 'ui' => 1 ) ); }
function lxr_wysiwyg( $g, $n, $l )                { return lxr_f( $g, $n, $l, 'wysiwyg', array( 'media_upload' => 0, 'toolbar' => 'basic' ) ); }
function lxr_image( $g, $n, $l )                  { return lxr_f( $g, $n, $l, 'image', array( 'return_format' => 'id', 'preview_size' => 'medium' ) ); }
function lxr_gallery( $g, $n, $l )                { return lxr_f( $g, $n, $l, 'gallery', array( 'return_format' => 'id' ) ); }

/**
 * An image field restricted to SVG uploads — used for anything editors should
 * hand a designer-provided icon file for, instead of picking from a fixed
 * icon-font set. Requires SVG uploads to be enabled (see svg-uploads.php) and,
 * strongly recommended, an SVG-sanitizing plugin such as "Safe SVG" active.
 */
function lxr_svg_icon( $g, $n, $l ) {
	return lxr_f( $g, $n, $l, 'image', array(
		'return_format' => 'id',
		'preview_size'  => 'medium',
		'mime_types'    => 'svg',
		'instructions'  => 'Upload an SVG icon (square, transparent background works best). Any color the file already uses is kept as-is.',
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

function lxr_repeater( $g, $n, $l, $sub_fields, $layout = 'table' ) {
	return lxr_f( $g, $n, $l, 'repeater', array(
		'layout'       => $layout,
		'button_label' => 'Add row',
		'sub_fields'   => $sub_fields,
	) );
}

/** A repeater with a single "item" text line. */
function lxr_list( $g, $n, $l ) {
	return lxr_repeater( $g, $n, $l, array( lxr_text( "{$n}_row", 'item', 'Item' ) ) );
}

/** A repeater of label / value pairs. */
function lxr_pairs( $g, $n, $l ) {
	return lxr_repeater( $g, $n, $l, array(
		lxr_text( "{$n}_row", 'label', 'Label' ),
		lxr_text( "{$n}_row", 'value', 'Value' ),
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
		lxr_gallery( 'property', 'gallery', 'Gallery' ),
		lxr_repeater( 'property', 'tags', 'Tags / chips', array( lxr_text( 'tags_row', 'label', 'Label' ) ) ),
		lxr_list( 'property', 'amenities', 'Amenities' ),
		lxr_pairs( 'property', 'specifications', 'Specifications' ),
		lxr_pairs( 'property', 'connectivity', 'Connectivity' ),
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
		lxr_list( 'job', 'responsibilities', 'Responsibilities' ),
		lxr_list( 'job', 'requirements', 'Requirements' ),
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
		lxr_repeater( 'insight', 'topics', 'Topics', array( lxr_text( 'topics_row', 'label', 'Topic' ) ) ),
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
		lxr_list( 'service', 'bullets', 'Bullets' ),
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
		lxr_list( 'office', 'features', 'Features' ),
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
		lxr_text( 'value', 'icon', 'Icon name (lucide)' ),
		lxr_textarea( 'value', 'description', 'Description' ),
		lxr_number( 'value', 'displayOrder', 'Display order' ),
	) );

	/* ---------------- Site Page ---------------- */
	lxr_group( 'page', 'Page Content', 'lxr_sitepage', 'pageFields', array(
		lxr_select( 'page', 'key', 'Page key', array(
			'home' => 'home', 'about' => 'about', 'services' => 'services',
			'projects-residential' => 'projects-residential', 'projects-commercial' => 'projects-commercial',
			'advisory' => 'advisory', 'advisory-post-handover' => 'advisory-post-handover',
			'insights' => 'insights', 'careers' => 'careers', 'contact' => 'contact',
		) ),
		lxr_text( 'page', 'heroEyebrow', 'Hero: eyebrow' ),
		lxr_text( 'page', 'heroTitle', 'Hero: title' ),
		lxr_text( 'page', 'heroTitleAccent', 'Hero: title accent (gold)' ),
		lxr_textarea( 'page', 'heroDescription', 'Hero: description' ),
		lxr_image( 'page', 'heroImage', 'Hero: background image' ),
		lxr_text( 'page', 'heroStatsPanelTitle', 'Hero: stats panel title' ),
		lxr_text( 'page', 'heroPrimaryCtaLabel', 'Hero: primary CTA label' ),
		lxr_text( 'page', 'heroPrimaryCtaHref', 'Hero: primary CTA href' ),
		lxr_text( 'page', 'heroSecondaryCtaLabel', 'Hero: secondary CTA label' ),
		lxr_text( 'page', 'heroSecondaryCtaHref', 'Hero: secondary CTA href' ),
		lxr_repeater( 'page', 'heroBreadcrumb', 'Hero: breadcrumb', array( lxr_text( 'bc_row', 'label', 'Label' ) ) ),
		lxr_repeater( 'page', 'heroFeatures', 'Hero: feature row', array(
			lxr_text( 'hf_row', 'icon', 'Icon' ),
			lxr_text( 'hf_row', 'title', 'Title' ),
			lxr_text( 'hf_row', 'description', 'Description' ),
		) ),
		lxr_repeater( 'page', 'heroStats', 'Hero: stats panel', array(
			lxr_text( 'hs_row', 'icon', 'Icon' ),
			lxr_text( 'hs_row', 'value', 'Value' ),
			lxr_text( 'hs_row', 'label', 'Label' ),
		) ),
		lxr_repeater( 'page', 'sections', 'Section intros', array(
			lxr_text( 'sec_row', 'slug', 'Slug (e.g. featured)' ),
			lxr_text( 'sec_row', 'eyebrow', 'Eyebrow' ),
			lxr_text( 'sec_row', 'title', 'Title' ),
			lxr_text( 'sec_row', 'titleAccent', 'Title accent' ),
			lxr_textarea( 'sec_row', 'description', 'Description' ),
		), 'block' ),
		lxr_text( 'page', 'ctaTitle', 'Closing CTA: title' ),
		lxr_text( 'page', 'ctaTitleAccent', 'Closing CTA: title accent' ),
		lxr_textarea( 'page', 'ctaDescription', 'Closing CTA: description' ),
		lxr_text( 'page', 'ctaPrimaryLabel', 'Closing CTA: primary label' ),
		lxr_text( 'page', 'ctaPrimaryHref', 'Closing CTA: primary href' ),
		lxr_text( 'page', 'ctaSecondaryLabel', 'Closing CTA: secondary label' ),
		lxr_text( 'page', 'ctaSecondaryHref', 'Closing CTA: secondary href' ),
		lxr_image( 'page', 'ctaImage', 'Closing CTA: image' ),
	) );
} );
