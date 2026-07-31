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
  BatteryFull,
  Smartphone,
  Cpu,
  ScanLine,
  Truck,
  Package,
  Workflow,
  FileText,
  Download,
  Gauge,
  Wifi,
  HardDrive,
  Layers,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    code: "SUBSYS_A",
    icon: ShieldCheck,
    tag: "+DURABILITY",
    title: "Military-Grade Durability",
    description:
      "IP67 rated with shock resistance, perfect for harsh field environments.",
    visual: "ip" as const,
  },
  {
    code: "SUBSYS_B",
    icon: BatteryFull,
    tag: "+POWER",
    title: "Extended Battery Life",
    description: "All-day operation with quick charging capabilities.",
    visual: "bat" as const,
  },
  {
    code: "SUBSYS_C",
    icon: Smartphone,
    tag: "+OS",
    title: "Android-Based OS",
    description: "Familiar interface with enterprise customization options.",
    visual: "os" as const,
  },
  {
    code: "SUBSYS_D",
    icon: Cpu,
    tag: "+SCANNING",
    title: "Integrated Scanners",
    description: "1D/2D barcode and RFID scanning built-in for inventory work.",
    visual: "scan" as const,
  },
];

const SPECS = [
  {
    cat: "DISPLAY",
    val: 'High-brightness 5-6" touchscreen, readable in sunlight',
  },
  {
    cat: "PROCESSING",
    val: "Quad-core processor with 4GB+ RAM for smooth multitasking",
  },
  {
    cat: "CONNECTIVITY",
    val: "4G LTE, WiFi 6, Bluetooth 5.2, NFC capabilities",
  },
  { cat: "STORAGE", val: "64GB–128GB expandable storage for large databases" },
  { cat: "SCANNING", val: "High-performance barcode and RFID scanner modules" },
  { cat: "BATTERY", val: "5000+ mAh with hot-swap capability available" },
];

const DEPLOYMENTS = [
  {
    env: "WH-01",
    title: "Warehouse Management",
    desc: "Real-time inventory tracking and stock level updates.",
  },
  {
    env: "RT-02",
    title: "Retail Operations",
    desc: "Mobile checkout, price lookup, and inventory audits.",
  },
  {
    env: "AM-03",
    title: "Asset Management",
    desc: "Track equipment, tools, and assets across locations.",
  },
  {
    env: "FS-04",
    title: "Field Service",
    desc: "Service technician devices with job dispatch and documentation.",
  },
];

const RATINGS = [
  "IP67 SEALED",
  "MIL-STD-810G",
  "1.8m DROP TESTED",
  "-20°C → 50°C",
  "HOT-SWAP READY",
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
  -webkit-mask-image: radial-gradient(ellipse 92% 80% at 70% 14%, black 6%, transparent 80%);
  mask-image: radial-gradient(ellipse 92% 80% at 70% 14%, black 6%, transparent 80%);
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

@keyframes dev-ping { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(2.8); opacity: 0; } }
.dev-ping { transform-box: fill-box; transform-origin: center; animation: dev-ping 2s ease-out infinite; }

@keyframes dev-scan { 0% { top: 4%; } 100% { top: 96%; } }
.dev-scan {
  position: absolute; left: 6%; right: 6%; height: 2px;
  background: linear-gradient(to right, transparent, var(--secondary), transparent);
  box-shadow: 0 0 8px color-mix(in srgb, var(--secondary) 60%, transparent);
  animation: dev-scan 2.8s ease-in-out infinite;
}

@keyframes dev-dash { to { stroke-dashoffset: -100; } }
.dev-dash { stroke-dasharray: 6 6; animation: dev-dash 2.2s linear infinite; }

@keyframes dev-bar { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
.dev-bar { transform-origin: bottom; animation: dev-bar 1.1s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .dev-blink, .dev-pulse, .dev-ping, .dev-scan, .dev-dash, .dev-bar { animation: none; }
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
/*  Hero schematic                                                     */
/* ------------------------------------------------------------------ */

function DeviceSchematic() {
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
            <span className="truncate">FIG.01 — RUGGED HANDHELD</span>
          </span>
          <span className="shrink-0 font-tech text-[10px] tracking-[0.2em] text-primary">
            ITR-H1
          </span>
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
              <circle
                cx="206"
                cy="84"
                r="4"
                className="dev-ping fill-secondary/40"
              />
              <circle cx="206" cy="84" r="3" className="fill-secondary" />
              <circle
                cx="110"
                cy="180"
                r="4"
                className="dev-ping fill-secondary/40"
              />
              <circle cx="110" cy="180" r="3" className="fill-secondary" />
              <circle cx="230" cy="250" r="3" className="fill-primary" />
              <circle cx="200" cy="396" r="3" className="fill-primary" />

              {/* callout labels */}
              <g
                className="font-tech"
                style={{ fontSize: 11, letterSpacing: 1 }}
              >
                <text x="300" y="56" className="fill-foreground">
                  2D IMAGER
                </text>
                <text
                  x="38"
                  y="176"
                  textAnchor="end"
                  className="fill-secondary"
                >
                  IP67 SEALED
                </text>
                <text x="300" y="246" className="fill-foreground">
                  5000 mAh
                </text>
                <text x="300" y="428" className="fill-foreground">
                  1.8m DROP
                </text>
              </g>

              {/* device body */}
              <rect
                x="110"
                y="70"
                width="120"
                height="250"
                rx="20"
                className="fill-card stroke-primary"
                strokeWidth="2.5"
              />
              {/* antenna */}
              <rect
                x="150"
                y="58"
                width="40"
                height="12"
                rx="4"
                className="fill-primary"
              />
              {/* imager window */}
              <rect
                x="134"
                y="80"
                width="72"
                height="12"
                rx="3"
                className="fill-secondary/20 stroke-secondary"
                strokeWidth="1.5"
              />
              {/* screen */}
              <rect
                x="122"
                y="100"
                width="96"
                height="118"
                rx="4"
                className="fill-background stroke-border"
                strokeWidth="1.5"
              />
              {/* screen content lines */}
              <g className="fill-border">
                <rect x="132" y="112" width="60" height="6" rx="2" />
                <rect x="132" y="126" width="76" height="4" rx="2" />
                <rect x="132" y="136" width="50" height="4" rx="2" />
                <rect
                  x="132"
                  y="150"
                  width="76"
                  height="26"
                  rx="3"
                  className="fill-primary/15"
                />
                <rect x="132" y="184" width="76" height="4" rx="2" />
                <rect x="132" y="194" width="40" height="4" rx="2" />
              </g>
              {/* keypad */}
              <g className="fill-background stroke-border" strokeWidth="1.2">
                {[0, 1, 2].map((r) =>
                  [0, 1, 2].map((c) => (
                    <rect
                      key={`${r}-${c}`}
                      x={134 + c * 26}
                      y={232 + r * 22}
                      width="18"
                      height="14"
                      rx="3"
                    />
                  )),
                )}
              </g>
              {/* side button */}
              <rect
                x="230"
                y="140"
                width="6"
                height="34"
                rx="2"
                className="fill-secondary"
              />
              {/* grip */}
              <path
                d="M150 320 L190 320 L202 402 L138 402 Z"
                className="fill-card stroke-primary"
                strokeWidth="2.5"
              />
              <rect
                x="150"
                y="340"
                width="14"
                height="30"
                rx="4"
                className="fill-primary/20 stroke-primary"
                strokeWidth="1.5"
              />
            </svg>

            {/* scan sweep over the screen */}
            <div
              className="pointer-events-none absolute"
              style={{
                left: "35.9%",
                top: "22.7%",
                width: "28.2%",
                height: "26.8%",
              }}
            >
              <span className="dev-scan" />
            </div>
          </div>
        </div>

        {/* footer status */}
        <div className="flex items-center justify-between border-t border-border bg-background px-4 py-2 font-tech text-[9px] tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="dev-pulse h-1.5 w-1.5 bg-primary" /> DATASHEET //
            REV C
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
        <span className="font-tech text-[9px] tracking-[0.16em] text-foreground">
          STOCK · 1,240
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
/*  Subsystem visuals                                                  */
/* ------------------------------------------------------------------ */

function IpVisual() {
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
            whileInView={{ pathLength: 0.98 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-base font-bold leading-none text-foreground">
            98
          </span>
          <span className="font-tech text-[7px] tracking-[0.18em] text-muted-foreground">
            IP67
          </span>
        </div>
      </div>
      <div className="min-w-0 font-tech text-[9px] leading-relaxed tracking-[0.14em] text-muted-foreground">
        MIL-STD-810G
        <br />
        1.8m DROP · SEALED
      </div>
    </div>
  );
}

function BatVisual() {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <BatteryFull className="h-4 w-4 text-primary" />
        <div className="h-3 min-w-0 flex-1 overflow-hidden border border-border bg-background">
          <motion.span
            className="block h-full bg-secondary"
            initial={{ width: 0 }}
            whileInView={{ width: "87%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <span className="font-tech text-[10px] font-semibold text-secondary">
          87%
        </span>
      </div>
      <div className="mt-2 font-tech text-[9px] tracking-[0.14em] text-muted-foreground">
        5000 mAh · HOT-SWAP READY
      </div>
    </div>
  );
}

function OsVisual() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="clip-corner flex h-10 w-10 items-center justify-center border border-border bg-background">
        <Smartphone className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0 font-tech text-[9px] leading-relaxed tracking-[0.14em] text-muted-foreground">
        ANDROID ENTERPRISE
        <br />
        KIOSK MODE · MDM READY
      </div>
    </div>
  );
}

function ScanVisual() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="relative h-10 min-w-0 flex-1 overflow-hidden border border-border bg-background">
        <span className="dev-scan pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center font-tech text-[10px] tracking-[0.2em] text-primary">
          SCAN ACTIVE
        </div>
      </div>
      <div className="shrink-0 font-tech text-[9px] tracking-[0.16em] text-secondary">
        1D/2D+RFID
      </div>
    </div>
  );
}

function SubsystemVisual({ kind }: { kind: "ip" | "bat" | "os" | "scan" }) {
  if (kind === "ip") return <IpVisual />;
  if (kind === "bat") return <BatVisual />;
  if (kind === "os") return <OsVisual />;
  return <ScanVisual />;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function IndustrialMobileDevicePage() {
  const statRef = useRef<HTMLDivElement | null>(null);
  const statStarted = useInView(statRef, { once: true, amount: 0.6 });
  const deployed = useCountUp(12480, statStarted);

  return (
    <div className="relative isolate w-full overflow-x-clip bg-background text-foreground">
      <style>{devStyles}</style>

      {/* ── context bar ── */}
      <div className="relative z-20 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6 lg:px-8">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">
              itrack <span className="text-border">/</span> products{" "}
              <span className="text-border">/</span>{" "}
              <span className="text-foreground">itr-h1-datasheet</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-primary">
            <span className="dev-pulse h-1.5 w-1.5 bg-primary" />
            REV C · CERTIFIED
          </span>
        </div>
      </div>

      {/* ════════════════════════ HERO — title block + schematic ════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="dev-dotgrid absolute inset-0" />
          <span className="font-display absolute -top-6 right-0 hidden select-none text-[9rem] font-bold leading-none text-stroke-faint lg:block xl:text-[12rem]">
            SPEC
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
                  <span className="text-secondary">[</span> MODEL ITR-H1{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display mt-5 text-[2.6rem] font-bold leading-[0.92] tracking-tight sm:text-5xl"
              >
                <span className="block">INDUSTRIAL</span>
                <span className="text-stroke-strong block">MOBILE</span>
                <span className="block">
                  DEVICE<span className="text-secondary">.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-sm leading-relaxed text-muted-foreground"
              >
                Rugged handheld for inventory management, asset tracking, and
                field operations. IP67 sealed, 1.8m drop tested, Android
                Enterprise ready.
              </motion.p>

              <motion.div
                ref={statRef}
                variants={fadeUp}
                className="mt-8 space-y-3 border-t border-border pt-6"
              >
                {[
                  [deployed.toLocaleString(), "UNITS DEPLOYED"],
                  ["2YR", "WARRANTY"],
                  ["5 DAYS", "LEAD TIME"],
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
                <DeviceSchematic />
              </div>
            </motion.div>

            {/* right — quick specs rail */}
            <motion.div variants={fadeUp} className="min-w-0 lg:col-span-3">
              <div className="space-y-3">
                {[
                  { label: "MODEL", value: "ITR-H1" },
                  { label: "REV", value: "C" },
                  { label: "STATUS", value: "IN STOCK", accent: true },
                  { label: "IP RATING", value: "IP67" },
                  { label: "DROP TEST", value: "1.8m" },
                  { label: "BATTERY", value: "5000 mAh" },
                  { label: "OS", value: "ANDROID ENT." },
                  { label: "SCAN", value: "1D/2D+RFID" },
                  { label: "CONNECT", value: "4G/WiFi6/BT5.2" },
                  { label: "STORAGE", value: "64–128 GB" },
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

      {/* ── ratings badge band ── */}
      <div className="relative border-y border-border bg-card/40">
        <div className="overflow-hidden py-3">
          <div className="flex w-max whitespace-nowrap">
            {RATINGS.map((r, i) => (
              <span
                key={i}
                className="mx-3 flex items-center gap-3 font-tech text-[10px] tracking-[0.24em] text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 bg-secondary" />
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════ SUBSYSTEM MANIFEST — features ════════════════════════ */}
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
                  <span className="text-secondary">[</span> SUBSYSTEM_MANIFEST{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">FOUR MODULES.</span>
                <span className="text-stroke-strong block">ONE DEVICE.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              Each subsystem is measured, not marketed. The indicators below
              show real test results — durability rating, battery state, OS
              readiness, and scanning coverage.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
          >
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.code}
                  variants={cardIn}
                  className="group clip-corner relative flex min-w-0 flex-col overflow-hidden border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7"
                >
                  <CropTicks />
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute -top-5 right-2 select-none text-[5.5rem] font-bold leading-none text-stroke-faint"
                  >
                    {f.code.replace("SUBSYS_", "")}
                  </span>

                  <div className="relative z-10 flex min-w-0 items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2.5 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                      <span className="font-semibold text-secondary">
                        {f.code}
                      </span>
                      <span className="h-3 w-px bg-border" />
                      <span className="truncate">{f.tag}</span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background transition-colors duration-300 group-hover:border-primary">
                      <Icon className="h-4 w-4 text-primary transition-colors duration-300 group-hover:text-secondary" />
                    </span>
                  </div>

                  <h3 className="relative z-10 font-display mt-4 text-xl font-bold tracking-tight text-foreground">
                    {f.title}
                  </h3>
                  <p className="relative z-10 mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>

                  <div className="relative z-10 mt-auto border-t border-border pt-5">
                    <SubsystemVisual kind={f.visual} />
                  </div>

                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
                </motion.div>
              );
            })}
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
            {/* header row */}
            <div className="grid grid-cols-[140px_1fr] border-b border-border bg-card font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
              <div className="border-r border-border px-4 py-3">PARAMETER</div>
              <div className="px-4 py-3">SPECIFICATION</div>
            </div>
            {SPECS.map((spec, i) => (
              <div
                key={spec.cat}
                className={`grid grid-cols-[140px_1fr] ${
                  i % 2 === 1 ? "bg-card/40" : ""
                }`}
              >
                <div className="border-r border-border px-4 py-3 font-tech text-[10px] font-semibold tracking-[0.2em] text-primary">
                  {spec.cat}
                </div>
                <div className="px-4 py-3 text-sm leading-relaxed text-foreground">
                  {spec.val}
                </div>
              </div>
            ))}
            {/* footer */}
            <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3 font-tech text-[9px] tracking-[0.18em] text-muted-foreground">
              <span>SPECIFICATIONS SUBJECT TO CHANGE WITHOUT NOTICE</span>
              <button className="flex items-center gap-2 text-primary transition-colors hover:text-secondary">
                <Download className="h-3 w-3" /> DOWNLOAD PDF
              </button>
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
                <span className="block">WHERE IT</span>
                <span className="text-stroke-strong block">DEPLOYS.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              Four environments, four typical configurations. Each one ships
              with the software stack pre-integrated so the device works on day
              one, not after weeks of setup.
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
                  <ArrowUpRight className="h-4 w-4 shrink-0 -translate-y-0.5 translate-x-0.5 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
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
                    PRE-INTEGRATED
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
                  <span className="dev-pulse h-1.5 w-1.5 bg-secondary" />
                  REQUEST_DEMO_UNIT //
                </div>

                <div className="mt-5 min-w-0 overflow-hidden border border-background/15 bg-background/5 p-4 font-tech text-[12px] sm:text-[13px]">
                  <div className="flex min-w-0">
                    <span className="select-none pr-2 text-secondary">$</span>
                    <span className="min-w-0 truncate text-background/90">
                      itrack demo --model ITR-H1 --qty eval
                      <span className="dev-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-secondary" />
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-0.5 text-background/45">
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> evaluation
                      unit ships in 3 days
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> pre-loaded
                      with your workflow
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
                    <span className="text-secondary">THE ITR-H1?</span>
                  </span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/65 sm:text-base">
                  Put it in your team's hands before you commit. We'll ship an
                  evaluation unit pre-loaded with your workflow so you can
                  validate fit in your actual environment.
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
                      PRE-LOADED WITH YOUR WORKFLOW
                    </div>
                    <div className="truncate text-[11px] text-background/55">
                      test in your environment, not ours
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
              ITR-H1 // INDUSTRIAL_MOBILE_DEVICE
            </span>
            <span className="flex items-center gap-2.5">
              <Plus className="h-3 w-3 rotate-45 text-secondary" />
              NEXT: RFID STICKERS & TAGS →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
