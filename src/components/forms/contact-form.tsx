"use client";

import { useState } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

const SUBJECTS = [
  "General Enquiry",
  "Residential Advisory",
  "Commercial Advisory",
  "Investment Advisory",
  "Project Marketing",
  "Partnerships & Collaborations",
  "Careers",
];

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...data }),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full rounded-lg border border-gold-500/20 bg-navy-900/60 px-4 py-3 text-sm text-white placeholder:text-mist-400 outline-none focus:border-gold-400";

  if (state === "done") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-gold-500/40 bg-gold-500/10 p-6">
        <Check className="size-6 text-gold-300" aria-hidden />
        <p className="text-sm text-gold-100">
          Thank you — your message has reached our team. We&apos;ll respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Full Name*" className={field} />
        <input name="phone" required placeholder="Phone Number*" className={field} />
      </div>
      <input name="email" type="email" required placeholder="Email Address*" className={field} />
      <select name="subject" required defaultValue="" className={field}>
        <option value="" disabled className="bg-navy-900">
          Subject*
        </option>
        {SUBJECTS.map((s) => (
          <option key={s} className="bg-navy-900">
            {s}
          </option>
        ))}
      </select>
      <textarea name="message" required rows={4} placeholder="Your Message*" className={field} />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center gap-2 rounded-lg gold-gradient px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy-950 disabled:opacity-60"
        >
          {state === "loading" ? "Sending…" : "Send Message"}
          <ArrowRight className="size-4" aria-hidden />
        </button>
        <p className="flex items-center gap-2 text-xs text-mist-400">
          <ShieldCheck className="size-4 text-gold-400" aria-hidden />
          Your information is safe with us. We respect your privacy.
        </p>
      </div>
      {state === "error" && (
        <p className="text-xs text-red-300">Something went wrong. Please try again or call us directly.</p>
      )}
    </form>
  );
}
