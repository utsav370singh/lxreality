import Image from "next/image";
import { Linkedin } from "lucide-react";
import type { Leader } from "@/lib/cms";
import { cn } from "@/lib/utils";

export function LeaderCard({ leader, className }: { leader: Leader; className?: string }) {
  return (
    <figure
      className={cn(
        "group overflow-hidden rounded-2xl border border-gold-500/15 bg-navy-850",
        className,
      )}
    >
      <div className="relative aspect-[5/6] overflow-hidden">
        <Image
          src={leader.photo.url}
          alt={leader.photo.alt}
          fill
          sizes="(max-width: 640px) 80vw, 260px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
      </div>
      <figcaption className="flex items-center justify-between gap-3 p-4">
        <span>
          <span className="block font-display text-lg font-semibold text-white">{leader.name}</span>
          <span className="block text-xs text-gold-300">{leader.role}</span>
        </span>
        {leader.linkedin && (
          <a
            href={leader.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${leader.name} on LinkedIn`}
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 hover:bg-gold-500/10"
          >
            <Linkedin className="size-4" />
          </a>
        )}
      </figcaption>
    </figure>
  );
}
