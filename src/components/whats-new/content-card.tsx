import Image from "next/image";
import { ArrowUpRight, Clock3 } from "lucide-react";

export type InsightMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string }
  | { type: "youtube"; videoId: string };

export interface Insight {
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  takeaway: string;
  media: InsightMedia;
  accent: "blue" | "red" | "gold";
}

const accentStyles: Record<Insight["accent"], string> = {
  blue: "bg-primary/10 text-primary",
  red: "bg-secondary/10 text-secondary",
  gold: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300",
};

export default function ContentCard({
  insight,
  media = insight.media,
}: {
  insight: Insight;
  media?: InsightMedia;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl dark:bg-slate-900">
      <div className="relative aspect-[1.65] overflow-hidden bg-muted">
        {media.type === "image" && (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 58vw, 88vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        )}

        {media.type === "video" && (
          <video
            src={media.src}
            poster={media.poster}
            controls
            preload="metadata"
            className="size-full object-cover"
            aria-label={insight.title}
          />
        )}

        {media.type === "youtube" && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${media.videoId}?rel=0`}
            title={insight.title}
            className="size-full border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {media.type === "image" && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
        )}
        <span
          className={`absolute top-4 left-4 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide ${accentStyles[insight.accent]}`}
        >
          {insight.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <time>{insight.date}</time>
          <span aria-hidden="true" className="size-1 rounded-full bg-secondary" />
          <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
            <Clock3 className="size-3.5" aria-hidden="true" />
            {insight.readTime}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {insight.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {insight.description}
        </p>

        <details className="group/read mt-auto pt-5">
          <summary className="flex w-fit cursor-pointer list-none items-center gap-2 pt-2 text-sm font-semibold text-primary marker:hidden [&::-webkit-details-marker]:hidden">
            <span>Read insight</span>
            <ArrowUpRight
              className="size-4 transition-transform group-open/read:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 border-t border-border pt-3 text-sm leading-6 text-muted-foreground">
            {insight.takeaway}
          </p>
        </details>
      </div>
    </article>
  );
}
