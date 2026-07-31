"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  Plus,
  Check,
  ArrowRight,
  ShieldCheck,
  Quote,
  GitCompareArrows,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const popIn: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const rowV: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const rowContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type DiffKind = "meta" | "hunk" | "del" | "add";
type DiffRow = { k: DiffKind; t: string };

const DIFF: DiffRow[] = [
  { k: "meta", t: "--- a/vendor_chain.patch" },
  { k: "meta", t: "+++ b/itrack.deploy" },
  { k: "hunk", t: "@@ -1,6 +1,6 @@  scope: your entire operation" },
  { k: "del", t: "vendor #1 builds the app" },
  { k: "add", t: "one team writes & ships the app" },
  { k: "del", t: "vendor #2 hosts it (separate contract)" },
  { k: "add", t: "one infrastructure, one bill" },
  { k: "del", t: "vendor #3 supplies the hardware" },
  { k: "add", t: "hardware sourced & provisioned in-house" },
  { k: "del", t: "vendor #4 finally answers the phone" },
  { k: "add", t: "the people who built it take the call" },
  { k: "del", t: "4 invoices · 4 SLAs · 0 owners" },
  { k: "add", t: "1 invoice · 1 SLA · 1 accountable team" },
  { k: "del", t: '"that is outside our scope"' },
  { k: "add", t: '"consider it handled"' },
];

const STATS = [
  {
    value: 120,
    decimals: 0,
    suffix: "+",
    label: "BUSINESSES",
    sub: "running on our stack",
  },
  {
    value: 99.98,
    decimals: 2,
    suffix: "%",
    label: "UPTIME",
    sub: "trailing 90 days",
  },
  {
    value: 11,
    decimals: 0,
    suffix: "",
    label: "YEARS",
    sub: "one team · since 2015",
  },
];

/* ------------------------------------------------------------------ */
/*  Count-up hook                                                      */
/* ------------------------------------------------------------------ */

function useCountUp(
  target: number,
  start: boolean,
  decimals = 0,
  duration = 1500,
) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
}

function Stat({
  value,
  decimals,
  suffix,
  label,
  sub,
  started,
}: {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  sub: string;
  started: boolean;
}) {
  const display = useCountUp(value, started, decimals);
  return (
    <div className="clip-corner group min-w-0 border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
      <div className="font-display text-3xl font-bold leading-none tracking-tight text-foreground sm:text-4xl">
        {display}
        <span className="text-secondary">{suffix}</span>
      </div>
      <div className="mt-2 font-tech text-[10px] tracking-[0.24em] text-primary">
        {label}
      </div>
      <div className="mt-1 truncate text-[11px] text-muted-foreground">
        {sub}
      </div>
    </div>
  );
}

function ProofStats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} className="grid min-w-0 grid-cols-3 gap-3">
      {STATS.map((s) => (
        <Stat key={s.label} {...s} started={started} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles (namespaced why-)                                           */
/* ------------------------------------------------------------------ */

const whyStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.why-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 70%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black 8%, transparent 80%);
  mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black 8%, transparent 80%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 7%, transparent); color: transparent; }
.text-stroke-light  { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--background) 14%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes why-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.why-pulse { animation: why-pulse 1.6s ease-out infinite; }

@keyframes why-scan { 0% { top: 6%; } 100% { top: 96%; } }
.why-scan {
  position: absolute; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, transparent, color-mix(in srgb, var(--primary) 35%, transparent), transparent);
  animation: why-scan 4s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .why-pulse, .why-scan { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  Diff row renderer                                                  */
/* ------------------------------------------------------------------ */

function DiffLine({ row }: { row: DiffRow }) {
  if (row.k === "meta") {
    return (
      <div className="flex min-w-0 px-3 py-0.5 font-tech text-[11px] text-muted-foreground/70 sm:text-[12px]">
        <span className="w-6 shrink-0 select-none" />
        <span className="min-w-0 truncate">{row.t}</span>
      </div>
    );
  }
  if (row.k === "hunk") {
    return (
      <div className="flex min-w-0 bg-primary/5 px-3 py-1 font-tech text-[11px] text-primary sm:text-[12px]">
        <span className="w-6 shrink-0 select-none" />
        <span className="min-w-0 truncate">{row.t}</span>
      </div>
    );
  }
  const isDel = row.k === "del";
  return (
    <div
      className={`flex min-w-0 border-l-2 px-3 py-1 font-tech text-[11px] sm:text-[12px] ${
        isDel
          ? "border-secondary/60 bg-secondary/5 text-muted-foreground"
          : "border-primary/60 bg-primary/5 text-foreground"
      }`}
    >
      <span
        className={`w-6 shrink-0 select-none font-semibold ${
          isDel ? "text-secondary" : "text-primary"
        }`}
      >
        {isDel ? "−" : "+"}
      </span>
      <span
        className={`min-w-0 truncate ${isDel ? "line-through decoration-secondary/60" : ""}`}
      >
        {row.t}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function HomeWhyChooseUsPage() {
  return (
    <section
      id="why"
      className="relative isolate scroll-mt-24 overflow-x-clip bg-background py-20 text-foreground lg:py-28"
    >
      <style>{whyStyles}</style>
      <div
        className="why-dotgrid pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* ghost watermark */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -top-2 right-2 hidden select-none text-[10rem] font-bold leading-none text-stroke-faint lg:block xl:text-[13rem]"
      >
        PROOF
      </span>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* side annotation */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-28 -left-1 hidden -rotate-90 font-tech text-[9px] tracking-[0.32em] text-muted-foreground/45 xl:block"
        >
          SEC.03 // WHY_US
        </div>

        {/* ── masthead ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8"
        >
          <div className="min-w-0 lg:col-span-7">
            <motion.div
              variants={fadeUp}
              className="flex min-w-0 items-center gap-3"
            >
              <span className="why-pulse h-2 w-2 shrink-0 bg-secondary" />
              <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
                <span className="text-secondary">[</span> WHY_ITRACK{" "}
                <span className="text-secondary">]</span> THE HONEST DIFFERENCE
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display mt-5 text-[2.4rem] font-bold leading-[0.92] tracking-tight sm:text-5xl lg:text-[3.7rem]"
            >
              <span className="block">STOP MANAGING</span>
              <span className="text-stroke-strong block">VENDORS.</span>
              <span className="block">
                START OWNING <span className="text-secondary">OUTCOMES.</span>
              </span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex items-center gap-3"
            >
              <span className="h-3 w-3 shrink-0 bg-secondary" />
              <span className="font-tech text-[11px] tracking-[0.22em] text-muted-foreground">
                NOT A FEATURE LIST — A STRUCTURAL ONE.
              </span>
            </motion.div>
          </div>

          <div className="min-w-0 lg:col-span-5 lg:pt-2">
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Choosing us isn't about ticking boxes. It's about deleting the
              seams between the people who build your systems, supply your
              hardware, and answer when something breaks — and replacing four
              vendors with one team that owns the result.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6">
              <ProofStats />
            </motion.div>
          </div>
        </motion.div>

        {/* ── diff + verdict ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="mt-14 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-12"
        >
          {/* DIFF PANEL */}
          <motion.div
            variants={popIn}
            className="clip-corner relative min-w-0 overflow-hidden border border-border bg-card lg:col-span-8"
          >
            {/* title bar */}
            <div className="flex min-w-0 items-center justify-between border-b border-border bg-background px-4 py-3">
              <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                <GitCompareArrows className="h-3.5 w-3.5 shrink-0 text-secondary" />
                <span className="truncate">git diff vendor_chain itrack</span>
              </span>
              <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-primary">
                <span className="why-pulse h-1.5 w-1.5 bg-primary" />
                PATCH // APPLIED
              </span>
            </div>

            {/* body */}
            <div className="relative min-w-0">
              <div className="why-scan pointer-events-none" aria-hidden />
              <motion.div
                variants={rowContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="divide-y divide-border/60 py-1"
              >
                {DIFF.map((row, i) => (
                  <motion.div key={i} variants={rowV}>
                    <DiffLine row={row} />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* footer legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border bg-background px-4 py-3 font-tech text-[10px] tracking-[0.18em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 border-l-2 border-secondary bg-secondary/10" />
                REMOVED · THE OLD CHAIN
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 border-l-2 border-primary bg-primary/10" />
                ADDED · ONE TEAM
              </span>
              <span className="ml-auto hidden text-secondary sm:inline">
                6 FILES CHANGED · 0 HANDOFFS
              </span>
            </div>
          </motion.div>

          {/* VERDICT SIDEBAR (dark) */}
          <motion.div
            variants={popIn}
            className="clip-corner relative flex min-w-0 flex-col overflow-hidden border border-foreground bg-foreground p-6 text-background sm:p-7 lg:col-span-4"
          >
            <span
              aria-hidden
              className="font-display pointer-events-none absolute -bottom-8 -right-2 select-none text-[8rem] font-bold leading-none text-stroke-light"
            >
              ✓
            </span>

            <div className="relative z-10 font-tech text-[10px] tracking-[0.3em] text-secondary">
              VERDICT //
            </div>

            <Quote className="relative z-10 mt-4 h-6 w-6 text-secondary" />
            <p className="relative z-10 mt-3 font-display text-lg font-medium leading-snug sm:text-xl">
              “The week we consolidated to one team, incident calls dropped and
              the roadmap finally started moving.”
            </p>
            <div className="relative z-10 mt-3 font-tech text-[10px] tracking-[0.2em] text-background/55">
              — OPS DIRECTOR, MULTI-SITE OPERATOR
            </div>

            {/* friction meter */}
            <div className="relative z-10 mt-7 space-y-3">
              <div className="font-tech text-[9px] tracking-[0.26em] text-background/45">
                OPERATIONAL FRICTION //
              </div>

              <div className="min-w-0">
                <div className="mb-1 flex items-center justify-between font-tech text-[10px] tracking-[0.16em]">
                  <span className="text-background/70">VENDOR CHAIN</span>
                  <span className="text-secondary">HIGH</span>
                </div>
                <div className="flex h-2.5 w-full gap-1 overflow-hidden bg-background/10">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.span
                      key={i}
                      className="h-full flex-1 bg-secondary/80"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + i * 0.12,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: "left" }}
                    />
                  ))}
                </div>
                <div className="mt-1 font-tech text-[9px] tracking-[0.14em] text-background/40">
                  4 contracts · 4 blame-games
                </div>
              </div>

              <div className="min-w-0">
                <div className="mb-1 flex items-center justify-between font-tech text-[10px] tracking-[0.16em]">
                  <span className="text-background/70">ITRACK</span>
                  <span className="text-primary-foreground/80">LOW</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden bg-background/10">
                  <motion.span
                    className="block h-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: "22%" }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="mt-1 font-tech text-[9px] tracking-[0.14em] text-background/40">
                  1 team · 1 number to call
                </div>
              </div>
            </div>

            {/* certification stamp */}
            <div className="relative z-10 mt-7 flex items-center gap-3 border border-background/15 bg-background/5 p-3">
              <ShieldCheck className="h-6 w-6 shrink-0 text-secondary" />
              <div className="min-w-0">
                <div className="font-tech text-[10px] font-semibold tracking-[0.18em] text-background">
                  SINGLE-SLA BACKED
                </div>
                <div className="truncate text-[11px] text-background/55">
                  one contract, one accountable owner
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="clip-corner group relative z-10 mt-6 inline-flex items-center justify-center gap-3 border border-background/25 px-6 py-3.5 font-tech text-xs font-semibold tracking-[0.2em] text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:border-secondary"
            >
              TALK TO THE TEAM
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>

        {/* ── closing strip: struck objection → resolution ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:mt-16"
        >
          {[
            ["scope gaps", "end-to-end ownership"],
            ["blame ping-pong", "one throat to choke"],
            ["renewal roulette", "a partner that stays"],
          ].map(([bad, good]) => (
            <div
              key={bad}
              className="group flex min-w-0 flex-col gap-2 bg-background p-5 transition-colors duration-300 hover:bg-card sm:p-6"
            >
              <span className="flex min-w-0 items-center gap-2 font-tech text-[11px] tracking-[0.16em] text-muted-foreground">
                <Plus className="h-3 w-3 shrink-0 rotate-45 text-secondary" />
                <span className="truncate line-through decoration-secondary/70">
                  {bad}
                </span>
              </span>
              <span className="flex min-w-0 items-center gap-2 font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span className="truncate">{good}</span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
