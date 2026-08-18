"use client";

import { Badge, Button } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Network,
  Printer,
  Radio,
  ScanLine,
  Smartphone,
} from "lucide-react";

type ProductIconKey =
  | "mobile"
  | "rfid"
  | "pos"
  | "printer"
  | "scanner"
  | "network";

interface ProductItem {
  id: string;
  title: string;
  href: string;
  description: string;
  tags: string[];
  icon: ProductIconKey;
}

interface ProductsClosingCta {
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

interface ProductsContent {
  eyebrow: string;
  heading: string;
  description: string;
  products: ProductItem[];
  closing: ProductsClosingCta;
}

const productsContent: ProductsContent = {
  eyebrow: "PRODUCTS",
  heading: "Hardware built into a system, not sold in a box.",
  description:
    "Every product below ships as part of a configured system — installed, integrated, and supported by Itrack Solutions INC, not just dropped at your door.",
  products: [
    {
      id: "industrial-mobile-devices",
      title: "Industrial Mobile Devices",
      href: "/product/industrial-mobile-devices",
      description:
        "Rugged handheld computers and wearables built for warehouses, field service, and factory floors.",
      tags: ["Rugged & drop-tested", "Android & Windows", "Long battery life"],
      icon: "mobile",
    },
    {
      id: "rfid-stickers",
      title: "RFID Stickers & Tags",
      href: "/product/rfid-stickers",
      description:
        "Passive and active RFID tags for inventory tracking, asset management, and loss prevention.",
      tags: ["Inventory tracking", "Asset tags", "Bulk supply"],
      icon: "rfid",
    },
    {
      id: "pos-hardware",
      title: "POS Hardware",
      href: "/product/pos-hardware",
      description:
        "Terminals, cash drawers, and card readers configured for retail and hospitality checkout.",
      tags: ["Terminals", "Card readers", "Cash drawers"],
      icon: "pos",
    },
    {
      id: "printers",
      title: "Printers",
      href: "/product/printers",
      description:
        "Receipt, label, and document printers integrated directly into your POS and business systems.",
      tags: ["Receipt printers", "Label printers", "Thermal & inkjet"],
      icon: "printer",
    },
    {
      id: "barcode-scanners",
      title: "Barcode Scanners",
      href: "/product/barcode-scanners",
      description:
        "Handheld and fixed-mount scanners matched to your throughput and environment.",
      tags: ["1D & 2D scanning", "Handheld & fixed-mount", "Wireless options"],
      icon: "scanner",
    },
    {
      id: "networking-equipment",
      title: "Networking Equipment",
      href: "/product/networking-equipment",
      description:
        "Switches, access points, and cabling that keep every device above online and secure.",
      tags: ["Switches & routers", "Access points", "Structured cabling"],
      icon: "network",
    },
  ],
  closing: {
    heading: "Don't see what you need?",
    description:
      "We source hardware beyond this list too — tell us what your business runs on.",
    primaryCta: {
      label: "Book a Consultation",
      href: "/services/consultation",
    },
    secondaryCta: { label: "View All Services", href: "/services" },
  },
};

const productIcons: Record<
  ProductIconKey,
  React.ComponentType<{ className?: string }>
> = {
  mobile: Smartphone,
  rfid: Radio,
  pos: Cpu,
  printer: Printer,
  scanner: ScanLine,
  network: Network,
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function ProductsContentPage() {
  const content = productsContent;

  return (
    <section className="relative bg-background py-20 lg:py-28">
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
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {content.heading}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.products.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-16 flex flex-col items-start gap-6 rounded-2xl border border-primary/15 bg-primary px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-9"
        >
          <div>
            <p className="text-xl font-semibold text-primary-foreground">
              {content.closing.heading}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
              {content.closing.description}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <a
                href={content.closing.primaryCta.href}
                className="inline-flex items-center gap-2"
              >
                {content.closing.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
            >
              <a href={content.closing.secondaryCta.href}>
                {content.closing.secondaryCta.label}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: ProductItem }) {
  const Icon = productIcons[product.icon];

  return (
    <a
      href={product.href}
      className="card-grid-item group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary">
        <Icon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
      </span>

      <h3 className="mt-5 text-lg font-semibold text-foreground">
        {product.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {product.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="font-mono text-[10px] font-normal uppercase tracking-wide text-muted-foreground"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-primary">
        View Products
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
}
