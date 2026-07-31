"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Terminal,
  ArrowRight,
  ArrowUpRight,
  Plus,
  Hash,
  Activity,
  Check,
  ShieldCheck,
  Package,
  Truck,
  Workflow,
  FileText,
  Gauge,
  Layers,
  Users,
  Calendar,
  Award,
  Clock,
  Target,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ------------------------------------------------------------------ */
/*  Count-up                                                           */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

/* ------------------------------------------------------------------ */
/*  Styles (self-contained, namespaced about-)                         */
/* ------------------------------------------------------------------ */

const aboutStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.about-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 72%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 92% 80% at 50% 14%, black 6%, transparent 80%);
  mask-image: radial-gradient(ellipse 92% 80% at 50% 14%, black 6%, transparent 80%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 7%, transparent); color: transparent; }
.text-stroke-light  { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--background) 14%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes about-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.about-blink { animation: about-blink 1s step-end infinite; }

@keyframes about-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.about-pulse { animation: about-pulse 1.6s ease-out infinite; }

@keyframes about-bar { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
.about-bar { transform-origin: bottom; animation: about-bar 1.1s ease-in-out infinite; }

@keyframes about-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.about-marquee { animation: about-marquee 30s linear infinite; }
.about-marquee:hover { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .about-blink, .about-pulse, .about-bar, .about-marquee { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  Small bits                                                         */
/* ------------------------------------------------------------------ */

function CropTicks() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-border transition-colors duration-300 group-hover:border-secondary"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-border transition-colors duration-300 group-hover:border-secondary"
      />
    </>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="about-pulse h-2 w-2 shrink-0 bg-secondary" />
      <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Values visuals                                                     */
/* ------------------------------------------------------------------ */

function ResponseVisual() {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            className="stroke-border"
            strokeWidth="5"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            className="stroke-secondary"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.92 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-base font-bold leading-none text-foreground">
            &lt;4h
          </span>
          <span className="font-tech text-[7px] tracking-[0.18em] text-muted-foreground">
            AVG
          </span>
        </div>
      </div>
      <div className="min-w-0 font-tech text-[9px] leading-relaxed tracking-[0.14em] text-muted-foreground">
        FIRST RESPONSE
        <br />
        BUSINESS HOURS
      </div>
    </div>
  );
}

function RetentionVisual() {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between font-tech text-[9px] tracking-[0.16em] text-muted-foreground">
        <span>AVG TENURE</span>
        <span className="text-secondary">7+ YRS</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden bg-muted">
        <motion.span
          className="block h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: "85%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </div>
      <div className="mt-2 flex gap-1" aria-hidden>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <span key={i} className="h-1.5 flex-1 bg-primary/70" />
        ))}
      </div>
    </div>
  );
}

function CertsVisual() {
  return (
    <div className="flex min-w-0 flex-wrap gap-2">
      {["PCI PTS", "EMV L1/L2", "ISO 18000", "PA-DSS"].map((c) => (
        <span
          key={c}
          className="clip-corner inline-flex items-center gap-1.5 border border-border bg-background px-2 py-1 font-tech text-[9px] tracking-[0.12em] text-foreground"
        >
          <Check className="h-3 w-3 text-secondary" />
          {c}
        </span>
      ))}
    </div>
  );
}

function AccountableVisual() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-secondary/10">
        <Users className="h-5 w-5 text-secondary" />
      </div>
      <div className="min-w-0 font-tech text-[9px] leading-relaxed tracking-[0.14em] text-muted-foreground">
        1 TEAM · 0 SUBCONTRACTORS
        <br />
        SINCE 2015
      </div>
    </div>
  );
}

function ValueVisual({
  kind,
}: {
  kind: "response" | "retention" | "certs" | "accountable";
}) {
  if (kind === "response") return <ResponseVisual />;
  if (kind === "retention") return <RetentionVisual />;
  if (kind === "certs") return <CertsVisual />;
  return <AccountableVisual />;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function AboutContentPage() {
  const statRef = useRef<HTMLDivElement | null>(null);
  const statStarted = useInView(statRef, { once: true, amount: 0.6 });
  const years = useCountUp(11, statStarted);

  return (
    <div className="relative isolate w-full overflow-x-clip bg-background text-foreground">
      <style>{aboutStyles}</style>

      {/* ── context bar ── */}
      <div className="relative z-20 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6 lg:px-8">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">
              itrack <span className="text-border">/</span> about{" "}
              <span className="text-border">/</span>{" "}
              <span className="text-foreground">crew-manifest</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-primary">
            <span className="about-pulse h-1.5 w-1.5 bg-primary" />
            ALL HANDS ON DECK
          </span>
        </div>
      </div>

      {/* ════════════════════════ HERO — manifesto + stats ════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="about-dotgrid absolute inset-0" />
          <span className="font-display absolute -top-6 right-0 hidden select-none text-[9rem] font-bold leading-none text-stroke-faint lg:block xl:text-[12rem]">
            CREW
          </span>
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8"
          >
            {/* left masthead */}
            <div className="min-w-0 lg:col-span-7">
              <motion.div variants={fadeUp}>
                <SectionTag>
                  <span className="text-secondary">[</span> ABOUT_ITRACK{" "}
                  <span className="text-secondary">]</span> THE PEOPLE BEHIND
                  THE STACK
                </SectionTag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display mt-5 text-[2.6rem] font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-[3.9rem]"
              >
                <span className="block">ONE TEAM.</span>
                <span className="text-stroke-strong block">NO HANDOFFS.</span>
                <span className="block">
                  SINCE <span className="text-secondary">2015.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                We're not a marketplace of freelancers or a chain of
                subcontracted vendors. Seven people, one accountable owner, and
                a decade of shipping hardware and software as a single system.
                The person who scopes your project is the person who answers
                when something breaks.
              </motion.p>

              <motion.div
                ref={statRef}
                variants={fadeUp}
                className="mt-9 grid grid-cols-3 gap-3 border-t border-border pt-6"
              >
                {[
                  [String(years), "YEARS IN SEAT"],
                  ["7", "TEAM MEMBERS"],
                  ["0", "SUBCONTRACTORS"],
                ].map(([v, k]) => (
                  <div key={k} className="min-w-0">
                    <div className="font-display text-2xl font-bold leading-none tracking-tight text-foreground sm:text-3xl">
                      {v}
                    </div>
                    <div className="mt-1.5 font-tech text-[9px] tracking-[0.2em] text-muted-foreground">
                      {k}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* right — timeline */}
            <motion.div variants={fadeUp} className="min-w-0 lg:col-span-5">
              <div className="clip-corner relative overflow-hidden border border-border bg-card p-6">
                <CropTicks />
                <div className="mb-4 font-tech text-[10px] tracking-[0.28em] text-muted-foreground">
                  BUILD_TIMELINE //
                </div>
                <div className="relative space-y-0">
                  {/* vertical line */}
                  <span
                    aria-hidden
                    className="absolute left-[7px] top-2 bottom-2 w-px bg-border"
                  />
                  {TIMELINE.map((t, i) => (
                    <div
                      key={t.year}
                      className="group relative flex min-w-0 items-start gap-4 pb-5 last:pb-0"
                    >
                      {/* node */}
                      <div className="relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background transition-colors duration-300 group-hover:border-secondary">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground transition-colors duration-300 group-hover:bg-secondary" />
                      </div>
                      {/* content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.2em]">
                          <span className="font-semibold text-secondary">
                            {t.year}
                          </span>
                          <span className="h-3 w-px bg-border" />
                          <span className="truncate text-muted-foreground">
                            {t.event}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground/70">
                          {t.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─ values marquee ── */}
      <div className="relative border-y border-border bg-card/40">
        <div className="overflow-hidden py-3">
          <div className="about-marquee flex w-max whitespace-nowrap">
            {[
              "ONE TEAM",
              "NO HANDOFFS",
              "SINGLE SLA",
              "IN-HOUSE ONLY",
              "SINCE 2015",
              "7 MEMBERS",
              "0 SUBCONTRACTORS",
              "FULL CYCLE",
            ]
              .concat([
                "ONE TEAM",
                "NO HANDOFFS",
                "SINGLE SLA",
                "IN-HOUSE ONLY",
                "SINCE 2015",
                "7 MEMBERS",
                "0 SUBCONTRACTORS",
                "FULL CYCLE",
              ])
              .map((item, i) => (
                <span
                  key={i}
                  className="mx-3 flex items-center gap-3 font-tech text-[10px] tracking-[0.24em] text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 bg-secondary" />
                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════ CREW MANIFEST — team cards ════════════════════════ */}
      <section className="relative border-t border-border py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
          >
            <div className="min-w-0 lg:col-span-7">
              <motion.div variants={fadeUp}>
                <SectionTag>
                  <span className="text-secondary">[</span> CREW_MANIFEST{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">SEVEN PEOPLE.</span>
                <span className="text-stroke-strong block">
                  ONE ACCOUNTABLE OWNER.
                </span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              No org chart layers, no departmental silos. Each member owns a
              subsystem and stays on your project from discovery through
              deployment and beyond. Here's who's actually doing the work.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          >
            {TEAM.map((m, i) => (
              <motion.div
                key={m.code}
                variants={cardIn}
                className="group clip-corner relative flex min-w-0 flex-col overflow-hidden border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7"
              >
                <CropTicks />
                <span
                  aria-hidden
                  className="font-display pointer-events-none absolute -top-5 right-2 select-none text-[5.5rem] font-bold leading-none text-stroke-faint"
                >
                  {m.code.split("-")[1]}
                </span>

                {/* header row */}
                <div className="relative z-10 flex min-w-0 items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2.5 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                    <span className="font-semibold text-secondary">
                      {m.code}
                    </span>
                    <span className="h-3 w-px bg-border" />
                    <span
                      className={`flex items-center gap-1 ${
                        m.status === "active"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${m.status === "active" ? "bg-primary about-pulse" : "bg-muted-foreground"}`}
                      />
                      {m.status.toUpperCase()}
                    </span>
                  </span>
                </div>

                {/* name + role */}
                <div className="relative z-10 mt-4 min-w-0">
                  <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                    {m.name}
                  </h3>
                  <p className="mt-1 font-tech text-[10px] tracking-[0.16em] text-secondary">
                    {m.role}
                  </p>
                </div>

                {/* subsystem + years */}
                <div className="relative z-10 mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex min-w-0 items-center font-tech text-[10px] tracking-[0.16em]">
                    <span className="text-muted-foreground">SUBSYSTEM</span>
                    <span className="mx-2.5 h-px flex-1 border-b border-dashed border-border" />
                    <span className="font-semibold text-foreground">
                      {m.sys}
                    </span>
                  </div>
                  <div className="flex min-w-0 items-center font-tech text-[10px] tracking-[0.16em]">
                    <span className="text-muted-foreground">TENURE</span>
                    <span className="mx-2.5 h-px flex-1 border-b border-dashed border-border" />
                    <span className="font-semibold text-primary">
                      {m.years}Y
                    </span>
                  </div>
                </div>

                {/* avatar placeholder (initials) */}
                <div className="relative z-10 mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background font-tech text-sm font-bold text-muted-foreground">
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ VALUES BENCH — culture as metrics ════════════════════════ */}
      <section className="relative border-t border-border bg-card/40 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
          >
            <div className="min-w-0 lg:col-span-7">
              <motion.div variants={fadeUp}>
                <SectionTag>
                  <span className="text-secondary">[</span> VALUES_BENCH{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">CULTURE WE CAN</span>
                <span className="text-stroke-strong block">
                  PUT ON A BENCH.
                </span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              "Great culture" is easy to claim. We'd rather show the response
              time, the retention rate, the certifications, and the
              accountability structure — measured, not marketed.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
          >
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={cardIn}
                  className="group clip-corner relative flex min-w-0 flex-col overflow-hidden border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7"
                >
                  <CropTicks />
                  <div className="relative z-10 flex min-w-0 items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2.5 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                      <span className="h-3 w-px bg-border" />
                      <span className="truncate">{v.tag}</span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-card transition-colors duration-300 group-hover:border-primary">
                      <Icon className="h-4 w-4 text-primary transition-colors duration-300 group-hover:text-secondary" />
                    </span>
                  </div>
                  <h3 className="relative z-10 font-display mt-4 text-xl font-bold tracking-tight text-foreground">
                    {v.title}
                  </h3>
                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                  <div className="relative z-10 mt-auto border-t border-border pt-5">
                    <ValueVisual kind={v.visual} />
                  </div>
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ CTA — meet-the-team console ════════════════════════ */}
      <section
        id="contact"
        className="relative scroll-mt-24 border-t border-border py-16 lg:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="clip-corner relative overflow-hidden border border-foreground bg-foreground p-7 text-background sm:p-10 lg:p-12"
          >
            <span
              aria-hidden
              className="font-display pointer-events-none absolute -bottom-10 -right-3 select-none text-[9rem] font-bold leading-none text-stroke-light"
            >
              MEET
            </span>

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              {/* prompt */}
              <div className="min-w-0 lg:col-span-7">
                <div className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-secondary">
                  <span className="about-pulse h-1.5 w-1.5 bg-secondary" />
                  MEET_THE_TEAM //
                </div>

                <div className="mt-5 min-w-0 overflow-hidden border border-background/15 bg-background/5 p-4 font-tech text-[12px] sm:text-[13px]">
                  <div className="flex min-w-0">
                    <span className="select-none pr-2 text-secondary">$</span>
                    <span className="min-w-0 truncate text-background/90">
                      itrack intro --team all --format call
                      <span className="about-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-secondary" />
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-0.5 text-background/45">
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> 30-min
                      discovery call · no pitch
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> meet the
                      actual people on your project
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> walk through
                      your requirements live
                    </div>
                  </div>
                </div>

                <h2 className="font-display mt-6 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3.2rem]">
                  <span className="block">READY TO MEET</span>
                  <span className="block">
                    <span className="text-secondary">THE TEAM?</span>
                  </span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/65 sm:text-base">
                  Skip the sales rep. Talk directly to the people who will
                  build, deploy, and support your system. One call, seven
                  voices, zero handoffs.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="#contact"
                    className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-background hover:text-foreground"
                  >
                    SCHEDULE INTRO CALL
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/services"
                    className="clip-corner inline-flex items-center justify-center gap-3 border border-background/25 px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/10"
                  >
                    BACK TO REGISTRY
                  </Link>
                </div>
              </div>

              {/* readout */}
              <div className="min-w-0 lg:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["CALL LENGTH", "30 MIN", Clock],
                    ["PREP NEEDED", "NONE", Package],
                    ["FOLLOW-UP", "&lt;24H", Activity],
                    ["COMMITMENT", "ZERO", ShieldCheck],
                  ].map(([k, v, Icon], i) => {
                    const Ic = Icon as React.ElementType;
                    return (
                      <div
                        key={k as string}
                        className="clip-corner border border-background/15 bg-background/5 p-4"
                      >
                        <div className="flex items-center gap-2">
                          <Ic className="h-3.5 w-3.5 text-secondary" />
                          <span className="font-tech text-[9px] tracking-[0.24em] text-background/45">
                            {k as string}
                          </span>
                        </div>
                        <div
                          className={`font-display mt-1.5 text-xl font-bold tracking-tight ${
                            (i as number) % 2 === 0
                              ? "text-secondary"
                              : "text-background"
                          }`}
                        >
                          {v as string}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="clip-corner mt-3 flex items-center gap-3 border border-background/15 bg-background/5 p-4">
                  <Workflow className="h-6 w-6 shrink-0 text-secondary" />
                  <div className="min-w-0">
                    <div className="font-tech text-[10px] font-semibold tracking-[0.18em] text-background">
                      TALK TO THE BUILDERS, NOT THE SELLERS
                    </div>
                    <div className="truncate text-[11px] text-background/55">
                      the people who scope it are the people who ship it
                    </div>
                  </div>
                </div>

                <div className="clip-corner mt-3 flex items-center justify-between gap-3 border border-background/15 bg-background/5 p-4 font-tech text-[11px] tracking-[0.16em]">
                  <span className="text-background/55">AVAILABILITY</span>
                  <span className="font-semibold text-secondary">OPEN</span>
                  <span className="flex items-center gap-1.5 text-background/40">
                    <Gauge className="h-3 w-3" /> slots this week
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* footer index */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
            <span className="flex items-center gap-2.5">
              <Hash className="h-3 w-3 text-secondary" />
              ABOUT // CREW_MANIFEST
            </span>
            <span className="flex items-center gap-2.5">
              <Plus className="h-3 w-3 rotate-45 text-secondary" />
              NEXT: CONTACT US →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
