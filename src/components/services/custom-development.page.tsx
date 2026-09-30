"use client";

import { Button } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Database,
  Globe,
  LayoutDashboard,
  Plug,
} from "lucide-react";

type InclusionIconKey = "web" | "dashboard" | "integrations" | "database";

interface ServiceHero {
  breadcrumbCurrent: string;
  eyebrow: string;
  headline: { lead: string; emphasis: string };
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

interface InclusionItem {
  id: string;
  title: string;
  description: string;
  icon: InclusionIconKey;
}

interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

interface EngagementPoint {
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

interface CustomDevelopmentContent {
  hero: ServiceHero;
  inclusions: SectionIntro & { items: InclusionItem[] };
  process: SectionIntro & { steps: ProcessStep[] };
  engagement: SectionIntro & { points: EngagementPoint[] };
  closing: ClosingCta;
}

const customDevelopmentContent: CustomDevelopmentContent = {
  hero: {
    breadcrumbCurrent: "Custom Development",
    eyebrow: "CUSTOM DEVELOPMENT",
    headline: {
      lead: "Software built around your business,",
      emphasis: "not the other way around.",
    },
    description:
      "We design and build custom web systems from scratch — internal tools, admin dashboards, client portals, and the APIs that connect them to everything else you run.",
    primaryCta: { label: "Start a Project", href: "/services/consultation" },
    secondaryCta: { label: "View All Services", href: "/services" },
  },
  inclusions: {
    eyebrow: "WHAT'S INCLUDED",
    heading: "One build, everything it needs to run.",
    description:
      "Every custom development engagement covers the full stack — not just the parts that are easy.",
    items: [
      {
        id: "web",
        title: "Web Applications",
        description:
          "Customer-facing and internal apps built to your exact workflow.",
        icon: "web",
      },
      {
        id: "dashboard",
        title: "Admin Dashboards",
        description: "Internal tools your team will actually want to use.",
        icon: "dashboard",
      },
      {
        id: "integrations",
        title: "APIs & Integrations",
        description:
          "Connects cleanly to your POS, inventory, or third-party tools.",
        icon: "integrations",
      },
      {
        id: "database",
        title: "Custom Databases",
        description:
          "Data structured around how your business actually operates.",
        icon: "database",
      },
    ],
  },
  process: {
    eyebrow: "HOW IT WORKS",
    heading: "A build process with no surprises.",
    description:
      "Four phases, reviewed with you at every step — never a black box.",
    steps: [
      {
        id: "discovery",
        step: "01",
        title: "Discovery",
        description:
          "We map your workflow, requirements, and constraints before writing a line of code.",
      },
      {
        id: "design",
        step: "02",
        title: "Design & Architecture",
        description:
          "System design and UI direction reviewed with you before development starts.",
      },
      {
        id: "build",
        step: "03",
        title: "Build & Revisions",
        description:
          "Development happens in scoped phases with revisions included throughout.",
      },
      {
        id: "handoff",
        step: "04",
        title: "Testing & Handoff",
        description:
          "QA, deployment, and a documented handover to your team — or our support track.",
      },
    ],
  },
  engagement: {
    eyebrow: "ENGAGEMENT MODEL",
    heading: "Revisions that match how you actually work.",
    description:
      "Every contract defines its own revision terms up front, so there's never a guessing game about what's included.",
    points: [
      {
        id: "scope",
        title: "Scoped to your contract",
        description:
          "Revision terms — unlimited, milestone-based, or capped — are agreed before the build starts.",
      },
      {
        id: "during-build",
        title: "Revisions during the build",
        description:
          "Changes made while a phase is in progress are part of that phase, not a separate charge.",
      },
      {
        id: "after-launch",
        title: "Changes after launch",
        description:
          "Post-launch requests route through our Support & Maintenance track, so nothing falls through the cracks.",
      },
    ],
  },
  closing: {
    heading: "Have a system in mind?",
    description:
      "Tell us what you're trying to build and we'll scope it together.",
    primaryCta: {
      label: "Book a Consultation",
      href: "/services/consultation",
    },
    secondaryCta: { label: "Back to Services", href: "/services" },
  },
};

const inclusionIcons: Record<
  InclusionIconKey,
  React.ComponentType<{ className?: string }>
> = {
  web: Globe,
  dashboard: LayoutDashboard,
  integrations: Plug,
  database: Database,
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function CustomDevelopmentPage() {
  const content = customDevelopmentContent;

  return (
    <>
      <ServiceHeroSection hero={content.hero} />
      <InclusionsSection section={content.inclusions} />
      <ProcessSection section={content.process} />
      <EngagementSection section={content.engagement} />
      <ClosingCtaSection closing={content.closing} />
    </>
  );
}

function ServiceHeroSection({ hero }: { hero: ServiceHero }) {
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
          <a href="/services" className="transition-colors hover:text-primary">
            Services
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

function InclusionsSection({
  section,
}: {
  section: CustomDevelopmentContent["inclusions"];
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
            const Icon = inclusionIcons[item.icon];
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

function ProcessSection({
  section,
}: {
  section: CustomDevelopmentContent["process"];
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
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {section.steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative pl-0"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-semibold text-primary/25">
                  {step.step}
                </span>
                {index < section.steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-border lg:block" />
                )}
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EngagementSection({
  section,
}: {
  section: CustomDevelopmentContent["engagement"];
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
