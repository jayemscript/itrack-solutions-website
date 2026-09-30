"use client";

import { Button } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  MapPin,
  Monitor,
  Package,
  Store,
  Timer,
  Utensils,
} from "lucide-react";

type FeatureIconKey =
  | "terminals"
  | "readers"
  | "peripherals"
  | "multi-location";
type UseCaseIconKey =
  | "retail"
  | "hospitality"
  | "quick-service"
  | "multi-location";

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

interface PosHardwareContent {
  hero: ProductHero;
  features: SectionIntro & { items: FeatureItem[] };
  useCases: SectionIntro & { items: UseCaseItem[] };
  included: SectionIntro & { points: IncludedPoint[] };
  closing: ClosingCta;
}

const posHardwareContent: PosHardwareContent = {
  hero: {
    breadcrumbCurrent: "POS Hardware",
    eyebrow: "POS HARDWARE",
    headline: {
      lead: "Checkout hardware that matches",
      emphasis: "how you actually sell.",
    },
    description:
      "Terminals, cash drawers, card readers, and customer displays configured for retail and hospitality checkout — installed and connected to your POS software, not dropped off in a box.",
    primaryCta: { label: "Request a Quote", href: "/services/consultation" },
    secondaryCta: { label: "View All Products", href: "/products" },
  },
  features: {
    eyebrow: "KEY FEATURES",
    heading: "Built for the counter, not the demo floor.",
    description:
      "Every setup is sized and configured for the checkout flow it's actually running.",
    items: [
      {
        id: "terminals",
        title: "Touchscreen Terminals",
        description:
          "All-in-one or modular setups sized to your counter space and order volume.",
        icon: "terminals",
      },
      {
        id: "readers",
        title: "Card & Contactless Readers",
        description:
          "EMV, tap-to-pay, and mobile wallet support built in, not bolted on.",
        icon: "readers",
      },
      {
        id: "peripherals",
        title: "Cash Drawers & Peripherals",
        description:
          "Drawers, customer displays, and scales matched to your checkout flow.",
        icon: "peripherals",
      },
      {
        id: "multi-location",
        title: "Multi-Location Ready",
        description:
          "Configurations that stay consistent across every register and every branch.",
        icon: "multi-location",
      },
    ],
  },
  useCases: {
    eyebrow: "WHERE IT'S USED",
    heading: "Configured differently at every counter.",
    description:
      "The same hardware line, set up around how each checkout actually runs.",
    items: [
      {
        id: "retail",
        step: "01",
        title: "Retail Checkout",
        description: "Fast, reliable checkout built for peak-hour lines.",
        icon: "retail",
      },
      {
        id: "hospitality",
        step: "02",
        title: "Hospitality & F&B",
        description: "Order-taking, split checks, and kitchen printer routing.",
        icon: "hospitality",
      },
      {
        id: "quick-service",
        step: "03",
        title: "Quick-Service Counters",
        description:
          "Streamlined single-screen setups for high-turnover counters.",
        icon: "quick-service",
      },
      {
        id: "multi-location",
        step: "04",
        title: "Multi-Location Retail",
        description: "Centralized reporting across every register you run.",
        icon: "multi-location",
      },
    ],
  },
  included: {
    eyebrow: "WHAT'S INCLUDED",
    heading: "The terminal is the visible part.",
    description:
      "Every POS hardware deployment includes what it takes to make it work on day one.",
    points: [
      {
        id: "config",
        title: "Software configuration",
        description:
          "Terminals configured and connected to your POS software before they reach the counter.",
      },
      {
        id: "payments",
        title: "Payment processor setup",
        description:
          "Card readers paired and tested with your payment processor, not left for you to figure out.",
      },
      {
        id: "training",
        title: "Staff training",
        description:
          "Your team walked through the hardware before it goes live at the register.",
      },
    ],
  },
  closing: {
    heading: "Setting up a new register?",
    description:
      "Tell us your checkout flow and volume — we'll spec the right terminal setup.",
    primaryCta: { label: "Request a Quote", href: "/services/consultation" },
    secondaryCta: { label: "View All Products", href: "/products" },
  },
};

const featureIcons: Record<
  FeatureIconKey,
  React.ComponentType<{ className?: string }>
> = {
  terminals: Monitor,
  readers: CreditCard,
  peripherals: Package,
  "multi-location": Store,
};

const useCaseIcons: Record<
  UseCaseIconKey,
  React.ComponentType<{ className?: string }>
> = {
  retail: Store,
  hospitality: Utensils,
  "quick-service": Timer,
  "multi-location": MapPin,
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function PosHardwarePage() {
  const content = posHardwareContent;

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
  section: PosHardwareContent["features"];
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
  section: PosHardwareContent["useCases"];
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
  section: PosHardwareContent["included"];
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
