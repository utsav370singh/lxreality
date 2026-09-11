<?php
/**
 * On-demand revalidation.
 *
 * Pings the Next.js site's POST /api/revalidate whenever content editors care
 * about changes, so the live site updates immediately instead of waiting out
 * its ISR window (default 5 minutes — see CMS_REVALIDATE_SECONDS).
 *
 * Configure both of these in wp-config.php (NOT in the database — keeps the
 * secret out of the DB and out of any export/import):
 *
 *   define( 'LXR_REVALIDATE_URL', 'https://www.lxrealty.in/api/revalidate' );
 *   define( 'LXR_REVALIDATE_SECRET', 'the-same-value-as-REVALIDATE_SECRET-in-.env' );
 *
 * Without both constants defined this file is a harmless no-op.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Fire-and-forget POST to Next.js. Non-blocking so saving in wp-admin never
 * waits on the Next.js server.
 */
function lxr_revalidate( array $tags ) {
	if ( ! defined( 'LXR_REVALIDATE_URL' ) || ! LXR_REVALIDATE_URL ) {
		return;
	}
	if ( ! defined( 'LXR_REVALIDATE_SECRET' ) || ! LXR_REVALIDATE_SECRET ) {
		return;
	}

	wp_remote_post(
		LXR_REVALIDATE_URL,
		array(
			'timeout'   => 3,
			'blocking'  => false,
			'headers'   => array(
				'Content-Type'        => 'application/json',
				'x-revalidate-secret' => LXR_REVALIDATE_SECRET,
			),
			'body'      => wp_json_encode( array( 'tags' => array_values( array_unique( array_merge( array( 'cms' ), $tags ) ) ) ) ),
		)
	);
}

/** Map an `lxr_*` post type to the GraphQL collection tag used in src/lib/cms/wordpress/provider.ts. */
function lxr_collection_tag_for_post_type( string $post_type ): ?string {
	$map = array(
		'lxr_property'    => 'properties',
		'lxr_leader'      => 'leaders',
		'lxr_job'         => 'jobs',
		'lxr_testimonial' => 'testimonials',
		'lxr_insight'     => 'insights',
		'lxr_resource'    => 'resources',
		'lxr_service'     => 'services',
		'lxr_office'      => 'offices',
		'lxr_partner'     => 'partners',
		'lxr_award'       => 'awards',
		'lxr_value'       => 'values',
		'lxr_setting'     => 'settings',
	);
	return $map[ $post_type ] ?? null;
}

add_action( 'save_post', function ( $post_id, $post ) {
	if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
		return;
	}

	if ( 'lxr_sitepage' === $post->post_type ) {
		lxr_revalidate( array( 'page:' . get_post_field( 'post_name', $post_id ) ) );
		return;
	}

	$tag = lxr_collection_tag_for_post_type( $post->post_type );
	if ( $tag ) {
		$tags = array( $tag );
		if ( in_array( $post->post_type, array( 'lxr_property', 'lxr_job', 'lxr_insight' ), true ) ) {
			$tags[] = $tag . ':' . $post->post_name; // e.g. "property:dlf-privana-west"
		}
		lxr_revalidate( $tags );
	}
}, 10, 2 );

add_action( 'delete_post', function ( $post_id ) {
	$post = get_post( $post_id );
	if ( ! $post ) {
		return;
	}
	if ( 'lxr_sitepage' === $post->post_type ) {
		lxr_revalidate( array( 'page:' . $post->post_name ) );
		return;
	}
	$tag = lxr_collection_tag_for_post_type( $post->post_type );
	if ( $tag ) {
		lxr_revalidate( array( $tag ) );
	}
} );
