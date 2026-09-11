<?php
/**
 * WP-CLI example-data seeder.
 *
 *   wp lx-realty seed            Create/update all example content
 *   wp lx-realty seed --fresh    Delete every lxr_* post + the two menus first
 *
 * Mirrors src/lib/cms/mock/*.ts as closely as PHP + ACF allow, so the WP
 * admin and the Next.js mock provider show the same story out of the box.
 * Images are sideloaded from picsum.photos/i.pravatar.cc into the real Media
 * Library (cached by URL, so re-running the command doesn't duplicate them).
 */

if ( ! defined( 'ABSPATH' ) || ! defined( 'WP_CLI' ) ) {
	return;
}

require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Sideload a remote image once; subsequent calls with the same URL reuse the attachment. */
function lxr_seed_image( string $url, string $desc = '' ): int {
	$cache_key = 'lxr_seed_img_' . md5( $url );
	$existing  = get_option( $cache_key );
	if ( $existing && get_post( $existing ) ) {
		return (int) $existing;
	}
	$id = media_sideload_image( $url, 0, $desc, 'id' );
	if ( is_wp_error( $id ) ) {
		WP_CLI::warning( "Could not sideload {$url}: " . $id->get_error_message() );
		return 0;
	}
	if ( $desc ) {
		update_post_meta( $id, '_wp_attachment_image_alt', $desc );
	}
	update_option( $cache_key, $id );
	return (int) $id;
}

/**
 * Simple 24×24 line-icon glyphs, mirroring src/lib/cms/mock/media.ts's
 * SERVICE_ICON_GLYPHS — stand-ins for what an admin would design/upload.
 * Written straight to the Media Library as real .svg files (no remote fetch
 * needed), so the Services screen shows real, editable SVG uploads out of the box.
 */
function lxr_service_icon_glyph( string $key ): string {
	$glyphs = array(
		'home'         => '<path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />',
		'building'     => '<rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" /><path d="M10 21v-4h4v4" />',
		'trending-up'  => '<path d="M4 16l6-6 4 4 6-8" /><path d="M15 6h5v5" />',
		'megaphone'    => '<path d="M4 10v4a1 1 0 0 0 1 1h2l8 4V5L7 9H5a1 1 0 0 0-1 1Z" /><path d="M17 9.5a3.5 3.5 0 0 1 0 5" />',
		'chart'        => '<path d="M4 20V10M11 20V4M18 20v-7" /><path d="M4 20h16" />',
		'handshake'    => '<path d="M3 12h4l3-3 3 3 3-3 4 3" /><path d="M7 12l3 5 2-1.5L14 17l3-5" />',
		'search'       => '<circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.8-4.8" />',
		'pie'          => '<path d="M12 3v9l7.5 4.3" /><path d="M12 3a9 9 0 1 0 7.79 13.5L12 12Z" />',
		'pin'          => '<path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.3" />',
	);
	$inner = $glyphs[ $key ] ?? $glyphs['pin'];
	return '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c69a46" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' . $inner . '</svg>';
}

/** Write an SVG icon straight into the Media Library (idempotent, keyed by glyph+title). */
function lxr_seed_svg_icon( string $glyph, string $title ): int {
	$cache_key = 'lxr_seed_svg_' . md5( $glyph . $title );
	$existing  = get_option( $cache_key );
	if ( $existing && get_post( $existing ) ) {
		return (int) $existing;
	}

	$filename = sanitize_title( $title ) . '-icon.svg';
	$upload   = wp_upload_bits( $filename, null, lxr_service_icon_glyph( $glyph ) );
	if ( ! empty( $upload['error'] ) ) {
		WP_CLI::warning( "Could not write icon for {$title}: {$upload['error']}" );
		return 0;
	}

	$id = wp_insert_attachment( array(
		'post_mime_type' => 'image/svg+xml',
		'post_title'     => "{$title} icon",
		'post_status'    => 'inherit',
	), $upload['file'] );

	if ( is_wp_error( $id ) ) {
		WP_CLI::warning( "Could not attach icon for {$title}: " . $id->get_error_message() );
		return 0;
	}

	update_post_meta( $id, '_wp_attachment_image_alt', "{$title} icon" );
	update_option( $cache_key, $id );
	return (int) $id;
}

function lxr_picsum( string $seed, int $w = 1200, int $h = 900 ): string {
	return "https://picsum.photos/seed/" . rawurlencode( $seed ) . "/{$w}/{$h}";
}
function lxr_avatar( string $seed, int $size = 400 ): string {
	return "https://i.pravatar.cc/{$size}?u=" . rawurlencode( $seed );
}

/** Insert-or-update a post by a stable `_lxr_seed_key` meta value (idempotent). */
function lxr_upsert( string $post_type, string $seed_key, array $postarr ): int {
	$existing = get_posts( array(
		'post_type'      => $post_type,
		'post_status'    => 'any',
		'meta_key'       => '_lxr_seed_key',
		'meta_value'     => $seed_key,
		'posts_per_page' => 1,
		'fields'         => 'ids',
	) );
	$postarr['post_type']   = $post_type;
	$postarr['post_status'] = $postarr['post_status'] ?? 'publish';

	if ( $existing ) {
		$postarr['ID'] = $existing[0];
		wp_update_post( $postarr );
		return (int) $existing[0];
	}
	$id = wp_insert_post( $postarr );
	update_post_meta( $id, '_lxr_seed_key', $seed_key );
	return (int) $id;
}

function lxr_set_fields( int $post_id, array $fields ) {
	foreach ( $fields as $key => $value ) {
		update_field( $key, $value, $post_id );
	}
}

class LXR_Seed_Command {

	/**
	 * Seed (or refresh) all LX Realty example content.
	 *
	 * ## OPTIONS
	 * [--fresh]
	 * : Delete every lxr_* post and the primary/footer menus before seeding.
	 */
	public function seed( $args, $assoc_args ) {
		if ( ! function_exists( 'update_field' ) ) {
			WP_CLI::error( 'ACF Pro must be active before seeding.' );
		}

		if ( ! empty( $assoc_args['fresh'] ) ) {
			$this->wipe();
		}

		WP_CLI::log( 'Seeding site settings…' );
		$this->settings();

		WP_CLI::log( 'Seeding navigation menus…' );
		$this->menus();

		WP_CLI::log( 'Seeding leaders…' );
		$leader_ids = $this->leaders();

		WP_CLI::log( 'Seeding values…' );
		$this->values();

		WP_CLI::log( 'Seeding services…' );
		$this->services();

		WP_CLI::log( 'Seeding properties…' );
		$this->properties();

		WP_CLI::log( 'Seeding jobs…' );
		$this->jobs();

		WP_CLI::log( 'Seeding testimonials…' );
		$this->testimonials();

		WP_CLI::log( 'Seeding insights…' );
		$this->insights( $leader_ids );

		WP_CLI::log( 'Seeding resources…' );
		$this->resources();

		WP_CLI::log( 'Seeding offices…' );
		$this->offices();

		WP_CLI::log( 'Seeding partners…' );
		$this->partners();

		WP_CLI::log( 'Seeding awards…' );
		$this->awards();

		WP_CLI::log( 'Seeding site pages…' );
		$this->pages();

		WP_CLI::success( 'LX Realty example content is ready.' );
	}

	private function wipe() {
		$types = array( 'lxr_property', 'lxr_leader', 'lxr_job', 'lxr_testimonial', 'lxr_insight', 'lxr_resource', 'lxr_service', 'lxr_office', 'lxr_partner', 'lxr_award', 'lxr_value', 'lxr_sitepage' );
		foreach ( $types as $type ) {
			$ids = get_posts( array( 'post_type' => $type, 'post_status' => 'any', 'numberposts' => -1, 'fields' => 'ids' ) );
			foreach ( $ids as $id ) {
				wp_delete_post( $id, true );
			}
		}
		foreach ( array( 'Primary Navigation', 'Footer Navigation' ) as $name ) {
			$menu = wp_get_nav_menu_object( $name );
			if ( $menu ) {
				wp_delete_nav_menu( $menu->term_id );
			}
		}
		WP_CLI::log( 'Wiped existing lxr_* content and menus.' );
	}

	/* ---------------- Settings ---------------- */

	private function settings() {
		$logo = lxr_seed_image( lxr_picsum( 'lx-logo', 400, 160 ), 'LX Realty' );
		$fields = array(
			'field_lxr_settings_companyName' => 'LX Realty',
			'field_lxr_settings_phone'       => '+91 99999 99999',
			'field_lxr_settings_email'       => 'info@lxrealty.in',
			'field_lxr_settings_whatsapp'    => '+91 99999 99999',
			'field_lxr_settings_website'     => 'www.lxrealty.in',
			'field_lxr_settings_address'     => 'DLF Corporate Greens, Sector 74A, Gurugram, Haryana 122004, India',
			'field_lxr_settings_officeHours' => 'Mon – Sat: 9:30 AM – 7:30 PM · Sunday: Closed',
			'field_lxr_settings_footerBlurb' => 'LX Realty is a premier real estate consultancy and advisory firm offering end-to-end solutions across Residential, Commercial and Investment segments.',
			'field_lxr_settings_linkedin'    => 'https://www.linkedin.com/company/lxrealty',
			'field_lxr_settings_instagram'   => 'https://www.instagram.com/lxrealty',
			'field_lxr_settings_facebook'    => 'https://www.facebook.com/lxrealty',
			'field_lxr_settings_youtube'     => 'https://www.youtube.com/@lxrealty',
			'field_lxr_settings_stats'       => array(
				array( 'icon' => 'Award', 'value' => '10+', 'label' => 'Years of Excellence' ),
				array( 'icon' => 'Users', 'value' => '5000+', 'label' => 'Happy Clients' ),
				array( 'icon' => 'Building2', 'value' => '25+', 'label' => 'Cities Pan India' ),
				array( 'icon' => 'Handshake', 'value' => '15Mn+', 'label' => 'Sq. Ft. Advisory' ),
				array( 'icon' => 'BarChart3', 'value' => '₹ 2000Cr+', 'label' => 'Sales Facilitated' ),
			),
		);
		if ( $logo ) {
			$fields['field_lxr_settings_logo'] = $logo;
		}
		foreach ( $fields as $key => $value ) {
			update_field( $key, $value, 'option' );
		}
	}

	/* ---------------- Menus ---------------- */

	private function menu_item( int $menu_id, string $label, string $url, int $parent = 0, string $description = '' ): int {
		$id = wp_update_nav_menu_item( $menu_id, 0, array(
			'menu-item-title'       => $label,
			'menu-item-url'         => $url,
			'menu-item-status'      => 'publish',
			'menu-item-type'        => 'custom',
			'menu-item-parent-id'   => $parent,
			'menu-item-description' => $description,
		) );
		return (int) $id;
	}

	private function menus() {
		$home = home_url( '/' );

		$primary = wp_get_nav_menu_object( 'Primary Navigation' ) ?: get_term( wp_create_nav_menu( 'Primary Navigation' ) );
		wp_set_nav_menu_locations( array_merge( get_nav_menu_locations(), array( 'primary' => $primary->term_id ) ) );
		foreach ( (array) wp_get_nav_menu_items( $primary->term_id ) as $item ) {
			wp_delete_post( $item->ID, true );
		}
		$this->menu_item( $primary->term_id, 'Home', $home );
		$this->menu_item( $primary->term_id, 'About Us', $home . 'about' );
		$this->menu_item( $primary->term_id, 'Services', $home . 'services' );
		$projects = $this->menu_item( $primary->term_id, 'Projects', $home . 'projects/residential' );
		$this->menu_item( $primary->term_id, 'Residential Projects', $home . 'projects/residential', $projects, 'Homes across 58 cities' );
		$this->menu_item( $primary->term_id, 'Commercial Projects', $home . 'projects/commercial', $projects, 'Grade-A offices & retail' );
		$advisory = $this->menu_item( $primary->term_id, 'Advisory', $home . 'advisory' );
		$this->menu_item( $primary->term_id, 'Advisory Services', $home . 'advisory', $advisory, 'Investment, research & transactions' );
		$this->menu_item( $primary->term_id, 'Post-Handover Services', $home . 'advisory/post-handover-services', $advisory, 'Loans, interiors, leasing & management' );
		$this->menu_item( $primary->term_id, 'Insights', $home . 'insights' );
		$this->menu_item( $primary->term_id, 'Careers', $home . 'careers' );
		$this->menu_item( $primary->term_id, 'Contact', $home . 'contact' );

		$footer = wp_get_nav_menu_object( 'Footer Navigation' ) ?: get_term( wp_create_nav_menu( 'Footer Navigation' ) );
		wp_set_nav_menu_locations( array_merge( get_nav_menu_locations(), array( 'footer' => $footer->term_id ) ) );
		foreach ( (array) wp_get_nav_menu_items( $footer->term_id ) as $item ) {
			wp_delete_post( $item->ID, true );
		}
		$columns = array(
			'Company'  => array(
				'About Us' => 'about', 'Our Leadership' => 'about#leadership', 'Careers' => 'careers',
				'Media & Press' => 'insights', 'Awards & Recognition' => 'about#awards', 'Contact Us' => 'contact',
			),
			'Services' => array(
				'Residential Advisory' => 'services', 'Commercial Advisory' => 'services', 'Investment Advisory' => 'services',
				'Project Marketing' => 'services', 'Research & Valuation' => 'services', 'Transaction Management' => 'services',
			),
			'Projects' => array(
				'Residential Projects' => 'projects/residential', 'Commercial Projects' => 'projects/commercial',
				'New Launches' => 'projects/residential', 'Luxury Projects' => 'projects/residential',
				'Ready to Move' => 'projects/residential', 'All Projects' => 'projects/residential',
			),
			'Insights' => array(
				'Market Insights' => 'insights', 'Blog' => 'insights', 'Reports' => 'insights#resources', 'News & Updates' => 'insights',
			),
		);
		foreach ( $columns as $title => $links ) {
			$col = $this->menu_item( $footer->term_id, $title, '#' );
			foreach ( $links as $label => $path ) {
				$this->menu_item( $footer->term_id, $label, $home . $path, $col );
			}
		}
	}

	/* ---------------- Leaders ---------------- */

	private function leaders(): array {
		$data = array(
			array( 'aakash', 'Aakash Sharma', 'Founder & CEO', "Aakash founded LX Realty with a conviction that real estate advice should be data-led, transparent and genuinely client-first." ),
			array( 'abhishek', 'Abhishek Sharma', 'Director – Sales', "Abhishek leads LX Realty's sales organisation across 25+ cities." ),
			array( 'anirudh', 'Anirudh Choukar', 'Director – Strategy', 'Anirudh heads research, valuation and strategy.' ),
			array( 'faisal', 'Mohd. Faisal', 'Director – Partnerships', "Faisal manages LX Realty's developer and institutional partnerships." ),
		);
		$ids = array();
		foreach ( $data as $i => [ $seed, $name, $role, $bio ] ) {
			$id = lxr_upsert( 'lxr_leader', "leader-{$seed}", array( 'post_title' => $name, 'menu_order' => $i ) );
			$photo = lxr_seed_image( lxr_avatar( "leader-{$seed}" ), $name );
			set_post_thumbnail( $id, $photo );
			lxr_set_fields( $id, array(
				'field_lxr_leader_role'         => $role,
				'field_lxr_leader_bio'          => $bio,
				'field_lxr_leader_displayOrder' => $i + 1,
				'field_lxr_leader_photo'        => $photo,
			) );
			$ids[ $seed ] = $id;
		}
		return $ids;
	}

	/* ---------------- Values ---------------- */

	private function values() {
		$data = array(
			array( 'ShieldCheck', 'Integrity', "We do what's right, always." ),
			array( 'Gem', 'Excellence', 'We strive for the highest standards.' ),
			array( 'Users', 'Transparency', 'Clear communication at every step.' ),
			array( 'UserCheck', 'Client First', 'Your success is our priority.' ),
			array( 'Lightbulb', 'Innovation', 'Forward-thinking solutions.' ),
		);
		foreach ( $data as $i => [ $icon, $title, $desc ] ) {
			$id = lxr_upsert( 'lxr_value', 'value-' . sanitize_title( $title ), array( 'post_title' => $title, 'menu_order' => $i ) );
			lxr_set_fields( $id, array(
				'field_lxr_value_icon'         => $icon,
				'field_lxr_value_description'  => $desc,
				'field_lxr_value_displayOrder' => $i + 1,
			) );
		}
	}

	/* ---------------- Services ---------------- */

	private function services() {
		$main = array(
			array( 'residential-advisory', 'Residential Advisory', 'home', 'Helping homebuyers find the right homes and investors build high-performing portfolios.' ),
			array( 'commercial-advisory', 'Commercial Advisory', 'building', 'Advising businesses and investors on office spaces, retail, and industrial investments.' ),
			array( 'investment-advisory', 'Investment Advisory', 'trending-up', 'Identifying high-potential investment opportunities and delivering maximum returns.' ),
			array( 'project-marketing', 'Project Marketing', 'megaphone', 'Strategic marketing solutions for developers to drive faster sales and brand positioning.' ),
			array( 'research-valuation', 'Research & Valuation', 'chart', 'Market research and accurate property valuation for informed decision making.' ),
			array( 'transaction-management', 'Transaction Management', 'handshake', 'End-to-end transaction support ensuring a smooth and successful closure.' ),
		);
		foreach ( $main as $i => [ $slug, $title, $glyph, $excerpt ] ) {
			$id = lxr_upsert( 'lxr_service', "service-{$slug}", array( 'post_title' => $title, 'post_name' => $slug, 'menu_order' => $i ) );
			$image = lxr_seed_image( lxr_picsum( "service-{$slug}", 900, 560 ), $title );
			$icon  = lxr_seed_svg_icon( $glyph, $title );
			set_post_thumbnail( $id, $image );
			lxr_set_fields( $id, array(
				'field_lxr_service_excerpt'      => $excerpt,
				'field_lxr_service_icon'         => $icon,
				'field_lxr_service_list'         => 'main',
				'field_lxr_service_displayOrder' => $i + 1,
				'field_lxr_service_image'        => $image,
			) );
		}

		$advisory = array(
			array( 'investment-advisory-adv', 'Investment Advisory', 'trending-up', 'Identify high-potential investment opportunities across asset classes and locations.' ),
			array( 'market-research-intelligence', 'Market Research & Intelligence', 'chart', 'In-depth market analysis, data insights, and trend forecasting to support smarter decisions.' ),
			array( 'project-feasibility-due-diligence', 'Project Feasibility & Due Diligence', 'search', 'Comprehensive feasibility studies and due diligence to evaluate viability and mitigate risk.' ),
			array( 'transaction-advisory', 'Transaction Advisory', 'handshake', 'End-to-end support across buying, selling, leasing, and joint ventures.' ),
			array( 'portfolio-advisory', 'Portfolio Advisory', 'pie', 'Optimize your real estate portfolio for performance, diversification, and long-term growth.' ),
			array( 'land-advisory', 'Land Advisory', 'pin', 'Strategic land evaluation, acquisition advisory, and highest & best use analysis.' ),
		);
		foreach ( $advisory as $i => [ $slug, $title, $glyph, $excerpt ] ) {
			$id   = lxr_upsert( 'lxr_service', "service-{$slug}", array( 'post_title' => $title, 'menu_order' => 100 + $i ) );
			$icon = lxr_seed_svg_icon( $glyph, $title );
			lxr_set_fields( $id, array(
				'field_lxr_service_excerpt'      => $excerpt,
				'field_lxr_service_icon'         => $icon,
				'field_lxr_service_list'         => 'advisory',
				'field_lxr_service_displayOrder' => $i + 1,
			) );
		}
	}

	/* ---------------- Properties ---------------- */

	private function properties() {
		$rows = array(
			array( 'dlf-privana-west', 'DLF Privana West', 'residential', 'New Launch', 'Sector 76', 'Gurugram', '₹ 6.5 Cr* Onwards', array( '4 BHK', 'Luxury Living' ), '4 BHK + Utility', 'DLF Limited', 1 ),
			array( 'm3m-crown', 'M3M Crown', 'residential', 'Premium', 'Sector 111', 'Gurugram', '₹ 4.2 Cr* Onwards', array( '3 & 4 BHK', 'World-Class Amenities' ), '3 & 4 BHK', 'M3M India', 2 ),
			array( 'godrej-miraya', 'Godrej Miraya', 'residential', 'Luxury', 'Sector 43', 'Gurugram', '₹ 3.8 Cr* Onwards', array( '3 & 4 BHK', 'Green Living' ), '3 & 4 BHK', 'Godrej Properties', 3 ),
			array( 'signature-global-daxin-vistas', 'Signature Global Daxin Vistas', 'residential', 'Iconic', 'Sohna Expressway', 'Gurugram', '₹ 2.6 Cr* Onwards', array( '2, 3 & 4 BHK', 'Smart Homes' ), '2, 3 & 4 BHK', 'Signature Global', 4 ),
			array( 'whiteland-blissville', 'Whiteland Blissville', 'residential', 'Exclusive', 'Sector 76', 'Gurugram', '₹ 2.3 Cr* Onwards', array( '2 & 3 BHK', 'Modern Lifestyle' ), '2 & 3 BHK', 'Whiteland Corporation', 5 ),
			array( 'birla-arika', 'Birla Arika', 'residential', 'Hot Deal', 'Sector 31', 'Gurugram', '₹ 5.1 Cr* Onwards', array( '3 & 4 BHK', 'Ultra Luxury' ), '3 & 4 BHK', 'Birla Estates', 6 ),
			array( 'signature-global-business-hub', 'Signature Global Business Hub', 'commercial', 'Premium', 'Sector 81', 'Gurugram', '₹ 2.8 Cr* Onwards', array( 'Retail & Office', 'Grade A' ), '', 'Signature Global', 1 ),
			array( 'm3m-urbana-business-park', 'M3M Urbana Business Park', 'commercial', 'Iconic', 'Sector 67', 'Gurugram', '₹ 1.9 Cr* Onwards', array( 'Office Spaces', 'LEED Gold' ), '', 'M3M India', 2 ),
			array( 'godrej-riverine', 'Godrej Riverine', 'commercial', 'Pre-Launch', 'Sector 44', 'Noida', '₹ 2.5 Cr* Onwards', array( 'Mixed Use', 'IGBC Certified' ), '', 'Godrej Properties', 3 ),
			array( 'dlf-downtown', 'DLF Downtown', 'commercial', 'Luxury', 'Sector 25A', 'Gurugram', '₹ 3.6 Cr* Onwards', array( 'Premium Offices', 'Grade A+' ), '', 'DLF Limited', 4 ),
			array( 'whiteland-the-aspen-hub', 'Whiteland The Aspen Hub', 'commercial', 'Exclusive', 'Sector 25A', 'Gurugram', '₹ 2.6 Cr* Onwards', array( 'Retail & Office', 'Smart Building' ), '', 'Whiteland Corporation', 5 ),
		);

		foreach ( $rows as [ $slug, $title, $segment, $badge, $locality, $city, $price, $tags, $config, $developer, $order ] ) {
			$id = lxr_upsert( 'lxr_property', "property-{$slug}", array( 'post_title' => $title, 'post_name' => $slug ) );
			$image   = lxr_seed_image( lxr_picsum( "prop-{$slug}", 1200, 900 ), $title );
			$gallery = array();
			foreach ( array( '1', '2', '3', '4' ) as $n ) {
				$gid = lxr_seed_image( lxr_picsum( "prop-{$slug}-{$n}", 1600, 1000 ), "{$title} {$n}" );
				if ( $gid ) {
					$gallery[] = $gid;
				}
			}
			set_post_thumbnail( $id, $image );

			$is_res = 'residential' === $segment;
			lxr_set_fields( $id, array(
				'field_lxr_property_segment'       => $segment,
				'field_lxr_property_badge'         => $badge,
				'field_lxr_property_locality'      => $locality,
				'field_lxr_property_city'          => $city,
				'field_lxr_property_priceLabel'    => $price,
				'field_lxr_property_configuration' => $config,
				'field_lxr_property_developer'     => $developer,
				'field_lxr_property_status'        => $badge,
				'field_lxr_property_reraId'        => 'RERA-GGM-' . wp_rand( 1000, 9999 ) . '-2024',
				'field_lxr_property_featured'      => true,
				'field_lxr_property_displayOrder'  => $order,
				'field_lxr_property_description'   => "{$title} at {$locality}, {$city} — a landmark {$segment} address by {$developer}.",
				'field_lxr_property_overview'      => "<p>{$title} at {$locality}, {$city} is developed by {$developer}, curated to protect and grow long-term value for owners and investors.</p>",
				'field_lxr_property_image'         => $image,
				'field_lxr_property_gallery'       => $gallery,
				'field_lxr_property_tags'          => array_map( fn( $t ) => array( 'label' => $t ), $tags ),
				'field_lxr_property_amenities'     => array_map( fn( $t ) => array( 'item' => $t ), $is_res
					? array( 'Grand double-height lobby', 'Infinity-edge swimming pool', 'Fully-equipped fitness studio', 'Landscaped central greens', "Kids' play zone & crèche", '24×7 security with CCTV' )
					: array( 'Triple-height entrance lobby', 'High-speed elevators', '100% power back-up', 'Multi-level basement parking', 'EV charging infrastructure', '24×7 manned security' )
				),
				'field_lxr_property_specifications' => array(
					array( 'label' => 'Configuration', 'value' => $config ?: implode( ' · ', $tags ) ),
					array( 'label' => 'Possession', 'value' => 'Q4 2028' ),
					array( 'label' => 'RERA', 'value' => 'See RERA field above' ),
				),
				'field_lxr_property_connectivity' => array(
					array( 'label' => 'Airport', 'value' => '35 – 45 min drive' ),
					array( 'label' => 'Metro / Rapid Metro', 'value' => '8 – 12 min drive' ),
					array( 'label' => 'Business district', 'value' => 'Within 6 km' ),
				),
				'field_lxr_property_brochureUrl' => '',
			) );
		}
	}

	/* ---------------- Jobs ---------------- */

	private function jobs() {
		$rows = array(
			array( 'senior-sales-manager', 'Senior Sales Manager', 'Sales & Business Development', 'Gurugram', '5–8 Years' ),
			array( 'investment-advisory-associate', 'Investment Advisory Associate', 'Advisory', 'Gurugram / Noida', '2–4 Years' ),
			array( 'marketing-manager', 'Marketing Manager', 'Marketing', 'Gurugram', '4–6 Years' ),
			array( 'portfolio-management-executive', 'Portfolio Management Executive', 'Advisory', 'Noida', '2–3 Years' ),
			array( 'hr-business-partner', 'HR Business Partner', 'Human Resources', 'Gurugram', '4–6 Years' ),
		);
		foreach ( $rows as $i => [ $slug, $title, $dept, $loc, $exp ] ) {
			$id = lxr_upsert( 'lxr_job', "job-{$slug}", array(
				'post_title' => $title,
				'post_name'  => $slug,
				'menu_order' => $i,
			) );
			lxr_set_fields( $id, array(
				'field_lxr_job_department'     => $dept,
				'field_lxr_job_location'       => $loc,
				'field_lxr_job_experience'     => $exp,
				'field_lxr_job_type'           => 'Full-time',
				'field_lxr_job_summary'        => "Own outcomes for {$dept} as part of LX Realty's {$loc} team.",
				'field_lxr_job_applyUrl'       => 'mailto:careers@lxrealty.in?subject=' . rawurlencode( $title ),
				'field_lxr_job_responsibilities' => array_map( fn( $t ) => array( 'item' => $t ), array(
					'Deliver against quarterly targets and KPIs for your function.',
					'Work cross-functionally with advisory, marketing and operations teams.',
					"Represent LX Realty's values of integrity and transparency with every client.",
				) ),
				'field_lxr_job_requirements' => array_map( fn( $t ) => array( 'item' => $t ), array(
					"{$exp} of relevant experience, ideally in real estate or professional services.",
					'Strong communication and stakeholder-management skills.',
					'A collaborative, ownership-driven mindset.',
				) ),
			) );
		}
	}

	/* ---------------- Testimonials ---------------- */

	private function testimonials() {
		$rows = array(
			array( 'home-rahul', 'home', "LX Realty's team understood our requirements perfectly and guided us to the right investment.", 'Rahul Mehta', 'Investor, Gurugram' ),
			array( 'about-rohit', 'about', "LX Realty's market understanding and professionalism helped us find the perfect investment.", 'Rohit Mehta', 'Investor, Gurugram' ),
			array( 'about-neha', 'about', 'The team is highly responsive and transparent. They deliver what they commit.', 'Neha Arora', 'Homebuyer, Noida' ),
			array( 'about-karan', 'about', 'Excellent advisory on our commercial investment. Their insights made all the difference.', 'Karan Malhotra', 'Business Owner, Delhi NCR' ),
			array( 'careers-priya', 'careers', 'LX Realty has given me the platform to learn, grow, and contribute to impactful projects.', 'Priya Sharma', 'Senior Investment Advisor' ),
			array( 'careers-rohit', 'careers', 'The culture here is collaborative, supportive and performance-driven.', 'Rohit Mehta', 'Sales Manager' ),
			array( 'careers-anjali', 'careers', "I love the trust and flexibility that LX Realty offers.", 'Anjali Verma', 'Marketing Specialist' ),
			array( 'residential-neha', 'residential', 'LX Realty helped us find our dream home in the perfect location.', 'Neha Arora', 'Homebuyer, Noida' ),
			array( 'commercial-rahul', 'commercial', "LX Realty's market knowledge helped us find the perfect commercial space for our business.", 'Rahul Mehta', 'Business Owner, Gurugram' ),
		);
		foreach ( $rows as $i => [ $slug, $group, $quote, $name, $role ] ) {
			$id = lxr_upsert( 'lxr_testimonial', "testimonial-{$slug}", array( 'post_title' => $name, 'menu_order' => $i ) );
			$photo = lxr_seed_image( lxr_avatar( "t-{$slug}", 160 ), $name );
			lxr_set_fields( $id, array(
				'field_lxr_testimonial_quote'        => $quote,
				'field_lxr_testimonial_personName'   => $name,
				'field_lxr_testimonial_personRole'   => $role,
				'field_lxr_testimonial_rating'       => 5,
				'field_lxr_testimonial_group'        => $group,
				'field_lxr_testimonial_displayOrder' => $i + 1,
				'field_lxr_testimonial_photo'        => $photo,
			) );
		}
	}

	/* ---------------- Insights ---------------- */

	private function insights( array $leader_ids ) {
		$body = '<p>India&rsquo;s real estate market is entering a decisive phase, with demand broadening beyond the traditional metros and developer balance sheets healthier than in years.</p><h2>Where the opportunity is</h2><p>The strongest risk-adjusted returns are in infrastructure-led micro-markets — corridors where a new expressway, metro line or employment hub is under construction but not yet operational.</p>';

		$articles = array(
			array( 'top-real-estate-investment-hotspots-india-2024', 'Top Real Estate Investment Hotspots in India – 2024', 'Market Trend', '2024-05-20', 'Key cities and micro-markets poised for high growth and strong returns.' ),
			array( 'commercial-real-estate-outlook-2024-and-beyond', 'Commercial Real Estate Outlook 2024 & Beyond', 'Market Outlook', '2024-05-12', 'An outlook on demand, supply, and future growth across key commercial sectors.' ),
			array( 'luxury-living-evolving-trends-in-india', 'Luxury Living: Evolving Trends in India', 'Residential Insights', '2024-05-05', "How luxury homebuyers' preferences are shaping new developments." ),
			array( 'economic-indicators-impacting-real-estate', 'Economic Indicators Impacting Real Estate', 'Economy Watch', '2024-04-28', 'Key economic factors influencing real estate decisions in 2024.' ),
			array( 'gurugram-real-estate-market-update-2024', 'Gurugram Real Estate Market Update 2024', 'Market Trend', '2024-05-27', "Pricing, absorption and new-launch trends across Gurugram's residential corridors." ),
		);
		foreach ( $articles as $i => [ $slug, $title, $cat, $date, $excerpt ] ) {
			$id = lxr_upsert( 'lxr_insight', "insight-{$slug}", array(
				'post_title' => $title, 'post_name' => $slug, 'post_date' => $date . ' 09:00:00',
			) );
			$image = lxr_seed_image( lxr_picsum( "insight-{$slug}", 1200, 800 ), $title );
			set_post_thumbnail( $id, $image );
			lxr_set_fields( $id, array(
				'field_lxr_insight_category'    => $cat,
				'field_lxr_insight_excerpt'     => $excerpt,
				'field_lxr_insight_kind'        => 'article',
				'field_lxr_insight_body'        => $body,
				'field_lxr_insight_readingTime' => '6 min read',
				'field_lxr_insight_author'      => 'LX Realty Research',
				'field_lxr_insight_authorRole'  => 'Market Intelligence Team',
				'field_lxr_insight_topics'      => array( array( 'label' => $cat ) ),
				'field_lxr_insight_image'       => $image,
			) );
		}

		$perspectives = array(
			array( 'perspective-aakash-sharma', 'aakash', 'Real estate is about long-term value, not just space', "Real estate in India is not just about spaces, it's about creating long-term value for communities and investors alike.", '2024-05-18' ),
			array( 'perspective-anirudh-choukar', 'anirudh', 'Data and research are the core of every real estate decision', "Data and research are at the core of every successful real estate decision.", '2024-05-11' ),
			array( 'perspective-mohd-faisal', 'faisal', 'Transparency, trust and technology will define the next era', 'Transparency, trust, and technology will define the next era of real estate in India.', '2024-05-04' ),
		);
		foreach ( $perspectives as [ $slug, $leaderSeed, $title, $excerpt, $date ] ) {
			$id = lxr_upsert( 'lxr_insight', "insight-{$slug}", array(
				'post_title' => $title, 'post_name' => $slug, 'post_date' => $date . ' 09:00:00',
			) );
			$photo = lxr_seed_image( lxr_avatar( "leader-{$leaderSeed}" ), $title );
			set_post_thumbnail( $id, $photo );
			lxr_set_fields( $id, array(
				'field_lxr_insight_category'    => 'Leadership Perspective',
				'field_lxr_insight_excerpt'     => $excerpt,
				'field_lxr_insight_kind'        => 'perspective',
				'field_lxr_insight_body'        => $body,
				'field_lxr_insight_author'      => get_the_title( $leader_ids[ $leaderSeed ] ?? 0 ),
				'field_lxr_insight_authorRole'  => get_field( 'field_lxr_leader_role', $leader_ids[ $leaderSeed ] ?? 0 ),
				'field_lxr_insight_image'       => $photo,
				'field_lxr_insight_authorPhoto' => $photo,
			) );
		}
	}

	/* ---------------- Resources ---------------- */

	private function resources() {
		$rows = array(
			array( 'india-real-estate-market-report-2024', 'India Real Estate Market Report 2024', 'Research Report', 'Comprehensive analysis of market performance, trends, and forecasts.', 'PDF 5.2 MB' ),
			array( 'future-of-smart-real-estate', 'The Future of Smart Real Estate', 'Whitepaper', 'How technology and innovation are transforming the real estate landscape.', 'PDF 3.8 MB' ),
			array( 'quarterly-market-update-q1-2024', 'Quarterly Market Update – Q1 2024', 'Market Update', 'Key updates on residential, commercial, and land markets in India.', 'PDF 2.4 MB' ),
			array( 'investors-guide-to-real-estate-in-india', "Investor's Guide to Real Estate in India", 'Guide', 'A practical guide for investors to make informed real estate investment decisions.', 'PDF 4.6 MB' ),
		);
		foreach ( $rows as $i => [ $slug, $title, $type, $desc, $size ] ) {
			$id = lxr_upsert( 'lxr_resource', "resource-{$slug}", array( 'post_title' => $title, 'menu_order' => $i ) );
			$image = lxr_seed_image( lxr_picsum( "resource-{$slug}", 800, 560 ), $title );
			lxr_set_fields( $id, array(
				'field_lxr_resource_type'        => $type,
				'field_lxr_resource_description' => $desc,
				'field_lxr_resource_fileUrl'     => '',
				'field_lxr_resource_fileSize'    => $size,
				'field_lxr_resource_image'       => $image,
			) );
		}
	}

	/* ---------------- Offices ---------------- */

	private function offices() {
		$id = lxr_upsert( 'lxr_office', 'office-corporate', array( 'post_title' => 'Corporate Office', 'menu_order' => 0 ) );
		lxr_set_fields( $id, array(
			'field_lxr_office_kind'          => 'corporate',
			'field_lxr_office_address'       => 'DLF Corporate Greens, Sector 74A, Gurugram, Haryana 122004, India',
			'field_lxr_office_city'          => 'Gurugram',
			'field_lxr_office_phone'         => '+91 99999 99999',
			'field_lxr_office_mapEmbedUrl'   => 'https://www.openstreetmap.org/export/embed.html?bbox=77.015%2C28.377%2C77.039%2C28.393&layer=mapnik&marker=28.3846%2C77.027',
			'field_lxr_office_directionsUrl' => 'https://www.google.com/maps/dir/?api=1&destination=DLF+Corporate+Greens+Sector+74A+Gurugram',
			'field_lxr_office_displayOrder'  => 0,
			'field_lxr_office_features'      => array_map( fn( $t ) => array( 'item' => $t ), array(
				'Prime location with excellent connectivity', 'Spacious, modern workspace', 'Ample parking available', 'Visitor-friendly environment',
			) ),
		) );

		$branches = array(
			array( 'gurugram', 'Gurugram', 'DLF Corporate Greens, Sector 74A, Gurugram, Haryana 122004', 'Gurugram' ),
			array( 'noida', 'Noida', 'Unit 804, 8th Floor, Advant Navis Business Park, Sector 142, Noida, UP 201305', 'Noida' ),
			array( 'delhi', 'Delhi', 'Unit No. 12, 1st Floor, Okhla Industrial Area, Phase III, New Delhi 110020', 'New Delhi' ),
			array( 'mumbai', 'Mumbai', 'Bandra Kurla Complex, Unit No. 215, 2nd Floor, Bandra East, Mumbai 400051', 'Mumbai' ),
			array( 'bengaluru', 'Bengaluru', 'Prestige Atlanta, Unit 505, 5th Floor, Koramangala, Bengaluru, Karnataka 560034', 'Bengaluru' ),
		);
		foreach ( $branches as $i => [ $slug, $name, $address, $city ] ) {
			$bid = lxr_upsert( 'lxr_office', "office-{$slug}", array( 'post_title' => $name, 'menu_order' => $i + 1 ) );
			$image = lxr_seed_image( lxr_picsum( "office-{$slug}", 800, 500 ), "{$name} office" );
			set_post_thumbnail( $bid, $image );
			lxr_set_fields( $bid, array(
				'field_lxr_office_kind'         => 'branch',
				'field_lxr_office_address'      => $address,
				'field_lxr_office_city'         => $city,
				'field_lxr_office_phone'        => '+91 99999 99999',
				'field_lxr_office_displayOrder' => $i + 1,
				'field_lxr_office_image'        => $image,
			) );
		}
	}

	/* ---------------- Partners ---------------- */

	private function partners() {
		$groups = array(
			'developer' => array( 'DLF', 'M3M', 'Godrej Properties', 'Signature Global', 'Whiteland', 'Smartworld', 'Bhutani Infra', 'Elan Group', 'Birla Estates' ),
			'bank'      => array( 'HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra Bank', 'IDFC First Bank', 'Bajaj Housing Finance', 'PNB Housing' ),
			'interior'  => array( 'Godrej Interio', 'Livspace', 'HomeLane', 'Asian Paints' ),
		);
		foreach ( $groups as $group => $names ) {
			foreach ( $names as $i => $name ) {
				$id = lxr_upsert( 'lxr_partner', "partner-{$group}-" . sanitize_title( $name ), array( 'post_title' => $name, 'menu_order' => $i ) );
				$logo = lxr_seed_image( lxr_picsum( "logo-{$group}-{$name}", 240, 96 ), "{$name} logo" );
				lxr_set_fields( $id, array(
					'field_lxr_partner_group'        => $group,
					'field_lxr_partner_displayOrder' => $i,
					'field_lxr_partner_logo'         => $logo,
				) );
			}
		}
	}

	/* ---------------- Awards ---------------- */

	private function awards() {
		$rows = array(
			array( 'Best Real Estate Consultancy', '2023' ),
			array( 'Excellence in Advisory Services', '2022' ),
			array( 'Fastest Growing Real Estate Firm', '2021' ),
		);
		foreach ( $rows as $i => [ $title, $year ] ) {
			$id = lxr_upsert( 'lxr_award', 'award-' . $year, array( 'post_title' => $title, 'menu_order' => $i ) );
			$image = lxr_seed_image( lxr_picsum( "award-{$year}", 240, 240 ), $title );
			lxr_set_fields( $id, array(
				'field_lxr_award_year'         => $year,
				'field_lxr_award_displayOrder' => $i + 1,
				'field_lxr_award_image'        => $image,
			) );
		}
	}

	/* ---------------- Site Pages ---------------- */

	private function pages() {
		$defs = include LXR_CMS_DIR . 'includes/seed-pages.php';
		foreach ( $defs as $key => $def ) {
			$id = lxr_upsert( 'lxr_sitepage', "page-{$key}", array( 'post_title' => $def['title'], 'post_name' => $key ) );
			$hero_image = lxr_seed_image( lxr_picsum( "hero-{$key}", 1920, 1200 ), $def['title'] );
			set_post_thumbnail( $id, $hero_image );

			$fields = array(
				'field_lxr_page_key'                   => $key,
				'field_lxr_page_heroEyebrow'            => $def['hero']['eyebrow'] ?? '',
				'field_lxr_page_heroTitle'              => $def['hero']['title'],
				'field_lxr_page_heroTitleAccent'        => $def['hero']['titleAccent'] ?? '',
				'field_lxr_page_heroDescription'        => $def['hero']['description'] ?? '',
				'field_lxr_page_heroImage'              => $hero_image,
				'field_lxr_page_heroStatsPanelTitle'    => $def['hero']['statsPanelTitle'] ?? '',
				'field_lxr_page_heroPrimaryCtaLabel'    => $def['hero']['primaryCta']['label'] ?? '',
				'field_lxr_page_heroPrimaryCtaHref'     => $def['hero']['primaryCta']['href'] ?? '',
				'field_lxr_page_heroSecondaryCtaLabel'  => $def['hero']['secondaryCta']['label'] ?? '',
				'field_lxr_page_heroSecondaryCtaHref'   => $def['hero']['secondaryCta']['href'] ?? '',
				'field_lxr_page_heroBreadcrumb'         => array_map( fn( $b ) => array( 'label' => $b ), $def['hero']['breadcrumb'] ?? array() ),
				'field_lxr_page_heroFeatures'           => array_map( fn( $f ) => array(
					'icon' => $f['icon'] ?? '', 'title' => $f['title'], 'description' => $f['description'] ?? '',
				), $def['hero']['features'] ?? array() ),
				'field_lxr_page_heroStats'              => array_map( fn( $s ) => array(
					'icon' => $s['icon'] ?? '', 'value' => $s['value'], 'label' => $s['label'],
				), $def['hero']['stats'] ?? array() ),
				'field_lxr_page_sections'               => array_map( fn( $slug, $s ) => array(
					'slug' => $slug, 'eyebrow' => $s['eyebrow'] ?? '', 'title' => $s['title'] ?? '',
					'titleAccent' => $s['titleAccent'] ?? '', 'description' => $s['description'] ?? '',
				), array_keys( $def['sections'] ?? array() ), array_values( $def['sections'] ?? array() ) ),
			);

			if ( ! empty( $def['cta'] ) ) {
				$cta_image = lxr_seed_image( lxr_picsum( "cta-{$key}", 1600, 500 ), $def['cta']['title'] );
				$fields = array_merge( $fields, array(
					'field_lxr_page_ctaTitle'            => $def['cta']['title'],
					'field_lxr_page_ctaTitleAccent'      => $def['cta']['titleAccent'] ?? '',
					'field_lxr_page_ctaDescription'      => $def['cta']['description'] ?? '',
					'field_lxr_page_ctaPrimaryLabel'     => $def['cta']['primaryCta']['label'] ?? '',
					'field_lxr_page_ctaPrimaryHref'      => $def['cta']['primaryCta']['href'] ?? '',
					'field_lxr_page_ctaSecondaryLabel'   => $def['cta']['secondaryCta']['label'] ?? '',
					'field_lxr_page_ctaSecondaryHref'    => $def['cta']['secondaryCta']['href'] ?? '',
					'field_lxr_page_ctaImage'            => $cta_image,
				) );
			}

			lxr_set_fields( $id, $fields );
		}
	}
}

WP_CLI::add_command( 'lx-realty', 'LXR_Seed_Command' );
