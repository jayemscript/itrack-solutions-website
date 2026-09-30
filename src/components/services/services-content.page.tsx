"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GetAllServicesCatalogs } from "@/api/services";
import { Badge, Button } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardList,
  Code2,
  LifeBuoy,
  RefreshCw,
  Smartphone,
} from "lucide-react";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import type { CatalogPage } from "@/lib/catalog";
import type {
  IServiceCatalogImage,
  IServicesCatalogs,
} from "@/interfaces/services";
import { CatalogHtml } from "@/components/catalog/catalog-html";
import { CatalogImageCarousel } from "@/components/catalog/catalog-image-carousel";

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
  href: string;
  description: string;
  tags: string[];
  icon: ServiceIconKey;
  images: IServiceCatalogImage[];
}
const fallbackServices: ServiceItem[] = [
  {
    id: "custom-web-systems",
    index: "01",
    title: "Custom Web Systems",
    href: "/services/custom-development",
    description:
      "Purpose-built software for how your business actually runs — scoped to your contract, with unlimited revisions until it's right.",
    tags: ["Unlimited revisions", "Contract-scoped", "Built from scratch"],
    icon: "custom",
    images: [],
  },
  {
    id: "mobile-apps",
    index: "02",
    title: "Mobile Apps",
    href: "/services/mobile-apps",
    description:
      "Field, back-office, and customer-facing apps built for the industries you operate in.",
    tags: ["iOS & Android", "Back-office tools", "Field operations"],
    icon: "mobile",
    images: [],
  },
  {
    id: "migration",
    index: "03",
    title: "Legacy Migration",
    href: "/services/migration",
    description:
      "Move off aging systems without losing data or downtime — modernized, documented, and built to scale with you.",
    tags: ["Zero data loss", "Modern stack", "Documented handover"],
    icon: "migration",
    images: [],
  },
  {
    id: "consultation",
    index: "04",
    title: "Consultation",
    href: "/services/consultation",
    description:
      "We scope the project, map the risks, and give you a clear plan before anything gets built.",
    tags: ["Project scoping", "Technical audit", "Roadmap"],
    icon: "consultation",
    images: [],
  },
  {
    id: "support",
    index: "05",
    title: "Support & Maintenance",
    href: "/services/support",
    description:
      "Ongoing fixes, monitoring, and recommendations after go-live.",
    tags: ["Issue resolution", "Monitoring", "Recommendations"],
    icon: "support",
    images: [],
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

function apiService(item: IServicesCatalogs, index: number): ServiceItem {
  const name = item.name.toLowerCase();
  const icon: ServiceIconKey = name.includes("mobile")
    ? "mobile"
    : name.includes("migration")
      ? "migration"
      : name.includes("support")
        ? "support"
        : name.includes("consult")
          ? "consultation"
          : "custom";
  return {
    id: item.id,
    index: String(index + 1).padStart(2, "0"),
    title: item.name,
    href: `/services/${encodeURIComponent(item.code)}`,
    description: item.description,
    tags: [item.category],
    icon,
    images: item.images ?? [],
  };
}

export function ServicePageContent({
  initialPage,
}: {
  initialPage?: CatalogPage<IServicesCatalogs> | null;
}) {
  const [page, setPage] = useState<CatalogPage<IServicesCatalogs> | null>(
    initialPage ?? null,
  );
  useEffect(() => {
    if (initialPage) return;
    void GetAllServicesCatalogs({ page: 1, limit: 10 })
      .then((response) => {
        const data = response.data;
        setPage({
          items: data.services_catalogs,
          totalItems: data.totalItems,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        });
      })
      .catch(() => undefined);
  }, [initialPage]);
  const services = page?.items.map(apiService) ?? fallbackServices;
  return (
    <section id="catalog" className="relative bg-background py-20 lg:py-28">
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
          className="mt-14 divide-y divide-border border-y border-border"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={rowVariants}>
              <ServiceRow service={service} />
            </motion.div>
          ))}
        </motion.div>
        {page && (
          <CatalogPagination page={page} onPage={setPage} kind="services" />
        )}
        <div className="mt-16 flex flex-col items-start gap-6 rounded-2xl border border-primary/15 bg-primary px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <div>
            <p className="text-xl font-semibold text-primary-foreground">
              Not sure where to start?
            </p>
            <p className="mt-1.5 text-sm text-primary-foreground/75 sm:text-base">
              Book a free consultation and we&apos;ll help you figure out the
              right track.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link
              href="/services/consultation"
              className="inline-flex items-center gap-2"
            >
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service }: { service: ServiceItem }) {
  const Icon = serviceIcons[service.icon];
  return (
    <Link
      href={service.href}
      className="group flex flex-col gap-5 py-8 transition-colors sm:flex-row sm:items-center sm:gap-8"
    >
      <div className="flex items-center gap-4 sm:w-16 sm:shrink-0 sm:flex-col sm:items-start sm:gap-3">
        <span className="font-mono text-sm font-medium text-muted-foreground sm:text-base">
          {service.index}
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted group-hover:bg-primary">
          <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
        </span>
      </div>
      <div className="flex-1">
        <CatalogImageCarousel
          catalogId={service.id}
          images={service.images}
          kind="service"
          alt={service.title}
          compact
        />
        <h2 className="mt-4 text-xl font-semibold text-foreground group-hover:text-primary sm:text-2xl">
          {service.title}
        </h2>
        <CatalogHtml
          html={service.description}
          className="catalog-rich-text mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        />
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
      <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-primary">
        <span className="hidden sm:inline">View service</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border group-hover:border-primary group-hover:bg-primary">
          <ArrowUpRight className="h-4 w-4 group-hover:text-primary-foreground" />
        </span>
      </div>
    </Link>
  );
}
