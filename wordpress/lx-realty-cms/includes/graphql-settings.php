<?php
/**
 * Global site settings.
 *
 * Editing UI  : a single post under Settings → "LX Realty Settings" — an
 *               ordinary post (see includes/post-types.php), standing in for
 *               what would otherwise be an ACF Options Page (Pro-only).
 * GraphQL     : a hand-rolled `lxSiteSettings` root field with a stable shape
 *               that matches src/lib/cms/wordpress/fragments.ts
 *               (SITE_SETTINGS_QUERY) — resolved from that one post's ACF
 *               fields, whichever post it turns out to be.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** The one "Settings" post — whichever exists (the seeder creates exactly one). */
function lxr_get_settings_post_id(): int {
	$posts = get_posts( array(
		'post_type'      => 'lxr_setting',
		'post_status'    => 'publish',
		'posts_per_page' => 1,
		'orderby'        => 'ID',
		'order'          => 'ASC',
		'fields'         => 'ids',
	) );
	return $posts ? (int) $posts[0] : 0;
}

add_action( 'graphql_register_types', function () {

	register_graphql_object_type( 'LXMediaNode', array(
		'fields' => array(
			'sourceUrl'    => array( 'type' => 'String' ),
			'altText'      => array( 'type' => 'String' ),
			'mediaDetails' => array( 'type' => 'LXMediaDetails' ),
		),
	) );
	register_graphql_object_type( 'LXMediaDetails', array(
		'fields' => array(
			'width'  => array( 'type' => 'Int' ),
			'height' => array( 'type' => 'Int' ),
		),
	) );
	register_graphql_object_type( 'LXMediaEdge', array(
		'fields' => array( 'node' => array( 'type' => 'LXMediaNode' ) ),
	) );

	register_graphql_object_type( 'LXSiteSettings', array(
		'fields' => array(
			'companyName' => array( 'type' => 'String' ),
			'phone'       => array( 'type' => 'String' ),
			'email'       => array( 'type' => 'String' ),
			'whatsapp'    => array( 'type' => 'String' ),
			'website'     => array( 'type' => 'String' ),
			'address'     => array( 'type' => 'String' ),
			'officeHours' => array( 'type' => 'String' ),
			'footerBlurb' => array( 'type' => 'String' ),
			'linkedin'    => array( 'type' => 'String' ),
			'instagram'   => array( 'type' => 'String' ),
			'facebook'    => array( 'type' => 'String' ),
			'youtube'     => array( 'type' => 'String' ),
			'logo'        => array( 'type' => 'LXMediaEdge' ),
			// One "Icon | Value | Label" line per stat — see includes/acf-fields.php.
			'stats'       => array( 'type' => 'String' ),
		),
	) );

	register_graphql_field( 'RootQuery', 'lxSiteSettings', array(
		'type'    => 'LXSiteSettings',
		'resolve' => function () {
			$post_id = lxr_get_settings_post_id();
			$get     = fn( $k ) => $post_id && function_exists( 'get_field' ) ? get_field( $k, $post_id ) : null;

			$logo_id   = $get( 'logo' );
			$logo_edge = null;
			if ( $logo_id ) {
				$meta = wp_get_attachment_metadata( $logo_id );
				$logo_edge = array(
					'node' => array(
						'sourceUrl'    => wp_get_attachment_url( $logo_id ),
						'altText'      => get_post_meta( $logo_id, '_wp_attachment_image_alt', true ),
						'mediaDetails' => array(
							'width'  => $meta['width'] ?? null,
							'height' => $meta['height'] ?? null,
						),
					),
				);
			}

			return array(
				'companyName' => $get( 'companyName' ) ?: 'LX Realty',
				'phone'       => $get( 'phone' ),
				'email'       => $get( 'email' ),
				'whatsapp'    => $get( 'whatsapp' ),
				'website'     => $get( 'website' ),
				'address'     => $get( 'address' ),
				'officeHours' => $get( 'officeHours' ),
				'footerBlurb' => $get( 'footerBlurb' ),
				'linkedin'    => $get( 'linkedin' ),
				'instagram'   => $get( 'instagram' ),
				'facebook'    => $get( 'facebook' ),
				'youtube'     => $get( 'youtube' ),
				'logo'        => $logo_edge,
				'stats'       => $get( 'stats' ),
			);
		},
	) );
} );
