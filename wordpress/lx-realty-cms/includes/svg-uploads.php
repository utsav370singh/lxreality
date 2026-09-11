<?php
/**
 * SVG uploads for icon fields (Services → Icon, and any other `lxr_svg_icon`
 * field). WordPress blocks SVG uploads by default because an SVG is XML and
 * can carry a <script>, so this file does two things:
 *
 *   1. Allows the .svg mime type through the media uploader (scoped to
 *      administrators and editors only — see the capability check below).
 *   2. Strips the obviously dangerous constructs (<script>, on*="" event
 *      handlers, javascript: URLs, <foreignObject>) from every SVG on upload.
 *
 * That second step is a best-effort safety net, NOT a substitute for a real
 * sanitizer. For production, install the free "Safe SVG" plugin
 * (https://wordpress.org/plugins/safe-svg/) — it uses a maintained,
 * battle-tested sanitizer library and this file happily defers to it (it
 * skips its own filtering when Safe SVG is active, since Safe SVG does it
 * more thoroughly).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Let Safe SVG (or any dedicated sanitizer plugin) own this if it's active. */
function lxr_has_dedicated_svg_sanitizer(): bool {
	return class_exists( 'SafeSvg' ) || function_exists( 'safe_svg_sanitize_svg' ) || defined( 'SAFE_SVG_PLUGIN_URL' );
}

add_filter( 'upload_mimes', function ( array $mimes ) {
	if ( current_user_can( 'edit_others_posts' ) ) {
		$mimes['svg'] = 'image/svg+xml';
	}
	return $mimes;
} );

// WordPress' own mime sniffing doesn't recognise SVG; tell it the upload is
// what its extension says, same approach Safe SVG and similar plugins use.
add_filter( 'wp_check_filetype_and_ext', function ( $data, $file, $filename ) {
	if ( str_ends_with( strtolower( $filename ), '.svg' ) ) {
		$data['ext']             = 'svg';
		$data['type']            = 'image/svg+xml';
		$data['proper_filename'] = $filename;
	}
	return $data;
}, 10, 3 );

add_filter( 'wp_handle_upload_prefilter', function ( array $file ) {
	if ( lxr_has_dedicated_svg_sanitizer() ) {
		return $file; // Safe SVG (or equivalent) will handle it.
	}
	if ( 'image/svg+xml' !== ( $file['type'] ?? '' ) ) {
		return $file;
	}

	$contents = file_get_contents( $file['tmp_name'] );
	if ( false === $contents ) {
		$file['error'] = 'Could not read the uploaded SVG.';
		return $file;
	}

	$clean = lxr_strip_dangerous_svg_markup( $contents );
	file_put_contents( $file['tmp_name'], $clean );

	return $file;
} );

function lxr_strip_dangerous_svg_markup( string $svg ): string {
	// <script>…</script> and any other scriptable element.
	$svg = preg_replace( '#<(script|foreignObject)[^>]*>.*?</\1>#is', '', $svg );
	$svg = preg_replace( '#<(script|foreignObject)[^>]*/>#is', '', $svg );
	// on*="" event handler attributes.
	$svg = preg_replace( '#\son\w+\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)#i', '', $svg );
	// javascript: / data: URLs inside href/xlink:href/src attributes.
	$svg = preg_replace( '#((?:xlink:)?href|src)\s*=\s*("|\')\s*(javascript:|data:text/html)[^"\']*("|\')#i', '$1=$2#$4', $svg );
	// External entity declarations (XXE hardening).
	$svg = preg_replace( '#<!ENTITY[^>]*>#i', '', $svg );

	return $svg;
}
