# LX Realty — WordPress backend

This directory turns any WordPress install into the content API for the
Next.js site in the repository root. Nothing here needs to be installed for
the site to run — with `NEXT_PUBLIC_CMS_SOURCE=mock` (the default), the site
runs entirely on realistic sample data in `src/lib/cms/mock/`. Point it at
WordPress once you have a site to point it at.

**Every plugin this needs is free.** No paid plugin, no paid plugin tier, and
no ACF Pro anywhere in this schema — see [Why not ACF Pro?](#why-not-acf-pro)
if you're curious what that trade-off costs in admin UX (short version:
almost nothing).

> **This machine already has one running.** A fully working local install —
> WordPress + all required plugins + the example content, with zero admin
> rights and zero installer needed — was set up at `D:\wp-local\`. Double-click
> `D:\wp-local\start-server.bat` to start it and see `D:\wp-local\README.md`
> for the admin login, GraphQL URL, and how to manage it. `.env.local` in the
> Next.js project already points at it. The rest of this document is the
> general reference for setting this up on WordPress.com, a paid host, or
> another machine.

## What's in here

```
wordpress/
  lx-realty-cms/            The plugin: post types, ACF fields, GraphQL schema, seeder
  lx-realty-headless-theme/ A do-nothing theme (WordPress requires one to be active)
  dist/                     lx-realty-cms.zip + lx-realty-headless-theme.zip — pre-built,
                             ready to upload as-is (rebuild after any change under
                             lx-realty-cms/ or the theme by asking Claude to re-zip, or:
                               Compress-Archive lx-realty-cms lx-realty-cms.zip -Force
                               Compress-Archive lx-realty-headless-theme lx-realty-headless-theme.zip -Force
```

---

## The two paths — read this first

Getting stuck trying to install a plugin almost always means one specific
thing: **you're on a WordPress.com plan that doesn't allow plugins at all —
not even free ones.** That's a hosting restriction tied to the plan tier, not
to what the plugin costs. WordPress.com's own upsell for this literally says
something like "upgrade to install plugins," which reads a lot like it's
asking you to pay *for the plugin* — it isn't; it's asking you to pay for a
*different hosting plan* that unlocks the Plugins screen at all.

| | Cost | Can install plugins? | Effort |
|---|---|---|---|
| **A. WordPress.com, your current plan** | Free | ❌ No — Personal/Explorer/Starter plans block the Plugins screen entirely | — |
| **B. WordPress.com Business (or Commerce)** | ~$25/mo (billed yearly, roughly) | ✅ Yes | Low — same site, just upgraded |
| **C. Local by WP Engine (on your own PC)** | $0, forever | ✅ Yes, full access | Low — one installer, ~10 minutes |
| **D. A free web host running real WordPress.org software** (InfinityFree, etc.) | $0 | ✅ Yes, usually | Medium — less reliable, occasional ads/limits |
| **E. Any paid host** (Hostinger, SiteGround, a VPS, …) | ~$2–15/mo | ✅ Yes | Low–Medium |

Since you said you can't buy a plan right now: **go with C (Local by WP
Engine)** to get everything built and working today at zero cost, running on
your own computer. It won't be reachable by other people over the internet
yet — but you don't need that yet either. When you're ready to buy hosting
(Option B, E, or a paid host), you export the site from Local and import it
there in a few clicks; nothing you build now is wasted.

If you specifically want to keep using `sportskornercom.wordpress.com`, you
need Option B — there's no free way to install plugins on WordPress.com
itself, full stop, regardless of which plugin.

---

## Step by step: Option C — Local by WP Engine (free, today)

1. **Download & install**: https://localwp.com — pick your OS, run the
   installer. Free, no account required to use it (it'll offer to create one;
   you can skip that).
2. **Create a new site**: open Local → "Create a new site" → give it a name
   (e.g. "LX Realty") → choose the default PHP/MySQL/webserver options →
   **Preferred** environment is fine → set an admin username/password you'll
   remember → Add Site. Local builds a full WordPress install in ~1 minute.
3. **Open it**: click "WP Admin" in Local's site view — this logs you
   straight into `wp-admin` for your new local site (URL looks like
   `http://lx-realty.local/wp-admin`).
4. **Install the three required plugins** — in `wp-admin`, go to
   **Plugins → Add New**, and for each one below: type its name in the search
   box, click **Install Now** on the official result, then click **Activate**.
   1. **Advanced Custom Fields** (by WP Engine — the free one; do *not* pick
      anything with "Pro" in the name)
   2. **WPGraphQL**
   3. **WPGraphQL for ACF**
5. **Install this repo's plugin from the zip**:
   - **Plugins → Add New → Upload Plugin** (button near the top).
   - **Choose File** → pick `wordpress/dist/lx-realty-cms.zip` from this
     repo → **Install Now** → **Activate Plugin**.
6. **Install the theme from its zip**:
   - **Appearance → Themes → Add New → Upload Theme**.
   - **Choose File** → pick `wordpress/dist/lx-realty-headless-theme.zip` →
     **Install Now** → **Activate**.
7. You should now see new items in the left admin menu: **Projects, Leaders,
   Jobs, Testimonials, Insights, Resources, Services, Offices, Partners,
   Awards, Values, Site Pages, Settings**. (Header/footer navigation is *not*
   one of these — it's static in the Next.js app, not edited in WordPress;
   see [Navigation lives in Next.js, not here](#navigation-lives-in-nextjs-not-here).)
8. **Seed the example content** — Local has a built-in terminal with WP-CLI
   ready to go: in Local, click your site → **Utilities** (or the terminal/
   shell icon) → **Open Site Shell** (this opens a terminal already `cd`'d
   into your site and configured to talk to its database), then run:
   ```bash
   wp lx-realty seed
   ```
   That creates all the example properties, leaders, jobs, testimonials,
   insights, services (with real SVG icons), offices, partners, awards,
   values, navigation menus, and site settings — with real photos sideloaded
   into the Media Library. Safe to re-run any time (it updates existing
   entries instead of duplicating them). No terminal available? Skip this —
   you can add content by hand through the admin screens instead, or come
   back to it once Local's shell works.
9. **Find your GraphQL endpoint**: it's `<your site URL>/graphql`, e.g.
   `http://lx-realty.local/graphql` — open it in a browser; you should see
   the GraphiQL IDE (or use **GraphQL → GraphiQL IDE** in the WP admin
   sidebar, added automatically by WPGraphQL).
10. **Point Next.js at it** — in this repo's `.env.local`:
    ```bash
    NEXT_PUBLIC_CMS_SOURCE=wordpress
    WORDPRESS_API_URL=http://lx-realty.local/graphql
    WORDPRESS_IMAGE_HOSTNAME=lx-realty.local
    ```
    Restart `npm run dev`. The site now reads live from your local WordPress.

You're done, at $0. When you later buy hosting, Local has a one-click
"Push to [host]" or "Export" flow to move this exact site — content, media
and all — to wherever you land, and you just repeat step 10 with the new
public URL.

---

## Step by step: Option B / E — any real (non-Local) WordPress site

Same plugin steps as above (4–8), just done on that site's own `wp-admin`
instead of Local's. A few differences to know about:

- **No WP-CLI / no terminal access** (common on budget or free hosts): skip
  `wp lx-realty seed` — add content by hand instead, using the admin screens
  the plugin adds. Each screen's fields are labeled and most carry inline
  instructions (e.g. "one per line" for lists) so this needs no separate docs.
- **Uploading the zips**: identical everywhere — `Plugins/Themes → Add New →
  Upload → choose the .zip → Install → Activate`. If uploads are blocked by a
  file-size limit (rare, `lx-realty-cms.zip` is ~24KB so this basically never
  happens), your host's file manager or FTP can drop the *unzipped* folder
  straight into `wp-content/plugins/lx-realty-cms/` (and the theme into
  `wp-content/themes/lx-realty-headless-theme/`) instead — same result.
- **The GraphQL endpoint** is `https://<your-domain>/graphql`.

---

## Optional: instant updates instead of a 5-minute cache

By default the Next.js site revalidates WordPress content every 5 minutes
(`CMS_REVALIDATE_SECONDS`). To make saves show up immediately instead:

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
On a Local site this needs your local WordPress to be able to reach your
Next.js dev server's URL — usually not worth setting up until you're on real
hosting. The 5-minute cache is fine for local development.

---

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
| Site Pages | `SitePage` | An optional **hero photo/copy override** per page — see below |
| Settings (a single post) | `lxSiteSettings` (root field) | Header/footer contact info, socials, global stat bar |

Header/footer navigation isn't in this table — see [Navigation lives in
Next.js, not here](#navigation-lives-in-nextjs-not-here) below.

### Lists, without a Repeater field

ACF's free tier has no Repeater/Gallery/Flexible-Content/Options-Page fields.
Anywhere the content is naturally a list, the field is instead a single
Textarea the admin fills in following one of three simple, consistent
patterns — every such field's on-screen "instructions" text (shown right
under its label in wp-admin) states which one and gives an example:

- **One item per line** — amenities, service bullets, job responsibilities/
  requirements, office features.
- **One `Label: Value` pair per line** — property specifications, connectivity.
- **Comma-separated, one line** — tags, insight topics.
- **One `Icon | Value | Label` stat per line** — the global stat bar in
  Settings (`Icon` is an optional [lucide.dev](https://lucide.dev) icon name).

A property's photo gallery is similarly four individual "Gallery image"
fields (1–4) rather than one Gallery field — upload up to four, in order;
leave any blank.

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

### Site Pages — hero override only

Headlines, section intros, and closing CTAs for all 10 pages live in
`src/content/site-pages.ts` in the Next.js code, not in WordPress — that
copy changes rarely and, like the rest of `src/content/`, is easier to review
as code than as CMS fields. A **Site Page** post (one per page — `home`,
`about`, `services`, `projects-residential`, `projects-commercial`,
`advisory`, `advisory-post-handover`, `insights`, `careers`, `contact` — the
post's *slug* is what matches it to a page) can optionally override just the
hero **photo**, and optionally the eyebrow/title/title-accent/description
text too. Leave any of those blank and the page keeps its built-in default —
every page works perfectly with zero Site Page posts at all; the seeder
creates one per page purely to demonstrate swapping the hero photo.

### Navigation lives in Next.js, not here

The header menu and footer link columns are defined in
`src/content/navigation.ts` in the Next.js app — not in WordPress, and not
editable from wp-admin. Site structure (which pages exist, how they nest into
dropdowns) is a code-level concern that always has to match the actual routes
under `src/app/`, so it's kept there rather than risking a WordPress edit
pointing at a page that doesn't exist. To change a menu, edit that file
directly and redeploy — the same way you'd add a new page.

### RERA / legal note

Project pricing, specs and images are editorial content you control — LX
Realty (the company) is responsible for keeping RERA IDs, developer names and
pricing accurate and current; nothing here enforces that automatically.

---

## Why not ACF Pro?

ACF Pro's Repeater/Gallery/Options-Page fields would have made a few admin
screens marginally nicer (drag-to-reorder rows instead of "one per line" in a
Textarea), but at a real cost (a paid plugin, and a WordPress.com plan tier
that also costs money) for a difference most editors won't notice day to day.
Everything Pro would have added here is achievable with the free tier at a
small, one-time admin-UX cost — worth it to keep this buildable on a $0
budget. If you later do have ACF Pro (e.g. because you're already paying for
it for other reasons), nothing here breaks — the free-tier field types are a
strict subset, so Pro just quietly goes unused.
