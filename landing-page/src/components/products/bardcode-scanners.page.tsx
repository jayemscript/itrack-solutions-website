"use client";

import React from "react";
import { Button } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Factory,
  Layers,
  ScanLine,
  ShieldCheck,
  Store,
  Warehouse,
  Wifi,
  Wrench,
} from "lucide-react";

type FeatureIconKey = "symbology" | "form-factor" | "wireless" | "rugged";
type UseCaseIconKey =
  | "retail"
  | "warehousing"
  | "field-service"
  | "manufacturing";

interface ProductHero {
  breadcrumbCurrent: string;
  eyebrow: string;
  headline: { lead: string; emphasis: string };
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: FeatureIconKey;
}

interface UseCaseItem {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: UseCaseIconKey;
}

interface IncludedPoint {
  id: string;
  title: string;
  description: string;
}

interface SectionIntro {
  eyebrow: string;
  heading: string;
  description: string;
}

interface ClosingCta {
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

interface BarcodeScannersContent {
  hero: ProductHero;
  features: SectionIntro & { items: FeatureItem[] };
  useCases: SectionIntro & { items: UseCaseItem[] };
  included: SectionIntro & { points: IncludedPoint[] };
  closing: ClosingCta;
}

const barcodeScannersContent: BarcodeScannersContent = {
  hero: {
    breadcrumbCurrent: "Barcode Scanners",
    eyebrow: "BARCODE SCANNERS",
    headline: {
      lead: "Scanners built for",
      emphasis: "your throughput, not the showroom.",
    },
    description:
      "Handheld and fixed-mount barcode scanners for retail, warehousing, and field operations — paired with your POS or inventory system before they ever reach the floor.",
    primaryCta: { label: "Request a Quote", href: "/services/consultation" },
    secondaryCta: { label: "View All Products", href: "/products" },
  },
  features: {
    eyebrow: "KEY FEATURES",
    heading: "Scanners matched to the read, not just the price.",
    description:
      "Every unit is selected for the labels, distance, and pace it actually needs to handle.",
    items: [
      {
        id: "symbology",
        title: "1D & 2D Scanning",
        description:
          "From simple barcodes to QR codes and damaged labels, read reliably the first time.",
        icon: "symbology",
      },
      {
        id: "form-factor",
        title: "Handheld & Fixed-Mount",
        description:
          "Corded, cordless, or fixed-mount units built for the station they're working at.",
        icon: "form-factor",
      },
      {
        id: "wireless",
        title: "Wireless & Bluetooth",
        description:
          "Cordless scanning with reliable range across the counter or the warehouse floor.",
        icon: "wireless",
      },
      {
        id: "rugged",
        title: "Rugged Options",
        description:
          "Drop- and dust-rated units for warehouses, loading docks, and outdoor use.",
        icon: "rugged",
      },
    ],
  },
  useCases: {
    eyebrow: "WHERE IT'S USED",
    heading: "Set up differently at every station.",
    description:
      "The same scanning technology, configured around where it actually works.",
    items: [
      {
        id: "retail",
        step: "01",
        title: "Retail Checkout",
        description:
          "Fast, accurate scans at the register, even on damaged or curved labels.",
        icon: "retail",
      },
      {
        id: "warehousing",
        step: "02",
        title: "Warehousing & Receiving",
        description:
          "High-volume scanning for receiving, put-away, and cycle counts.",
        icon: "warehousing",
      },
      {
        id: "field-service",
        step: "03",
        title: "Field Service",
        description:
          "Portable scanning for deliveries, inspections, and on-site inventory checks.",
        icon: "field-service",
      },
      {
        id: "manufacturing",
        step: "04",
        title: "Manufacturing",
        description:
          "Fixed-mount scanning integrated into production and packing lines.",
        icon: "manufacturing",
      },
    ],
  },
  included: {
    eyebrow: "WHAT'S INCLUDED",
    heading: "The scanner is only as good as what it's connected to.",
    description:
      "Every scanner deployment includes what it takes to get accurate reads into your system.",
    points: [
      {
        id: "pairing",
        title: "System pairing",
        description:
          "Scanners paired and tested with your POS, WMS, or inventory software before go-live.",
      },
      {
        id: "configuration",
        title: "Symbology configuration",
        description:
          "Set up to read the exact barcode formats your business actually uses.",
      },
      {
        id: "training",
        title: "Staff training",
        description:
          "Your team shown how to get a clean scan the first time, every time.",
      },
    ],
  },
  closing: {
    heading: "Scanning slowing your team down?",
    description:
      "Tell us your volume and environment — we'll spec the right scanner setup.",
    primaryCta: { label: "Request a Quote", href: "/services/consultation" },
    secondaryCta: { label: "View All Products", href: "/products" },
  },
};

const featureIcons: Record<
  FeatureIconKey,
  React.ComponentType<{ className?: string }>
> = {
  symbology: ScanLine,
  "form-factor": Layers,
  wireless: Wifi,
  rugged: ShieldCheck,
};

const useCaseIcons: Record<
  UseCaseIconKey,
  React.ComponentType<{ className?: string }>
> = {
  retail: Store,
  warehousing: Warehouse,
  "field-service": Wrench,
  manufacturing: Factory,
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function BarCodeScannersPage() {
  const content = barcodeScannersContent;

  return (
    <>
      <ProductHeroSection hero={content.hero} />
      <FeaturesSection section={content.features} />
      <UseCasesSection section={content.useCases} />
      <IncludedSection section={content.included} />
      <ClosingCtaSection closing={content.closing} />
    </>
  );
}

function ProductHeroSection({ hero }: { hero: ProductHero }) {
  return (
    <section className="relative overflow-hidden bg-background">
      <BlueprintBackdrop />

      <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-24 lg:px-8 lg:pb-20 lg:pt-32">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex items-center gap-1.5 font-mono text-xs text-muted-foreground"
        >
          <a href="/products" className="transition-colors hover:text-primary">
            Products
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{hero.breadcrumbCurrent}</span>
        </motion.nav>

        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="font-mono text-[11px] font-medium uppercase tracking-widest text-secondary"
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
          >
            <span className="block">{hero.headline.lead}</span>
            <span className="block text-primary">{hero.headline.emphasis}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <a
                href={hero.primaryCta.href}
                className="inline-flex items-center gap-2"
              >
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection({
  section,
}: {
  section: BarcodeScannersContent["features"];
}) {
  return (
    <section className="bg-muted/40 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionIntroBlock section={section} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {section.items.map((item) => {
            const Icon = featureIcons[item.icon];
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function UseCasesSection({
  section,
}: {
  section: BarcodeScannersContent["useCases"];
}) {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionIntroBlock section={section} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {section.items.map((item) => {
            const Icon = useCaseIcons[item.icon];
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <span className="font-mono text-xs font-medium text-muted-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function IncludedSection({
  section,
}: {
  section: BarcodeScannersContent["included"];
}) {
  return (
    <section className="bg-muted/40 py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionIntroBlock section={section} centered />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card"
        >
          {section.points.map((point) => (
            <motion.div
              key={point.id}
              variants={itemVariants}
              className="flex items-start gap-4 p-6"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                <Check className="h-3.5 w-3.5 text-primary-foreground" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ClosingCtaSection({ closing }: { closing: ClosingCta }) {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-start gap-6 rounded-2xl border border-primary/15 bg-primary px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-9"
        >
          <div>
            <p className="text-xl font-semibold text-primary-foreground">
              {closing.heading}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
              {closing.description}
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
                href={closing.primaryCta.href}
                className="inline-flex items-center gap-2"
              >
                {closing.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
            >
              <a href={closing.secondaryCta.href}>
                {closing.secondaryCta.label}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionIntroBlock({
  section,
  centered = false,
}: {
  section: SectionIntro;
  centered?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={centered ? "mx-auto max-w-xl text-center" : "max-w-xl"}
    >
      <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-secondary">
        {section.eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
        {section.heading}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        {section.description}
      </p>
    </motion.div>
  );
}

function BlueprintBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse at 30% 20%, black 0%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 30% 20%, black 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
