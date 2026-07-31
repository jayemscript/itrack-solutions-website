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
  Smartphone,
  Barcode,
  Printer,
  ShoppingCart,
  Award,
  Target,
  Zap,
  TrendingUp,
  Package,
  ShieldCheck,
  Gauge,
  ScanLine,
  Truck,
  Layers,
  Workflow,
  FileText,
} from "lucide-react";
import { productSubMenus } from "@/components/layout/menus";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SPEC_SETS = [
  ["IP67", "1.8m DROP", "5000mAh"],
  ["UHF RFID", "±3m READ", "ADHESIVE"],
  ["300 DPI", "8 IPS", "THERMAL"],
  ["15\" TOUCH", "PCI PTS", "DUAL DISP"],
];
const SPEC_FALLBACK = ["INDUSTRIAL", "2YR WARRANTY", "IN STOCK"];

const COMPLIANCE = [
  "IP67 SEALED",
  "MIL-STD-810G",
  "1.8m DROP TESTED",
  "CE / FCC",
  "RoHS",
  "-20°C → 50°C",
  "2YR WARRANTY",
  "API READY",
];

const BENCH = [
  {
    icon: Award,
    tag: "+DURABILITY",
    title: "Industrial Grade Quality",
    description: "Built to withstand demanding business environments and heavy use.",
    visual: "gauge" as const,
  },
  {
    icon: TrendingUp,
    tag: "+VALUE",
    title: "Affordable Pricing",
    description: "Premium quality products at competitive prices for all business sizes.",
    visual: "price" as const,
  },
  {
    icon: Target,
    tag: "+FIT",
    title: "Business Focused",
    description: "Designed specifically for business needs and operational efficiency.",
    visual: "fit" as const,
  },
  {
    icon: Zap,
    tag: "+INTEGRATION",
    title: "Easy Integration",
    description: "Seamless integration with existing systems and workflows.",
    visual: "link" as const,
  },
];

const CATEGORIES = [
  {
    code: "LINE_A",
    icon: Smartphone,
    name: "Industrial Mobile Devices",
    description:
      "Rugged mobile devices for inventory management, asset tracking and field operations — sealed against harsh environments with extended battery life.",
    spec: "IP67 · 1.8m DROP",
  },
  {
    code: "LINE_B",
    icon: Barcode,
    name: "RFID Stickers & Tags",
    description:
      "Advanced RFID tracking for asset management and supply-chain optimization — reliable identification at scale for inventory and logistics.",
    spec: "UHF · ±3m READ",
  },
  {
    code: "LINE_C",
    icon: Printer,
    name: "Industrial Grade Printers",
    description:
      "High-performance thermal and barcode printers for continuous operation — labels, shipping and receipts with exceptional reliability and speed.",
    spec: "300DPI · 8 IPS",
  },
  {
    code: "LINE_D",
    icon: ShoppingCart,
    name: "POS Hardware Solutions",
    description:
      "Complete Point of Sale systems — terminals, card readers, receipt printers and peripherals for retail and hospitality transactions.",
    spec: "PCI PTS · DUAL DISP",
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
/*  Styles (self-contained, namespaced hw-)                            */
/* ------------------------------------------------------------------ */

const hwStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.hw-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 72%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 92% 80% at 70% 14%, black 6%, transparent 80%);
  mask-image: radial-gradient(ellipse 92% 80% at 70% 14%, black 6%, transparent 80%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 7%, transparent); color: transparent; }
.text-stroke-light  { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--background) 14%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes hw-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.hw-blink { animation: hw-blink 1s step-end infinite; }

@keyframes hw-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.hw-pulse { animation: hw-pulse 1.6s ease-out infinite; }

@keyframes hw-ping { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(2.8); opacity: 0; } }
.hw-ping { transform-box: fill-box; transform-origin: center; animation: hw-ping 2s ease-out infinite; }

@keyframes hw-scan { 0% { top: 4%; } 100% { top: 96%; } }
.hw-scan {
  position: absolute; left: 6%; right: 6%; height: 2px;
  background: linear-gradient(to right, transparent, var(--secondary), transparent);
  box-shadow: 0 0 8px color-mix(in srgb, var(--secondary) 60%, transparent);
  animation: hw-scan 2.8s ease-in-out infinite;
}

@keyframes hw-dash { to { stroke-dashoffset: -100; } }
.hw-dash { stroke-dasharray: 6 6; animation: hw-dash 2.2s linear infinite; }

@keyframes hw-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.hw-marquee { animation: hw-marquee 34s linear infinite; }
.hw-marquee:hover { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .hw-blink, .hw-pulse, .hw-ping, .hw-scan, .hw-dash, .hw-marquee { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  Small bits                                                         */
/* ------------------------------------------------------------------ */

function CropTicks() {
  return (
    <>
      <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-border transition-colors duration-300 group-hover:border-secondary" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-border transition-colors duration-300 group-hover:border-secondary" />
    </>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="hw-pulse h-2 w-2 shrink-0 bg-secondary" />
      <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">{children}</span>
    </div>
  );
}

function SpecLeader({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex min-w-0 items-center font-tech text-[10px] tracking-[0.16em]">
      <span className="text-muted-foreground">{k}</span>
      <span className="mx-2.5 h-px flex-1 border-b border-dashed border-border" />
      <span className={accent ? "font-semibold text-secondary" : "font-semibold text-foreground"}>{v}</span>
    </div>
  );
}

function SpecChips({ specs }: { specs: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {specs.map((s) => (
        <span key={s} className="clip-corner inline-flex items-center gap-1.5 border border-border bg-background px-2 py-1 font-tech text-[9px] tracking-[0.12em] text-foreground">
          <span className="h-1 w-1 bg-secondary" />
          {s}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero schematic                                                     */
/* ------------------------------------------------------------------ */

function DeviceSchematic() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-md">
      {/* hard offset block */}
      <div aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 bg-secondary" />

      <div className="clip-corner group relative min-w-0 overflow-hidden border-2 border-primary bg-card">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-border bg-background px-4 py-2.5">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <ScanLine className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">FIG.01 — RUGGED HANDHELD</span>
          </span>
          <span className="shrink-0 font-tech text-[10px] tracking-[0.2em] text-primary">ITR-H1</span>
        </div>

        {/* diagram */}
        <div className="relative min-w-0 p-4 sm:p-6">
          <div className="relative min-w-0">
            <svg viewBox="0 0 340 440" className="h-auto w-full" aria-hidden>
              {/* callout lines */}
              <g className="stroke-border" strokeWidth="1.5" fill="none">
                <path d="M206 84 L300 60" />
                <path d="M110 180 L40 180" />
                <path d="M230 250 L300 250" />
                <path d="M200 396 L300 412" />
              </g>
              {/* pulsing anchor nodes */}
              <circle cx="206" cy="84" r="4" className="hw-ping fill-secondary/40" />
              <circle cx="206" cy="84" r="3" className="fill-secondary" />
              <circle cx="110" cy="180" r="4" className="hw-ping fill-secondary/40" />
              <circle cx="110" cy="180" r="3" className="fill-secondary" />
              <circle cx="230" cy="250" r="3" className="fill-primary" />
              <circle cx="200" cy="396" r="3" className="fill-primary" />

              {/* callout labels */}
              <g className="font-tech" style={{ fontSize: 11, letterSpacing: 1 }}>
                <text x="300" y="56" className="fill-foreground">2D IMAGER</text>
                <text x="38" y="176" textAnchor="end" className="fill-secondary">IP67 SEALED</text>
                <text x="300" y="246" className="fill-foreground">5000 mAh</text>
                <text x="300" y="428" className="fill-foreground">1.8m DROP</text>
              </g>

              {/* device body */}
              <rect x="110" y="70" width="120" height="250" rx="20" className="fill-card stroke-primary" strokeWidth="2.5" />
              {/* antenna */}
              <rect x="150" y="58" width="40" height="12" rx="4" className="fill-primary" />
              {/* imager window */}
              <rect x="134" y="80" width="72" height="12" rx="3" className="fill-secondary/20 stroke-secondary" strokeWidth="1.5" />
              {/* screen */}
              <rect x="122" y="100" width="96" height="118" rx="4" className="fill-background stroke-border" strokeWidth="1.5" />
              {/* screen content lines */}
              <g className="fill-border">
                <rect x="132" y="112" width="60" height="6" rx="2" />
                <rect x="132" y="126" width="76" height="4" rx="2" />
                <rect x="132" y="136" width="50" height="4" rx="2" />
                <rect x="132" y="150" width="76" height="26" rx="3" className="fill-primary/15" />
                <rect x="132" y="184" width="76" height="4" rx="2" />
                <rect x="132" y="194" width="40" height="4" rx="2" />
              </g>
              {/* keypad */}
              <g className="fill-background stroke-border" strokeWidth="1.2">
                {[0, 1, 2].map((r) =>
                  [0, 1, 2].map((c) => (
                    <rect key={`${r}-${c}`} x={134 + c * 26} y={232 + r * 22} width="18" height="14" rx="3" />
                  )),
                )}
              </g>
              {/* side button */}
              <rect x="230" y="140" width="6" height="34" rx="2" className="fill-secondary" />
              {/* grip */}
              <path d="M150 320 L190 320 L202 402 L138 402 Z" className="fill-card stroke-primary" strokeWidth="2.5" />
              <rect x="150" y="340" width="14" height="30" rx="4" className="fill-primary/20 stroke-primary" strokeWidth="1.5" />
            </svg>

            {/* scan sweep over the screen */}
            <div className="pointer-events-none absolute" style={{ left: "35.9%", top: "22.7%", width: "28.2%", height: "26.8%" }}>
              <span className="hw-scan" />
            </div>
          </div>
        </div>

        {/* footer status */}
        <div className="flex items-center justify-between border-t border-border bg-background px-4 py-2 font-tech text-[9px] tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="hw-pulse h-1.5 w-1.5 bg-primary" /> DATASHEET // REV C
          </span>
          <span className="hidden sm:inline">CERTIFIED · IN STOCK</span>
        </div>
      </div>

      {/* floating chips */}
      <motion.div
        className="clip-corner absolute -top-3 left-0 z-20 flex items-center gap-2 border border-border bg-card px-3 py-2 sm:-left-3"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Package className="h-3.5 w-3.5 text-primary" />
        <span className="font-tech text-[9px] tracking-[0.16em] text-foreground">STOCK · 1,240</span>
      </motion.div>
      <motion.div
        className="clip-corner absolute -bottom-3 right-0 z-20 flex items-center gap-2 border border-border bg-foreground px-3 py-2 sm:-right-3"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
        <span className="font-tech text-[9px] tracking-[0.16em] text-background">2YR WARRANTY</span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Bench visuals                                                      */
/* ------------------------------------------------------------------ */

function GaugeVisual() {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle cx="32" cy="32" r="26" fill="none" className="stroke-border" strokeWidth="5" />
          <motion.circle
            cx="32" cy="32" r="26" fill="none" className="stroke-secondary" strokeWidth="5" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 0.98 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-base font-bold leading-none text-foreground">98</span>
          <span className="font-tech text-[7px] tracking-[0.18em] text-muted-foreground">IP67</span>
        </div>
      </div>
      <div className="min-w-0 font-tech text-[9px] leading-relaxed tracking-[0.14em] text-muted-foreground">
        MIL-STD-810G<br />1.8m DROP · SEALED
      </div>
    </div>
  );
}

function PriceVisual() {
  return (
    <div className="min-w-0">
      <div className="relative h-2 w-full overflow-hidden bg-muted">
        <motion.span
          className="block h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: "38%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <span className="absolute right-0 top-1/2 h-3 w-0.5 -translate-y-1/2 bg-secondary" />
      </div>
      <div className="mt-2 flex items-center justify-between font-tech text-[9px] tracking-[0.14em] text-muted-foreground">
        <span className="text-secondary">▼ BELOW MARKET</span>
        <span>vs. comparable rugged line</span>
      </div>
    </div>
  );
}

function FitVisual() {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between font-tech text-[9px] tracking-[0.16em] text-muted-foreground">
        <span>BUSINESS-USE FIT</span>
        <span className="text-secondary">100%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden bg-muted">
        <motion.span
          className="block h-full bg-secondary"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </div>
      <div className="mt-2 flex gap-1" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="h-1.5 flex-1 bg-primary/70" />
        ))}
      </div>
    </div>
  );
}

function LinkVisual() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <svg viewBox="0 0 160 40" className="h-10 min-w-0 flex-1" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <line x1="20" y1="20" x2="80" y2="20" className="hw-dash stroke-border" strokeWidth="2" />
        <line x1="80" y1="20" x2="140" y2="20" className="hw-dash stroke-border" strokeWidth="2" />
        <rect x="12" y="12" width="16" height="16" className="fill-primary" />
        <circle cx="80" cy="20" r="9" className="hw-ping fill-secondary/40" />
        <circle cx="80" cy="20" r="7" className="fill-secondary" />
        <rect x="132" y="12" width="16" height="16" className="fill-primary" />
      </svg>
      <span className="shrink-0 font-tech text-[9px] tracking-[0.16em] text-primary">API + SDK</span>
    </div>
  );
}

function BenchVisual({ kind }: { kind: "gauge" | "price" | "fit" | "link" }) {
  if (kind === "gauge") return <GaugeVisual />;
  if (kind === "price") return <PriceVisual />;
  if (kind === "fit") return <FitVisual />;
  return <LinkVisual />;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function ProductsContentPage() {
  const filteredProducts = productSubMenus.filter(
    (product) => product.href !== "/products",
  );
  const featured = filteredProducts[0];
  const rest = filteredProducts.slice(1);
  const FeaturedIcon = featured ? featured.icon : null;

  const statRef = useRef<HTMLDivElement | null>(null);
  const statStarted = useInView(statRef, { once: true, amount: 0.6 });
  const deployed = useCountUp(12480, statStarted);

  return (
    <div className="relative isolate w-full overflow-x-clip bg-background text-foreground">
      <style>{hwStyles}</style>

      {/* ── context bar ── */}
      <div className="relative z-20 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6 lg:px-8">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">
              itrack <span className="text-border">/</span> products <span className="text-border">/</span>{" "}
              <span className="text-foreground">hardware-line</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-primary">
            <span className="hw-pulse h-1.5 w-1.5 bg-primary" />
            STOCK: IN
          </span>
        </div>
      </div>

      {/* ════════════════════════ HERO — annotated schematic ════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="hw-dotgrid absolute inset-0" />
          <span className="font-display absolute -top-6 right-0 hidden select-none text-[9rem] font-bold leading-none text-stroke-faint lg:block xl:text-[12rem]">
            SPEC
          </span>
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8"
          >
            {/* left masthead */}
            <div className="min-w-0 lg:col-span-6">
              <motion.div variants={fadeUp}>
                <SectionTag>
                  <span className="text-secondary">[</span> PRODUCT_LINE // HARDWARE_CATALOG{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display mt-5 text-[2.6rem] font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-[3.9rem]"
              >
                <span className="block">BUILT FOR</span>
                <span className="text-stroke-strong block">THE FLOOR,</span>
                <span className="block">
                  NOT THE <span className="text-secondary">BROCHURE.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Industrial mobile devices, RFID, thermal printers and POS
                hardware — sourced, warranted and integrated by the same team
                that builds your software. Spec it, stock it, ship it.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <Link
                  href="#contact"
                  className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"
                >
                  REQUEST A QUOTE
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#catalog"
                  className="clip-corner group inline-flex items-center justify-center gap-3 border border-border bg-background px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
                >
                  BROWSE THE LINE
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <motion.div
                ref={statRef}
                variants={fadeUp}
                className="mt-9 grid grid-cols-3 gap-3 border-t border-border pt-6"
              >
                {[
                  [deployed.toLocaleString(), "UNITS DEPLOYED"],
                  ["2YR", "WARRANTY"],
                  ["04", "PRODUCT LINES"],
                ].map(([v, k]) => (
                  <div key={k} className="min-w-0">
                    <div className="font-display text-xl font-bold leading-none tracking-tight text-foreground sm:text-2xl">
                      {v}
                    </div>
                    <div className="mt-1.5 font-tech text-[9px] tracking-[0.2em] text-muted-foreground">{k}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* right schematic */}
            <motion.div variants={fadeUp} className="min-w-0 lg:col-span-6">
              <div className="px-2 pt-8 pb-8 sm:px-6">
                <DeviceSchematic />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── compliance marquee ── */}
      <div className="relative border-y border-border bg-card/40">
        <div className="overflow-hidden py-3">
          <div className="hw-marquee flex w-max whitespace-nowrap">
            {[...COMPLIANCE, ...COMPLIANCE].map((c, i) => (
              <span key={i} className="mx-3 flex items-center gap-3 font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
                <span className="h-1.5 w-1.5 bg-secondary" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════ CATALOG — flagship + spec cards ════════════════════════ */}
      <section id="catalog" className="relative scroll-mt-24 py-16 lg:py-24">
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
                  <span className="text-secondary">[</span> THE_LINE <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">EVERY UNIT,</span>
                <span className="text-stroke-strong block">SPEC'D & STOCKED.</span>
              </motion.h2>
            </div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-muted-foreground"
            >
              <Activity className="h-3.5 w-3.5 text-secondary" />
              {String(filteredProducts.length).padStart(2, "0")} MODELS · READY TO SHIP
            </motion.div>
          </motion.div>

          {/* flagship panel */}
          {featured && FeaturedIcon && (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="mb-5"
            >
              <Link href={featured.href} className="group block" aria-label={featured.title}>
                <div className="clip-corner relative grid min-w-0 grid-cols-1 overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary lg:grid-cols-12">
                  {/* navy spec rail */}
                  <div className="relative flex min-w-0 flex-col justify-between gap-6 bg-primary p-6 text-primary-foreground sm:p-8 lg:col-span-4">
                    <div className="flex items-center gap-2 font-tech text-[10px] tracking-[0.26em] text-white/60">
                      <span className="hw-pulse h-1.5 w-1.5 bg-secondary" />
                      FLAGSHIP · ITR-01
                    </div>
                    <div>
                      <div className="font-display text-6xl font-bold leading-none tracking-tighter text-white/90 sm:text-7xl">
                        01
                      </div>
                      <div className="mt-5 inline-flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5">
                        <FeaturedIcon className="h-5 w-5 text-secondary" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-tech text-[10px] tracking-[0.2em] text-white/55">
                      <span className="hw-pulse h-1.5 w-1.5 bg-secondary" /> IN STOCK · 1,240 UNITS
                    </div>
                  </div>

                  {/* body */}
                  <div className="relative flex min-w-0 flex-col p-6 sm:p-8 lg:col-span-8">
                    <CropTicks />
                    <div className="flex min-w-0 items-start justify-between gap-4">
                      <h3 className="font-display min-w-0 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {featured.title}
                      </h3>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border text-primary transition-all duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {featured.description}
                    </p>

                    <div className="mt-5">
                      <SpecChips specs={SPEC_SETS[0]} />
                    </div>

                    <div className="mt-auto grid min-w-0 grid-cols-1 gap-x-8 gap-y-2 pt-6 sm:grid-cols-2">
                      <SpecLeader k="CATEGORY" v="RUGGED" accent />
                      <SpecLeader k="WARRANTY" v="2 YEARS" />
                      <SpecLeader k="LEAD TIME" v="5 DAYS" />
                      <SpecLeader k="INTEGRATION" v="INCLUDED" />
                    </div>

                    <div className="mt-5 flex items-center gap-2 font-tech text-[10px] tracking-[0.2em] text-primary transition-colors duration-300 group-hover:text-secondary">
                      <FileText className="h-3.5 w-3.5" /> VIEW DATA SHEET
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </Link>
            </motion.div>
          )}

          {/* spec cards */}
          {rest.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={container}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
            >
              {rest.map((product, i) => {
                const Icon = product.icon;
                const idx = i + 2;
                const specs = SPEC_SETS[i % SPEC_SETS.length] ?? SPEC_FALLBACK;
                return (
                  <motion.div key={product.href} variants={cardIn}>
                    <Link href={product.href} className="group block h-full" aria-label={product.title}>
                      <div className="clip-corner group relative flex h-full min-w-0 flex-col overflow-hidden border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7">
                        <CropTicks />

                        <div className="relative z-10 flex min-w-0 items-center justify-between gap-3">
                          <span className="flex min-w-0 items-center gap-2.5 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                            <span className="font-semibold text-secondary">ITR-{String(idx).padStart(2, "0")}</span>
                            <span className="h-3 w-px bg-border" />
                            <span className="truncate">MODEL</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-1.5 font-tech text-[9px] tracking-[0.16em] text-primary">
                            <span className="hw-pulse h-1.5 w-1.5 bg-primary" /> IN STOCK
                          </span>
                        </div>

                        <div className="relative z-10 mt-5 flex min-w-0 items-start gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-border bg-background transition-colors duration-300 group-hover:border-primary">
                            <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-secondary" />
                          </span>
                          <h3 className="font-display min-w-0 pt-1 text-xl font-bold leading-tight tracking-tight text-foreground">
                            {product.title}
                          </h3>
                        </div>

                        <p className="relative z-10 mt-4 min-w-0 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {product.description}
                        </p>

                        <div className="relative z-10 mt-5">
                          <SpecChips specs={specs} />
                        </div>

                        <div className="relative z-10 mt-auto flex min-w-0 items-center justify-between gap-3 border-t border-border pt-4 font-tech text-[10px] tracking-[0.2em] text-muted-foreground">
                          <span className="flex items-center gap-2 transition-colors duration-300 group-hover:text-primary">
                            <FileText className="h-3 w-3 text-secondary" /> DATA SHEET
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                        </div>

                        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {filteredProducts.length === 0 && (
            <div className="border border-dashed border-border p-10 text-center font-tech text-sm tracking-[0.2em] text-muted-foreground">
              NO MODELS IN LINE
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════ RATINGS BENCH — why our hardware ════════════════════════ */}
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
                  <span className="text-secondary">[</span> WHY_OUR_HARDWARE <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">CLAIMS WE CAN</span>
                <span className="text-stroke-strong block">PUT ON A BENCH.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              "Industrial grade" is easy to print on a brochure. We'd rather show
              the rating, the price position and the integration path — measured,
              not marketed.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
          >
            {BENCH.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  variants={cardIn}
                  className="group clip-corner relative flex min-w-0 flex-col overflow-hidden border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7"
                >
                  <CropTicks />
                  <div className="relative z-10 flex min-w-0 items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2.5 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                      <span className="h-3 w-px bg-border" />
                      <span className="truncate">{b.tag}</span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-card transition-colors duration-300 group-hover:border-primary">
                      <Icon className="h-4 w-4 text-primary transition-colors duration-300 group-hover:text-secondary" />
                    </span>
                  </div>
                  <h3 className="relative z-10 font-display mt-4 text-xl font-bold tracking-tight text-foreground">
                    {b.title}
                  </h3>
                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                  <div className="relative z-10 mt-auto border-t border-border pt-5">
                    <BenchVisual kind={b.visual} />
                  </div>
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ PRODUCT LINE INDEX — categories ════════════════════════ */}
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
                  <span className="text-secondary">[</span> LINE_INDEX <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">FOUR LINES,</span>
                <span className="text-stroke-strong block">ONE SUPPLIER.</span>
              </motion.h2>
            </div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-muted-foreground"
            >
              <Layers className="h-3.5 w-3.5 text-secondary" />
              ALL LINES INTEGRATE WITH YOUR SOFTWARE
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="space-y-3"
          >
            {CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.code} variants={cardIn}>
                  <div className="group clip-corner relative flex min-w-0 flex-col gap-4 overflow-hidden border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary sm:flex-row sm:items-center sm:gap-6 sm:p-6">
                    <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-secondary transition-transform duration-300 group-hover:scale-y-100" />

                    {/* code rail */}
                    <div className="flex shrink-0 items-center gap-4 sm:w-40 sm:flex-col sm:items-start sm:gap-2">
                      <span className="clip-corner flex h-11 w-11 items-center justify-center border border-border bg-background transition-colors duration-300 group-hover:border-primary">
                        <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-secondary" />
                      </span>
                      <span className="font-tech text-[10px] font-semibold tracking-[0.24em] text-secondary">
                        {c.code}
                      </span>
                    </div>

                    {/* body */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
                        {c.name}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {c.description}
                      </p>
                    </div>

                    {/* spec + arrow */}
                    <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
                      <span className="clip-corner border border-border bg-background px-2.5 py-1 font-tech text-[9px] tracking-[0.16em] text-primary">
                        {c.spec}
                      </span>
                      <span className="flex items-center gap-2 font-tech text-[10px] tracking-[0.18em] text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                        BROWSE
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                  </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ CTA — RFQ console ════════════════════════ */}
      <section id="contact" className="relative scroll-mt-24 border-t border-border py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="clip-corner relative overflow-hidden border border-foreground bg-foreground p-7 text-background sm:p-10 lg:p-12"
          >
            <span aria-hidden className="font-display pointer-events-none absolute -bottom-10 -right-3 select-none text-[9rem] font-bold leading-none text-stroke-light">
              RFQ
            </span>

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              {/* prompt */}
              <div className="min-w-0 lg:col-span-7">
                <div className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-secondary">
                  <span className="hw-pulse h-1.5 w-1.5 bg-secondary" />
                  REQUEST_FOR_QUOTE //
                </div>

                <div className="mt-5 min-w-0 overflow-hidden border border-background/15 bg-background/5 p-4 font-tech text-[12px] sm:text-[13px]">
                  <div className="flex min-w-0">
                    <span className="select-none pr-2 text-secondary">$</span>
                    <span className="min-w-0 truncate text-background/90">
                      itrack quote --line all --qty fleet
                      <span className="hw-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-secondary" />
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-0.5 text-background/45">
                    <div className="flex items-center gap-2"><Check className="h-3 w-3 text-secondary" /> in stock · ships in 5 days</div>
                    <div className="flex items-center gap-2"><Check className="h-3 w-3 text-secondary" /> 2yr warranty · integration included</div>
                    <div className="flex items-center gap-2"><Check className="h-3 w-3 text-secondary" /> one invoice for hardware + software</div>
                  </div>
                </div>

                <h2 className="font-display mt-6 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3.2rem]">
                  <span className="block">READY TO SPEC</span>
                  <span className="block">
                    <span className="text-secondary">YOUR LINE?</span>
                  </span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/65 sm:text-base">
                  Tell us the environment and the volume. We'll come back with
                  the right models, the pricing, and the integration plan — from
                  the team that will support it after delivery.
                </p>

                {/* line chips */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {CATEGORIES.map((c) => (
                    <span key={c.code} className="clip-corner inline-flex items-center gap-2 border border-background/25 px-3 py-2 font-tech text-[9px] font-semibold tracking-[0.16em] text-background">
                      <span className="h-1 w-1 bg-secondary" />
                      {c.code}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="#contact"
                    className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-background hover:text-foreground"
                  >
                    REQUEST A QUOTE
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
                    ["LEAD TIME", "5 DAYS", Truck],
                    ["MOQ", "FLEXIBLE", Package],
                    ["WARRANTY", "2 YEARS", ShieldCheck],
                    ["SUPPORT", "24/7", Activity],
                  ].map(([k, v, Icon], i) => {
                    const Ic = Icon as React.ElementType;
                    return (
                      <div key={k as string} className="clip-corner border border-background/15 bg-background/5 p-4">
                        <div className="flex items-center gap-2">
                          <Ic className="h-3.5 w-3.5 text-secondary" />
                          <span className="font-tech text-[9px] tracking-[0.24em] text-background/45">{k as string}</span>
                        </div>
                        <div className={`font-display mt-1.5 text-xl font-bold tracking-tight ${(i as number) % 2 === 0 ? "text-secondary" : "text-background"}`}>
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
                      HARDWARE + SOFTWARE, ONE INVOICE
                    </div>
                    <div className="truncate text-[11px] text-background/55">
                      no separate vendor to blame when it breaks
                    </div>
                  </div>
                </div>

                <div className="clip-corner mt-3 flex items-center justify-between gap-3 border border-background/15 bg-background/5 p-4 font-tech text-[11px] tracking-[0.16em]">
                  <span className="text-background/55">UNITS IN STOCK</span>
                  <span className="font-semibold text-secondary">1,240</span>
                  <span className="flex items-center gap-1.5 text-background/40">
                    <Gauge className="h-3 w-3" /> ready
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* footer index */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
            <span className="flex items-center gap-2.5">
              <Hash className="h-3 w-3 text-secondary" />
              PRODUCT_LINE // HARDWARE_CATALOG
            </span>
            <span className="flex items-center gap-2.5">
              <Plus className="h-3 w-3 rotate-45 text-secondary" />
              NEXT: MANAGED SERVICES →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
