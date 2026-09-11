"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react";
import type { Job } from "@/lib/cms";
import { cn } from "@/lib/utils";

export function JobBoard({ jobs }: { jobs: Job[] }) {
  const departments = useMemo(
    () => ["All Departments", ...Array.from(new Set(jobs.map((j) => j.department)))],
    [jobs],
  );
  const [active, setActive] = useState("All Departments");

  const filtered = active === "All Departments" ? jobs : jobs.filter((j) => j.department === active);

  return (
    <div>
      <div className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {departments.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setActive(d)}
            className={cn(
              "shrink-0 rounded-md px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors",
              active === d ? "gold-gradient text-navy-950" : "text-mist-400 hover:text-white",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <ul className="mt-4 divide-y divide-white/5 rounded-2xl border border-gold-500/15 bg-navy-850">
        {filtered.map((job) => (
          <li key={job.id} className="grid items-center gap-3 p-5 sm:grid-cols-[1.4fr_1fr_0.9fr_0.9fr_auto]">
            <div>
              <span className="font-display text-lg font-semibold text-white">{job.title}</span>
              <span className="mt-0.5 block text-xs text-mist-400 sm:hidden">{job.department}</span>
            </div>
            <span className="hidden text-sm text-mist-300 sm:block">{job.department}</span>
            <span className="flex items-center gap-1.5 text-sm text-mist-300">
              <MapPin className="size-3.5 text-gold-400" aria-hidden /> {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-mist-300">
              <Clock className="size-3.5 text-gold-400" aria-hidden /> {job.experience}
            </span>
            <a
              href={job.applyUrl}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gold-500/40 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold-300 hover:bg-gold-500/10"
            >
              Apply Now <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="flex items-center gap-2 p-6 text-sm text-mist-400">
            <Briefcase className="size-4" aria-hidden /> No open roles in this department right now.
          </li>
        )}
      </ul>
    </div>
  );
}
