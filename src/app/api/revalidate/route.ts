import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * On-demand ISR revalidation, called by the WordPress plugin
 * (wordpress/lx-realty-cms/includes/rest-revalidate.php) whenever content is
 * saved — so an edit in WP shows up immediately instead of waiting out the
 * page's `revalidate` window.
 *
 * Configure on both sides:
 *   Next.js  .env: REVALIDATE_SECRET=<random string>
 *   WordPress    : define('LXR_REVALIDATE_URL', 'https://your-site.com/api/revalidate');
 *                  define('LXR_REVALIDATE_SECRET', '<the same random string>');
 */
export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid secret." }, { status: 401 });
  }

  let body: { tags?: string[]; tag?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const tags = body.tags ?? (body.tag ? [body.tag] : []);
  if (!tags.length) {
    return NextResponse.json({ ok: false, error: "Provide `tag` or `tags`." }, { status: 422 });
  }

  // Called from outside a Server Action (a WordPress webhook), so per Next's
  // revalidateTag docs we pass `{ expire: 0 }` to expire the data immediately
  // rather than the (Server-Action-only) `updateTag`.
  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  return NextResponse.json({ ok: true, revalidated: tags });
}
