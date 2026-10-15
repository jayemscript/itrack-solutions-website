import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Cpu,
  Lightbulb,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ContentCard, { type Insight } from "./content-card";

const insights: Insight[] = [
  {
    category: "Workforce",
    date: "October 02, 2026",
    readTime: "5 min read",
    title: "A more connected workplace starts with better people data",
    description:
      "When HR information lives in one dependable place, teams can spend less time chasing paperwork and more time supporting people.",
    takeaway:
      "Start by mapping the information your people team needs most often, then bring those workflows into one clear, shared system.",
    media: {
      type: "image",
      src: "/images/hris-payroll.jpg",
      alt: "HRIS and payroll technology",
    },
    accent: "blue",
  },
  {
    category: "Asset management",
    date: "September 18, 2026",
    readTime: "4 min read",
    title: "How to use an RFID asset management system",
    description:
      "Watch a practical walkthrough of an RFID asset management workflow, from reading tagged items to keeping a more accurate inventory.",
    takeaway:
      "A practical rollout begins with the assets that are hardest to locate or most important to keep available.",
    media: { type: "youtube", videoId: "UKNB7-JEiHQ" },
    accent: "red",
  },
  {
    category: "Technology",
    date: "August 26, 2026",
    readTime: "6 min read",
    title: "Choosing the right ID system for a growing organization",
    description:
      "From access control to attendance, a well-planned ID program brings secure, practical experiences together in one card.",
    takeaway:
      "List the everyday tasks one card should support before selecting hardware, software, and card technology.",
    media: {
      type: "image",
      src: "/images/Id-printing-solution.jpg",
      alt: "ID printing solution",
    },
    accent: "gold",
  },
  {
    category: "Video demo",
    date: "July 14, 2026",
    readTime: "Video",
    title: "RFID mobile asset tracking in action",
    description:
      "See a mobile RFID walkthrough that demonstrates physical inventory and locating specific assets in a real use case.",
    takeaway:
      "Mobile RFID tools can help teams complete inventory checks and find tagged equipment with less manual searching.",
    media: { type: "youtube", videoId: "Ht_isEfNs30" },
    accent: "blue",
  },
];

const highlights = [
  { icon: Cpu, label: "Technology that works for people" },
  { icon: Lightbulb, label: "Ideas from the field" },
  { icon: BookOpen, label: "Practical guides and updates" },
];

export default function WhatsNewContent() {
  return (
    <section
      id="whats-new"
      aria-labelledby="whats-new-heading"
      className="scroll-mt-28 overflow-hidden bg-slate-50 py-20 dark:bg-slate-950 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Carousel
          opts={{ align: "start", loop: true, slidesToScroll: 1 }}
          aria-label="Latest articles and insights"
        >
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary shadow-sm dark:bg-slate-900">
                <span className="size-1.5 rounded-full bg-secondary" />
                The Itrack journal
              </div>
              <h2
                id="whats-new-heading"
                className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl"
              >
                Good ideas for a{" "}
                <span className="text-primary">smarter way forward.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
                Fresh perspectives on the tools, systems, and small changes that
                help organizations do their best work.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                {highlights.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                  >
                    <Icon className="size-4 text-secondary" aria-hidden="true" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between gap-5 border-b border-border pb-5">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                  WHAT’S NEW
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Notes and perspectives from our team
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <CarouselPrevious
                  aria-label="Previous insights"
                  className="static size-11 translate-y-0 rounded-full border-border bg-white text-primary shadow-sm hover:bg-primary hover:text-white disabled:opacity-40 dark:bg-slate-900"
                />
                <CarouselNext
                  aria-label="Next insights"
                  className="static size-11 translate-y-0 rounded-full border-primary bg-primary text-white shadow-sm hover:bg-primary/90 hover:text-white disabled:opacity-40"
                />
              </div>
            </div>
          </div>

          <CarouselContent className="mt-8 -ml-5">
            {insights.map((insight) => (
              <CarouselItem
                key={insight.title}
                className="basis-[88%] pl-5 sm:basis-[58%] lg:basis-1/3"
              >
                <ContentCard insight={insight} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5">
            <p className="text-xs text-muted-foreground">
              Swipe or use the arrows to explore more stories.
            </p>
            <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary sm:flex">
              Built around better work
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-primary sm:hidden">
              Explore <ArrowRight className="size-3.5" aria-hidden="true" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
