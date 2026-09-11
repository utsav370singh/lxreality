<?php
/**
 * LX Realty Headless theme.
 *
 * Deliberately minimal — this WordPress install is a content API for the
 * Next.js site (see /README.md at the repo root and /wordpress/README.md for
 * the full architecture). This file only declares the theme support the
 * admin and REST/GraphQL media handling expect.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'gallery', 'caption' ) );
} );

/**
 * Anyone who stumbles onto the WordPress front end (it isn't linked anywhere)
 * is redirected to the real, public Next.js site instead of seeing a blank
 * theme. Admin, REST, GraphQL and login stay untouched.
 */
add_action( 'template_redirect', function () {
	if ( is_admin() || wp_doing_ajax() || defined( 'REST_REQUEST' ) ) {
		return;
	}
	$public_url = defined( 'LXR_PUBLIC_SITE_URL' ) ? LXR_PUBLIC_SITE_URL : '';
	if ( $public_url ) {
		wp_redirect( $public_url, 301 );
		exit;
	}
} );
