"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Code2,
  Zap,
  ShieldCheck,
  Users,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Hash,
  Activity,
  GitCommitHorizontal,
  Terminal,
  Cpu,
  Boxes,
  Database,
  Cloud,
  Smartphone,
  Workflow,
  Building2,
  Layers,
  Plug,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    hash: "a1f9c2",
    icon: Code2,
    tag: "+FULLSTACK",
    title: "Full Stack Development",
    description:
      "Frontend, backend, and database solutions tailored to your needs.",
    metric: 96,
  },
  {
    hash: "7d3e0b",
    icon: Zap,
    tag: "+VELOCITY",
    title: "Fast Implementation",
    description:
      "Agile approach for quick delivery without sacrificing quality.",
    metric: 88,
  },
  {
    hash: "c4821f",
    icon: ShieldCheck,
    tag: "+HARDENED",
    title: "Secure & Scalable",
    description: "Enterprise-grade security with growth-ready architecture.",
    metric: 99,
  },
  {
    hash: "0e6a55",
    icon: Users,
    tag: "+DEDICATED",
    title: "Dedicated Team",
    description: "Your own development team focused on your project success.",
    metric: 100,
  },
];

const PROCESS = [
  {
    code: "PHASE_01",
    title: "Discovery",
    description:
      "We understand your business goals, challenges, and requirements.",
  },
  {
    code: "PHASE_02",
    title: "Strategy",
    description: "Create detailed technical roadmap and architecture design.",
  },
  {
    code: "PHASE_03",
    title: "Development",
    description: "Build your solution with regular updates and feedback loops.",
  },
  {
    code: "PHASE_04",
    title: "Deployment",
    description: "Launch, monitor, and optimize for maximum performance.",
  },
];

const TECH_MARQUEE_A = [
  "React / Next.js",
  "TypeScript",
  "JavaScript (ES6+)",
  "Node.js",
  "Express.js",
  "Python",
  "FastAPI",
  "GraphQL",
  "REST APIs",
  "PostgreSQL",
  "Prisma",
  "Drizzle ORM",
  "Tailwind CSS",
  "shadcn/ui",
  "React Query",
  "Zustand",
];

const TECH_MARQUEE_B = [
  "MongoDB",
  "Redis",
  "MySQL",
  "AWS / Cloud",
  "Docker",
  "Kubernetes",
  "Git",
  "GitHub Actions",
  "CI / CD",
  "Linux",
  "Nginx",
  "JWT / OAuth",
  "OpenAI API",
  "LangChain",
  "Playwright",
  "Jest",
];

const TECH_LAYERS = [
  {
    icon: Layers,
    layer: "FRONTEND",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "React Query",
      "Zustand",
    ],
  },
  {
    icon: Cpu,
    layer: "BACKEND",
    items: [
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "PHP",
      "Laravel",
      "GraphQL",
      "REST APIs",
      "Prisma",
    ],
  },
  {
    icon: Database,
    layer: "DATA",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Drizzle ORM"],
  },
  {
    icon: Cloud,
    layer: "INFRA",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "CI/CD",
      "Linux",
      "Nginx",
    ],
  },
];

const USE_CASES = [
  {
    icon: Building2,
    fit: "SCALE // ENTERPRISE",
    title: "Enterprise Systems",
    description: "Complex business applications for large organizations.",
  },
  {
    icon: Boxes,
    fit: "MODEL // MULTI-TENANT",
    title: "SaaS Platforms",
    description: "Scalable multi-tenant applications with subscription models.",
  },
  {
    icon: Smartphone,
    fit: "REACH // NATIVE + CROSS",
    title: "Mobile Apps",
    description: "Native and cross-platform mobile solutions.",
  },
  {
    icon: Plug,
    fit: "SCOPE // CONNECTED",
    title: "API Integration",
    description:
      "Seamless integration with existing systems and third-party services.",
  },
];

const CODE_LINES: { n: number; tokens: React.ReactNode }[] = [
  {
    n: 1,
    tokens: (
      <span className="text-white/35">
        // your system, written from scratch
      </span>
    ),
  },
  {
    n: 2,
    tokens: (
      <>
        <span className="text-secondary">import</span>{" "}
        <span className="text-white/80">{"{ build, ship }"}</span>{" "}
        <span className="text-secondary">from</span>{" "}
        <span className="text-primary-foreground/80">'@itrack/core'</span>
      </>
    ),
  },
  { n: 3, tokens: <span className="text-white/35">&nbsp;</span> },
  {
    n: 4,
    tokens: (
      <>
        <span className="text-secondary">export const</span>{" "}
        <span className="text-white">system</span>{" "}
        <span className="text-white/55">=</span>{" "}
        <span className="text-secondary">async</span>{" "}
        <span className="text-white/80">(spec)</span>{" "}
        <span className="text-white/55">=&gt; {"{"}</span>
      </>
    ),
  },
  {
    n: 5,
    tokens: (
      <>
        <span className="text-white/55">&nbsp;&nbsp;const app = </span>
        <span className="text-secondary">await</span>{" "}
        <span className="text-white">build</span>
        <span className="text-white/55">(spec)</span>
      </>
    ),
  },
  {
    n: 6,
    tokens: (
      <>
        <span className="text-white/55">&nbsp;&nbsp;</span>
        <span className="text-secondary">return</span>{" "}
        <span className="text-white">ship</span>
        <span className="text-white/55">(app, {"{ sla: 'single' }"})</span>
      </>
    ),
  },
  {
    n: 7,
    tokens: (
      <>
        <span className="text-white/55">{"}"}</span>
        <span className="dev-blink ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-secondary" />
      </>
    ),
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

const rowV: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ------------------------------------------------------------------ */
/*  Count-up                                                           */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, start: boolean, duration = 1400) {
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
/*  Styles (self-contained, namespaced dev-)                           */
/* ------------------------------------------------------------------ */

const devStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.dev-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 72%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 92% 80% at 30% 18%, black 6%, transparent 80%);
  mask-image: radial-gradient(ellipse 92% 80% at 30% 18%, black 6%, transparent 80%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 7%, transparent); color: transparent; }
.text-stroke-light  { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--background) 14%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes dev-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.dev-blink { animation: dev-blink 1s step-end infinite; }

@keyframes dev-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.dev-pulse { animation: dev-pulse 1.6s ease-out infinite; }

@keyframes dev-build { 0% { width: 6%; opacity: .4; } 55% { width: 100%; opacity: 1; } 100% { width: 100%; opacity: .25; } }
.dev-build { animation: dev-build 3.6s ease-in-out infinite; }

@keyframes dev-scan { 0% { top: 6%; } 100% { top: 96%; } }
.dev-scan {
  position: absolute; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.16), transparent);
  animation: dev-scan 4s linear infinite;
}

@keyframes dev-dash { to { stroke-dashoffset: -100; } }
.dev-dash { stroke-dasharray: 6 6; animation: dev-dash 2.2s linear infinite; }

@keyframes dev-travel { 0% { left: 2%; } 100% { left: 98%; } }
.dev-travel { animation: dev-travel 4.2s linear infinite; }

@keyframes dev-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.dev-marquee { animation: dev-marquee 32s linear infinite; }
.dev-marquee-rev { animation: dev-marquee 38s linear infinite reverse; }
.dev-marquee:hover, .dev-marquee-rev:hover { animation-play-state: paused; }

@keyframes dev-spin { to { transform: rotate(360deg); } }
.dev-spin { animation: dev-spin 26s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .dev-blink, .dev-pulse, .dev-build, .dev-scan, .dev-dash, .dev-travel,
  .dev-marquee, .dev-marquee-rev, .dev-spin { animation: none; }
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
      <span className="dev-pulse h-2 w-2 shrink-0 bg-secondary" />
      <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function ServicesCustomDevelopmentPage() {
  const statRef = useRef<HTMLDivElement | null>(null);
  const statStarted = useInView(statRef, { once: true, amount: 0.6 });
  const builds = useCountUp(1284, statStarted);

  return (
    <div className="relative isolate w-full overflow-x-clip bg-background text-foreground">
      <style>{devStyles}</style>

      {/* ── context bar ── */}
      <div className="relative z-20 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6 lg:px-8">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">
              itrack <span className="text-border">/</span> services{" "}
              <span className="text-border">/</span>{" "}
              <span className="text-foreground">custom-development</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-primary">
            <span className="dev-pulse h-1.5 w-1.5 bg-primary" />
            BUILD: STABLE
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  HERO — opens on the build itself                            */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="dev-dotgrid absolute inset-0" />
          <span className="font-display absolute -top-6 -right-4 hidden select-none text-[9rem] font-bold leading-none text-stroke-faint lg:block xl:text-[12rem]">
            {"</>"}
          </span>
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8"
          >
            {/* left — masthead */}
            <div className="min-w-0 lg:col-span-6">
              <motion.div variants={fadeUp}>
                <SectionTag>
                  <span className="text-secondary">[</span> MODULE_01 · CUSTOM
                  DEVELOPMENT <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display mt-5 text-[2.6rem] font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-[3.9rem]"
              >
                <span className="block">WE WRITE</span>
                <span className="text-stroke-strong block">THE CODE</span>
                <span className="block">
                  THAT RUNS <span className="text-secondary">YOU.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Tailored software, written from scratch for your business — from
                the first commit to production and every release after. No
                templates, no config screens pretending to be a product.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <Link
                  href="#contact"
                  className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"
                >
                  START YOUR BUILD
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#cases"
                  className="clip-corner group inline-flex items-center justify-center gap-3 border border-border bg-background px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
                >
                  VIEW CASE STUDIES
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <motion.div
                ref={statRef}
                variants={fadeUp}
                className="mt-9 grid grid-cols-3 gap-3 border-t border-border pt-6"
              >
                {[
                  [String(builds).padStart(4, "0"), "BUILDS SHIPPED"],
                  ["98%", "TEST COVERAGE"],
                  ["00", "SUBCONTRACTORS"],
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

            {/* right — live IDE */}
            <motion.div variants={fadeUp} className="min-w-0 lg:col-span-6">
              <div className="relative mx-auto w-full min-w-0 max-w-xl">
                {/* rotating stamp */}
                <div
                  aria-hidden
                  className="dev-spin absolute -top-4 -left-2 z-20 hidden sm:block"
                >
                  <svg viewBox="0 0 120 120" className="h-24 w-24">
                    <defs>
                      <path
                        id="devBadge"
                        d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                      />
                    </defs>
                    <circle cx="60" cy="60" r="58" className="fill-card" />
                    <circle
                      cx="60"
                      cy="60"
                      r="57"
                      fill="none"
                      className="stroke-border"
                      strokeWidth="1"
                    />
                    <text
                      className="font-tech fill-secondary"
                      style={{ fontSize: 9.5, letterSpacing: 2.2 }}
                    >
                      <textPath href="#devBadge">
                        WRITTEN IN-HOUSE • SHIPPED • OWNED • ITRACK •
                      </textPath>
                    </text>
                    <rect
                      x="56"
                      y="56"
                      width="8"
                      height="8"
                      className="fill-secondary"
                    />
                  </svg>
                </div>

                {/* coverage HUD */}
                <motion.div
                  className="clip-corner absolute -top-2 right-0 z-20 border border-border bg-card px-3 py-2.5 sm:-right-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="font-tech text-[9px] tracking-[0.24em] text-muted-foreground">
                    COVERAGE
                  </div>
                  <div className="font-display text-xl font-bold text-foreground">
                    98<span className="text-secondary">%</span>
                  </div>
                </motion.div>

                {/* editor */}
                <div className="relative min-w-0">
                  <div
                    aria-hidden
                    className="absolute inset-0 translate-x-2 translate-y-2 bg-secondary"
                  />
                  <div className="relative min-w-0 overflow-hidden border-2 border-primary bg-primary text-primary-foreground">
                    {/* title bar */}
                    <div className="flex items-center justify-between border-b border-white/15 px-4 py-2.5">
                      <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-white/60">
                        <Code2 className="h-3.5 w-3.5 shrink-0 text-secondary" />
                        <span className="truncate">system.ts</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.2em] text-secondary">
                        <span className="dev-pulse h-1.5 w-1.5 bg-secondary" />
                        BUILD #1284
                      </span>
                    </div>
                    {/* build bar */}
                    <div className="h-0.5 w-full bg-white/10">
                      <div className="dev-build h-full bg-secondary" />
                    </div>
                    {/* code body */}
                    <div className="relative min-w-0 overflow-hidden p-4 font-tech text-[11px] leading-[1.6] sm:p-5 sm:text-[12px]">
                      <div
                        className="dev-scan pointer-events-none"
                        aria-hidden
                      />
                      {CODE_LINES.map((l) => (
                        <div key={l.n} className="flex min-w-0">
                          <span className="w-6 shrink-0 select-none pr-3 text-right text-white/25">
                            {l.n}
                          </span>
                          <span className="min-w-0 truncate">{l.tokens}</span>
                        </div>
                      ))}
                    </div>
                    {/* footer status */}
                    <div className="flex items-center justify-between border-t border-white/15 px-4 py-2 font-tech text-[9px] tracking-[0.2em] text-white/55">
                      <span className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-secondary" /> PASSED ·
                        142 TESTS
                      </span>
                      <span className="hidden sm:inline">main · clean</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  CAPABILITIES — git commit graph                             */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative border-t border-border py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8"
          >
            <div className="min-w-0 lg:col-span-5">
              <motion.div variants={fadeUp}>
                <SectionTag>
                  <span className="text-secondary">[</span> WHAT_WE_DELIVER{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">FOUR COMMITS</span>
                <span className="text-stroke-strong block">TO YOUR STACK.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                Every engagement ships the same four guarantees — read them like
                a changelog. Each one is merged by the team that stays on after
                launch.
              </motion.p>
            </div>

            {/* commit graph */}
            <motion.div
              variants={container}
              className="relative min-w-0 lg:col-span-7"
            >
              {/* vertical graph line */}
              <span
                aria-hidden
                className="absolute left-[15px] top-3 bottom-3 w-px bg-border sm:left-[19px]"
              />
              <div className="space-y-3">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={f.hash}
                      variants={rowV}
                      className="group relative flex min-w-0 items-stretch gap-4"
                    >
                      {/* node */}
                      <div className="relative z-10 flex w-8 shrink-0 justify-center sm:w-10">
                        <span className="mt-5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-border bg-background transition-colors duration-300 group-hover:border-secondary">
                          <span className="h-1 w-1 rounded-full bg-muted-foreground transition-colors duration-300 group-hover:bg-secondary" />
                        </span>
                      </div>
                      {/* row card */}
                      <div className="clip-corner relative min-w-0 flex-1 overflow-hidden border border-border bg-card p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary sm:p-5">
                        <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-secondary transition-transform duration-300 group-hover:scale-y-100" />
                        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 font-tech text-[10px] tracking-[0.18em]">
                          <GitCommitHorizontal className="h-3.5 w-3.5 shrink-0 text-secondary" />
                          <span className="text-muted-foreground">
                            {f.hash}
                          </span>
                          <span className="h-3 w-px bg-border" />
                          <span className="text-primary">{f.tag}</span>
                          <span className="ml-auto hidden text-muted-foreground/60 sm:inline">
                            {String(i + 1).padStart(2, "0")} / 04
                          </span>
                        </div>
                        <div className="mt-2.5 flex min-w-0 items-start gap-3">
                          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-colors duration-300 group-hover:text-secondary" />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                              {f.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {f.description}
                            </p>
                          </div>
                        </div>
                        {/* stat bar */}
                        <div className="mt-3 flex min-w-0 items-center gap-3">
                          <div className="h-1.5 min-w-0 flex-1 overflow-hidden bg-muted">
                            <motion.span
                              className="block h-full bg-primary"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${f.metric}%` }}
                              viewport={{ once: true, amount: 0.6 }}
                              transition={{
                                duration: 0.9,
                                ease: "easeOut",
                                delay: 0.1,
                              }}
                            />
                          </div>
                          <span className="font-tech text-[10px] font-semibold text-secondary">
                            {f.metric}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  PROCESS — pipeline that draws on scroll                     */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative border-t border-border bg-card/40 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="min-w-0">
              <motion.div variants={fadeUp}>
                <SectionTag>
                  <span className="text-secondary">[</span> HOW_IT_SHIPS{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">ONE PIPELINE.</span>
                <span className="text-stroke-strong block">FOUR PHASES.</span>
              </motion.h2>
            </div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-muted-foreground"
            >
              <Activity className="h-3.5 w-3.5 text-secondary" />
              CONTINUOUS · NO HANDOFFS BETWEEN PHASES
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="relative"
          >
            {/* horizontal drawing line (lg) */}
            <div
              className="pointer-events-none absolute inset-x-0 top-[26px] hidden lg:block"
              aria-hidden
            >
              <svg
                viewBox="0 0 1000 4"
                preserveAspectRatio="none"
                className="h-1 w-full"
              >
                <motion.line
                  x1="0"
                  y1="2"
                  x2="1000"
                  y2="2"
                  className="stroke-border"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
              </svg>
              <span className="dev-travel absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-secondary" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p, i) => (
                <motion.div
                  key={p.code}
                  variants={cardIn}
                  className="group relative min-w-0"
                >
                  {/* node */}
                  <div className="relative z-10 mb-5 flex items-center gap-3 lg:block">
                    <span className="clip-corner relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center border-2 border-border bg-background font-display text-xl font-bold text-secondary transition-all duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* card */}
                  <div className="clip-corner relative min-w-0 overflow-hidden border border-border bg-background p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary">
                    <CropTicks />
                    <span
                      aria-hidden
                      className="font-display pointer-events-none absolute -bottom-4 right-1 select-none text-[4.5rem] font-bold leading-none text-stroke-faint"
                    >
                      {i + 1}
                    </span>
                    <div className="relative z-10 font-tech text-[10px] tracking-[0.24em] text-primary">
                      {p.code}
                    </div>
                    <h3 className="relative z-10 font-display mt-2 text-lg font-bold tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  TECH STACK — counter-scrolling marquees + layer columns     */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-border py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="min-w-0">
              <SectionTag>
                <span className="text-secondary">[</span> THE_TOOLBELT{" "}
                <span className="text-secondary">]</span>
              </SectionTag>
              <h2 className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]">
                <span className="block">CHOSEN PER PROBLEM,</span>
                <span className="text-stroke-strong block">NOT PER HYPE.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              We pick the right tool for the layer — then own the whole stack so
              the seams never become someone else's problem.
            </p>
          </motion.div>
        </div>

        {/* marquee rows (full-bleed, clipped) */}
        <div className="relative flex flex-col gap-3 border-y border-border py-5">
          <div className="overflow-hidden">
            <div className="dev-marquee flex w-max whitespace-nowrap">
              {[...TECH_MARQUEE_A, ...TECH_MARQUEE_A].map((t, i) => (
                <span
                  key={i}
                  className="clip-corner mx-2 inline-flex items-center gap-2.5 border border-border bg-card px-4 py-2 font-tech text-xs tracking-[0.14em] text-foreground"
                >
                  <span className="h-1.5 w-1.5 bg-secondary" />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="dev-marquee-rev flex w-max whitespace-nowrap">
              {[...TECH_MARQUEE_B, ...TECH_MARQUEE_B].map((t, i) => (
                <span
                  key={i}
                  className="clip-corner mx-2 inline-flex items-center gap-2.5 border border-border bg-foreground px-4 py-2 font-tech text-xs tracking-[0.14em] text-background"
                >
                  <span className="h-1.5 w-1.5 bg-secondary" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* layer columns */}
        <div className="mx-auto mt-10 w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {TECH_LAYERS.map((layer) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.layer}
                  variants={cardIn}
                  className="group clip-corner relative min-w-0 overflow-hidden border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
                >
                  <CropTicks />
                  <div className="relative z-10 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-background">
                      <Icon className="h-4 w-4 text-primary transition-colors duration-300 group-hover:text-secondary" />
                    </span>
                    <span className="font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
                      {layer.layer}
                    </span>
                  </div>
                  <ul className="relative z-10 mt-4 space-y-2">
                    {layer.items.map((it) => (
                      <li
                        key={it}
                        className="flex min-w-0 items-center gap-2 font-tech text-[11px] tracking-[0.1em] text-foreground"
                      >
                        <Plus className="h-3 w-3 shrink-0 rotate-45 text-secondary" />
                        <span className="truncate">{it}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  USE CASES — numbered dossier                                */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        id="cases"
        className="relative scroll-mt-24 border-t border-border bg-card/40 py-16 lg:py-24"
      >
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
                  <span className="text-secondary">[</span> PERFECT_FOR{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">BUILT FOR THE</span>
                <span className="text-stroke-strong block">HARD CASES.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              The work that lands on our desk is rarely simple — it's the system
              that has to talk to five others, scale across sites, and still be
              maintainable in three years.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
          >
            {USE_CASES.map((u, i) => {
              const Icon = u.icon;
              return (
                <motion.div
                  key={u.title}
                  variants={cardIn}
                  className="group clip-corner relative flex min-w-0 flex-col overflow-hidden border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7"
                >
                  <CropTicks />
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute -top-5 right-2 select-none text-[5.5rem] font-bold leading-none text-stroke-faint"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 flex min-w-0 items-center justify-between gap-3 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                    <span className="flex items-center gap-2.5">
                      <span className="font-semibold text-secondary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-3 w-px bg-border" />
                      USE_CASE
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 -translate-y-0.5 translate-x-0.5 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>

                  <div className="relative z-10 mt-5 flex min-w-0 items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-border bg-card transition-colors duration-300 group-hover:border-primary">
                      <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-secondary" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                        {u.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {u.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto flex min-w-0 items-center border-t border-border pt-4 font-tech text-[10px] tracking-[0.18em]">
                    <span className="text-muted-foreground">FIT</span>
                    <span className="mx-2.5 h-px flex-1 border-b border-dashed border-border" />
                    <span className="font-semibold text-secondary">
                      {u.fit}
                    </span>
                  </div>

                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  CTA — dark ship-prompt console                              */}
      {/* ════════════════════════════════════════════════════════════ */}
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
              {"{ }"}
            </span>
            <div
              className="dev-scan pointer-events-none opacity-40"
              aria-hidden
            />

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              {/* prompt */}
              <div className="min-w-0 lg:col-span-7">
                <div className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-secondary">
                  <span className="dev-pulse h-1.5 w-1.5 bg-secondary" />
                  READY_TO_SHIP //
                </div>

                <div className="mt-5 min-w-0 overflow-hidden border border-background/15 bg-background/5 p-4 font-tech text-[12px] sm:text-[13px]">
                  <div className="flex min-w-0">
                    <span className="select-none pr-2 text-secondary">$</span>
                    <span className="min-w-0 truncate text-background/90">
                      itrack ship --project{" "}
                      <span className="text-secondary">"yours"</span>
                      <span className="dev-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-secondary" />
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-background/45">
                    <Check className="h-3 w-3 text-secondary" />
                    scope locked · team assigned · sla: single
                  </div>
                </div>

                <h2 className="font-display mt-6 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3.2rem]">
                  <span className="block">READY TO BUILD</span>
                  <span className="block">
                    <span className="text-secondary">YOUR SYSTEM?</span>
                  </span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/65 sm:text-base">
                  Tell us what it has to do. We'll come back with an
                  architecture, a roadmap, and the team that will own it end to
                  end.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="#contact"
                    className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-background hover:text-foreground"
                  >
                    SCHEDULE A CONSULTATION
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
                    ["RESPONSE", "< 24H"],
                    ["NEXT SLOT", "OPEN"],
                    ["DISCOVERY", "FREE"],
                    ["OWNERSHIP", "1 TEAM"],
                  ].map(([k, v], i) => (
                    <div
                      key={k}
                      className="clip-corner border border-background/15 bg-background/5 p-4"
                    >
                      <div className="font-tech text-[9px] tracking-[0.24em] text-background/45">
                        {k}
                      </div>
                      <div
                        className={`font-display mt-1.5 text-xl font-bold tracking-tight ${
                          i % 2 === 0 ? "text-secondary" : "text-background"
                        }`}
                      >
                        {v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="clip-corner mt-3 flex items-center gap-3 border border-background/15 bg-background/5 p-4">
                  <Workflow className="h-6 w-6 shrink-0 text-secondary" />
                  <div className="min-w-0">
                    <div className="font-tech text-[10px] font-semibold tracking-[0.18em] text-background">
                      END-TO-END, IN-HOUSE
                    </div>
                    <div className="truncate text-[11px] text-background/55">
                      the people who scope it are the people who ship it
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* footer index */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
            <span className="flex items-center gap-2.5">
              <Hash className="h-3 w-3 text-secondary" />
              MODULE_01 // CUSTOM_DEVELOPMENT
            </span>
            <span className="flex items-center gap-2.5">
              <Plus className="h-3 w-3 rotate-45 text-secondary" />
              NEXT: SYSTEMS & INTEGRATION →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
