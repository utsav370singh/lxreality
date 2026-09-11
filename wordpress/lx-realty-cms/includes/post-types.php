<?php
/**
 * Custom post types. Every type is exposed to WPGraphQL with predictable
 * single / plural names that the Next.js `wordpressProvider` queries.
 *
 * GraphQL names are listed explicitly (not derived from the admin label) —
 * the admin label is chosen for readability in wp-admin ("Project" reads
 * better than "Property" there) and does not always match the GraphQL type
 * name the Next.js code expects ("property"/"properties"), so deriving one
 * from the other silently breaks queries.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lxr_register_post_types() {
	$types = array(
		// slug => [ singular label, plural label, icon, supports, graphql singular, graphql plural ]
		'property'    => array( 'Project', 'Projects', 'dashicons-building', array( 'title', 'editor', 'thumbnail', 'page-attributes' ), 'property', 'properties' ),
		'leader'      => array( 'Leader', 'Leaders', 'dashicons-groups', array( 'title', 'thumbnail', 'page-attributes' ), 'leader', 'leaders' ),
		'job'         => array( 'Job', 'Jobs', 'dashicons-clipboard', array( 'title', 'editor', 'page-attributes' ), 'job', 'jobs' ),
		'testimonial' => array( 'Testimonial', 'Testimonials', 'dashicons-format-quote', array( 'title', 'page-attributes' ), 'testimonial', 'testimonials' ),
		'insight'     => array( 'Insight', 'Insights', 'dashicons-analytics', array( 'title', 'editor', 'thumbnail', 'excerpt' ), 'insight', 'insights' ),
		'resource'    => array( 'Resource', 'Resources', 'dashicons-media-document', array( 'title', 'page-attributes' ), 'resource', 'resources' ),
		'service'     => array( 'Service', 'Services', 'dashicons-portfolio', array( 'title', 'editor', 'thumbnail', 'page-attributes' ), 'service', 'services' ),
		'office'      => array( 'Office', 'Offices', 'dashicons-location', array( 'title', 'page-attributes' ), 'office', 'offices' ),
		'partner'     => array( 'Partner', 'Partners', 'dashicons-awards', array( 'title', 'thumbnail', 'page-attributes' ), 'partner', 'partners' ),
		'award'       => array( 'Award', 'Awards', 'dashicons-star-filled', array( 'title', 'thumbnail', 'page-attributes' ), 'award', 'awards' ),
		'value'       => array( 'Value', 'Values', 'dashicons-heart', array( 'title', 'page-attributes' ), 'value', 'values' ),
		// Hero-image/copy override only — see includes/acf-fields.php. One post per page
		// key (home, about, services, …); every page works fine with none at all.
		'sitepage'    => array( 'Site Page', 'Site Pages', 'dashicons-layout', array( 'title', 'page-attributes' ), 'sitePage', 'sitePages' ),
		// Intentionally just one post ever ("LX Realty Settings", created by the seeder) —
		// stands in for what would be an ACF Options Page (a Pro-only feature).
		'setting'     => array( 'Setting', 'Settings', 'dashicons-admin-generic', array( 'title' ), 'setting', 'settings' ),
	);

	foreach ( $types as $slug => $cfg ) {
		list( $single, $plural, $icon, $supports, $graphql_single, $graphql_plural ) = $cfg;

		register_post_type(
			"lxr_{$slug}",
			array(
				'labels'              => array(
					'name'          => $plural,
					'singular_name' => $single,
					'menu_name'     => $plural,
					'add_new_item'  => "Add {$single}",
					'edit_item'     => "Edit {$single}",
				),
				'public'              => true,
				'has_archive'         => false,
				'show_in_rest'        => true,
				'menu_icon'           => $icon,
				'menu_position'       => 25,
				'supports'            => $supports,
				'rewrite'             => array( 'slug' => "lx/{$slug}" ),
				'show_in_graphql'     => true,
				'graphql_single_name' => $graphql_single,
				'graphql_plural_name' => $graphql_plural,
			)
		);
	}
}
add_action( 'init', 'lxr_register_post_types' );
