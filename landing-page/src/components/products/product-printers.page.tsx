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
  Download,
  Gauge,
  Layers,
  Printer,
  Cpu,
  Zap,
  Thermometer,
  Scissors,
  BarChart3,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PRINTER_VARIANTS = [
  {
    code: "PRT-DT-01",
    name: "Desktop Thermal",
    dpi: "203 DPI",
    speed: "6 IPS",
    width: '4" max',
    duty: "Medium",
  },
  {
    code: "PRT-ID-02",
    name: "Industrial Direct",
    dpi: "300 DPI",
    speed: "8 IPS",
    width: '4" max',
    duty: "Heavy",
  },
  {
    code: "PRT-TT-03",
    name: "Thermal Transfer",
    dpi: "300 DPI",
    speed: "10 IPS",
    width: '6" max',
    duty: "Continuous",
  },
];

const SPECS = [
  {
    cat: "PRINT METHOD",
    val: "Direct Thermal / Thermal Transfer (model dependent)",
  },
  { cat: "RESOLUTION", val: "203 DPI · 300 DPI · 600 DPI options" },
  { cat: "SPEED", val: "Up to 10 IPS (inches per second)" },
  { cat: "MEDIA WIDTH", val: 'Up to 6" (152mm) · 2"–6" range' },
  { cat: "RIBBON", val: "Wax · Wax/Resin · Resin · 300m length" },
  { cat: "CONNECTIVITY", val: "USB · Ethernet · Serial · WiFi · Bluetooth" },
  { cat: "EMULATION", val: "ZPL II · EPL · CPCL · TSPL · PDF" },
  { cat: "DUTY CYCLE", val: "Up to 10,000 labels/day (industrial models)" },
];

const RIBBONS = [
  {
    type: "Wax",
    surface: "Paper / Coated Paper",
    durability: "Indoor only",
    note: "Lowest cost · highest volume",
  },
  {
    type: "Wax/Resin",
    surface: "Synthetic / Glossy",
    durability: "Light outdoor",
    note: "Balanced cost/durability",
  },
  {
    type: "Resin",
    surface: "Polyester / Polypropylene",
    durability: "Harsh outdoor",
    note: "Chemical/scratch resistant",
  },
];

const DEPLOYMENTS = [
  {
    env: "WH-SHIP",
    title: "Warehouse Shipping",
    desc: "High-volume label printing for outbound logistics.",
    throughput: "500+/hr",
  },
  {
    env: "RT-PRICE",
    title: "Retail Price Labels",
    desc: "On-demand shelf tags and promotional pricing.",
    throughput: "200/hr",
  },
  {
    env: "LOG-MANIFEST",
    title: "Logistics Manifests",
    desc: "Bill of lading and customs documentation.",
    throughput: "300/hr",
  },
  {
    env: "AM-ID",
    title: "Asset ID Tags",
    desc: "Durable asset tags with barcode + human-readable text.",
    throughput: "100/hr",
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
/*  Styles (self-contained, namespaced prt-)                           */
/* ------------------------------------------------------------------ */

const prtStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.prt-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 72%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 92% 80% at 70% 14%, black 6%, transparent 80%);
  mask-image: radial-gradient(ellipse 92% 80% at 70% 14%, black 6%, transparent 80%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 7%, transparent); color: transparent; }
.text-stroke-light  { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--background) 14%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes prt-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.prt-blink { animation: prt-blink 1s step-end infinite; }

@keyframes prt-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.prt-pulse { animation: prt-pulse 1.6s ease-out infinite; }

@keyframes prt-feed {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
.prt-feed { animation: prt-feed 3s linear infinite; }

@keyframes prt-head {
  0%, 100% { opacity: .3; }
  50% { opacity: 1; }
}
.prt-head { animation: prt-head 1.5s ease-in-out infinite; }

@keyframes prt-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.prt-marquee { animation: prt-marquee 30s linear infinite; }
.prt-marquee:hover { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .prt-blink, .prt-pulse, .prt-feed, .prt-head, .prt-marquee { animation: none; }
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
      <span className="prt-pulse h-2 w-2 shrink-0 bg-secondary" />
      <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Print mechanism schematic                                          */
/* ------------------------------------------------------------------ */

function PrinterSchematic() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-md">
      {/* hard offset block */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-2 translate-y-2 bg-secondary"
      />

      <div className="clip-corner group relative min-w-0 overflow-hidden border-2 border-primary bg-card">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2.5">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <Printer className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">FIG.01 — PRINT MECHANISM</span>
          </span>
          <span className="shrink-0 font-tech text-[10px] tracking-[0.2em] text-primary">
            PRT-ID-02
          </span>
        </div>

        {/* diagram */}
        <div className="relative min-w-0 p-6 sm:p-8">
          <svg viewBox="0 0 340 300" className="h-auto w-full" aria-hidden>
            {/* callout lines */}
            <g className="stroke-border" strokeWidth="1.5" fill="none">
              <path d="M170 60 L300 40" />
              <path d="M170 120 L300 120" />
              <path d="M170 200 L300 220" />
              <path d="M100 160 L40 160" />
            </g>

            {/* pulsing anchor nodes */}
            <circle
              cx="170"
              cy="60"
              r="3"
              className="prt-pulse fill-secondary/40"
            />
            <circle cx="170" cy="60" r="2.5" className="fill-secondary" />
            <circle cx="170" cy="120" r="3" className="fill-primary" />
            <circle cx="170" cy="200" r="3" className="fill-primary" />
            <circle cx="100" cy="160" r="3" className="fill-secondary" />

            {/* callout labels */}
            <g className="font-tech" style={{ fontSize: 11, letterSpacing: 1 }}>
              <text x="300" y="36" className="fill-foreground">
                THERMAL HEAD
              </text>
              <text x="300" y="116" className="fill-foreground">
                PLATEN ROLLER
              </text>
              <text x="300" y="236" className="fill-foreground">
                CUTTER MODULE
              </text>
              <text x="38" y="156" textAnchor="end" className="fill-secondary">
                MEDIA PATH
              </text>
            </g>

            {/* printer body */}
            <rect
              x="90"
              y="40"
              width="160"
              height="220"
              rx="12"
              className="fill-card stroke-primary"
              strokeWidth="2"
            />

            {/* media roll (top) */}
            <circle
              cx="170"
              cy="70"
              r="28"
              className="fill-background stroke-border"
              strokeWidth="1.5"
            />
            <circle
              cx="170"
              cy="70"
              r="8"
              className="fill-muted/30 stroke-border"
              strokeWidth="1"
            />

            {/* thermal head (heating element) */}
            <rect
              x="145"
              y="108"
              width="50"
              height="8"
              rx="2"
              className="prt-head fill-secondary stroke-secondary"
              strokeWidth="1"
            />
            {/* heating dots */}
            <g className="fill-primary-foreground/60">
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x={148 + i * 4}
                  y={110}
                  width="2"
                  height="4"
                  rx="0.5"
                />
              ))}
            </g>

            {/* platen roller */}
            <circle
              cx="170"
              cy="140"
              r="18"
              className="fill-card stroke-primary"
              strokeWidth="2"
            />
            <circle
              cx="170"
              cy="140"
              r="6"
              className="fill-muted/30 stroke-border"
              strokeWidth="1"
            />

            {/* media path (animated feed) */}
            <rect
              x="155"
              y="90"
              width="30"
              height="90"
              rx="2"
              className="fill-background/50 stroke-border"
              strokeWidth="1"
            />
            <rect
              x="158"
              y="90"
              width="24"
              height="90"
              rx="1"
              className="fill-transparent overflow-hidden"
            >
              <animate
                attributeName="y"
                values="-90;90"
                dur="3s"
                repeatCount="indefinite"
              />
            </rect>
            {/* label on media */}
            <rect
              x="160"
              y="100"
              width="20"
              height="14"
              rx="1"
              className="fill-secondary/15 stroke-secondary/30"
              strokeWidth="0.5"
            />

            {/* cutter module */}
            <rect
              x="140"
              y="190"
              width="60"
              height="20"
              rx="3"
              className="fill-card stroke-primary"
              strokeWidth="1.5"
            />
            <Scissors className="h-5 w-5 text-secondary" x="165" y="195" />

            {/* output slot */}
            <rect
              x="130"
              y="230"
              width="80"
              height="16"
              rx="4"
              className="fill-background stroke-border"
              strokeWidth="1.5"
            />
            {/* printed label emerging */}
            <rect
              x="140"
              y="220"
              width="60"
              height="14"
              rx="1"
              className="fill-secondary/10 stroke-secondary/20"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* footer status */}
        <div className="flex items-center justify-between border-t border-border bg-background px-4 py-2 font-tech text-[9px] tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="prt-pulse h-1.5 w-1.5 bg-primary" /> DATASHEET //
            REV B
          </span>
          <span className="hidden sm:inline">RIBBON COMPATIBLE · IN STOCK</span>
        </div>
      </div>

      {/* floating chips */}
      <motion.div
        className="clip-corner absolute -top-3 left-0 z-20 flex items-center gap-2 border border-border bg-card px-3 py-2 sm:-left-3"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <BarChart3 className="h-3.5 w-3.5 text-primary" />
        <span className="font-tech text-[9px] tracking-[0.16em] text-foreground">
          THROUGHPUT · 8 IPS
        </span>
      </motion.div>
      <motion.div
        className="clip-corner absolute -bottom-3 right-0 z-20 flex items-center gap-2 border border-border bg-foreground px-3 py-2 sm:-right-3"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 5.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
        <span className="font-tech text-[9px] tracking-[0.16em] text-background">
          2YR WARRANTY
        </span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function ProductPrintersPage() {
  const statRef = useRef<HTMLDivElement | null>(null);
  const statStarted = useInView(statRef, { once: true, amount: 0.6 });
  const printed = useCountUp(8400000, statStarted);

  return (
    <div className="relative isolate w-full overflow-x-clip bg-background text-foreground">
      <style>{prtStyles}</style>

      {/* ── context bar ── */}
      <div className="relative z-20 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6 lg:px-8">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">
              itrack <span className="text-border">/</span> products{" "}
              <span className="text-border">/</span>{" "}
              <span className="text-foreground">printers-datasheet</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-primary">
            <span className="prt-pulse h-1.5 w-1.5 bg-primary" />
            REV B · CERTIFIED
          </span>
        </div>
      </div>

      {/* ════════════════════════ HERO — title block + schematic ════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="prt-dotgrid absolute inset-0" />
          <span className="font-display absolute -top-6 right-0 hidden select-none text-[9rem] font-bold leading-none text-stroke-faint lg:block xl:text-[12rem]">
            PRT
          </span>
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8"
          >
            {/* left — model identity */}
            <div className="min-w-0 lg:col-span-3">
              <motion.div variants={fadeUp}>
                <SectionTag>
                  <span className="text-secondary">[</span> LINE_C · PRINTERS{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display mt-5 text-[2.6rem] font-bold leading-[0.92] tracking-tight sm:text-5xl"
              >
                <span className="block">INDUSTRIAL</span>
                <span className="text-stroke-strong block">PRINTERS</span>
                <span className="block">
                  & LABELS<span className="text-secondary">.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-sm leading-relaxed text-muted-foreground"
              >
                Thermal and thermal-transfer printers for continuous operation
                in industrial environments. Label printing, shipping manifests,
                and receipt generation with exceptional reliability and speed.
              </motion.p>

              <motion.div
                ref={statRef}
                variants={fadeUp}
                className="mt-8 space-y-3 border-t border-border pt-6"
              >
                {[
                  [printed.toLocaleString(), "LABELS PRINTED"],
                  ["3", "VARIANTS"],
                  ["2YR", "WARRANTY"],
                ].map(([v, k]) => (
                  <div key={k} className="min-w-0">
                    <div className="font-display text-xl font-bold leading-none tracking-tight text-foreground">
                      {v}
                    </div>
                    <div className="mt-1 font-tech text-[9px] tracking-[0.2em] text-muted-foreground">
                      {k}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3"
              >
                <Link
                  href="#contact"
                  className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"
                >
                  REQUEST A QUOTE
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#specs"
                  className="clip-corner group inline-flex items-center justify-center gap-3 border border-border bg-background px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
                >
                  VIEW FULL SPECS
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>

            {/* center — schematic */}
            <motion.div variants={fadeUp} className="min-w-0 lg:col-span-6">
              <div className="px-2 pt-4 pb-8 sm:px-6">
                <PrinterSchematic />
              </div>
            </motion.div>

            {/* right — quick specs rail */}
            <motion.div variants={fadeUp} className="min-w-0 lg:col-span-3">
              <div className="space-y-3">
                {[
                  { label: "LINE", value: "LINE_C" },
                  { label: "REV", value: "B" },
                  { label: "STATUS", value: "IN STOCK", accent: true },
                  { label: "METHOD", value: "DT / TT" },
                  { label: "RESOLUTION", value: "203–600 DPI" },
                  { label: "SPEED", value: "UP TO 10 IPS" },
                  { label: "WIDTH", value: '2"–6"' },
                  { label: "RIBBON", value: "WAX/WAX-RES/RES" },
                  { label: "EMULATION", value: "ZPL/EPL/CPCL" },
                  { label: "DUTY", value: "10K/DAY MAX" },
                ].map(({ label, value, accent }) => (
                  <div
                    key={label}
                    className={`clip-corner border px-3 py-2 ${
                      accent
                        ? "border-secondary bg-secondary/5"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="font-tech text-[9px] tracking-[0.24em] text-muted-foreground">
                      {label}
                    </div>
                    <div
                      className={`font-display text-sm font-bold tracking-tight ${
                        accent ? "text-secondary" : "text-foreground"
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─ standards marquee ── */}
      <div className="relative border-y border-border bg-card/40">
        <div className="overflow-hidden py-3">
          <div className="prt-marquee flex w-max whitespace-nowrap">
            {[
              "ZPL II COMPATIBLE",
              "EPL SUPPORT",
              "CPCL READY",
              "TSPL",
              "PDF NATIVE",
              "ETHERNET/WIFI/BT",
              "USB/SERIAL",
              "AUTO-CUTTER",
            ]
              .concat([
                "ZPL II COMPATIBLE",
                "EPL SUPPORT",
                "CPCL READY",
                "TSPL",
                "PDF NATIVE",
                "ETHERNET/WIFI/BT",
                "USB/SERIAL",
                "AUTO-CUTTER",
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

      {/* ════════════════════════ PRINTER VARIANTS ════════════════════════ */}
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
                  <span className="text-secondary">[</span> PRINTER_VARIANTS{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">THREE MODELS.</span>
                <span className="text-stroke-strong block">ONE SUPPLIER.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              Pick the duty cycle and print method that matches your volume. We
              supply ribbons, labels, and service contracts for all three from
              the same support line.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5"
          >
            {PRINTER_VARIANTS.map((t, i) => (
              <motion.div
                key={t.code}
                variants={cardIn}
                className="group clip-corner relative flex min-w-0 flex-col overflow-hidden border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7"
              >
                <CropTicks />
                <span
                  aria-hidden
                  className="font-display pointer-events-none absolute -top-5 right-2 select-none text-[5.5rem] font-bold leading-none text-stroke-faint"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex min-w-0 items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2.5 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                    <span className="font-semibold text-secondary">
                      {t.code}
                    </span>
                    <span className="h-3 w-px bg-border" />
                    <Printer className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="clip-corner border border-border bg-background px-2 py-0.5 font-tech text-[9px] tracking-[0.16em] text-primary">
                    {t.dpi}
                  </span>
                </div>

                <h3 className="relative z-10 font-display mt-4 text-xl font-bold tracking-tight text-foreground">
                  {t.name}
                </h3>

                <div className="relative z-10 mt-4 space-y-2 font-tech text-[10px] tracking-[0.14em] text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>SPEED</span>
                    <span className="font-semibold text-foreground">
                      {t.speed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>WIDTH</span>
                    <span className="font-semibold text-secondary">
                      {t.width}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>DUTY</span>
                    <span className="font-semibold text-foreground">
                      {t.duty}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 mt-auto flex min-w-0 items-center border-t border-border pt-4 font-tech text-[10px] tracking-[0.18em] text-muted-foreground">
                  <span>SELECT MODEL</span>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ SPECIFICATION TABLE ════════════════════════ */}
      <section
        id="specs"
        className="relative scroll-mt-24 border-t border-border bg-card/40 py-16 lg:py-24"
      >
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
                  <span className="text-secondary">[</span> TECH_SPECS{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">FULL</span>
                <span className="text-stroke-strong block">SPECIFICATION.</span>
              </motion.h2>
            </div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-muted-foreground"
            >
              <FileText className="h-3.5 w-3.5 text-secondary" />
              PDF DATASHEET AVAILABLE
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="clip-corner overflow-hidden border border-border bg-background"
          >
            <div className="grid grid-cols-[140px_1fr] border-b border-border bg-card font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
              <div className="border-r border-border px-4 py-3">PARAMETER</div>
              <div className="px-4 py-3">SPECIFICATION</div>
            </div>
            {SPECS.map((spec, i) => (
              <div
                key={spec.cat}
                className={`grid grid-cols-[140px_1fr] ${i % 2 === 1 ? "bg-card/40" : ""}`}
              >
                <div className="border-r border-border px-4 py-3 font-tech text-[10px] font-semibold tracking-[0.2em] text-primary">
                  {spec.cat}
                </div>
                <div className="px-4 py-3 text-sm leading-relaxed text-foreground">
                  {spec.val}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3 font-tech text-[9px] tracking-[0.18em] text-muted-foreground">
              <span>SPECIFICATIONS SUBJECT TO CHANGE WITHOUT NOTICE</span>
              <button className="flex items-center gap-2 text-primary transition-colors hover:text-secondary">
                <Download className="h-3 w-3" /> DOWNLOAD PDF
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ RIBBON COMPATIBILITY ════════════════════════ */}
      <section className="relative border-t border-border py-16 lg:py-24">
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
                  <span className="text-secondary">[</span> RIBBON_COMPAT{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">RIBBON</span>
                <span className="text-stroke-strong block">COMPATIBILITY.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="max-w-sm text-sm leading-relaxed text-muted-foreground"
            >
              The right ribbon for the right surface. Wax for paper, resin for
              synthetics — we stock all three and recommend based on your label
              substrate.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="clip-corner overflow-hidden border border-border bg-background"
          >
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] border-b border-border bg-card font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
              <div className="border-r border-border px-4 py-3">
                RIBBON TYPE
              </div>
              <div className="border-r border-border px-4 py-3">SURFACE</div>
              <div className="border-r border-border px-4 py-3">DURABILITY</div>
              <div className="px-4 py-3">NOTE</div>
            </div>
            {RIBBONS.map((r, i) => (
              <React.Fragment key={r.type}>
                <div
                  className={`grid grid-cols-[1fr_1fr_1fr_1fr] ${i % 2 === 1 ? "bg-card/40" : ""}`}
                >
                  <div className="border-r border-border px-4 py-3 font-tech text-[10px] font-semibold tracking-[0.18em] text-secondary">
                    {r.type}
                  </div>
                  <div className="border-r border-border px-4 py-3 text-sm text-foreground">
                    {r.surface}
                  </div>
                  <div className="border-r border-border px-4 py-3 text-sm text-muted-foreground">
                    {r.durability}
                  </div>
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    {r.note}
                  </div>
                </div>
              </React.Fragment>
            ))}
            <div className="flex items-center gap-x-5 gap-y-2 border-t border-border bg-card px-4 py-3 font-tech text-[9px] tracking-[0.18em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-secondary" /> THERMAL TRANSFER
                ONLY
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-primary" /> DIRECT THERMAL ALSO
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ DEPLOYMENT SCENARIOS ═══════════════════════ */}
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
                  <span className="text-secondary">[</span> DEPLOYMENT_SCENARIOS{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">WHERE LABELS</span>
                <span className="text-stroke-strong block">GET PRINTED.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              Four environments, four typical throughputs. Each scenario ships
              with pre-configured templates matched to your label size and
              content requirements.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
          >
            {DEPLOYMENTS.map((d, i) => (
              <motion.div
                key={d.env}
                variants={cardIn}
                className="group clip-corner relative flex min-w-0 flex-col overflow-hidden border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7"
              >
                <CropTicks />
                <span
                  aria-hidden
                  className="font-display pointer-events-none absolute -top-5 right-2 select-none text-[5.5rem] font-bold leading-none text-stroke-faint"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex min-w-0 items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2.5 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                    <span className="font-semibold text-secondary">
                      {d.env}
                    </span>
                    <span className="h-3 w-px bg-border" />
                    ENVIRONMENT
                  </span>
                  <span className="clip-corner border border-secondary bg-secondary/5 px-2 py-0.5 font-tech text-[9px] tracking-[0.16em] text-secondary">
                    {d.throughput}
                  </span>
                </div>

                <h3 className="relative z-10 font-display mt-4 text-xl font-bold tracking-tight text-foreground">
                  {d.title}
                </h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.desc}
                </p>

                <div className="relative z-10 mt-auto flex min-w-0 items-center border-t border-border pt-4 font-tech text-[10px] tracking-[0.18em] text-muted-foreground">
                  <span>TYPICAL CONFIG</span>
                  <span className="mx-2.5 h-px flex-1 border-b border-dashed border-border" />
                  <span className="font-semibold text-primary">
                    PRE-TEMPLATED
                  </span>
                </div>

                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ CTA — demo unit console ════════════════════════ */}
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
              DEMO
            </span>

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              {/* prompt */}
              <div className="min-w-0 lg:col-span-7">
                <div className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-secondary">
                  <span className="prt-pulse h-1.5 w-1.5 bg-secondary" />
                  REQUEST_DEMO_UNIT //
                </div>

                <div className="mt-5 min-w-0 overflow-hidden border border-background/15 bg-background/5 p-4 font-tech text-[12px] sm:text-[13px]">
                  <div className="flex min-w-0">
                    <span className="select-none pr-2 text-secondary">$</span>
                    <span className="min-w-0 truncate text-background/90">
                      itrack demo --model PRT-ID-02 --qty eval
                      <span className="prt-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-secondary" />
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-0.5 text-background/45">
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> evaluation
                      unit ships in 3 days
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> pre-loaded
                      with your label templates
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> 30-day return
                      · no commitment
                    </div>
                  </div>
                </div>

                <h2 className="font-display mt-6 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3.2rem]">
                  <span className="block">READY TO TEST</span>
                  <span className="block">
                    <span className="text-secondary">THE PRINTER?</span>
                  </span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/65 sm:text-base">
                  Put it on your floor before you commit. We'll ship an
                  evaluation unit pre-loaded with your label templates so you
                  can validate print quality, speed, and reliability in your
                  actual environment.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="#contact"
                    className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-background hover:text-foreground"
                  >
                    REQUEST EVAL UNIT
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/products"
                    className="clip-corner inline-flex items-center justify-center gap-3 border border-background/25 px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/10"
                  >
                    BACK TO CATALOG
                  </Link>
                </div>
              </div>

              {/* readout */}
              <div className="min-w-0 lg:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["EVAL UNITS", "AVAILABLE", Package],
                    ["SHIP TIME", "3 DAYS", Truck],
                    ["RETURN WINDOW", "30 DAYS", ShieldCheck],
                    ["SUPPORT", "DEDICATED", Activity],
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
                      PRE-LOADED WITH YOUR TEMPLATES
                    </div>
                    <div className="truncate text-[11px] text-background/55">
                      print out of the box, no setup needed
                    </div>
                  </div>
                </div>

                <div className="clip-corner mt-3 flex items-center justify-between gap-3 border border-background/15 bg-background/5 p-4 font-tech text-[11px] tracking-[0.16em]">
                  <span className="text-background/55">EVAL STATUS</span>
                  <span className="font-semibold text-secondary">OPEN</span>
                  <span className="flex items-center gap-1.5 text-background/40">
                    <Gauge className="h-3 w-3" /> slots avail
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* footer index */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
            <span className="flex items-center gap-2.5">
              <Hash className="h-3 w-3 text-secondary" />
              LINE_C // INDUSTRIAL_PRINTERS
            </span>
            <span className="flex items-center gap-2.5">
              <Plus className="h-3 w-3 rotate-45 text-secondary" />
              NEXT: POS HARDWARE →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
