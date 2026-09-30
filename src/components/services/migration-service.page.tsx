"use client";

import { Button } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Database,
  RefreshCw,
  ShieldCheck,
  Timer,
  Users,
} from "lucide-react";

type InclusionIconKey = "data" | "modernization" | "cutover" | "training";

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

interface AssurancePoint {
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

interface MigrationServiceContent {
  hero: ServiceHero;
  inclusions: SectionIntro & { items: InclusionItem[] };
  process: SectionIntro & { steps: ProcessStep[] };
  assurance: SectionIntro & { points: AssurancePoint[] };
  closing: ClosingCta;
}

const migrationServiceContent: MigrationServiceContent = {
  hero: {
    breadcrumbCurrent: "Legacy Migration",
    eyebrow: "LEGACY MIGRATION",
    headline: {
      lead: "Move off the old system,",
      emphasis: "without losing what it took years to build.",
    },
    description:
      "We migrate aging POS, business, and back-office systems onto modern infrastructure — preserving your data and history while removing the parts that hold you back.",
    primaryCta: { label: "Start a Migration", href: "/services/consultation" },
    secondaryCta: { label: "View All Services", href: "/services" },
  },
  inclusions: {
    eyebrow: "WHAT'S INCLUDED",
    heading: "Nothing gets left behind.",
    description:
      "Migration covers the data, the workflows, and the people who depend on both.",
    items: [
      {
        id: "data",
        title: "Data Migration",
        description:
          "Records, transaction history, and customer data moved and verified — not just copied.",
        icon: "data",
      },
      {
        id: "modernization",
        title: "System Modernization",
        description: "Legacy software rebuilt on a current, supportable stack.",
        icon: "modernization",
      },
      {
        id: "cutover",
        title: "Zero-Downtime Cutover",
        description:
          "Migration planned around your business hours, not the other way around.",
        icon: "cutover",
      },
      {
        id: "training",
        title: "Staff Retraining",
        description:
          "Your team walked through the new system before go-live, not after.",
        icon: "training",
      },
    ],
  },
  process: {
    eyebrow: "HOW IT WORKS",
    heading: "A migration path with no surprises.",
    description:
      "Four phases, reviewed with you at every step — never a black box.",
    steps: [
      {
        id: "audit",
        step: "01",
        title: "Audit",
        description:
          "We inventory the current system, its data, and every workflow that depends on it.",
      },
      {
        id: "plan",
        step: "02",
        title: "Migration Plan",
        description:
          "A cutover plan with rollback points, reviewed and approved before anything moves.",
      },
      {
        id: "migrate",
        step: "03",
        title: "Migrate & Verify",
        description:
          "Data and workflows move in stages, verified against the legacy system at each step.",
      },
      {
        id: "cutover-support",
        step: "04",
        title: "Cutover & Support",
        description:
          "Go-live with the old system on standby until the new one's proven out.",
      },
    ],
  },
  assurance: {
    eyebrow: "OUR GUARDRAILS",
    heading: "Safeguards for a system you can't afford to break.",
    description:
      "Migration is high-stakes by nature. Here's how we keep it safe.",
    points: [
      {
        id: "rollback",
        title: "Rollback safety net",
        description:
          "The legacy system stays live and untouched until the new one is verified and signed off.",
      },
      {
        id: "integrity",
        title: "Data integrity checks",
        description:
          "Every migrated record is checked against the source system before cutover.",
      },
      {
        id: "scope",
        title: "Scoped to your contract",
        description:
          "Timeline, scope, and support window are agreed before migration begins.",
      },
    ],
  },
  closing: {
    heading: "Still running on the old system?",
    description:
      "Tell us what you're on now and where you want to land — we'll map the safest path there.",
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
  data: Database,
  modernization: RefreshCw,
  cutover: Timer,
  training: Users,
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function MigrationServicePage() {
  const content = migrationServiceContent;

  return (
    <>
      <ServiceHeroSection hero={content.hero} />
      <InclusionsSection section={content.inclusions} />
      <ProcessSection section={content.process} />
      <AssuranceSection section={content.assurance} />
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
  section: MigrationServiceContent["inclusions"];
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
  section: MigrationServiceContent["process"];
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

function AssuranceSection({
  section,
}: {
  section: MigrationServiceContent["assurance"];
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
                <ShieldCheck className="h-3.5 w-3.5 text-primary-foreground" />
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
