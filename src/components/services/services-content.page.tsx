"use client";

import { Badge } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import {
  ClipboardList,
  Code2,
  LifeBuoy,
  RefreshCw,
  Smartphone,
} from "lucide-react";

type ServiceIconKey =
  | "custom"
  | "mobile"
  | "migration"
  | "consultation"
  | "support";
interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  icon: ServiceIconKey;
}
const services: ServiceItem[] = [
  {
    id: "custom-web-systems",
    index: "01",
    title: "Custom Web Systems",
    description:
      "Purpose-built software for how your business actually runs — scoped to your contract, with unlimited revisions until it's right.",
    tags: ["Unlimited revisions", "Contract-scoped", "Built from scratch"],
    icon: "custom",
  },
  {
    id: "mobile-apps",
    index: "02",
    title: "Mobile Apps",
    description:
      "Field, back-office, and customer-facing apps built for the industries you operate in.",
    tags: ["iOS & Android", "Back-office tools", "Field operations"],
    icon: "mobile",
  },
  {
    id: "migration",
    index: "03",
    title: "Legacy Migration",
    description:
      "Move off aging systems without losing data or downtime — modernized, documented, and built to scale with you.",
    tags: ["Zero data loss", "Modern stack", "Documented handover"],
    icon: "migration",
  },
  {
    id: "consultation",
    index: "04",
    title: "Consultation",
    description:
      "We scope the project, map the risks, and give you a clear plan before anything gets built.",
    tags: ["Project scoping", "Technical audit", "Roadmap"],
    icon: "consultation",
  },
  {
    id: "support",
    index: "05",
    title: "Support & Maintenance",
    description:
      "Ongoing fixes, monitoring, and recommendations after go-live.",
    tags: ["Issue resolution", "Monitoring", "Recommendations"],
    icon: "support",
  },
];
const serviceIcons: Record<
  ServiceIconKey,
  React.ComponentType<{ className?: string }>
> = {
  custom: Code2,
  mobile: Smartphone,
  migration: RefreshCw,
  consultation: ClipboardList,
  support: LifeBuoy,
};
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function ServicePageContent() {
  return (
    <section id="services" className="relative scroll-mt-28 bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-secondary">
            SERVICES
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Work with us the way that fits where you are.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every engagement starts wherever you are — a clean-slate build, a
            legacy system to retire, or just a second opinion.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={rowVariants}>
              <ServiceRow service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceRow({ service }: { service: ServiceItem }) {
  const Icon = serviceIcons[service.icon];
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm font-medium text-muted-foreground">
          {service.index}
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-5 w-5 text-primary" />
        </span>
      </div>
      <div className="flex-1">
        <h2 className="mt-5 text-xl font-semibold text-foreground sm:text-2xl">
          {service.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {service.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
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
    </article>
  );
}
