<?php
/**
 * Navigation.
 *
 * Registers the two theme locations the header/footer read from. Editors
 * build both menus the native WordPress way — Appearance → Menus — no custom
 * admin screen needed. WPGraphQL exposes registered locations automatically as
 * `MenuLocationEnum` values (PRIMARY / FOOTER), which src/lib/cms/wordpress
 * queries directly.
 *
 * Header ("primary"): flat items, optionally one level of children for a
 *   dropdown (e.g. "Projects" -> "Residential Projects", "Commercial Projects").
 *   Give a child item a "Description" (enable via Screen Options in the menu
 *   editor) to show sub-text under it in the dropdown.
 *
 * Footer ("footer"): each top-level item becomes a column heading (its own
 *   link is ignored — set it to "#" or any placeholder); nest links under it
 *   to populate that column. An item with no children is skipped.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'after_setup_theme', function () {
	register_nav_menus( array(
		'primary' => __( 'Primary Navigation (header)', 'lx-realty-cms' ),
		'footer'  => __( 'Footer Navigation (grouped by column)', 'lx-realty-cms' ),
	) );
} );
