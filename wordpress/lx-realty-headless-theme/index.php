<?php
/**
 * Fallback template. Not normally reached — see the template_redirect in
 * functions.php, which sends visitors to the public Next.js site once
 * LXR_PUBLIC_SITE_URL is set in wp-config.php.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
?>
<main style="font-family: sans-serif; max-width: 640px; margin: 4rem auto; padding: 0 1.5rem;">
	<h1>LX Realty CMS</h1>
	<p>This WordPress install is a headless content API. The public website is built with Next.js — see the repository root.</p>
</main>
<?php
get_footer();
