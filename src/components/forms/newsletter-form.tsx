"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 rounded-lg border border-gold-500/40 bg-gold-500/10 px-5 py-4 text-sm text-gold-200">
        <Check className="size-4" aria-hidden /> You&apos;re subscribed. Watch your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 rounded-lg border border-gold-500/30 bg-navy-900/70 px-4 py-3 text-sm text-white placeholder:text-mist-400 outline-none focus:border-gold-400"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-lg gold-gradient px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-950 disabled:opacity-60"
      >
        {state === "loading" ? "Subscribing…" : "Subscribe Now"}
        <ArrowRight className="size-4" aria-hidden />
      </button>
      {state === "error" && (
        <p className="text-xs text-red-300 sm:absolute sm:mt-14">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
