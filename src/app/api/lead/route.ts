import { NextResponse } from "next/server";

/**
 * Lead capture endpoint for the contact + newsletter forms.
 *
 * For now it validates and logs. To deliver leads, forward `payload` to your
 * CRM / email service here (or to a WordPress endpoint, e.g. a Contact Form 7
 * or Gravity Forms REST route), then keep the same JSON response shape.
 */
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

  console.info("[lead]", {
    type: payload.type ?? "contact",
    name: payload.name ?? null,
    email,
    subject: payload.subject ?? null,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
