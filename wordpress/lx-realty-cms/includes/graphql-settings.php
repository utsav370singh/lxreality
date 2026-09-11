<?php
/**
 * Global site settings.
 *
 * Editing UI  : an ACF options page ("LX Realty Settings") under the Site Pages menu.
 * GraphQL     : a hand-rolled `lxSiteSettings` root field with a stable shape that
 *               matches src/lib/cms/wordpress/fragments.ts (SITE_SETTINGS_QUERY).
 *
 * We resolve it ourselves rather than relying on WPGraphQL-for-ACF's options-page
 * mapping so the schema shape never drifts.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ---- ACF options page + fields (admin editing only) ---- */
add_action( 'acf/init', function () {
	if ( ! function_exists( 'acf_add_options_page' ) ) {
		return;
	}

	acf_add_options_page( array(
		'page_title'  => 'LX Realty Settings',
		'menu_title'  => 'LX Realty Settings',
		'menu_slug'   => 'lxr-site-settings',
		'parent_slug' => 'edit.php?post_type=lxr_sitepage',
		'capability'  => 'manage_options',
	) );

	lxr_group(
		'settings',
		'Site Settings',
		null,
		'lxSiteSettingsFields',
		array(
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
			lxr_repeater( 'settings', 'stats', 'Global stat bar', array(
				lxr_text( 'stats_row', 'icon', 'Icon (lucide)' ),
				lxr_text( 'stats_row', 'value', 'Value' ),
				lxr_text( 'stats_row', 'label', 'Label' ),
			) ),
		),
		array(
			array(
				array( 'param' => 'options_page', 'operator' => '==', 'value' => 'lxr-site-settings' ),
			),
		)
	);
} );

/* ---- GraphQL: lxSiteSettings root field ---- */
add_action( 'graphql_register_types', function () {

	register_graphql_object_type( 'LXStat', array(
		'description' => 'A value + label stat.',
		'fields'      => array(
			'icon'  => array( 'type' => 'String' ),
			'value' => array( 'type' => 'String' ),
			'label' => array( 'type' => 'String' ),
		),
	) );

	register_graphql_object_type( 'LXMediaNode', array(
		'fields' => array(
			'sourceUrl'     => array( 'type' => 'String' ),
			'altText'       => array( 'type' => 'String' ),
			'mediaDetails'  => array( 'type' => 'LXMediaDetails' ),
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
			'stats'       => array( 'type' => array( 'list_of' => 'LXStat' ) ),
		),
	) );

	register_graphql_field( 'RootQuery', 'lxSiteSettings', array(
		'type'    => 'LXSiteSettings',
		'resolve' => function () {
			$get = fn( $k ) => function_exists( 'get_field' ) ? get_field( $k, 'option' ) : null;

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

			$stats = array();
			foreach ( (array) $get( 'stats' ) as $row ) {
				$stats[] = array(
					'icon'  => $row['icon'] ?? '',
					'value' => $row['value'] ?? '',
					'label' => $row['label'] ?? '',
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
				'stats'       => $stats,
			);
		},
	) );
} );
