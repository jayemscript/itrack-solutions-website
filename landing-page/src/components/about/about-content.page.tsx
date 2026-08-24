"use client";

import { Badge, Button } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Award, Clock, Target, Zap } from "lucide-react";

const TEAM = [
  {
    code: "CMD-01",
    name: "Ramil Peralta",
    role: "Founder / Owner",
    sys: "Strategy & Vision",
    years: 11,
    status: "active",
  },
  {
    code: "OPS-01",
    name: "Chris Peralta",
    role: "Senior IT Manager",
    sys: "Operations & Infra",
    years: 9,
    status: "active",
  },
  {
    code: "OPS-02",
    name: "Rhona Ceres Rosel",
    role: "IT Manager",
    sys: "Service Delivery",
    years: 7,
    status: "active",
  },
  {
    code: "DEV-01",
    name: "John Estel Peralta",
    role: "Senior Full Stack Dev",
    sys: "Core Platform",
    years: 8,
    status: "active",
  },
  {
    code: "DEV-02",
    name: "Carl Oring",
    role: "Senior Full Stack Dev",
    sys: "Integrations",
    years: 6,
    status: "active",
  },
  {
    code: "DEV-03",
    name: "John Mark Pulmano",
    role: "Senior Full Stack Dev",
    sys: "Mobile & POS",
    years: 5,
    status: "active",
  },
  {
    code: "FIN-01",
    name: "Melfel Taccabban",
    role: "Finance and HR",
    sys: "Admin & Compliance",
    years: 4,
    status: "active",
  },
];

const TIMELINE = [
  {
    year: "2015",
    event: "ITrack Solutions founded",
    detail: "Single-founder operation · custom dev only",
  },
  {
    year: "2017",
    event: "Hardware line launched",
    detail: "Industrial mobile devices · RFID tags",
  },
  {
    year: "2019",
    event: "Managed services added",
    detail: "24/7 support · single SLA model",
  },
  {
    year: "2021",
    event: "POS hardware division",
    detail: "Countertop + mobile terminals",
  },
  {
    year: "2023",
    event: "Team reaches 7 members",
    detail: "Full-cycle capability · zero subcontractors",
  },
  {
    year: "2025",
    event: "12,000+ units deployed",
    detail: "Across retail, logistics, hospitality",
  },
];

const VALUES = [
  {
    icon: Clock,
    tag: "+RESPONSE",
    title: "Speed of Reply",
    description:
      "Average first response under 4 hours — measured, not promised.",
    visual: "response" as const,
  },
  {
    icon: Target,
    tag: "+RETENTION",
    title: "Team Stability",
    description:
      "Average tenure 7+ years. The people who scope your project stay on it.",
    visual: "retention" as const,
  },
  {
    icon: Award,
    tag: "+CERTIFIED",
    title: "Compliance First",
    description: "PCI PTS, EMV, ISO — we hold the certs so you don't have to.",
    visual: "certs" as const,
  },
  {
    icon: Zap,
    tag: "+ACCOUNTABLE",
    title: "One Throat to Choke",
    description: "No vendor ping-pong. One team owns the outcome end to end.",
    visual: "accountable" as const,
  },
];

const HERO = {
  eyebrow: "ABOUT ITRACK SOLUTIONS",
  headline: {
    lead: "Built by the same seven people",
    emphasis: "who show up when something breaks.",
  },
  description:
    "Itrack Solutions INC has grown from a single-founder custom dev shop into a full-cycle systems partner — without ever handing your project off to a subcontractor.",
  primaryCta: { label: "Talk to the Team", href: "/services/consultation" },
  secondaryCta: { label: "Meet the Team", href: "#team" },
};

const VALUES_INTRO = {
  eyebrow: "WHY IT HOLDS UP",
  heading: "Four things we measure, not market.",
  description:
    "Every claim below is something we track internally, not a line from a brochure.",
};

const TEAM_INTRO = {
  eyebrow: "THE ROSTER",
  heading: "Seven people, no subcontractors.",
  description:
    "Every project is scoped, built, and supported by someone on this list — not handed off once the contract is signed.",
};

const TIMELINE_INTRO = {
  eyebrow: "CHANGELOG",
  heading: "Ten years, six releases.",
  description:
    "The short version of how a one-person shop became a seven-person systems team.",
};

const CLOSING = {
  heading: "Want to work with the team behind this?",
  description:
    "No account managers relaying messages — you talk directly to the people building your system.",
  primaryCta: { label: "Talk to the Team", href: "/services/consultation" },
  secondaryCta: { label: "View Services", href: "/services" },
};

const MAX_TENURE = Math.max(...TEAM.map((member) => member.years));

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function AboutContentPage() {
  return (
    <>
      <AboutHeroSection />
      <ValuesSection />
      <TimelineSection />
      <TeamSection />
      <ClosingCtaSection />
    </>
  );
}

function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <BlueprintBackdrop />

      <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-24 lg:px-8 lg:pb-20 lg:pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="font-mono text-[11px] font-medium uppercase tracking-widest text-secondary"
          >
            {HERO.eyebrow}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
          >
            <span className="block">{HERO.headline.lead}</span>
            <span className="block text-primary">{HERO.headline.emphasis}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {HERO.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg">
              <a
                href={HERO.primaryCta.href}
                className="inline-flex items-center gap-2"
              >
                {HERO.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={HERO.secondaryCta.href}>{HERO.secondaryCta.label}</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section id="values" className="bg-muted/40 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionIntroBlock section={VALUES_INTRO} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.tag}
                variants={itemVariants}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-secondary">
                    {value.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
                <div className="mt-auto pt-5">
                  <ValueVisual visual={value.visual} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ValueVisual({
  visual,
}: {
  visual: (typeof VALUES)[number]["visual"];
}) {
  if (visual === "response") {
    return (
      <div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[15%] rounded-full bg-primary" />
        </div>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          &lt; 4 HRS avg. first response
        </p>
      </div>
    );
  }

  if (visual === "retention") {
    return (
      <div className="flex h-10 items-end gap-1">
        {TEAM.map((member) => (
          <div
            key={member.code}
            className="w-2 rounded-t-sm bg-primary/60"
            style={{ height: `${(member.years / MAX_TENURE) * 100}%` }}
          />
        ))}
      </div>
    );
  }

  if (visual === "certs") {
    return (
      <div className="flex flex-wrap gap-1.5">
        {["PCI PTS", "EMV", "ISO"].map((cert) => (
          <Badge
            key={cert}
            variant="outline"
            className="font-mono text-[10px] font-normal uppercase tracking-wide text-muted-foreground"
          >
            {cert}
          </Badge>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
      <span className="rounded-full border border-border px-2 py-1">You</span>
      <span className="h-px flex-1 bg-border" />
      <span className="rounded-full bg-primary px-2 py-1 text-primary-foreground">
        Itrack
      </span>
    </div>
  );
}

function TimelineSection() {
  return (
    <section id="changelog" className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionIntroBlock section={TIMELINE_INTRO} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 space-y-0"
        >
          {TIMELINE.map((entry, index) => (
            <motion.div
              key={entry.year}
              variants={itemVariants}
              className="relative flex gap-5 pb-8"
            >
              <div className="flex flex-col items-center">
                <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                {index < TIMELINE.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-border" />
                )}
              </div>
              <div className="-mt-1.5 flex-1">
                <span className="inline-block rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
                  v{entry.year}
                </span>
                <h3 className="mt-2 text-base font-semibold text-foreground">
                  {entry.event}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {entry.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="bg-muted/40 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionIntroBlock section={TEAM_INTRO} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="hidden grid-cols-[80px_1.6fr_1fr_60px_100px] gap-4 border-b border-border bg-muted/60 px-6 py-3 sm:grid">
            {["Code", "Name / Role", "System", "Yrs", "Status"].map((label) => (
              <span
                key={label}
                className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="divide-y divide-border">
            {TEAM.map((member) => (
              <motion.div
                key={member.code}
                variants={itemVariants}
                className="grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-[80px_1.6fr_1fr_60px_100px] sm:items-center sm:gap-4"
              >
                <span className="font-mono text-sm font-semibold text-primary">
                  {member.code}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {member.sys}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {member.years}y
                </span>
                <div className="flex items-center gap-2">
                  <StatusDot />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {member.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ClosingCtaSection() {
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
              {CLOSING.heading}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
              {CLOSING.description}
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
                href={CLOSING.primaryCta.href}
                className="inline-flex items-center gap-2"
              >
                {CLOSING.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
            >
              <a href={CLOSING.secondaryCta.href}>
                {CLOSING.secondaryCta.label}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
    </span>
  );
}

function SectionIntroBlock({
  section,
}: {
  section: { eyebrow: string; heading: string; description: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-xl"
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
