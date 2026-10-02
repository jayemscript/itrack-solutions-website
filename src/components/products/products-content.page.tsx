"use client";

import Image from "next/image";
import Link from "next/link";
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
  | "scanner"
  | "printer"
  | "id-printer"
  | "camera"
  | "consumables"
  | "rfid";
interface ProductItem {
  id: string;
  title: string;
  href: string;
  description: string;
  tags: string[];
  icon: ProductIconKey;
  image: string;
}

const products: ProductItem[] = [
  {
    id: "industrial-mobile-devices",
    title: "Industrial Mobile Devices",
    href: "/products/industrial-mobile-devices",
    description:
      "Rugged handheld computers and wearables built for warehouses, field service, and factory floors.",
    tags: ["Rugged & drop-tested", "Android & Windows", "Long battery life"],
    icon: "mobile",
    image: "/images/mobile-computers.jpg",
  },
  {
    id: "barcode-scanners",
    title: "Barcode Scanners",
    href: "/products/barcode-scanners",
    description:
      "Handheld and fixed-mount scanners matched to your throughput and environment.",
    tags: ["1D & 2D scanning", "Handheld & fixed-mount", "Wireless options"],
    icon: "scanner",
    image: "/images/barcode-scanners.jpg",
  },
  {
    id: "barcode-printers",
    title: "Barcode Printers",
    href: "/products/barcode-printers",
    description:
      "Reliable label and barcode printing for inventory, shipping, and retail workflows.",
    tags: ["Label printing", "Thermal printers", "Barcode labels"],
    icon: "printer",
    image: "/images/barcode-printers.jpg",
  },
  {
    id: "id-printers",
    title: "ID Printers",
    href: "/products/id-printers",
    description:
      "Card printers for employee badges, visitor passes, and membership IDs.",
    tags: ["ID cards", "Badge printing", "Card supplies"],
    icon: "id-printer",
    image: "/images/id-printers.jpg",
  },
  {
    id: "security-camera",
    title: "Security Camera",
    href: "/products/security-camera",
    description:
      "Business camera systems to help monitor facilities, work areas, and access points.",
    tags: ["Site monitoring", "Camera systems", "Business security"],
    icon: "camera",
    image: "/images/security-camera.jpg",
  },
  {
    id: "consumables",
    title: "Consumables",
    href: "/products/consumables",
    description:
      "Labels, ribbons, receipt rolls, and other supplies to keep daily operations running.",
    tags: ["Labels", "Printer ribbons", "Receipt rolls"],
    icon: "consumables",
    image: "/images/consumables.jpg",
  },
  {
    id: "rfid-readers-and-tags",
    title: "RFID Readers & Tags",
    href: "/products/rfid-readers-and-tags",
    description:
      "RFID readers and tags for inventory visibility, asset tracking, and operations.",
    tags: ["RFID readers", "RFID tags", "Asset tracking"],
    icon: "rfid",
    image: "/images/rfid-tags.jpg",
  },
];

const productIcons: Record<
  ProductIconKey,
  React.ComponentType<{ className?: string }>
> = {
  mobile: Smartphone,
  scanner: ScanLine,
  printer: Printer,
  "id-printer": Cpu,
  camera: Network,
  consumables: Cpu,
  rfid: Radio,
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
  return (
    <section id="catalog" className="relative bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-secondary">
            PRODUCTS
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Hardware built into a system, not sold in a box.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every product below ships as part of a configured system —
            installed, integrated, and supported by Itrack Solutions INC.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-16 flex flex-col items-start gap-6 rounded-2xl border border-primary/15 bg-primary px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <div>
            <p className="text-xl font-semibold text-primary-foreground">
              Don&apos;t see what you need?
            </p>
            <p className="mt-1.5 text-sm text-primary-foreground/75 sm:text-base">
              We source hardware beyond this list too — tell us what your
              business runs on.
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

function ProductCard({ product }: { product: ProductItem }) {
  const Icon = productIcons[product.icon];
  return (
    <Link
      href={product.href}
      className="card-grid-item group flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
    >
      <div className="relative h-44 overflow-hidden rounded-xl bg-muted">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary">
        <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
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
        View Product <ArrowUpRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}
