"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Code2,
  Server,
  Package,
  Headset,
  Plus,
  Check,
  ArrowUpRight,
  Activity,
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
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const BOM = [
  { sku: "SKU-2201", name: "Edge Gateway X1", stock: 92 },
  { sku: "SKU-3088", name: "POS Terminal v3", stock: 64 },
  { sku: "SW-1140", name: "Fleet License", stock: 100 },
];

const BUS = [
  { idx: "01", label: "DEVELOP" },
  { idx: "02", label: "INTEGRATE" },
  { idx: "03", label: "SUPPLY" },
  { idx: "04", label: "SUPPORT" },
];

const PROMISES = [
  "SINGLE POINT OF ACCOUNTABILITY",
  "UNIFIED DELIVERY ROADMAP",
  "CONSOLIDATED BILLING & SLA",
];

/* ------------------------------------------------------------------ */
/*  Styles (fonts + keyframes, namespaced feat-)                       */
/* ------------------------------------------------------------------ */

const featStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.feat-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 75%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 85% 75% at 50% 0%, black 10%, transparent 78%);
  mask-image: radial-gradient(ellipse 85% 75% at 50% 0%, black 10%, transparent 78%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--foreground) 16%, transparent); color: transparent; }
.text-stroke-card   { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--foreground) 10%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes feat-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.feat-blink { animation: feat-blink 1s step-end infinite; }

@keyframes feat-build { 0% { width: 8%; opacity: .4; } 55% { width: 100%; opacity: 1; } 100% { width: 100%; opacity: .25; } }
.feat-build { animation: feat-build 3.4s ease-in-out infinite; }

@keyframes feat-dash { to { stroke-dashoffset: -100; } }
.feat-dash { stroke-dasharray: 6 6; animation: feat-dash 2.4s linear infinite; }

@keyframes feat-ping { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(2.6); opacity: 0; } }
.feat-ping { transform-box: fill-box; transform-origin: center; animation: feat-ping 2s ease-out infinite; }

@keyframes feat-rowscan { 0% { top: 4%; opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { top: 96%; opacity: 0; } }
.feat-rowscan { animation: feat-rowscan 3.2s ease-in-out infinite; }

@keyframes feat-travel { 0% { left: 0%; } 100% { left: 100%; } }
.feat-travel { animation: feat-travel 4.5s linear infinite; }

@keyframes feat-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.feat-pulse { animation: feat-pulse 1.6s ease-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .feat-blink, .feat-build, .feat-dash, .feat-ping, .feat-rowscan, .feat-travel, .feat-pulse { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  Tile shell                                                         */
/* ------------------------------------------------------------------ */

function TileShell({
  idx,
  icon: Icon,
  title,
  desc,
  className = "",
  dark = false,
  children,
}: {
  idx: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  className?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={popIn}
      className={`clip-corner group relative flex min-w-0 flex-col overflow-hidden border p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 ${
        dark
          ? "border-primary bg-primary text-primary-foreground hover:border-secondary"
          : "border-border bg-card text-foreground hover:border-primary"
      } ${className}`}
    >
      {/* watermark index */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -top-4 right-1 select-none text-[5.5rem] font-bold leading-none text-stroke-card sm:text-[7rem]"
      >
        {idx}
      </span>

      {/* header */}
      <div className="relative z-10 flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center border ${
              dark
                ? "border-white/20 bg-white/5"
                : "border-border bg-background"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${dark ? "text-secondary" : "text-primary"}`}
            />
          </span>
          <span
            className={`font-tech text-[10px] tracking-[0.28em] ${
              dark ? "text-white/55" : "text-muted-foreground"
            }`}
          >
            MODULE <span className="text-secondary">{idx}</span>
          </span>
        </div>
        <ArrowUpRight
          className={`h-4 w-4 shrink-0 -translate-y-0.5 translate-x-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 ${
            dark ? "text-secondary" : "text-primary"
          }`}
        />
      </div>

      <div className="relative z-10 mt-4 min-w-0">
        <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          {title}
        </h3>
        <p
          className={`mt-1.5 max-w-xs text-sm leading-relaxed ${
            dark ? "text-white/65" : "text-muted-foreground"
          }`}
        >
          {desc}
        </p>
      </div>

      {/* unique visual */}
      <div className="relative z-10 mt-auto min-w-0 pt-5">{children}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  The four living visuals                                            */
/* ------------------------------------------------------------------ */

function CodeVisual() {
  const ln = "select-none pr-3 text-right text-white/25";
  return (
    <div className="min-w-0 border border-white/10 bg-[#06182e]">
      {/* build bar */}
      <div className="h-0.5 w-full bg-white/10">
        <div className="feat-build h-full bg-secondary" />
      </div>
      {/* chrome */}
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="flex items-center gap-2 font-tech text-[9px] tracking-[0.2em] text-white/45">
          <span className="h-1.5 w-1.5 bg-white/25" />
          <span className="h-1.5 w-1.5 bg-white/25" />
          <span className="h-1.5 w-1.5 bg-secondary" />
          <span className="ml-1 truncate">service.ts</span>
        </span>
        <span className="font-tech text-[9px] tracking-[0.2em] text-secondary">
          ● BUILD
        </span>
      </div>
      {/* code */}
      <div className="overflow-hidden p-3 font-tech text-[11px] leading-[1.55] sm:text-[11.5px]">
        <div className="flex">
          <span className={ln}>1</span>
          <span className="text-white/40">// one team, full cycle</span>
        </div>
        <div className="flex">
          <span className={ln}>2</span>
          <span>
            <span className="text-secondary">export const</span>{" "}
            <span className="text-white">build</span>{" "}
            <span className="text-white/60">=</span>
          </span>
        </div>
        <div className="flex">
          <span className={ln}>3</span>
          <span className="text-white/60">
            &nbsp;&nbsp;async (spec) =&gt; {"{"}
          </span>
        </div>
        <div className="flex">
          <span className={ln}>4</span>
          <span className="text-white/60">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-secondary">const</span> sys ={" "}
            <span className="text-white">await</span>
          </span>
        </div>
        <div className="flex">
          <span className={ln}>5</span>
          <span className="text-white/60">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;integrate(spec);
          </span>
        </div>
        <div className="flex">
          <span className={ln}>6</span>
          <span className="text-white/60">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-secondary">return</span>{" "}
            <span className="text-white">deploy</span>(sys);
          </span>
        </div>
        <div className="flex">
          <span className={ln}>7</span>
          <span className="text-white/60">
            &nbsp;&nbsp;{"}"};
            <span className="feat-blink ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-secondary" />
          </span>
        </div>
      </div>
    </div>
  );
}

function GraphVisual() {
  const nodes = [
    { x: 32, y: 30, t: "API" },
    { x: 168, y: 30, t: "ERP" },
    { x: 32, y: 92, t: "CRM" },
    { x: 168, y: 92, t: "DB" },
  ];
  return (
    <svg
      viewBox="0 0 200 120"
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {nodes.map((n, i) => (
        <line
          key={i}
          x1="100"
          y1="60"
          x2={n.x}
          y2={n.y}
          className="feat-dash stroke-primary/45"
          strokeWidth="1.5"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r="6"
            fill="none"
            className="stroke-primary"
            strokeWidth="1.5"
          />
          <circle cx={n.x} cy={n.y} r="2" className="fill-primary" />
          <text
            x={n.x}
            y={n.y - 11}
            textAnchor="middle"
            className="font-tech fill-muted-foreground"
            style={{ fontSize: 8, letterSpacing: 1 }}
          >
            {n.t}
          </text>
        </g>
      ))}
      {/* hub */}
      <circle cx="100" cy="60" r="9" className="feat-ping fill-secondary/40" />
      <circle cx="100" cy="60" r="9" className="fill-secondary" />
      <circle cx="100" cy="60" r="3.5" className="fill-primary-foreground" />
    </svg>
  );
}

function BomVisual() {
  return (
    <div className="relative min-w-0 border border-border bg-background">
      {/* scanning read head */}
      <div
        className="feat-rowscan pointer-events-none absolute inset-x-0 h-7 -translate-y-1/2 bg-secondary/10"
        aria-hidden
      />
      <div className="relative divide-y divide-border">
        {BOM.map((row) => (
          <div key={row.sku} className="flex items-center gap-3 px-3 py-2.5">
            <span className="font-tech text-[10px] font-semibold tracking-wide text-secondary">
              {row.sku}
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-foreground">
              {row.name}
            </span>
            <span className="hidden h-1.5 w-12 shrink-0 overflow-hidden bg-muted sm:block">
              <span
                className="block h-full bg-primary"
                style={{ width: `${row.stock}%` }}
              />
            </span>
            <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesVisual() {
  return (
    <div className="flex min-w-0 items-center gap-4">
      {/* SLA ring that draws on view */}
      <div className="relative h-20 w-20 shrink-0">
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
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-base font-bold leading-none text-foreground">
            99.9
          </span>
          <span className="font-tech text-[8px] tracking-[0.2em] text-muted-foreground">
            % SLA
          </span>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="feat-pulse h-2 w-2 shrink-0 bg-secondary" />
          <span className="font-tech text-[10px] tracking-[0.22em] text-foreground">
            AGENT ONLINE
          </span>
        </div>
        <div className="mt-2 font-tech text-[10px] tracking-[0.18em] text-muted-foreground">
          AVG REPLY <span className="text-primary">· 4m</span>
        </div>
        <div className="mt-2 flex h-6 items-end gap-1" aria-hidden>
          {[0.5, 0.8, 0.4, 0.95, 0.6, 0.75, 0.5].map((h, i) => (
            <span
              key={i}
              className="w-1.5 bg-primary/60"
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function HomeFeaturesPage() {
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-24 overflow-x-clip bg-background py-20 text-foreground lg:py-28"
    >
      <style>{featStyles}</style>
      <div
        className="feat-dotgrid pointer-events-none absolute inset-0"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* side annotation */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-24 -left-1 hidden -rotate-90 font-tech text-[9px] tracking-[0.32em] text-muted-foreground/45 xl:block"
        >
          SEC.02 // CAPABILITIES
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
              <Plus className="h-3.5 w-3.5 shrink-0 text-secondary" />
              <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
                <span className="text-secondary">[</span> CAPABILITY_DOSSIER{" "}
                <span className="text-secondary">]</span> 04 MODULES · 01 TEAM
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display mt-5 text-[2.4rem] font-bold leading-[0.92] tracking-tight sm:text-5xl lg:text-[3.6rem]"
            >
              <span className="block">FOUR MODULES.</span>
              <span className="text-stroke-strong block">ONE MACHINE.</span>
            </motion.h2>
          </div>

          <div className="min-w-0 lg:col-span-5 lg:pt-3">
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Most vendors sell you a layer and hand off the rest. We run the
              whole stack as a single system — development, integration,
              hardware and support engineered to fit together, not bolted on.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-6 space-y-2 font-tech text-[11px] tracking-[0.18em] text-muted-foreground"
            >
              {[
                ["MODULES", "04"],
                ["TEAMS", "01"],
                ["VENDOR HANDOFFS", "00"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center">
                  <span>{k}</span>
                  <span className="mx-3 h-px flex-1 border-b border-dashed border-border" />
                  <span className="font-semibold text-foreground">{v}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── bento ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:auto-rows-[232px] lg:gap-5"
        >
          <TileShell
            idx="01"
            icon={Code2}
            title="Custom Development"
            desc="Software written for your workflow — not a config screen pretending to be one."
            dark
            className="md:col-span-2 lg:col-span-4 lg:row-span-2"
          >
            <CodeVisual />
          </TileShell>

          <TileShell
            idx="02"
            icon={Server}
            title="Systems & Integration"
            desc="APIs, ERPs, legacy boxes — wired into one coherent data flow."
            className="lg:col-span-2 lg:row-span-1"
          >
            <GraphVisual />
          </TileShell>

          <TileShell
            idx="03"
            icon={Package}
            title="Hardware & Software"
            desc="Sourced, provisioned and licensed — tracked end to end like a real supply line."
            className="lg:col-span-2 lg:row-span-1"
          >
            <BomVisual />
          </TileShell>

          <TileShell
            idx="04"
            icon={Headset}
            title="Managed Services"
            desc="Hands-on support with a single SLA. We stay on the line after go-live."
            className="md:col-span-2 lg:col-span-3 lg:row-span-1"
          >
            <ServicesVisual />
          </TileShell>

          {/* promise tile */}
          <motion.div
            variants={popIn}
            className="clip-corner group relative flex min-w-0 flex-col justify-center overflow-hidden border border-border bg-foreground p-6 text-background md:col-span-2 lg:col-span-3 lg:row-span-1"
          >
            <span
              aria-hidden
              className="font-display pointer-events-none absolute -bottom-6 right-2 select-none text-[6rem] font-bold leading-none text-stroke-faint"
            >
              ∞
            </span>
            <div className="relative z-10 font-tech text-[10px] tracking-[0.3em] text-secondary">
              THE GUARANTEE //
            </div>
            <ul className="relative z-10 mt-4 space-y-2.5">
              {PROMISES.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 text-sm font-medium sm:text-base"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-secondary text-background">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── integration bus ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-12 border-t border-border pt-8 lg:mt-16"
        >
          <div className="mb-6 flex items-center gap-3 font-tech text-[10px] tracking-[0.3em] text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-secondary" />
            INTEGRATION_BUS // NO HANDOFFS — ONE CONTINUOUS PIPELINE
          </div>

          <div className="relative">
            {/* connecting line + travelling pulse (lg only) */}
            <div
              className="pointer-events-none absolute inset-x-0 top-[18px] hidden lg:block"
              aria-hidden
            >
              <svg
                viewBox="0 0 1000 4"
                preserveAspectRatio="none"
                className="h-1 w-full"
              >
                <line
                  x1="0"
                  y1="2"
                  x2="1000"
                  y2="2"
                  className="feat-dash stroke-border"
                  strokeWidth="2"
                />
              </svg>
              <span className="feat-travel absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-secondary" />
            </div>

            <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-8">
              {BUS.map((b, i) => (
                <div
                  key={b.idx}
                  className="group relative flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center border border-border bg-background font-tech text-xs font-semibold text-secondary transition-colors duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground">
                    {b.idx}
                  </span>
                  <span className="font-display mt-3 text-base font-bold tracking-tight text-foreground">
                    {b.label}
                  </span>
                  {i < BUS.length - 1 && (
                    <span
                      aria-hidden
                      className="font-tech mt-1 text-secondary/60 lg:hidden"
                    >
                      ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
