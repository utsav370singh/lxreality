import "server-only";

const ENDPOINT = process.env.WORDPRESS_API_URL;
const REVALIDATE = Number(process.env.CMS_REVALIDATE_SECONDS ?? 300);

export class WordPressError extends Error {}

/**
 * Minimal typed GraphQL client for WPGraphQL.
 *
 * Responses are cached with Next's data cache and revalidated on an interval
 * (ISR). Pass `tags` to enable on-demand revalidation from a WP webhook later.
 */
export async function wpQuery<T>(
  query: string,
  variables: Record<string, unknown> = {},
  tags: string[] = ["cms"],
): Promise<T> {
  if (!ENDPOINT) {
    throw new WordPressError(
      "WORDPRESS_API_URL is not set. Set it in .env.local or switch NEXT_PUBLIC_CMS_SOURCE=mock.",
    );
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: REVALIDATE, tags },
  });

  if (!res.ok) {
    throw new WordPressError(`WPGraphQL responded ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };

  if (json.errors?.length) {
    throw new WordPressError(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new WordPressError("WPGraphQL returned no data.");
  }
  return json.data;
}
