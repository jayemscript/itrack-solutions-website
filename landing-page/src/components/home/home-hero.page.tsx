"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Cpu,
  Headset,
  Package,
  Plus,
  Server,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const MODULES = [
  { idx: "01", label: "Custom Development", icon: Code2 },
  { idx: "02", label: "Systems & Integration", icon: Server },
  { idx: "03", label: "Hardware & Software", icon: Package },
  { idx: "04", label: "Managed Services", icon: Headset },
];

const TICKER = [
  "SYS.STATUS: OPERATIONAL",
  "UPTIME: 99.98%",
  "ACTIVE DEPLOYS: 14",
  "NODE JKT-01: ONLINE",
  "AVG LATENCY: 23MS",
  "SUPPORT DESK: 24/7",
  "CLIENTS SERVED: 120+",
];

const MARQUEE = [
  "CUSTOM DEVELOPMENT",
  "SYSTEMS INTEGRATION",
  "HARDWARE & SOFTWARE",
  "MANAGED SERVICES",
  "24/7 SUPPORT",
];

type TermLine = {
  prefix: string;
  tone: "cmd" | "step" | "ok" | "sys";
  text: string;
};

const SCRIPT: TermLine[] = [
  { prefix: "$", tone: "cmd", text: ' itrack deploy --client "you"' },
  { prefix: "▸", tone: "step", text: " analyzing requirements ..... OK" },
  { prefix: "▸", tone: "step", text: " provisioning infra ......... OK" },
  { prefix: "▸", tone: "step", text: " integrating systems ........ OK" },
  { prefix: "▸", tone: "step", text: " shipping hardware .......... OK" },
  { prefix: "✓", tone: "ok", text: " deploy complete — 120+ live" },
  { prefix: "$", tone: "sys", text: " status: OPERATIONAL" },
];

const REVEAL_DELAYS = [0, 900, 600, 600, 600, 600, 760];

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const popIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Styles (fonts + keyframes)                                         */
/* ------------------------------------------------------------------ */

const heroStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.blueprint-grid {
  background-image:
    linear-gradient(to right, color-mix(in srgb, var(--border) 55%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--border) 55%, transparent) 1px, transparent 1px);
  background-size: 44px 44px;
  -webkit-mask-image: radial-gradient(ellipse 95% 85% at 50% 38%, black 30%, transparent 82%);
  mask-image: radial-gradient(ellipse 95% 85% at 50% 38%, black 30%, transparent 82%);
}

.text-stroke-strong {
  -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent);
  color: transparent;
}
.text-stroke-faint {
  -webkit-text-stroke: 1.5px color-mix(in srgb, var(--foreground) 24%, transparent);
  color: transparent;
}

.clip-corner {
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
}

@keyframes hero-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-track { animation: hero-marquee 30s linear infinite; }
.marquee-track-slow { animation: hero-marquee 46s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }

@keyframes hero-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.animate-blink { animation: hero-blink 1s step-end infinite; }

@keyframes hero-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 7px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.animate-live { animation: hero-pulse 1.6s ease-out infinite; }

@keyframes hero-dash { to { stroke-dashoffset: -140; } }
.sparkline polyline { stroke-dasharray: 8 6; animation: hero-dash 3s linear infinite; }

@keyframes hero-bar { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
.latency-bar { transform-origin: bottom; animation: hero-bar 1.2s ease-in-out infinite; }

@keyframes hero-scan { 0% { top: 8%; } 100% { top: 94%; } }
.scanline {
  position: absolute; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.16), transparent);
  animation: hero-scan 3.6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track, .marquee-track-slow, .sparkline polyline,
  .latency-bar, .scanline, .animate-live, .animate-blink { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HomeHeroPage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const delay =
      lineCount >= SCRIPT.length ? 3800 : (REVEAL_DELAYS[lineCount] ?? 600);
    const timer = setTimeout(() => {
      setLineCount((c) => (c >= SCRIPT.length ? 1 : c + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [lineCount]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative isolate overflow-x-hidden bg-background text-foreground selection:bg-secondary selection:text-secondary-foreground"
    >
      <style>{heroStyles}</style>

      {/* schematic grid backdrop */}
      <div
        className="blueprint-grid pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* ── top status ticker ─────────────────────────────────────── */}
      <div className="relative border-b border-border bg-card/40">
        <div className="overflow-hidden py-2.5">
          <div className="marquee-track-slow flex w-max whitespace-nowrap font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span key={i} className="flex items-center">
                {i % TICKER.length === 0 && (
                  <span className="mr-5 flex items-center gap-2 text-secondary">
                    <span className="animate-live h-1.5 w-1.5 bg-secondary" />
                    LIVE
                  </span>
                )}
                <span>{item}</span>
                <span className="mx-5 text-secondary/70">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── main grid ─────────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-14 pb-16 sm:px-6 lg:px-8 lg:pt-20 lg:pb-20">
        {/* edge ruler */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 flex-col gap-5 font-tech text-[8px] text-muted-foreground/40 xl:flex"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="h-px w-3 bg-border" />
              {String(i * 10).padStart(2, "0")}
            </div>
          ))}
        </div>

        {/* cursor telemetry */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 bottom-4 hidden items-center gap-2 font-tech text-[9px] tracking-[0.25em] text-muted-foreground/50 lg:flex"
        >
          <span className="h-1 w-1 bg-secondary" />
          CURSOR // X:{String(cursor.x).padStart(4, "0")} Y:
          {String(cursor.y).padStart(4, "0")}
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
          {/* ── LEFT — editorial console ── */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="min-w-0 lg:col-span-7"
          >
            <motion.div
              variants={fadeUp}
              className="flex min-w-0 items-start gap-3"
            >
              <span className="animate-live h-2 w-2 shrink-0 bg-secondary" />
              <span className="min-w-0 break-words font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
                <span className="text-secondary">[</span> ITRACK_SOLUTIONS{" "}
                <span className="text-secondary">]</span> FULL-CYCLE IT PARTNER
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display mt-6 text-[2.5rem] font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-[3.6rem] xl:text-[4.6rem] 2xl:text-[5.2rem]"
            >
              <span className="block">WE BUILD</span>
              <span className="text-stroke-strong block">THE ENTIRE</span>
              <span className="block">
                <span className="text-secondary">STACK</span>
                <span>.</span>
                <span className="animate-blink ml-3 sm:ml-4 inline-block h-[0.62em] w-[0.42em] translate-y-[0.06em] bg-secondary" />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-tech mt-5 max-w-full wrap-break-word text-[11px] tracking-[0.24em] text-muted-foreground"
            >
              <span className="text-secondary">[</span> NO HANDOFFS. NO VENDOR
              CHAIN. ONE ACCOUNTABLE TEAM.{" "}
              <span className="text-secondary">]</span>
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl wrap-break-word text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              We design and build custom software, source and integrate the
              systems and products that run it, and back it all with hands-on
              support — one team, four capabilities, delivered end-to-end.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <a
                href="#contact"
                className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"
              >
                START YOUR BUILD
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="clip-corner group inline-flex items-center justify-center gap-3 border border-border bg-background px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
              >
                EXPLORE SERVICES
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* module manifest */}
            <motion.div
              variants={fadeUp}
              className="mt-10 border-t border-border pt-6"
            >
              <div className="mb-3 font-tech text-[10px] tracking-[0.3em] text-muted-foreground">
                MODULE_MANIFEST //
              </div>
              <div className="flex flex-wrap gap-2">
                {MODULES.map(({ idx, label, icon: Icon }) => (
                  <span
                    key={idx}
                    className="group/tag inline-flex items-center gap-2.5 border border-border bg-card px-3 py-2 font-tech text-[11px] tracking-wide text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary"
                  >
                    <span className="font-semibold text-secondary">{idx}</span>
                    <span className="h-3 w-px bg-border" />
                    {label}
                    <Icon className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover/tag:text-primary" />
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — live deploy console ── */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="min-w-0 lg:col-span-5"
          >
            <motion.div
              variants={popIn}
              className="relative mx-auto w-full min-w-0 px-3 pt-10 pb-12 sm:px-6 xl:max-w-110"
            >
              {/* crosshair marks */}
              <Plus
                aria-hidden
                className="absolute top-2 left-0 h-4 w-4 text-muted-foreground/40"
              />
              <Plus
                aria-hidden
                className="absolute top-2 right-0 h-4 w-4 text-muted-foreground/40"
              />
              <Plus
                aria-hidden
                className="absolute bottom-2 left-0 h-4 w-4 text-muted-foreground/40"
              />
              <Plus
                aria-hidden
                className="absolute bottom-2 right-0 h-4 w-4 text-muted-foreground/40"
              />

              {/* rotating stamp badge */}
              <motion.div
                aria-hidden
                className="absolute -top-3 left-0 z-20 hidden sm:block"
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                <svg
                  viewBox="0 0 120 120"
                  className="h-24 w-24 xl:h-28 xl:w-28"
                >
                  <defs>
                    <path
                      id="heroBadgeCircle"
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
                  <circle
                    cx="60"
                    cy="60"
                    r="30"
                    fill="none"
                    strokeDasharray="3 4"
                    className="stroke-border"
                    strokeWidth="1"
                  />
                  <text
                    className="font-tech fill-secondary"
                    style={{ fontSize: 10, letterSpacing: 2.4 }}
                  >
                    <textPath href="#heroBadgeCircle">
                      SYSTEMS ONLINE • ITRACK SOLUTIONS • EST 2015 •
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
              </motion.div>

              {/* terminal — hard offset shadow block */}
              <div className="relative min-w-0">
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-2 translate-y-2 bg-secondary"
                />
                <div className="relative min-w-0 border-2 border-primary bg-primary text-primary-foreground">
                  {/* title bar */}
                  <div className="flex items-center justify-between border-b border-white/15 px-4 py-2.5">
                    <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-white/60">
                      <Cpu className="h-3.5 w-3.5 shrink-0 text-secondary" />
                      <span className="truncate">ITRACK://DEPLOY.SH</span>
                    </span>
                    <span className="flex shrink-0 gap-1.5" aria-hidden>
                      <span className="h-2 w-2 bg-white/30" />
                      <span className="h-2 w-2 bg-white/30" />
                      <span className="h-2 w-2 bg-secondary" />
                    </span>
                  </div>

                  {/* body */}
                  <div className="relative min-h-55 overflow-hidden p-4 font-tech text-[11px] leading-6 sm:min-h-62 sm:p-5 sm:text-[12px]">
                    <div className="scanline" aria-hidden />
                    {SCRIPT.slice(0, lineCount).map((line, i) => (
                      <div key={i} className="flex whitespace-pre">
                        <span
                          className={
                            line.tone === "step"
                              ? "text-white/40"
                              : "font-semibold text-secondary"
                          }
                        >
                          {line.prefix}
                        </span>
                        <span
                          className={
                            line.tone === "cmd"
                              ? "text-white"
                              : line.tone === "step"
                                ? "text-white/75"
                                : "text-white"
                          }
                        >
                          {line.text}
                        </span>
                      </div>
                    ))}
                    <span className="animate-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-secondary" />
                  </div>
                </div>
              </div>

              {/* HUD — uptime */}
              <motion.div
                className="clip-corner absolute -top-1 right-0 z-20 border border-border bg-card px-3 py-2.5 sm:-right-2 sm:px-4 sm:py-3"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="font-tech text-[9px] tracking-[0.25em] text-muted-foreground">
                  UPTIME / 90D
                </div>
                <div className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  99.98<span className="text-secondary">%</span>
                </div>
                <svg
                  className="sparkline mt-1 h-6 w-20 sm:h-7 sm:w-24"
                  viewBox="0 0 120 28"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <polyline
                    points="0,22 14,18 28,24 42,12 56,16 70,7 84,11 98,5 112,9 120,4"
                    stroke="var(--secondary)"
                    strokeWidth="2"
                  />
                </svg>
              </motion.div>

              {/* HUD — latency */}
              <motion.div
                className="clip-corner absolute -bottom-2 left-0 z-20 flex items-center gap-3 border border-border bg-card px-3 py-2.5 sm:-left-2 sm:gap-4 sm:px-4 sm:py-3"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              >
                <div>
                  <div className="font-tech text-[9px] tracking-[0.25em] text-muted-foreground">
                    AVG LATENCY
                  </div>
                  <div className="font-display text-xl font-bold text-foreground sm:text-2xl">
                    23
                    <span className="text-primary text-sm font-semibold sm:text-base">
                      ms
                    </span>
                  </div>
                </div>
                <div className="flex h-7 items-end gap-1 sm:h-8" aria-hidden>
                  {[0.9, 0.5, 0.75, 0.4, 0.85, 0.6].map((h, i) => (
                    <span
                      key={i}
                      className="latency-bar w-1.5 bg-primary/70"
                      style={{
                        height: `${h * 100}%`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── bottom capability marquee ─────────────────────────────── */}
      <div className="relative border-t border-border">
        <div className="overflow-hidden py-5">
          <div className="marquee-track flex w-max whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="flex items-center">
                <span
                  className={`font-display px-6 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl ${
                    i % 2 === 0 ? "text-foreground" : "text-stroke-faint"
                  }`}
                >
                  {item}
                </span>
                <span
                  className="text-base text-secondary sm:text-lg"
                  aria-hidden
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
