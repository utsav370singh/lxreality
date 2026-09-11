<?php
/**
 * Custom post types. Every type is exposed to WPGraphQL with predictable
 * single / plural names that the Next.js `wordpressProvider` queries.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lxr_register_post_types() {
	$types = array(
		'property'    => array( 'Project', 'Projects', 'dashicons-building', array( 'title', 'editor', 'thumbnail', 'page-attributes' ) ),
		'leader'      => array( 'Leader', 'Leaders', 'dashicons-groups', array( 'title', 'thumbnail', 'page-attributes' ) ),
		'job'         => array( 'Job', 'Jobs', 'dashicons-clipboard', array( 'title', 'editor', 'page-attributes' ) ),
		'testimonial' => array( 'Testimonial', 'Testimonials', 'dashicons-format-quote', array( 'title', 'page-attributes' ) ),
		'insight'     => array( 'Insight', 'Insights', 'dashicons-analytics', array( 'title', 'editor', 'thumbnail', 'excerpt' ) ),
		'resource'    => array( 'Resource', 'Resources', 'dashicons-media-document', array( 'title', 'page-attributes' ) ),
		'service'     => array( 'Service', 'Services', 'dashicons-portfolio', array( 'title', 'editor', 'thumbnail', 'page-attributes' ) ),
		'office'      => array( 'Office', 'Offices', 'dashicons-location', array( 'title', 'page-attributes' ) ),
		'partner'     => array( 'Partner', 'Partners', 'dashicons-awards', array( 'title', 'thumbnail', 'page-attributes' ) ),
		'award'       => array( 'Award', 'Awards', 'dashicons-star-filled', array( 'title', 'thumbnail', 'page-attributes' ) ),
		'value'       => array( 'Value', 'Values', 'dashicons-heart', array( 'title', 'page-attributes' ) ),
		'sitepage'    => array( 'Site Page', 'Site Pages', 'dashicons-layout', array( 'title', 'page-attributes' ) ),
	);

	foreach ( $types as $slug => $cfg ) {
		list( $single, $plural, $icon, $supports ) = $cfg;

		$graphql_single = lcfirst( str_replace( ' ', '', $single ) );   // "sitePage"
		$graphql_plural = lcfirst( str_replace( ' ', '', $plural ) );   // "sitePages"

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
