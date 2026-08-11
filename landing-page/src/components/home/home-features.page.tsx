"use client";

import { Badge } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import {
  Cpu,
  MonitorSmartphone,
  Network,
  Printer,
  Radio,
  ScanLine,
  Workflow,
} from "lucide-react";

type SolutionIconKey =
  | "integration"
  | "pos"
  | "rfid"
  | "kiosk"
  | "scanner"
  | "network"
  | "printer";

interface SolutionItem {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: SolutionIconKey;
  tags: string[];
  featured?: boolean;
}

interface HomeFeaturesContent {
  eyebrow: string;
  heading: string;
  description: string;
  solutions: SolutionItem[];
}

const homeFeaturesContent: HomeFeaturesContent = {
  eyebrow: "SOLUTIONS CATALOG",
  heading: "One partner. Every system your business runs on.",
  description:
    "Every category below is sourced, configured, and supported by Itrack Solutions INC as part of one build — not a shelf of parts you have to make work together yourself.",
  solutions: [
    {
      id: "integration",
      index: "00",
      title: "Custom Software & Systems Integration",
      description:
        "The layer that ties every device below into one working system — consultation, custom software, hardware integration, and rollout planned around how your business actually operates.",
      icon: "integration",
      tags: [
        "Consultation",
        "Custom software",
        "Deployment",
        "Ongoing support",
      ],
      featured: true,
    },
    {
      id: "pos",
      index: "01",
      title: "POS & Business Systems",
      description:
        "Point-of-sale and back-office systems configured for your workflow, not a generic template.",
      icon: "pos",
      tags: ["Retail", "Hospitality", "Multi-location"],
    },
    {
      id: "rfid",
      index: "02",
      title: "RFID Systems & Devices",
      description:
        "Tagging, readers, and asset-tracking infrastructure sized to your inventory and floor plan.",
      icon: "rfid",
      tags: ["Inventory", "Asset tracking", "Access control"],
    },
    {
      id: "kiosk",
      index: "03",
      title: "Self-Service Kiosks",
      description:
        "Ordering, check-in, and information kiosks built around the customer journey you already have.",
      icon: "kiosk",
      tags: ["Ordering", "Check-in", "Wayfinding"],
    },
    {
      id: "scanner",
      index: "04",
      title: "Barcode Scanners",
      description:
        "Handheld and fixed-mount scanning hardware matched to your throughput and environment.",
      icon: "scanner",
      tags: ["Warehousing", "Retail floor", "Field ops"],
    },
    {
      id: "network",
      index: "05",
      title: "Networking Equipment",
      description:
        "Switches, access points, and cabling designed to keep every device above online and secure.",
      icon: "network",
      tags: ["Wired & wireless", "Security", "Uptime"],
    },
    {
      id: "printer",
      index: "06",
      title: "Printers & Peripherals",
      description:
        "Receipt, label, and document printers integrated directly into your POS and business systems.",
      icon: "printer",
      tags: ["Receipt", "Label", "Document"],
    },
  ],
};

const solutionIcons: Record<
  SolutionIconKey,
  React.ComponentType<{ className?: string }>
> = {
  integration: Workflow,
  pos: Cpu,
  rfid: Radio,
  kiosk: MonitorSmartphone,
  scanner: ScanLine,
  network: Network,
  printer: Printer,
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function HomeFeaturesPage() {
  const content = homeFeaturesContent;
  const featured = content.solutions.find((s) => s.featured);
  const rest = content.solutions.filter((s) => !s.featured);

  return (
    <section className="relative bg-background py-20 lg:py-28" id="solutions">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-secondary">
            {content.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-4 lg:mt-16"
        >
          {featured && (
            <motion.div variants={cardVariants}>
              <FeaturedSolutionCard solution={featured} />
            </motion.div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((solution) => (
              <motion.div key={solution.id} variants={cardVariants}>
                <SolutionCard solution={solution} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedSolutionCard({ solution }: { solution: SolutionItem }) {
  const Icon = solutionIcons[solution.icon];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-primary/15 bg-primary px-7 py-8 shadow-md transition-shadow hover:shadow-lg sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/10">
          <Icon className="h-7 w-7 text-primary-foreground" />
        </span>
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-medium text-primary-foreground/60">
              {solution.index}
            </span>
            <h3 className="text-xl font-semibold text-primary-foreground sm:text-2xl">
              {solution.title}
            </h3>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
            {solution.description}
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap gap-2 lg:mt-0 lg:shrink-0 lg:flex-col lg:items-end">
        {solution.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="border-0 bg-primary-foreground/10 font-mono text-[10px] font-medium uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/15"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function SolutionCard({ solution }: { solution: SolutionItem }) {
  const Icon = solutionIcons[solution.icon];

  return (
    <div className="card-grid-item group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
        </span>
        <span className="font-mono text-xs font-medium text-muted-foreground">
          {solution.index}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {solution.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {solution.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {solution.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="font-mono text-[10px] font-normal uppercase tracking-wide text-muted-foreground"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
