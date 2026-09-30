"use client";

import { Button } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

interface ComparisonRow {
  id: string;
  label: string;
  typical: string;
  itrack: string;
}

interface HomeWhyChooseUsContent {
  eyebrow: string;
  heading: string;
  description: string;
  columnLabels: { typical: string; itrack: string };
  rows: ComparisonRow[];
  closing: {
    heading: string;
    ctaLabel: string;
    href: string;
  };
}

const homeWhyChooseUsContent: HomeWhyChooseUsContent = {
  eyebrow: "WHY ITRACK SOLUTIONS",
  heading: "Built to be the last vendor call you make.",
  description:
    "Most hardware vendors stop at the invoice. Here's what changes when Itrack Solutions INC handles consultation, integration, deployment, and support as one team.",
  columnLabels: { typical: "Typical Vendor", itrack: "Itrack Solutions" },
  rows: [
    {
      id: "scope",
      label: "Scope",
      typical: "Sells whatever unit is in stock",
      itrack: "Specs the full system around your workflow",
    },
    {
      id: "sourcing",
      label: "Sourcing",
      typical: "Locked into one manufacturer",
      itrack: "Vendor-agnostic hardware sourcing",
    },
    {
      id: "software",
      label: "Software",
      typical: "Hardware only — you integrate it yourself",
      itrack: "Custom software & systems integration included",
    },
    {
      id: "rollout",
      label: "Rollout",
      typical: "Drop-shipped, self-install",
      itrack: "On-site deployment & staff training",
    },
    {
      id: "support",
      label: "Support",
      typical: "Generic support ticket queue",
      itrack: "24/7 direct line to your account team",
    },
  ],
  closing: {
    heading: "Ready to see it applied to your business?",
    ctaLabel: "Talk to Our Team",
    href: "#contact",
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function HomeWhyChooseUsPage() {
  const content = homeWhyChooseUsContent;

  return (
    <section className="relative bg-muted/40 py-20 lg:py-28" id="why-us">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
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

        <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
          <div className="hidden sm:grid sm:grid-cols-[140px_1fr_1fr] sm:gap-6 sm:pb-4">
            <span />
            <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              {content.columnLabels.typical}
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-primary">
              {content.columnLabels.itrack}
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="divide-y divide-border sm:border-t sm:border-border"
          >
            {content.rows.map((row) => (
              <motion.div
                key={row.id}
                variants={rowVariants}
                className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-[140px_1fr_1fr] sm:items-center sm:gap-6"
              >
                <span className="font-mono text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </span>

                <div className="flex items-start gap-2.5 text-sm text-muted-foreground sm:text-[0.9rem]">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60" />
                  <span>{row.typical}</span>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-primary/15 bg-primary/[0.04] px-4 py-3 text-sm font-medium text-foreground sm:text-[0.9rem]">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="h-2.5 w-2.5 text-primary-foreground" />
                  </span>
                  <span>{row.itrack}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <p className="text-lg font-semibold text-foreground">
            {content.closing.heading}
          </p>
          <Button asChild size="lg">
            <a
              href={content.closing.href}
              className="group inline-flex items-center gap-2"
            >
              {content.closing.ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
