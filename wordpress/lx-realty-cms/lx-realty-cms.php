<?php
/**
 * Plugin Name:       LX Realty CMS
 * Description:        Content types, ACF field groups, GraphQL schema and example-data seeder that back the LX Realty Next.js website.
 * Version:           1.0.0
 * Requires PHP:      8.0
 * Author:            LX Realty
 * License:           GPL-2.0-or-later
 * Text Domain:       lx-realty-cms
 *
 * Dependencies (install & activate these first):
 *   - WPGraphQL                     https://wordpress.org/plugins/wp-graphql/
 *   - Advanced Custom Fields PRO    https://www.advancedcustomfields.com/pro/
 *   - WPGraphQL for ACF (v2)        https://wordpress.org/plugins/wpgraphql-acf/
 *
 * Recommended:
 *   - Safe SVG                      https://wordpress.org/plugins/safe-svg/
 *     (sanitizes the SVG icon uploads this plugin enables — see includes/svg-uploads.php)
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'LXR_CMS_VERSION', '1.0.0' );
define( 'LXR_CMS_DIR', plugin_dir_path( __FILE__ ) );

/**
 * Warn (don't fatal) if a dependency is missing, so the admin still loads.
 */
add_action( 'admin_notices', function () {
	$missing = array();
	if ( ! class_exists( 'WPGraphQL' ) ) {
		$missing[] = 'WPGraphQL';
	}
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		$missing[] = 'Advanced Custom Fields PRO';
	}
	if ( ! class_exists( 'WPGraphQL\ACF\ACF' ) && ! function_exists( 'wpgraphql_acf_init' ) && ! defined( 'WPGRAPHQL_FOR_ACF_VERSION' ) ) {
		$missing[] = 'WPGraphQL for ACF';
	}
	if ( $missing ) {
		echo '<div class="notice notice-error"><p><strong>LX Realty CMS:</strong> please install &amp; activate: '
			. esc_html( implode( ', ', $missing ) ) . '.</p></div>';
	}
} );

require_once LXR_CMS_DIR . 'includes/post-types.php';
require_once LXR_CMS_DIR . 'includes/menus.php';
require_once LXR_CMS_DIR . 'includes/svg-uploads.php';
require_once LXR_CMS_DIR . 'includes/acf-fields.php';
require_once LXR_CMS_DIR . 'includes/graphql-settings.php';
require_once LXR_CMS_DIR . 'includes/rest-revalidate.php';

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	require_once LXR_CMS_DIR . 'includes/seed.php';
}

/**
 * Flush rewrite rules on activation so the CPT permalinks work immediately.
 */
register_activation_hook( __FILE__, function () {
	lxr_register_post_types();
	flush_rewrite_rules();
} );
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
