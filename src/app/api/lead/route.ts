import { NextResponse } from "next/server";

/**
 * Lead capture endpoint for the contact + newsletter forms.
 *
 * Always logs locally, and — when WordPress is configured — saves the lead
 * there too as an `lxr_lead` post (wp-admin → Leads), via
 * wordpress/lx-realty-cms/includes/rest-leads.php. The WordPress write is
 * best-effort: if it fails or isn't configured, the visitor still gets a
 * success response (their submission isn't lost from their point of view —
 * it's in the server log either way) rather than being told to resubmit.
 */

function leadsEndpoint(): string | null {
  const apiUrl = process.env.WORDPRESS_API_URL;
  if (!apiUrl) return null;
  try {
    return new URL("/wp-json/lxr/v1/leads", apiUrl).toString();
  } catch {
    return null;
  }
}

async function saveToWordPress(payload: Record<string, unknown>) {
  const endpoint = leadsEndpoint();
  const secret = process.env.WORDPRESS_LEADS_SECRET;
  if (!endpoint || !secret) return;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-lxr-leads-secret": secret },
      body: JSON.stringify(payload),
      // Never cache a write, and don't let a slow/unreachable WP hang the request.
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("[lead] WordPress save failed:", res.status, await res.text().catch(() => ""));
    }
  } catch (err) {
    console.error("[lead] WordPress unreachable:", (err as Error).message);
  }
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = String(payload.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 422 });
  }

  const record = {
    type: payload.type === "newsletter" ? "newsletter" : "contact",
    name: String(payload.name ?? ""),
    phone: String(payload.phone ?? ""),
    email,
    subject: String(payload.subject ?? ""),
    message: String(payload.message ?? ""),
  };

  console.info("[lead]", { ...record, at: new Date().toISOString() });

  // Fire-and-forget from the visitor's perspective, but keep the function alive
  // long enough on the server for the write to actually complete.
  await saveToWordPress(record);

  return NextResponse.json({ ok: true });
}
