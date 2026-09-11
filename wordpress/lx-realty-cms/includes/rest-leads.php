<?php
/**
 * Custom REST endpoint that saves contact-form and newsletter submissions
 * into WordPress as `lxr_lead` posts, so they show up in wp-admin → Leads.
 *
 * Called server-to-server by the Next.js app's POST /api/lead route — not by
 * the browser directly — authenticated with a shared secret rather than full
 * WordPress auth, the same pattern as includes/rest-revalidate.php.
 *
 * Configure in wp-config.php:
 *   define( 'LXR_LEADS_SECRET', 'a-different-random-string-than-the-revalidate-one' );
 *
 * And in the Next.js project's .env.local:
 *   WORDPRESS_LEADS_SECRET=<the same string>
 *
 * Without LXR_LEADS_SECRET defined, the endpoint refuses every request — it
 * never silently accepts unauthenticated writes.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'rest_api_init', function () {
	register_rest_route( 'lxr/v1', '/leads', array(
		'methods'             => 'POST',
		'callback'            => 'lxr_create_lead',
		'permission_callback' => 'lxr_verify_lead_secret',
	) );
} );

function lxr_verify_lead_secret( WP_REST_Request $request ) {
	if ( ! defined( 'LXR_LEADS_SECRET' ) || ! LXR_LEADS_SECRET ) {
		return new WP_Error( 'lxr_leads_disabled', 'Lead capture is not configured on this site.', array( 'status' => 501 ) );
	}
	$given = $request->get_header( 'x-lxr-leads-secret' );
	if ( ! $given || ! hash_equals( LXR_LEADS_SECRET, $given ) ) {
		return new WP_Error( 'lxr_leads_forbidden', 'Invalid secret.', array( 'status' => 401 ) );
	}
	return true;
}

function lxr_create_lead( WP_REST_Request $request ) {
	$body = $request->get_json_params();
	if ( ! is_array( $body ) ) {
		return new WP_Error( 'lxr_leads_bad_request', 'Invalid JSON body.', array( 'status' => 400 ) );
	}

	$type    = ( 'newsletter' === ( $body['type'] ?? '' ) ) ? 'newsletter' : 'contact';
	$email   = sanitize_email( $body['email'] ?? '' );
	if ( ! $email || ! is_email( $email ) ) {
		return new WP_Error( 'lxr_leads_invalid_email', 'A valid email is required.', array( 'status' => 422 ) );
	}
	$name    = sanitize_text_field( $body['name'] ?? '' );
	$phone   = sanitize_text_field( $body['phone'] ?? '' );
	$subject = sanitize_text_field( $body['subject'] ?? '' );
	$message = sanitize_textarea_field( $body['message'] ?? '' );

	$title = 'newsletter' === $type
		? "Newsletter: {$email}"
		: trim( ( $name ?: 'Contact' ) . ' — ' . ( $subject ?: $email ) );

	$post_id = wp_insert_post( array(
		'post_type'   => 'lxr_lead',
		'post_status' => 'publish',
		'post_title'  => $title,
	), true );

	if ( is_wp_error( $post_id ) ) {
		return new WP_Error( 'lxr_leads_save_failed', 'Could not save the lead.', array( 'status' => 500 ) );
	}

	if ( function_exists( 'update_field' ) ) {
		update_field( 'field_lxr_lead_type', $type, $post_id );
		update_field( 'field_lxr_lead_name', $name, $post_id );
		update_field( 'field_lxr_lead_phone', $phone, $post_id );
		update_field( 'field_lxr_lead_email', $email, $post_id );
		update_field( 'field_lxr_lead_subject', $subject, $post_id );
		update_field( 'field_lxr_lead_message', $message, $post_id );
	}

	return array( 'ok' => true, 'id' => $post_id );
}
