"use client";

import { Button } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  DollarSign,
  FileText,
  Handshake,
  ListChecks,
  Search,
} from "lucide-react";

type InclusionIconKey =
  | "audit"
  | "requirements"
  | "estimate"
  | "recommendation";

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

interface PromisePoint {
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

interface ConsultationServiceContent {
  hero: ServiceHero;
  inclusions: SectionIntro & { items: InclusionItem[] };
  process: SectionIntro & { steps: ProcessStep[] };
  promise: SectionIntro & { points: PromisePoint[] };
  closing: ClosingCta;
}

const consultationServiceContent: ConsultationServiceContent = {
  hero: {
    breadcrumbCurrent: "Consultation",
    eyebrow: "CONSULTATION",
    headline: {
      lead: "Know what you're building",
      emphasis: "before you spend a peso on it.",
    },
    description:
      "A structured consultation before any contract — we audit what you have, map what you need, and hand you a clear plan whether you build with us or not.",
    primaryCta: { label: "Schedule a Call", href: "/contact" },
    secondaryCta: { label: "View All Services", href: "/services" },
  },
  inclusions: {
    eyebrow: "WHAT'S INCLUDED",
    heading: "One session, real answers.",
    description:
      "Consultation isn't a sales call — it's scoping work, and you keep what comes out of it.",
    items: [
      {
        id: "audit",
        title: "Technical Audit",
        description:
          "A clear-eyed look at what you're running now, and what's actually wrong with it.",
        icon: "audit",
      },
      {
        id: "requirements",
        title: "Requirements Mapping",
        description:
          "What the system actually needs to do, translated from what your team experiences day to day.",
        icon: "requirements",
      },
      {
        id: "estimate",
        title: "Cost & Timeline Estimate",
        description:
          "A realistic range for budget and delivery, before anything is signed.",
        icon: "estimate",
      },
      {
        id: "recommendation",
        title: "Written Recommendation",
        description:
          "A documented plan you can act on, hand to another vendor, or bring back to us.",
        icon: "recommendation",
      },
    ],
  },
  process: {
    eyebrow: "HOW IT WORKS",
    heading: "A process that respects your time.",
    description: "Four steps from first message to a plan you can act on.",
    steps: [
      {
        id: "intake",
        step: "01",
        title: "Intake",
        description:
          "You tell us what's broken, what's missing, or what you're considering building.",
      },
      {
        id: "discovery-call",
        step: "02",
        title: "Discovery Call",
        description:
          "A structured conversation to understand your workflow, constraints, and goals.",
      },
      {
        id: "assessment",
        step: "03",
        title: "Assessment",
        description:
          "We evaluate your current systems and options against what you actually need.",
      },
      {
        id: "recommendation-step",
        step: "04",
        title: "Recommendation",
        description:
          "You receive a written plan — scope, approach, timeline, and cost.",
      },
    ],
  },
  promise: {
    eyebrow: "NO OBLIGATION",
    heading: "No pressure, no obligation.",
    description:
      "The consultation stands on its own — here's what that means in practice.",
    points: [
      {
        id: "keep-it",
        title: "Yours to keep",
        description:
          "The audit and recommendation are yours whether or not you move forward with us.",
      },
      {
        id: "no-pressure",
        title: "No pressure to sign",
        description:
          "We tell you if a smaller fix solves it — not just the most billable option.",
      },
      {
        id: "flat-fee",
        title: "Flat, upfront fee",
        description:
          "Consultation pricing is fixed and quoted before the call, never open-ended.",
      },
    ],
  },
  closing: {
    heading: "Ready to talk it through?",
    description:
      "Book a consultation and get a written plan back — no commitment required.",
    primaryCta: { label: "Schedule a Call", href: "/contact" },
    secondaryCta: { label: "Back to Services", href: "/services" },
  },
};

const inclusionIcons: Record<
  InclusionIconKey,
  React.ComponentType<{ className?: string }>
> = {
  audit: Search,
  requirements: ListChecks,
  estimate: DollarSign,
  recommendation: FileText,
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function ConsultationServicePage() {
  const content = consultationServiceContent;

  return (
    <>
      <ServiceHeroSection hero={content.hero} />
      <InclusionsSection section={content.inclusions} />
      <ProcessSection section={content.process} />
      <PromiseSection section={content.promise} />
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
  section: ConsultationServiceContent["inclusions"];
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
  section: ConsultationServiceContent["process"];
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

function PromiseSection({
  section,
}: {
  section: ConsultationServiceContent["promise"];
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
                <Handshake className="h-3.5 w-3.5 text-primary-foreground" />
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
