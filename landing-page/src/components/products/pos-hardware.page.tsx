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
  CreditCard,
  Monitor,
  Printer,
  DollarSign,
  Wifi,
  BarChart3,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const POS_VARIANTS = [
  {
    code: "POS-CT-01",
    name: "Countertop Terminal",
    screen: '15" Touch',
    processor: "Quad-Core ARM",
    connectivity: "Ethernet/WiFi/BT",
    duty: "High Volume",
  },
  {
    code: "POS-MB-02",
    name: "Mobile POS",
    screen: '8" Touch',
    processor: "Octa-Core",
    connectivity: "4G/WiFi/BT/NFC",
    duty: "Tableside/Queue",
  },
  {
    code: "POS-SF-03",
    name: "Self-Service Kiosk",
    screen: '21.5" Touch',
    processor: "i5 Embedded",
    connectivity: "Ethernet/WiFi",
    duty: "Unattended",
  },
];

const SPECS = [
  { cat: "DISPLAY", val: '15"–21.5" PCAP Touch · Sunlight Readable Option' },
  {
    cat: "PROCESSOR",
    val: "ARM Quad-Core / Intel i5 Embedded (model dependent)",
  },
  { cat: "MEMORY", val: "4GB–8GB RAM · 64GB–256GB Storage" },
  { cat: "PAYMENT", val: "EMV Chip · NFC Contactless · MSR · PIN Pad" },
  {
    cat: "PERIPHERALS",
    val: "Receipt Printer · Cash Drawer · Barcode Scanner",
  },
  {
    cat: "CONNECTIVITY",
    val: "Ethernet · WiFi 6 · Bluetooth 5.0 · 4G LTE (mobile)",
  },
  { cat: "OS", val: "Android POS · Windows IoT · Linux Embedded" },
  { cat: "CERTIFICATION", val: "PCI PTS v5 · EMV L1/L2 · PA-DSS Compliant" },
];

const PAYMENTS = [
  {
    method: "EMV Chip Cards",
    standard: "EMV Level 1 & 2",
    note: "Chip-and-PIN · Chip-and-Signature",
  },
  {
    method: "NFC Contactless",
    standard: "ISO 14443 A/B",
    note: "Apple Pay · Google Pay · Tap-to-Pay",
  },
  {
    method: "Magstripe (MSR)",
    standard: "ISO 7811",
    note: "Fallback · Legacy support",
  },
  {
    method: "QR Code Payment",
    standard: "Proprietary / Open",
    note: "Scan-to-pay · Wallet integration",
  },
];

const DEPLOYMENTS = [
  {
    env: "RT-CHECKOUT",
    title: "Retail Checkout",
    desc: "High-speed transaction processing with integrated peripherals.",
    volume: "500+ txn/day",
  },
  {
    env: "HOSP-TABLE",
    title: "Hospitality Tableside",
    desc: "Mobile ordering and payment at the table.",
    volume: "200+ txn/day",
  },
  {
    env: "QSR-DRIVE",
    title: "QSR Drive-Thru",
    desc: "Weather-resistant terminals for outdoor service windows.",
    volume: "800+ txn/day",
  },
  {
    env: "SELF-KIOSK",
    title: "Self-Service Kiosk",
    desc: "Unattended ordering and payment for high-traffic venues.",
    volume: "1000+ txn/day",
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
/*  Styles (self-contained, namespaced pos-)                           */
/* ------------------------------------------------------------------ */

const posStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.pos-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 72%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 92% 80% at 30% 14%, black 6%, transparent 80%);
  mask-image: radial-gradient(ellipse 92% 80% at 30% 14%, black 6%, transparent 80%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 7%, transparent); color: transparent; }
.text-stroke-light  { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--background) 14%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes pos-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.pos-blink { animation: pos-blink 1s step-end infinite; }

@keyframes pos-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.pos-pulse { animation: pos-pulse 1.6s ease-out infinite; }

@keyframes pos-tap {
  0% { transform: scale(1); opacity: .6; }
  50% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: .6; }
}
.pos-tap { animation: pos-tap 2s ease-in-out infinite; }

@keyframes pos-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.pos-marquee { animation: pos-marquee 30s linear infinite; }
.pos-marquee:hover { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .pos-blink, .pos-pulse, .pos-tap, .pos-marquee { animation: none; }
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
      <span className="pos-pulse h-2 w-2 shrink-0 bg-secondary" />
      <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Terminal schematic                                                 */
/* ------------------------------------------------------------------ */

function TerminalSchematic() {
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
            <Monitor className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">FIG.01 — POS TERMINAL ANATOMY</span>
          </span>
          <span className="shrink-0 font-tech text-[10px] tracking-[0.2em] text-primary">
            POS-CT-01
          </span>
        </div>

        {/* diagram */}
        <div className="relative min-w-0 p-6 sm:p-8">
          <svg viewBox="0 0 340 320" className="h-auto w-full" aria-hidden>
            {/* callout lines */}
            <g className="stroke-border" strokeWidth="1.5" fill="none">
              <path d="M170 80 L300 60" />
              <path d="M260 160 L300 160" />
              <path d="M170 240 L300 260" />
              <path d="M80 160 L40 160" />
            </g>

            {/* pulsing anchor nodes */}
            <circle
              cx="170"
              cy="80"
              r="3"
              className="pos-pulse fill-secondary/40"
            />
            <circle cx="170" cy="80" r="2.5" className="fill-secondary" />
            <circle cx="260" cy="160" r="3" className="fill-primary" />
            <circle cx="170" cy="240" r="3" className="fill-primary" />
            <circle cx="80" cy="160" r="3" className="fill-secondary" />

            {/* callout labels */}
            <g className="font-tech" style={{ fontSize: 11, letterSpacing: 1 }}>
              <text x="300" y="56" className="fill-foreground">
                PCAP TOUCHSCREEN
              </text>
              <text x="300" y="156" className="fill-foreground">
                CARD READER (EMV/NFC)
              </text>
              <text x="300" y="276" className="fill-foreground">
                RECEIPT PRINTER
              </text>
              <text x="38" y="156" textAnchor="end" className="fill-secondary">
                CASH DRAWER PORT
              </text>
            </g>

            {/* terminal body */}
            <rect
              x="90"
              y="50"
              width="160"
              height="220"
              rx="12"
              className="fill-card stroke-primary"
              strokeWidth="2"
            />

            {/* screen */}
            <rect
              x="105"
              y="65"
              width="130"
              height="80"
              rx="4"
              className="fill-background stroke-border"
              strokeWidth="1.5"
            />
            {/* screen UI elements */}
            <rect
              x="115"
              y="75"
              width="50"
              height="8"
              rx="2"
              className="fill-primary/20"
            />
            <rect
              x="115"
              y="90"
              width="110"
              height="6"
              rx="2"
              className="fill-muted/30"
            />
            <rect
              x="115"
              y="102"
              width="80"
              height="6"
              rx="2"
              className="fill-muted/30"
            />
            <rect
              x="115"
              y="118"
              width="110"
              height="18"
              rx="3"
              className="fill-secondary/15 stroke-secondary/30"
              strokeWidth="0.5"
            />

            {/* card reader slot */}
            <rect
              x="240"
              y="150"
              width="30"
              height="20"
              rx="3"
              className="fill-background stroke-primary"
              strokeWidth="1.5"
            />
            <rect
              x="245"
              y="155"
              width="20"
              height="4"
              rx="1"
              className="fill-secondary/30"
            />
            {/* NFC tap indicator */}
            <circle
              cx="255"
              cy="140"
              r="8"
              className="pos-tap fill-none stroke-secondary/40"
              strokeWidth="1.5"
            />
            <CreditCard className="h-4 w-4 text-secondary" x="251" y="156" />

            {/* receipt printer slot */}
            <rect
              x="130"
              y="230"
              width="80"
              height="16"
              rx="4"
              className="fill-background stroke-border"
              strokeWidth="1.5"
            />
            <Printer className="h-4 w-4 text-primary" x="165" y="232" />
            {/* emerging receipt */}
            <rect
              x="140"
              y="220"
              width="60"
              height="12"
              rx="1"
              className="fill-secondary/10 stroke-secondary/20"
              strokeWidth="0.5"
            />

            {/* cash drawer port */}
            <rect
              x="60"
              y="152"
              width="20"
              height="16"
              rx="3"
              className="fill-background stroke-secondary"
              strokeWidth="1.5"
            />
            <DollarSign className="h-4 w-4 text-secondary" x="66" y="156" />

            {/* stand base */}
            <path
              d="M130 270 L210 270 L220 290 L120 290 Z"
              className="fill-card stroke-primary"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* footer status */}
        <div className="flex items-center justify-between border-t border-border bg-background px-4 py-2 font-tech text-[9px] tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="pos-pulse h-1.5 w-1.5 bg-primary" /> DATASHEET //
            REV B
          </span>
          <span className="hidden sm:inline">PCI PTS V5 · IN STOCK</span>
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
          THROUGHPUT · 500+ TXN/DAY
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
          PCI PTS V5
        </span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function PosHardwarePage() {
  const statRef = useRef<HTMLDivElement | null>(null);
  const statStarted = useInView(statRef, { once: true, amount: 0.6 });
  const processed = useCountUp(12000000, statStarted);

  return (
    <div className="relative isolate w-full overflow-x-clip bg-background text-foreground">
      <style>{posStyles}</style>

      {/* ── context bar ── */}
      <div className="relative z-20 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6 lg:px-8">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">
              itrack <span className="text-border">/</span> products{" "}
              <span className="text-border">/</span>{" "}
              <span className="text-foreground">pos-hardware-datasheet</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-primary">
            <span className="pos-pulse h-1.5 w-1.5 bg-primary" />
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
          <div className="pos-dotgrid absolute inset-0" />
          <span className="font-display absolute -top-6 left-0 hidden select-none text-[9rem] font-bold leading-none text-stroke-faint lg:block xl:text-[12rem]">
            POS
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
                  <span className="text-secondary">[</span> LINE_D ·
                  POS_HARDWARE <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display mt-5 text-[2.6rem] font-bold leading-[0.92] tracking-tight sm:text-5xl"
              >
                <span className="block">POS</span>
                <span className="text-stroke-strong block">HARDWARE</span>
                <span className="block">
                  SOLUTIONS<span className="text-secondary">.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-sm leading-relaxed text-muted-foreground"
              >
                Complete Point of Sale systems including terminals, card
                readers, receipt printers, and peripherals. Designed for retail
                and hospitality businesses to streamline transactions and
                improve customer experience.
              </motion.p>

              <motion.div
                ref={statRef}
                variants={fadeUp}
                className="mt-8 space-y-3 border-t border-border pt-6"
              >
                {[
                  [processed.toLocaleString(), "TXNS PROCESSED"],
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
                <TerminalSchematic />
              </div>
            </motion.div>

            {/* right — quick specs rail */}
            <motion.div variants={fadeUp} className="min-w-0 lg:col-span-3">
              <div className="space-y-3">
                {[
                  { label: "LINE", value: "LINE_D" },
                  { label: "REV", value: "B" },
                  { label: "STATUS", value: "IN STOCK", accent: true },
                  { label: "DISPLAY", value: '15"–21.5"' },
                  { label: "PAYMENT", value: "EMV/NFC/MSR" },
                  { label: "CONNECT", value: "ETH/WIFI/BT/4G" },
                  { label: "OS", value: "ANDROID/WIN/LINUX" },
                  { label: "CERT", value: "PCI PTS V5" },
                  { label: "PERIPHERALS", value: "PRINTER/DRAWER" },
                  { label: "DUTY", value: "HIGH VOLUME" },
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
          <div className="pos-marquee flex w-max whitespace-nowrap">
            {[
              "PCI PTS V5",
              "EMV LEVEL 1 & 2",
              "PA-DSS COMPLIANT",
              "NFC CONTACTLESS",
              "APPLE PAY",
              "GOOGLE PAY",
              "CHIP-AND-PIN",
              "MSR FALLBACK",
            ]
              .concat([
                "PCI PTS V5",
                "EMV LEVEL 1 & 2",
                "PA-DSS COMPLIANT",
                "NFC CONTACTLESS",
                "APPLE PAY",
                "GOOGLE PAY",
                "CHIP-AND-PIN",
                "MSR FALLBACK",
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

      {/* ════════════════════════ POS VARIANTS ════════════════════════ */}
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
                  <span className="text-secondary">[</span> POS_VARIANTS{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">THREE FORM FACTORS.</span>
                <span className="text-stroke-strong block">ONE ECOSYSTEM.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              Pick the form factor that matches your service model. All three
              share the same payment stack, peripheral drivers, and management
              console — so switching models doesn't mean retraining staff.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5"
          >
            {POS_VARIANTS.map((t, i) => (
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
                    <Monitor className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="clip-corner border border-border bg-background px-2 py-0.5 font-tech text-[9px] tracking-[0.16em] text-primary">
                    {t.screen}
                  </span>
                </div>

                <h3 className="relative z-10 font-display mt-4 text-xl font-bold tracking-tight text-foreground">
                  {t.name}
                </h3>

                <div className="relative z-10 mt-4 space-y-2 font-tech text-[10px] tracking-[0.14em] text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>CPU</span>
                    <span className="font-semibold text-foreground">
                      {t.processor}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CONNECT</span>
                    <span className="font-semibold text-secondary">
                      {t.connectivity}
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

      {/* ════════════════════════ PAYMENT CERTIFICATION ════════════════════════ */}
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
                  <span className="text-secondary">[</span> PAYMENT_CERT{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">PAYMENT</span>
                <span className="text-stroke-strong block">CERTIFICATION.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="max-w-sm text-sm leading-relaxed text-muted-foreground"
            >
              Every payment method is certified to the relevant standard. We
              handle the compliance paperwork so you can focus on serving
              customers.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="clip-corner overflow-hidden border border-border bg-background"
          >
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-border bg-card font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
              <div className="border-r border-border px-4 py-3">
                PAYMENT METHOD
              </div>
              <div className="border-r border-border px-4 py-3">STANDARD</div>
              <div className="px-4 py-3">NOTE</div>
            </div>
            {PAYMENTS.map((p, i) => (
              <div
                key={p.method}
                className={`grid grid-cols-[1fr_1fr_1fr] ${i % 2 === 1 ? "bg-card/40" : ""}`}
              >
                <div className="border-r border-border px-4 py-3 font-tech text-[10px] font-semibold tracking-[0.18em] text-secondary">
                  {p.method}
                </div>
                <div className="border-r border-border px-4 py-3 text-sm text-foreground">
                  {p.standard}
                </div>
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  {p.note}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-x-5 gap-y-2 border-t border-border bg-card px-4 py-3 font-tech text-[9px] tracking-[0.18em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-secondary" /> PAYMENT METHOD
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-primary" /> CERTIFICATION
                STANDARD
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
                <span className="block">WHERE TRANSACTIONS</span>
                <span className="text-stroke-strong block">HAPPEN.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              Four environments, four typical volumes. Each scenario ships with
              pre-configured workflows matched to your business type and peak
              hours.
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
                    {d.volume}
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
                    PRE-CONFIGURED
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
                  <span className="pos-pulse h-1.5 w-1.5 bg-secondary" />
                  REQUEST_DEMO_UNIT //
                </div>

                <div className="mt-5 min-w-0 overflow-hidden border border-background/15 bg-background/5 p-4 font-tech text-[12px] sm:text-[13px]">
                  <div className="flex min-w-0">
                    <span className="select-none pr-2 text-secondary">$</span>
                    <span className="min-w-0 truncate text-background/90">
                      itrack demo --model POS-CT-01 --qty eval
                      <span className="pos-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-secondary" />
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
                    <span className="text-secondary">THE TERMINAL?</span>
                  </span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/65 sm:text-base">
                  Put it behind your counter before you commit. We'll ship an
                  evaluation unit pre-loaded with your workflows so you can
                  validate speed, reliability, and staff adoption in your actual
                  environment.
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
                      transact out of the box, no setup needed
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
              LINE_D // POS_HARDWARE_SOLUTIONS
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
