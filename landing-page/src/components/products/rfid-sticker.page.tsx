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
  ScanLine,
  Barcode,
  Tag,
  Cpu,
  StickyNote,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TAG_VARIANTS = [
  {
    code: "TAG-UHF-01",
    name: "UHF Long Range",
    freq: "860–960 MHz",
    range: "±3m",
    chip: "Impinj M730",
    substrate: "PET",
  },
  {
    code: "TAG-NFC-02",
    name: "NFC Proximity",
    freq: "13.56 MHz",
    range: "±10cm",
    chip: "NTAG 424 DNA",
    substrate: "PVC",
  },
  {
    code: "TAG-HF-03",
    name: "HF Asset Track",
    freq: "13.56 MHz",
    range: "±1m",
    chip: "ICODE SLIX2",
    substrate: "Paper",
  },
];

const SPECS = [
  { cat: "FREQUENCY", val: "UHF 860–960 MHz / HF 13.56 MHz / NFC 13.56 MHz" },
  { cat: "READ RANGE", val: "Up to ±3m (UHF) · ±10cm (NFC) · ±1m (HF)" },
  { cat: "CHIP", val: "Impinj M730 · NTAG 424 DNA · ICODE SLIX2" },
  { cat: "MEMORY", val: "EPC: 96–496 bits · User: 0–512 bits" },
  { cat: "ADHESIVE", val: "Permanent acrylic · removable option available" },
  {
    cat: "TEMPERATURE",
    val: "-20°C → +70°C operating · -40°C → +85°C storage",
  },
  { cat: "DIMENSIONS", val: "Custom sizes · standard 50×50mm · 70×20mm flag" },
  {
    cat: "PRINTING",
    val: "Thermal transfer · direct thermal · offset compatible",
  },
];

const MATERIALS = [
  { surface: "Cardboard / Paper", compat: true, note: "Standard PET label" },
  { surface: "Plastic / ABS", compat: true, note: "Requires on-metal variant" },
  {
    surface: "Metal Surfaces",
    compat: "partial",
    note: "On-metal ferrite-backed tag required",
  },
  {
    surface: "Glass / Ceramic",
    compat: true,
    note: "Standard or anti-glass variant",
  },
  {
    surface: "Liquid-Filled",
    compat: "partial",
    note: "Flag/spacer tag recommended",
  },
  {
    surface: "Fabric / Textile",
    compat: true,
    note: "Washable textile tag available",
  },
];

const DEPLOYMENTS = [
  {
    env: "WH-INV",
    title: "Warehouse Inventory",
    desc: "Bulk scan pallets and shelves without line-of-sight.",
    range: "±3m",
  },
  {
    env: "RT-ASSET",
    title: "Retail Asset Tracking",
    desc: "Individual item identification at POS and stockroom.",
    range: "±10cm",
  },
  {
    env: "LOG-SHIP",
    title: "Logistics & Shipping",
    desc: "Gate-read containers and trucks in transit.",
    range: "±3m",
  },
  {
    env: "AM-TRACK",
    title: "Asset Lifecycle",
    desc: "Track equipment from procurement to decommission.",
    range: "±1m",
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
/*  Styles (self-contained, namespaced rfid-)                          */
/* ------------------------------------------------------------------ */

const rfidStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.rfid-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 72%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 92% 80% at 30% 14%, black 6%, transparent 80%);
  mask-image: radial-gradient(ellipse 92% 80% at 30% 14%, black 6%, transparent 80%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 7%, transparent); color: transparent; }
.text-stroke-light  { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--background) 14%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes rfid-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.rfid-blink { animation: rfid-blink 1s step-end infinite; }

@keyframes rfid-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.rfid-pulse { animation: rfid-pulse 1.6s ease-out infinite; }

@keyframes rfid-ping { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(3); opacity: 0; } }
.rfid-ping { transform-box: fill-box; transform-origin: center; animation: rfid-ping 2.2s ease-out infinite; }

@keyframes rfid-wave {
  0% { r: 8; opacity: .5; }
  100% { r: 60; opacity: 0; }
}
.rfid-wave { animation: rfid-wave 2s ease-out infinite; }
.rfid-wave-d2 { animation-delay: 0.4s; }
.rfid-wave-d3 { animation-delay: 0.8s; }

@keyframes rfid-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.rfid-marquee { animation: rfid-marquee 30s linear infinite; }
.rfid-marquee:hover { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .rfid-blink, .rfid-pulse, .rfid-ping, .rfid-wave, .rfid-wave-d2, .rfid-wave-d3, .rfid-marquee { animation: none; }
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
      <span className="rfid-pulse h-2 w-2 shrink-0 bg-secondary" />
      <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tag cross-section schematic                                        */
/* ------------------------------------------------------------------ */

function TagSchematic() {
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
            <ScanLine className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">FIG.01 — RFID TAG CROSS-SECTION</span>
          </span>
          <span className="shrink-0 font-tech text-[10px] tracking-[0.2em] text-primary">
            TAG-UHF-01
          </span>
        </div>

        {/* diagram */}
        <div className="relative min-w-0 p-6 sm:p-8">
          <svg viewBox="0 0 340 280" className="h-auto w-full" aria-hidden>
            {/* RF waves emanating from tag */}
            <circle cx="170" cy="140" r="8" className="fill-secondary" />
            <circle
              cx="170"
              cy="140"
              r="8"
              className="rfid-ping fill-secondary/30"
            />
            <circle
              cx="170"
              cy="140"
              r="8"
              className="rfid-wave stroke-secondary/40"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="170"
              cy="140"
              r="8"
              className="rfid-wave rfid-wave-d2 stroke-secondary/30"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="170"
              cy="140"
              r="8"
              className="rfid-wave rfid-wave-d3 stroke-secondary/20"
              strokeWidth="1.5"
              fill="none"
            />

            {/* callout lines */}
            <g className="stroke-border" strokeWidth="1.5" fill="none">
              <path d="M170 60 L300 40" />
              <path d="M240 140 L300 140" />
              <path d="M170 220 L300 240" />
              <path d="M100 140 L40 140" />
            </g>

            {/* pulsing anchor nodes */}
            <circle
              cx="170"
              cy="60"
              r="3"
              className="rfid-ping fill-secondary/40"
            />
            <circle cx="170" cy="60" r="2.5" className="fill-secondary" />
            <circle cx="240" cy="140" r="3" className="fill-primary" />
            <circle cx="170" cy="220" r="3" className="fill-primary" />
            <circle cx="100" cy="140" r="3" className="fill-secondary" />

            {/* callout labels */}
            <g className="font-tech" style={{ fontSize: 11, letterSpacing: 1 }}>
              <text x="300" y="36" className="fill-foreground">
                FACESTOCK (PET)
              </text>
              <text x="300" y="136" className="fill-foreground">
                IC CHIP
              </text>
              <text x="300" y="256" className="fill-foreground">
                ADHESIVE LAYER
              </text>
              <text x="38" y="136" textAnchor="end" className="fill-secondary">
                ANTENNA COIL
              </text>
            </g>

            {/* tag body layers */}
            {/* facestock */}
            <rect
              x="100"
              y="50"
              width="140"
              height="180"
              rx="8"
              className="fill-card stroke-primary"
              strokeWidth="2"
            />
            {/* antenna coil (dashed spiral) */}
            <rect
              x="115"
              y="65"
              width="110"
              height="150"
              rx="4"
              fill="none"
              className="stroke-secondary"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <rect
              x="125"
              y="75"
              width="90"
              height="130"
              rx="4"
              fill="none"
              className="stroke-secondary/60"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <rect
              x="135"
              y="85"
              width="70"
              height="110"
              rx="4"
              fill="none"
              className="stroke-secondary/40"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            {/* IC chip */}
            <rect
              x="160"
              y="130"
              width="20"
              height="20"
              rx="2"
              className="fill-primary stroke-secondary"
              strokeWidth="1.5"
            />
            {/* bond pads */}
            <line
              x1="160"
              y1="135"
              x2="150"
              y2="135"
              className="stroke-secondary"
              strokeWidth="1"
            />
            <line
              x1="180"
              y1="135"
              x2="190"
              y2="135"
              className="stroke-secondary"
              strokeWidth="1"
            />
            <line
              x1="160"
              y1="145"
              x2="150"
              y2="145"
              className="stroke-secondary"
              strokeWidth="1"
            />
            <line
              x1="180"
              y1="145"
              x2="190"
              y2="145"
              className="stroke-secondary"
              strokeWidth="1"
            />
            {/* adhesive layer indicator */}
            <rect
              x="100"
              y="218"
              width="140"
              height="12"
              rx="0 0 8 8"
              className="fill-secondary/10 stroke-secondary/30"
              strokeWidth="1"
            />
            {/* release liner hint */}
            <rect
              x="100"
              y="230"
              width="140"
              height="6"
              rx="0 0 8 8"
              className="fill-muted/30 stroke-border"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* footer status */}
        <div className="flex items-center justify-between border-t border-border bg-background px-4 py-2 font-tech text-[9px] tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="rfid-pulse h-1.5 w-1.5 bg-primary" /> DATASHEET //
            REV B
          </span>
          <span className="hidden sm:inline">CUSTOM PRINTABLE · IN STOCK</span>
        </div>
      </div>

      {/* floating chips */}
      <motion.div
        className="clip-corner absolute -top-3 left-0 z-20 flex items-center gap-2 border border-border bg-card px-3 py-2 sm:-left-3"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Barcode className="h-3.5 w-3.5 text-primary" />
        <span className="font-tech text-[9px] tracking-[0.16em] text-foreground">
          MOQ · 500 PCS
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
          ISO 18000-6C
        </span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function RFIDStickerPage() {
  const statRef = useRef<HTMLDivElement | null>(null);
  const statStarted = useInView(statRef, { once: true, amount: 0.6 });
  const encoded = useCountUp(2400000, statStarted);

  return (
    <div className="relative isolate w-full overflow-x-clip bg-background text-foreground">
      <style>{rfidStyles}</style>

      {/* ── context bar ── */}
      <div className="relative z-20 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6 lg:px-8">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">
              itrack <span className="text-border">/</span> products{" "}
              <span className="text-border">/</span>{" "}
              <span className="text-foreground">rfid-tags-datasheet</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-primary">
            <span className="rfid-pulse h-1.5 w-1.5 bg-primary" />
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
          <div className="rfid-dotgrid absolute inset-0" />
          <span className="font-display absolute -top-6 left-0 hidden select-none text-[9rem] font-bold leading-none text-stroke-faint lg:block xl:text-[12rem]">
            RFID
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
                  <span className="text-secondary">[</span> LINE_B · RFID_TAGS{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display mt-5 text-[2.6rem] font-bold leading-[0.92] tracking-tight sm:text-5xl"
              >
                <span className="block">RFID</span>
                <span className="text-stroke-strong block">STICKERS</span>
                <span className="block">
                  & TAGS<span className="text-secondary">.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-sm leading-relaxed text-muted-foreground"
              >
                UHF, HF, and NFC tags for asset tracking, inventory management,
                and supply-chain visibility. Custom printable, ISO-certified,
                shipped with encoding service.
              </motion.p>

              <motion.div
                ref={statRef}
                variants={fadeUp}
                className="mt-8 space-y-3 border-t border-border pt-6"
              >
                {[
                  [encoded.toLocaleString(), "TAGS ENCODED"],
                  ["3", "VARIANTS"],
                  ["500", "MIN ORDER"],
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
                  REQUEST SAMPLES
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
                <TagSchematic />
              </div>
            </motion.div>

            {/* right — quick specs rail */}
            <motion.div variants={fadeUp} className="min-w-0 lg:col-span-3">
              <div className="space-y-3">
                {[
                  { label: "LINE", value: "LINE_B" },
                  { label: "REV", value: "B" },
                  { label: "STATUS", value: "IN STOCK", accent: true },
                  { label: "STANDARDS", value: "ISO 18000-6C" },
                  { label: "FREQ BANDS", value: "UHF/HF/NFC" },
                  { label: "READ RANGE", value: "±3m MAX" },
                  { label: "CHIP OPTIONS", value: "M730/NTAG/SLIX2" },
                  { label: "SUBSTRATE", value: "PET/PVC/PAPER" },
                  { label: "ADHESIVE", value: "PERMANENT" },
                  { label: "PRINT", value: "THERMAL/OFFSET" },
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
          <div className="rfid-marquee flex w-max whitespace-nowrap">
            {[
              "ISO 18000-6C",
              "EPC GEN2 V2",
              "GS1 COMPLIANT",
              "ROHS",
              "REACH",
              "CUSTOM ENCODING",
              "BULK DISCOUNTS",
              "API INTEGRATION",
            ]
              .concat([
                "ISO 18000-6C",
                "EPC GEN2 V2",
                "GS1 COMPLIANT",
                "ROHS",
                "REACH",
                "CUSTOM ENCODING",
                "BULK DISCOUNTS",
                "API INTEGRATION",
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

      {/* ════════════════════════ TAG VARIANTS ════════════════════════ */}
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
                  <span className="text-secondary">[</span> TAG_VARIANTS{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">THREE FREQUENCIES.</span>
                <span className="text-stroke-strong block">ONE SUPPLIER.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              Pick the frequency that matches your reader infrastructure and
              read-range requirement. We encode, print, and ship all three from
              the same production line.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5"
          >
            {TAG_VARIANTS.map((t, i) => (
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
                    <Tag className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="clip-corner border border-border bg-background px-2 py-0.5 font-tech text-[9px] tracking-[0.16em] text-primary">
                    {t.freq}
                  </span>
                </div>

                <h3 className="relative z-10 font-display mt-4 text-xl font-bold tracking-tight text-foreground">
                  {t.name}
                </h3>

                <div className="relative z-10 mt-4 space-y-2 font-tech text-[10px] tracking-[0.14em] text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>CHIP</span>
                    <span className="font-semibold text-foreground">
                      {t.chip}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>RANGE</span>
                    <span className="font-semibold text-secondary">
                      {t.range}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SUBSTRATE</span>
                    <span className="font-semibold text-foreground">
                      {t.substrate}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 mt-auto flex min-w-0 items-center border-t border-border pt-4 font-tech text-[10px] tracking-[0.18em] text-muted-foreground">
                  <span>SELECT VARIANT</span>
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

      {/* ════════════════════════ MATERIAL COMPATIBILITY ════════════════════════ */}
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
                  <span className="text-secondary">[</span> SURFACE_COMPAT{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">SURFACE</span>
                <span className="text-stroke-strong block">COMPATIBILITY.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="max-w-sm text-sm leading-relaxed text-muted-foreground"
            >
              Not all surfaces are equal. Metal and liquid detune standard tags
              — we have variants for both.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="clip-corner overflow-hidden border border-border bg-background"
          >
            <div className="grid grid-cols-[1fr_80px_1fr] border-b border-border bg-card font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
              <div className="border-r border-border px-4 py-3">
                SURFACE TYPE
              </div>
              <div className="border-r border-border px-4 py-3 text-center">
                COMPAT
              </div>
              <div className="px-4 py-3">NOTE</div>
            </div>
            {MATERIALS.map((m, i) => (
              <div
                key={m.surface}
                className={`grid grid-cols-[1fr_80px_1fr] ${i % 2 === 1 ? "bg-card/40" : ""}`}
              >
                <div className="border-r border-border px-4 py-3 text-sm text-foreground">
                  {m.surface}
                </div>
                <div className="border-r border-border px-4 py-3 text-center">
                  {m.compat === true ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </span>
                  ) : m.compat === "partial" ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center border border-secondary bg-secondary/10 font-tech text-[10px] font-bold text-secondary">
                      ~
                    </span>
                  ) : (
                    <span className="inline-flex h-5 w-5 items-center justify-center border border-border" />
                  )}
                </div>
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  {m.note}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-x-5 gap-y-2 border-t border-border bg-card px-4 py-3 font-tech text-[9px] tracking-[0.18em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-primary" /> FULL COMPAT
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 border border-secondary bg-secondary/10" />{" "}
                PARTIAL / VARIANT REQ
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ DEPLOYMENT SCENARIOS ════════════════════════ */}
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
                <span className="block">WHERE TAGS</span>
                <span className="text-stroke-strong block">GET READ.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              Four environments, four typical read ranges. Each scenario ships
              with pre-encoded tags matched to your reader frequency and power
              settings.
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
                    RANGE: {d.range}
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
                    PRE-ENCODED
                  </span>
                </div>

                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ CTA — sample order console ════════════════════════ */}
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
              SAMPLE
            </span>

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              {/* prompt */}
              <div className="min-w-0 lg:col-span-7">
                <div className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-secondary">
                  <span className="rfid-pulse h-1.5 w-1.5 bg-secondary" />
                  ORDER_SAMPLE_KIT //
                </div>

                <div className="mt-5 min-w-0 overflow-hidden border border-background/15 bg-background/5 p-4 font-tech text-[12px] sm:text-[13px]">
                  <div className="flex min-w-0">
                    <span className="select-none pr-2 text-secondary">$</span>
                    <span className="min-w-0 truncate text-background/90">
                      itrack samples --line RFID --qty kit
                      <span className="rfid-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-secondary" />
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-0.5 text-background/45">
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> 3 variants ×
                      10 tags each
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> pre-encoded
                      with test EPCs
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> surface
                      compatibility guide included
                    </div>
                  </div>
                </div>

                <h2 className="font-display mt-6 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3.2rem]">
                  <span className="block">READY TO TEST</span>
                  <span className="block">
                    <span className="text-secondary">THE TAGS?</span>
                  </span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/65 sm:text-base">
                  Get a sample kit with all three variants, pre-encoded and
                  ready to scan. Validate read range, adhesion, and print
                  quality in your actual environment before you commit to
                  volume.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="#contact"
                    className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-background hover:text-foreground"
                  >
                    ORDER SAMPLE KIT
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
                    ["SAMPLE KITS", "AVAILABLE", Package],
                    ["SHIP TIME", "3 DAYS", Truck],
                    ["VARIANTS", "3 TYPES", Layers],
                    ["ENCODING", "INCLUDED", ScanLine],
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
                      PRE-ENCODED WITH TEST EPCS
                    </div>
                    <div className="truncate text-[11px] text-background/55">
                      scan out of the box, no setup needed
                    </div>
                  </div>
                </div>

                <div className="clip-corner mt-3 flex items-center justify-between gap-3 border border-background/15 bg-background/5 p-4 font-tech text-[11px] tracking-[0.16em]">
                  <span className="text-background/55">KIT STATUS</span>
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
              LINE_B // RFID_STICKERS_AND_TAGS
            </span>
            <span className="flex items-center gap-2.5">
              <Plus className="h-3 w-3 rotate-45 text-secondary" />
              NEXT: INDUSTRIAL PRINTERS →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
