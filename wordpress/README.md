# LX Realty — WordPress backend

This directory turns any WordPress install into the content API for the
Next.js site in the repository root. Nothing here needs to be installed for
the site to run — with `NEXT_PUBLIC_CMS_SOURCE=mock` (the default), the site
runs entirely on realistic sample data in `src/lib/cms/mock/`. Point it at
WordPress once you have a site to point it at.

## What's in here

```
wordpress/
  lx-realty-cms/            The plugin: post types, ACF fields, GraphQL schema, seeder
  lx-realty-headless-theme/ A do-nothing theme (WordPress requires one to be active)
  dist/                     lx-realty-cms.zip + lx-realty-headless-theme.zip — pre-built,
                             ready to upload as-is via wp-admin → Plugins/Themes → Add New → Upload
                             (rebuild anytime with the two Compress-Archive commands in git history /
                             ask Claude to re-zip after any change under lx-realty-cms/ or the theme)
```

## 1. Get a WordPress site

Anything works — a local dev site or a live host. Two easy local options:

- **Local (by WP Engine)** — free GUI app, easiest for Windows: https://localwp.com
- **Docker** — `docker run` a `wordpress` + `mysql` compose stack if you have Docker Desktop.

Or use any managed host (SiteGround, Hostinger, WP Engine, Kinsta, a VPS with
WP-CLI, …). If you're using WordPress.com specifically: you need the
**Business plan or higher** — only those tiers allow installing arbitrary
plugins (ACF Pro, WPGraphQL, WPGraphQL for ACF, this plugin). Personal and
Premium plans can't run this at all.

## 2. Install required plugins + this plugin

Have the zips in `wordpress/dist/` ready (rebuilt from this repo — no need to
manually zip the folders). In `wp-admin → Plugins → Add New`, install and
**activate**, in this order:

1. **Advanced Custom Fields PRO** — https://www.advancedcustomfields.com/pro/ (paid; the repeater/gallery fields this schema uses require Pro)
2. **WPGraphQL** — https://wordpress.org/plugins/wp-graphql/
3. **WPGraphQL for ACF** — https://wordpress.org/plugins/wpgraphql-acf/ (v2)
4. **WP-CLI** isn't a plugin — it's a command-line tool, already installed on most hosts and in Local. Needed only for the seeder in step 4.

Then install this repo's plugin + theme:

1. `Plugins → Add New → Upload Plugin` → choose `wordpress/dist/lx-realty-cms.zip` → Install → **Activate**.
2. `Appearance → Themes → Add New → Upload Theme` → choose `wordpress/dist/lx-realty-headless-theme.zip` → Install → **Activate**. (Any theme technically works — this one is intentionally blank so nothing conflicts with the plugin's post types. If you have direct file access instead, copying the unzipped folders into `wp-content/plugins/` and `wp-content/themes/` works exactly the same.)

You should now see new admin menu items: **Projects, Leaders, Jobs,
Testimonials, Insights, Resources, Services, Offices, Partners, Awards,
Values, Site Pages**, plus **LX Realty Settings** under Site Pages, and
**Appearance → Menus**.

## 3. Seed example content (your account, real data you can edit)

From the WordPress root (where `wp-config.php` lives), with WP-CLI:

```bash
wp lx-realty seed
```

This creates/updates, idempotently (safe to re-run):

- Site Settings (company info, socials, the global stat bar) + a logo
- **Primary** and **Footer** navigation menus, assigned to their locations
- 4 leaders, 5 open jobs, 9 testimonials, 8 insights (5 articles + 3 leadership
  perspectives), 4 downloadable resources, 12 services (6 main + 6 advisory),
  11 projects (6 residential + 5 commercial) with galleries and full detail
  content, 6 offices, ~25 partner logos, 3 awards, 5 company values, and all
  10 Site Pages (hero + section copy + closing CTA for Home, About, Services,
  Advisory, Post-Handover Services, Residential/Commercial Projects, Insights,
  Careers, Contact)

Every image is sideloaded into the real Media Library from placeholder URLs
(cached by source URL, so re-seeding never duplicates media) — replace them
with your own photography any time from each post's editor.

To wipe and reseed from scratch: `wp lx-realty seed --fresh`.

No WP-CLI access? Recreate the same content by hand using the admin screens —
`includes/seed-pages.php` and `includes/seed.php` document every field's
expected value if you'd rather copy it manually.

## 4. Point Next.js at it

In the Next.js project's `.env.local`:

```bash
NEXT_PUBLIC_CMS_SOURCE=wordpress
WORDPRESS_API_URL=https://your-wp-site.example.com/graphql
WORDPRESS_IMAGE_HOSTNAME=your-wp-site.example.com
```

Restart `npm run dev` (or redeploy). Every page now reads live from
WordPress. If a query fails (a menu isn't assigned yet, a Site Page is
missing, WordPress is temporarily unreachable), the affected section falls
back to the built-in mock content instead of breaking the page — check the
server log for `[cms:wordpress] ... -> mock:` lines while you're setting up.

## 5. Optional: instant updates instead of a 5-minute cache

By default the Next.js site revalidates WordPress content every 5 minutes
(`CMS_REVALIDATE_SECONDS`). To make saves show up immediately:

**Next.js** `.env.local`:
```bash
REVALIDATE_SECRET=<any random string>
```

**WordPress** `wp-config.php` (above the `/* That's all, stop editing! */` line):
```php
define( 'LXR_REVALIDATE_URL', 'https://www.lxrealty.in/api/revalidate' );
define( 'LXR_REVALIDATE_SECRET', '<the same random string>' );

// Optional: send anyone who visits the WordPress domain itself to the real site.
define( 'LXR_PUBLIC_SITE_URL', 'https://www.lxrealty.in' );
```

## Content model reference

Every custom post type is exposed to WPGraphQL with a predictable name and an
ACF field group (`{type}Fields`) — see `includes/acf-fields.php` for the exact
field list per type, and `src/lib/cms/wordpress/fragments.ts` /
`src/lib/cms/wordpress/map.ts` on the Next.js side for how each field is
consumed. `src/lib/cms/types.ts` is the single source of truth for the shape
every page expects, whichever CMS is behind it.

| WordPress (admin label) | GraphQL type | Feeds |
|---|---|---|
| Projects | `Property` | `/projects/residential`, `/projects/commercial`, `/projects/[slug]`, Home |
| Leaders | `Leader` | `/about` |
| Jobs | `Job` | `/careers` |
| Testimonials | `Testimonial` | Home, About, Careers, Projects (grouped by `group`) |
| Insights | `Insight` | `/insights`, `/insights/[slug]`, Home (articles + leadership perspectives, split by `kind`) |
| Resources | `Resource` | `/insights` reports & downloads |
| Services | `Service` | `/services`, `/advisory` (split by `list`: main / advisory) |
| Offices | `Office` | `/contact` (split by `kind`: corporate / branch) |
| Partners | `Partner` | Logo marquees everywhere (grouped by `group`: developer / bank / interior / client) |
| Awards | `Award` | About, Home |
| Values | `Value` | `/about` |
| Site Pages | `SitePage` | Every page's hero + section intros + closing CTA (matched by the `key` field, e.g. `home`, `projects-residential`) |
| LX Realty Settings (options page) | `lxSiteSettings` (root field) | Header/footer contact info, socials, global stat bar |
| Appearance → Menus ("Primary Navigation" / "Footer Navigation") | `menuItems` (WPGraphQL core) | Header nav + footer link columns |

### Service icons (SVG, not a fixed icon set)

The **Services** post type's *Icon* field is a plain image-upload field
restricted to `.svg` files — not a name picked from a bundled icon library.
Upload any square SVG (transparent background works best) and it appears
immediately on `/services` and `/advisory`; nothing in the Next.js code needs
to change. If a service doesn't have an icon yet, the site shows a neutral
placeholder mark instead of a default icon.

SVG uploads are disabled in WordPress by default (an SVG is XML and can carry
a `<script>`). `includes/svg-uploads.php` enables them for editors/admins and
strips the obviously dangerous constructs as a baseline safety net, but for
production, install the free **[Safe SVG](https://wordpress.org/plugins/safe-svg/)**
plugin — it sanitizes with a maintained library, and this plugin automatically
defers to it (skips its own filtering) once Safe SVG is active.

### Editing navigation

Both menus are ordinary WordPress menus — no custom UI to learn.

- **Primary Navigation**: top-level items are the header links. Nest an item
  under a parent to give it a dropdown (e.g. "Residential Projects" and
  "Commercial Projects" nested under "Projects"). Add a **Description** to a
  child item (enable the field via *Screen Options* in the menu editor) to
  show sub-text under it in the dropdown.
- **Footer Navigation**: a top-level item is a column heading (its own link
  is ignored, so point it anywhere, e.g. `#`); nest links under it to
  populate that column. Add, remove, rename or reorder columns freely — the
  site's footer layout adapts automatically to however many columns exist.

### RERA / legal note

Project pricing, specs and images are editorial content you control — LX
Realty (the company) is responsible for keeping RERA IDs, developer names and
pricing accurate and current; nothing here enforces that automatically.
