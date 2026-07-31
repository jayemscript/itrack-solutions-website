"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Terminal,
  ArrowRight,
  ArrowUpRight,
  Star,
  Download,
  PackageCheck,
  Signal,
  Wifi,
  WifiOff,
  BatteryFull,
  Home,
  Compass,
  Bell,
  BellRing,
  User,
  Layers,
  Gauge,
  RefreshCw,
  Check,
  Search,
  PenTool,
  Code2,
  FlaskConical,
  Rocket,
  LineChart,
  Smartphone,
  Play,
  ShoppingBag,
  Wrench,
  Gift,
  Building2,
  Workflow,
  Hash,
  Plus,
  Activity,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FEED = [
  {
    tag: "ORDER #4821",
    sub: "Out for delivery",
    metric: "ETA 12m",
    c: "bg-secondary",
  },
  {
    tag: "TASK · SITE 7",
    sub: "Inspection due today",
    metric: "2 left",
    c: "bg-primary",
  },
  {
    tag: "REWARD",
    sub: "+120 pts earned",
    metric: "★ 4.9",
    c: "bg-foreground",
  },
  {
    tag: "ALERT · FLEET",
    sub: "Vehicle 04 offline",
    metric: "sync",
    c: "bg-secondary",
  },
];

const NET_STATES = [
  {
    label: "ONLINE",
    Icon: Wifi,
    cls: "text-primary border-primary/50 bg-primary/5",
    spin: false,
  },
  {
    label: "OFFLINE",
    Icon: WifiOff,
    cls: "text-muted-foreground border-border bg-muted",
    spin: false,
  },
  {
    label: "SYNCING",
    Icon: RefreshCw,
    cls: "text-secondary border-secondary/50 bg-secondary/5",
    spin: true,
  },
  {
    label: "SYNCED",
    Icon: Check,
    cls: "text-primary border-primary/50 bg-primary/5",
    spin: false,
  },
];

const BENCH = [
  {
    idx: "01",
    icon: Layers,
    tag: "+CROSS_PLATFORM",
    title: "Cross-Platform",
    description:
      "One codebase, two stores — iOS and Android shipped in lockstep, not months apart.",
    visual: "parity" as const,
  },
  {
    idx: "02",
    icon: Gauge,
    tag: "+60FPS",
    title: "Native Performance",
    description:
      "Native bridges where it counts, so scrolling, animation and gestures feel like the OS wrote them.",
    visual: "fps" as const,
  },
  {
    idx: "03",
    icon: WifiOff,
    tag: "+OFFLINE_FIRST",
    title: "Offline-First",
    description:
      "Local storage and conflict-free sync mean the app works in a basement, on a site, on a plane.",
    visual: "net" as const,
  },
  {
    idx: "04",
    icon: BellRing,
    tag: "+REALTIME",
    title: "Push & Realtime",
    description:
      "FCM + APNs wired to your backend, so the right person gets the right ping the moment it matters.",
    visual: "push" as const,
  },
];

const TRAIN = [
  {
    code: "PHASE_01",
    ver: "concept",
    icon: Search,
    title: "Discovery & UX",
    description:
      "Map the jobs-to-be-done into flows that survive a thumb and a commute.",
  },
  {
    code: "PHASE_02",
    ver: "figma → tokens",
    icon: PenTool,
    title: "Design System",
    description:
      "A shared token set so the app, the web app and the brand never drift apart.",
  },
  {
    code: "PHASE_03",
    ver: "v0.x nightly",
    icon: Code2,
    title: "Build",
    description:
      "Native + cross-platform, with the heavy lifting on native bridges.",
  },
  {
    code: "PHASE_04",
    ver: "v1.0-rc",
    icon: FlaskConical,
    title: "Beta",
    description:
      "TestFlight + Play Console tracks, crash-free rates watched daily.",
  },
  {
    code: "PHASE_05",
    ver: "v1.0.0 shipped",
    icon: PackageCheck,
    title: "Store Release",
    description: "Signed, notarized, reviewed and live on both storefronts.",
  },
  {
    code: "PHASE_06",
    ver: "v1.x continuous",
    icon: LineChart,
    title: "OTA & Growth",
    description:
      "Phased rollouts, store-ASO and the metrics that prove the feature earned its place.",
  },
];

const MARQUEE_A = [
  "React Native",
  "Flutter",
  "Expo",
  "Swift",
  "Kotlin",
  "TypeScript",
];
const MARQUEE_B = [
  "Firebase",
  "GraphQL",
  "SQLite",
  "Realm",
  "FCM / APNs",
  "Fastlane",
  "Detox",
];

const PARITY = [
  { feature: "Offline storage", ios: true, android: true, cross: true },
  { feature: "Push & background", ios: true, android: true, cross: true },
  { feature: "Biometrics", ios: true, android: true, cross: true },
  {
    feature: "Camera / AR",
    ios: true,
    android: true,
    cross: "partial" as const,
  },
  { feature: "Maps & geofence", ios: true, android: true, cross: true },
  { feature: "In-app payments", ios: true, android: true, cross: true },
];

const STORE_APPS = [
  {
    icon: ShoppingBag,
    cat: "COMMERCE",
    title: "Retail & Commerce",
    desc: "Catalogue, checkout and order tracking in the customer's pocket.",
    rating: 4.8,
    installs: "250k+",
  },
  {
    icon: Wrench,
    cat: "OPERATIONS",
    title: "Field Service & Ops",
    desc: "Offline jobs, signatures and live fleet status for crews on site.",
    rating: 4.9,
    installs: "40k+",
  },
  {
    icon: Gift,
    cat: "ENGAGEMENT",
    title: "Loyalty & Rewards",
    desc: "Points, tiers and push that actually bring people back.",
    rating: 4.7,
    installs: "180k+",
  },
  {
    icon: Building2,
    cat: "ENTERPRISE",
    title: "Internal Tools",
    desc: "The dashboard your team wished they had on their phone.",
    rating: 4.9,
    installs: "12k seats",
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

function useCountUp(target: number, start: boolean, duration = 1500) {
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
/*  Styles (self-contained, namespaced app-)                           */
/* ------------------------------------------------------------------ */

const appStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.app-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 72%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 92% 80% at 70% 16%, black 6%, transparent 80%);
  mask-image: radial-gradient(ellipse 92% 80% at 70% 16%, black 6%, transparent 80%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 7%, transparent); color: transparent; }
.text-stroke-light  { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--background) 14%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes app-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.app-blink { animation: app-blink 1s step-end infinite; }

@keyframes app-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.app-pulse { animation: app-pulse 1.6s ease-out infinite; }

@keyframes app-spin { to { transform: rotate(360deg); } }
.app-spin { animation: app-spin 26s linear infinite; }
.app-spin-fast { animation: app-spin 1.1s linear infinite; }

@keyframes app-feed { from { transform: translateY(0); } to { transform: translateY(-50%); } }
.app-feed { animation: app-feed 9s linear infinite; }

@keyframes app-toast {
  0% { transform: translateY(-130%); opacity: 0; }
  12% { transform: translateY(0); opacity: 1; }
  82% { transform: translateY(0); opacity: 1; }
  94% { transform: translateY(-130%); opacity: 0; }
  100% { transform: translateY(-130%); opacity: 0; }
}
.app-toast { animation: app-toast 6.5s ease-in-out infinite; }

@keyframes app-bar { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
.app-bar { transform-origin: bottom; animation: app-bar 1.1s ease-in-out infinite; }

@keyframes app-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.app-marquee { animation: app-marquee 30s linear infinite; }
.app-marquee-rev { animation: app-marquee 36s linear infinite reverse; }
.app-marquee:hover, .app-marquee-rev:hover { animation-play-state: paused; }

@keyframes app-vtravel { 0% { top: 2%; } 100% { top: 98%; } }
.app-vtravel { animation: app-vtravel 4.4s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .app-blink, .app-pulse, .app-spin, .app-spin-fast, .app-feed, .app-toast,
  .app-bar, .app-marquee, .app-marquee-rev, .app-vtravel { animation: none; }
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
      <span className="app-pulse h-2 w-2 shrink-0 bg-secondary" />
      <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`${value} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < Math.round(value) ? "fill-secondary text-secondary" : "text-border"}`}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  The live device                                                    */
/* ------------------------------------------------------------------ */

function LiveDevice() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px]">
      {/* hard offset block */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-2 translate-y-2 bg-secondary"
      />

      {/* bezel */}
      <div className="relative rounded-[2.2rem] border-[6px] border-foreground bg-foreground p-1.5 shadow-2xl">
        {/* screen */}
        <div className="relative overflow-hidden rounded-[1.7rem] bg-background">
          {/* dynamic island */}
          <div className="absolute left-1/2 top-2 z-30 h-5 w-20 -translate-x-1/2 rounded-full bg-foreground" />

          {/* status bar */}
          <div className="relative z-20 flex items-center justify-between px-5 pt-2.5 font-tech text-[9px] font-semibold text-foreground">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <BatteryFull className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* app header */}
          <div className="relative z-20 flex items-center justify-between px-4 pb-2 pt-3">
            <span className="flex min-w-0 items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center bg-primary">
                <Smartphone className="h-3 w-3 text-secondary" />
              </span>
              <span className="font-display text-sm font-bold tracking-tight text-foreground">
                itrack
              </span>
            </span>
            <span className="app-spin-fast h-3.5 w-3.5 rounded-full border-2 border-border border-t-secondary" />
          </div>

          {/* sliding release toast */}
          <div className="pointer-events-none absolute inset-x-3 top-12 z-30">
            <div className="app-toast clip-corner flex items-center gap-2 border border-border bg-card px-3 py-2 shadow-lg">
              <BellRing className="h-3.5 w-3.5 shrink-0 text-secondary" />
              <span className="min-w-0 truncate font-tech text-[9px] tracking-[0.12em] text-foreground">
                v2.4.0 ready · tap to update
              </span>
            </div>
          </div>

          {/* scrolling feed */}
          <div className="relative h-[232px] overflow-hidden px-3">
            <div className="app-feed flex flex-col gap-2.5 py-1">
              {[...FEED, ...FEED].map((f, i) => (
                <div
                  key={i}
                  className="flex min-w-0 items-center gap-3 border border-border bg-card p-2.5"
                >
                  <span className={`h-8 w-8 shrink-0 ${f.c}`} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-tech text-[9px] font-semibold tracking-[0.12em] text-foreground">
                      {f.tag}
                    </div>
                    <div className="truncate text-[10px] text-muted-foreground">
                      {f.sub}
                    </div>
                  </div>
                  <span className="shrink-0 font-tech text-[9px] font-semibold text-secondary">
                    {f.metric}
                  </span>
                </div>
              ))}
            </div>
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background to-transparent" />
          </div>

          {/* tab bar */}
          <div className="relative z-20 flex items-center justify-around border-t border-border bg-card px-2 py-2.5">
            {[Home, Compass, Bell, User].map((Icon, i) => (
              <span
                key={i}
                className="relative flex h-7 w-7 items-center justify-center"
              >
                {i === 0 && (
                  <span className="app-pulse absolute inset-0 rounded-full" />
                )}
                <Icon
                  className={`h-4 w-4 ${i === 0 ? "text-secondary" : "text-muted-foreground"}`}
                />
              </span>
            ))}
          </div>

          {/* home indicator */}
          <div className="relative z-20 flex justify-center pb-2 pt-1">
            <span className="h-1 w-16 rounded-full bg-foreground/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Bench visuals                                                      */
/* ------------------------------------------------------------------ */

function ParityVisual() {
  return (
    <div className="space-y-2.5">
      {[
        ["iOS", 98],
        ["Android", 97],
      ].map(([p, v]) => (
        <div key={p as string} className="flex min-w-0 items-center gap-3">
          <span className="w-14 shrink-0 font-tech text-[10px] tracking-[0.16em] text-muted-foreground">
            {p}
          </span>
          <div className="h-1.5 min-w-0 flex-1 overflow-hidden bg-muted">
            <motion.span
              className="block h-full bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: `${v}%` }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <span className="w-9 shrink-0 text-right font-tech text-[10px] font-semibold text-secondary">
            {v}%
          </span>
        </div>
      ))}
      <div className="flex items-center gap-2 pt-1 font-tech text-[9px] tracking-[0.2em] text-primary">
        <Layers className="h-3 w-3" /> 1 CODEBASE · 2 STORES
      </div>
    </div>
  );
}

function FpsVisual() {
  return (
    <div className="flex min-w-0 items-end gap-4">
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
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-base font-bold leading-none text-foreground">
            60
          </span>
          <span className="font-tech text-[8px] tracking-[0.2em] text-muted-foreground">
            FPS
          </span>
        </div>
      </div>
      <div className="flex h-16 min-w-0 flex-1 items-end gap-1" aria-hidden>
        {[0.6, 0.9, 0.5, 1, 0.7, 0.95, 0.65, 0.85].map((h, i) => (
          <span
            key={i}
            className="app-bar w-full bg-primary/70"
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function NetVisual() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setPhase((p) => (p + 1) % NET_STATES.length),
      1700,
    );
    return () => clearInterval(t);
  }, []);
  const s = NET_STATES[phase];
  const Icon = s.Icon;
  return (
    <div className="flex min-w-0 items-center justify-between gap-3">
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={`clip-corner flex min-w-0 items-center gap-2 border px-3 py-2 font-tech text-[10px] font-semibold tracking-[0.18em] ${s.cls}`}
      >
        <Icon
          className={`h-3.5 w-3.5 shrink-0 ${s.spin ? "app-spin-fast" : ""}`}
        />
        {s.label}
      </motion.div>
      <div className="flex min-w-0 flex-1 items-center gap-1.5">
        {NET_STATES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 ${i <= phase ? "bg-secondary" : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}

function PushVisual() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="relative min-w-0 flex-1 space-y-1.5">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex min-w-0 items-center gap-2 border border-border bg-background px-2.5 py-1.5"
            style={{ marginLeft: i * 8 }}
          >
            <Bell className="h-3 w-3 shrink-0 text-primary" />
            <span className="min-w-0 flex-1 truncate font-tech text-[9px] tracking-[0.1em] text-foreground">
              {i === 0 ? "New job assigned" : "Payment received"}
            </span>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 flex-col items-center">
        <span className="app-pulse h-2 w-2 bg-secondary" />
        <span className="font-display mt-1.5 text-xl font-bold leading-none text-foreground">
          3
        </span>
        <span className="font-tech text-[8px] tracking-[0.2em] text-muted-foreground">
          NEW
        </span>
      </div>
    </div>
  );
}

function BenchVisual({ kind }: { kind: "parity" | "fps" | "net" | "push" }) {
  if (kind === "parity") return <ParityVisual />;
  if (kind === "fps") return <FpsVisual />;
  if (kind === "net") return <NetVisual />;
  return <PushVisual />;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function ServicesMobileAppPage() {
  const instRef = useRef<HTMLDivElement | null>(null);
  const instStarted = useInView(instRef, { once: true, amount: 0.6 });
  const installs = useCountUp(482, instStarted);

  return (
    <div className="relative isolate w-full overflow-x-clip bg-background text-foreground">
      <style>{appStyles}</style>

      {/* ── context bar ── */}
      <div className="relative z-20 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6 lg:px-8">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">
              itrack <span className="text-border">/</span> services{" "}
              <span className="text-border">/</span>{" "}
              <span className="text-foreground">mobile-apps</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-primary">
            <span className="app-pulse h-1.5 w-1.5 bg-primary" />
            RELEASE: v2.4.0
          </span>
        </div>
      </div>

      {/* ════════════════════════ HERO — opens on the device ════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="app-dotgrid absolute inset-0" />
          <span className="font-display absolute -top-6 right-0 hidden select-none text-[9rem] font-bold leading-none text-stroke-faint lg:block xl:text-[12rem]">
            iOS
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
                  <span className="text-secondary">[</span> MOBILE_APPS · NATIVE
                  + CROSS <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display mt-5 text-[2.6rem] font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-[3.9rem]"
              >
                <span className="block">IN THEIR</span>
                <span className="text-stroke-strong block">POCKET,</span>
                <span className="block">
                  NOT A <span className="text-secondary">TAB.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Native and cross-platform apps that feel like the OS wrote them
                — built to work offline, sync in real time, and ship to both
                stores from one team that owns every release after launch.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <Link
                  href="#contact"
                  className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"
                >
                  START YOUR APP
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#cases"
                  className="clip-corner group inline-flex items-center justify-center gap-3 border border-border bg-background px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
                >
                  SEE SHIPPED APPS
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <motion.div
                ref={instRef}
                variants={fadeUp}
                className="mt-9 grid grid-cols-3 gap-3 border-t border-border pt-6"
              >
                {[
                  [`${installs}k`, "INSTALLS"],
                  ["4.9★", "STORE RATING"],
                  ["2", "STOREFRONTS"],
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

            {/* right device + HUDs */}
            <motion.div variants={fadeUp} className="min-w-0 lg:col-span-6">
              <div className="relative mx-auto w-full min-w-0 max-w-[340px] px-4 pt-12 pb-14 sm:px-8">
                {/* rotating stamp */}
                <div
                  aria-hidden
                  className="app-spin absolute -top-1 left-0 z-20 hidden sm:block"
                >
                  <svg viewBox="0 0 120 120" className="h-24 w-24">
                    <defs>
                      <path
                        id="appBadge"
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
                      <textPath href="#appBadge">
                        SHIPPED TO BOTH STORES • OWNED IN-HOUSE • ITRACK •
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

                {/* rating HUD */}
                <motion.div
                  className="clip-corner absolute -top-1 right-0 z-20 border border-border bg-card px-3 py-2.5 sm:-right-1"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                    <span className="font-display text-lg font-bold leading-none text-foreground">
                      4.9
                    </span>
                  </div>
                  <div className="mt-1 font-tech text-[8px] tracking-[0.2em] text-muted-foreground">
                    APP STORE
                  </div>
                </motion.div>

                {/* installs HUD */}
                <motion.div
                  className="clip-corner absolute -bottom-1 left-0 z-20 border border-border bg-card px-3 py-2.5 sm:-left-1"
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 5.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Download className="h-3.5 w-3.5 text-primary" />
                    <span className="font-display text-lg font-bold leading-none text-foreground">
                      482k
                    </span>
                  </div>
                  <div className="mt-1 font-tech text-[8px] tracking-[0.2em] text-muted-foreground">
                    DOWNLOADS
                  </div>
                </motion.div>

                {/* version HUD */}
                <motion.div
                  className="clip-corner absolute top-1/2 -right-1 z-20 hidden -translate-y-1/2 items-center gap-2 border border-border bg-foreground px-3 py-2 sm:flex"
                  animate={{ x: [0, 6, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <PackageCheck className="h-3.5 w-3.5 text-secondary" />
                  <span className="font-tech text-[9px] tracking-[0.18em] text-background">
                    v2.4.0 LIVE
                  </span>
                </motion.div>

                <LiveDevice />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ CAPABILITIES — feature bench ════════════════════════ */}
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
                  <span className="text-secondary">[</span> WHAT_WE_DELIVER{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">FOUR THINGS THAT</span>
                <span className="text-stroke-strong block">
                  MAKE IT FEEL NATIVE.
                </span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              A pretty screen is the easy part. The hard part is the four
              capabilities below — and we instrument every one of them so you
              can see it working, not just read about it.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
          >
            {BENCH.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.idx}
                  variants={cardIn}
                  className="group clip-corner relative flex min-w-0 flex-col overflow-hidden border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7"
                >
                  <CropTicks />
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute -top-5 right-2 select-none text-[5.5rem] font-bold leading-none text-stroke-faint"
                  >
                    {b.idx}
                  </span>

                  <div className="relative z-10 flex min-w-0 items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2.5 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                      <span className="font-semibold text-secondary">
                        {b.idx}
                      </span>
                      <span className="h-3 w-px bg-border" />
                      <span className="truncate">{b.tag}</span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background transition-colors duration-300 group-hover:border-primary">
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

      {/* ════════════════════════ PROCESS — release train ════════════════════════ */}
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
                <span className="block">THE RELEASE</span>
                <span className="text-stroke-strong block">TRAIN.</span>
              </motion.h2>
            </div>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-muted-foreground"
            >
              <Rocket className="h-3.5 w-3.5 text-secondary" />
              CONCEPT → STOREFRONT → CONTINUOUS OTA
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="relative mx-auto max-w-3xl"
          >
            {/* drawing vertical line + travelling pulse */}
            <span
              aria-hidden
              className="absolute left-[19px] top-2 bottom-2 w-0.5 overflow-hidden bg-border sm:left-[23px]"
            >
              <motion.span
                className="absolute inset-0 origin-top bg-primary/40"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
            </span>
            <span
              aria-hidden
              className="app-vtravel absolute left-[16px] h-3 w-3 -translate-x-1/2 bg-secondary sm:left-[20px]"
            />

            <div className="space-y-4">
              {TRAIN.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={t.code}
                    variants={cardIn}
                    className="group relative flex min-w-0 items-stretch gap-4 sm:gap-5"
                  >
                    {/* node */}
                    <div className="relative z-10 flex w-10 shrink-0 justify-center sm:w-12">
                      <span className="clip-corner flex h-10 w-10 items-center justify-center border-2 border-border bg-background transition-all duration-300 group-hover:border-secondary group-hover:bg-secondary sm:h-12 sm:w-12">
                        <Icon className="h-4 w-4 text-primary transition-colors duration-300 group-hover:text-secondary-foreground" />
                      </span>
                    </div>
                    {/* card */}
                    <div className="clip-corner relative min-w-0 flex-1 overflow-hidden border border-border bg-background p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary sm:p-5">
                      <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-secondary transition-transform duration-300 group-hover:scale-y-100" />
                      <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 font-tech text-[10px] tracking-[0.2em]">
                        <span className="text-primary">{t.code}</span>
                        <span className="clip-corner border border-border bg-card px-2 py-0.5 text-secondary">
                          {t.ver}
                        </span>
                      </div>
                      <h3 className="font-display mt-2 text-lg font-bold tracking-tight text-foreground">
                        {t.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {t.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ TECH — marquees + parity matrix ════════════════════════ */}
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
                <span className="block">WRITE ONCE.</span>
                <span className="text-stroke-strong block">
                  FEEL NATIVE EVERYWHERE.
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Cross-platform by default, native bridges where the OS demands it
              — then we prove parity feature-by-feature before we ship.
            </p>
          </motion.div>
        </div>

        {/* marquees */}
        <div className="relative flex flex-col gap-3 border-y border-border py-5">
          <div className="overflow-hidden">
            <div className="app-marquee flex w-max whitespace-nowrap">
              {[...MARQUEE_A, ...MARQUEE_A].map((t, i) => (
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
            <div className="app-marquee-rev flex w-max whitespace-nowrap">
              {[...MARQUEE_B, ...MARQUEE_B].map((t, i) => (
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

        {/* parity matrix */}
        <div className="mx-auto mt-10 w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="clip-corner overflow-hidden border border-border bg-card"
          >
            {/* header row */}
            <div className="grid grid-cols-[1.4fr_repeat(3,minmax(0,1fr))] gap-2 border-b border-border bg-background px-4 py-3 font-tech text-[10px] tracking-[0.2em] text-muted-foreground sm:px-6">
              <span className="min-w-0 truncate">FEATURE // PARITY</span>
              <span className="text-center text-foreground">iOS</span>
              <span className="text-center text-foreground">ANDROID</span>
              <span className="text-center text-primary">CROSS</span>
            </div>
            {PARITY.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1.4fr_repeat(3,minmax(0,1fr))] items-center gap-2 px-4 py-3 text-sm sm:px-6 ${
                  i % 2 === 1 ? "bg-background/40" : ""
                }`}
              >
                <span className="min-w-0 truncate font-tech text-[11px] tracking-[0.08em] text-foreground">
                  {row.feature}
                </span>
                {([row.ios, row.android, row.cross] as const).map((v, c) => (
                  <span key={c} className="flex justify-center">
                    {v === true ? (
                      <span className="flex h-5 w-5 items-center justify-center bg-primary">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </span>
                    ) : v === "partial" ? (
                      <span className="flex h-5 w-5 items-center justify-center border border-secondary bg-secondary/10 font-tech text-[10px] font-bold text-secondary">
                        ~
                      </span>
                    ) : (
                      <span className="h-5 w-5 border border-border" />
                    )}
                  </span>
                ))}
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border bg-background px-4 py-3 font-tech text-[9px] tracking-[0.18em] text-muted-foreground sm:px-6">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-primary" /> NATIVE PARITY
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 border border-secondary bg-secondary/10" />{" "}
                BRIDGE / PARTIAL
              </span>
              <span className="ml-auto hidden text-secondary sm:inline">
                0 FEATURES LEFT BEHIND
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ USE CASES — store tiles ════════════════════════ */}
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
                  <span className="text-secondary">[</span> ON_THE_SHELF{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">APPS WE'VE</span>
                <span className="text-stroke-strong block">PUT IN STORES.</span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="min-w-0 self-end text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-5"
            >
              The archetypes below are where our mobile work lands most often —
              each one shipped, rated and still getting updates from the team
              that built it.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
          >
            {STORE_APPS.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={a.title}
                  variants={cardIn}
                  className="group clip-corner relative flex min-w-0 flex-col overflow-hidden border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7"
                >
                  <CropTicks />
                  {/* store-listing header */}
                  <div className="relative z-10 flex min-w-0 items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary transition-colors duration-300 group-hover:bg-secondary">
                      <Icon className="h-6 w-6 text-secondary transition-colors duration-300 group-hover:text-secondary-foreground" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-tech text-[9px] tracking-[0.24em] text-muted-foreground">
                        {a.cat}
                      </div>
                      <h3 className="font-display mt-1 truncate text-xl font-bold tracking-tight text-foreground">
                        {a.title}
                      </h3>
                      <div className="mt-1.5 flex min-w-0 items-center gap-2">
                        <Stars value={a.rating} />
                        <span className="font-tech text-[10px] text-muted-foreground">
                          {a.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <span className="clip-corner shrink-0 border border-border px-3 py-1.5 font-tech text-[10px] font-semibold tracking-[0.16em] text-primary transition-colors duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground">
                      GET
                    </span>
                  </div>

                  <p className="relative z-10 mt-4 text-sm leading-relaxed text-muted-foreground">
                    {a.desc}
                  </p>

                  <div className="relative z-10 mt-auto flex min-w-0 items-center justify-between gap-3 border-t border-border pt-4 font-tech text-[10px] tracking-[0.18em] text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Download className="h-3 w-3 text-secondary" />
                      <span className="font-semibold text-foreground">
                        {a.installs}
                      </span>{" "}
                      INSTALLS
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </div>

                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ CTA — publish-to-store console ════════════════════════ */}
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
              {"{}"}
            </span>

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              {/* release prompt */}
              <div className="min-w-0 lg:col-span-7">
                <div className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-secondary">
                  <span className="app-pulse h-1.5 w-1.5 bg-secondary" />
                  READY_TO_PUBLISH //
                </div>

                <div className="mt-5 min-w-0 overflow-hidden border border-background/15 bg-background/5 p-4 font-tech text-[12px] sm:text-[13px]">
                  <div className="flex min-w-0">
                    <span className="select-none pr-2 text-secondary">$</span>
                    <span className="min-w-0 truncate text-background/90">
                      itrack release --platform ios,android
                      <span className="app-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-secondary" />
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-0.5 text-background/45">
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> signed &
                      notarized
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> submitted to
                      App Store + Play Console
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3 w-3 text-secondary" /> phased
                      rollout · 1 team on call
                    </div>
                  </div>
                </div>

                <h2 className="font-display mt-6 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3.2rem]">
                  <span className="block">READY TO SHIP</span>
                  <span className="block">
                    <span className="text-secondary">YOUR APP?</span>
                  </span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/65 sm:text-base">
                  Tell us what the app has to do in someone's hand. We'll come
                  back with the flows, the architecture, and the team that owns
                  every version after v1.0.
                </p>

                {/* store chips */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="clip-corner inline-flex items-center gap-2 border border-background/25 px-4 py-2.5 font-tech text-[10px] font-semibold tracking-[0.18em] text-background">
                    <Smartphone className="h-3.5 w-3.5 text-secondary" /> APP
                    STORE
                  </span>
                  <span className="clip-corner inline-flex items-center gap-2 border border-background/25 px-4 py-2.5 font-tech text-[10px] font-semibold tracking-[0.18em] text-background">
                    <Play className="h-3.5 w-3.5 fill-secondary text-secondary" />{" "}
                    GOOGLE PLAY
                  </span>
                </div>

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
                    ["STOREFRONTS", "2"],
                    ["BETA SLOTS", "OPEN"],
                    ["AVG RATING", "4.9★"],
                    ["UPDATE CADENCE", "2 WKS"],
                  ].map(([k, v], i) => (
                    <div
                      key={k}
                      className="clip-corner border border-background/15 bg-background/5 p-4"
                    >
                      <div className="font-tech text-[9px] tracking-[0.24em] text-background/45">
                        {k}
                      </div>
                      <div
                        className={`font-display mt-1.5 text-xl font-bold tracking-tight ${i % 2 === 0 ? "text-secondary" : "text-background"}`}
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
                      ONE TEAM, EVERY RELEASE
                    </div>
                    <div className="truncate text-[11px] text-background/55">
                      the people who design v1.0 push v2.0 too
                    </div>
                  </div>
                </div>

                {/* version bump */}
                <div className="clip-corner mt-3 flex items-center justify-between gap-3 border border-background/15 bg-background/5 p-4 font-tech text-[11px] tracking-[0.16em]">
                  <span className="text-background/55">v2.4.0</span>
                  <ArrowRight className="h-3.5 w-3.5 text-secondary" />
                  <span className="font-semibold text-secondary">v2.5.0</span>
                  <span className="text-background/40">queued</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* footer index */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
            <span className="flex items-center gap-2.5">
              <Hash className="h-3 w-3 text-secondary" />
              MOBILE_APPS // NATIVE + CROSS-PLATFORM
            </span>
            <span className="flex items-center gap-2.5">
              <Plus className="h-3 w-3 rotate-45 text-secondary" />
              <Activity className="h-3 w-3 text-primary" />
              NEXT: MANAGED SERVICES →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
