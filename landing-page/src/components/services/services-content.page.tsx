"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { Plus, ArrowRight, ArrowUpRight, Hash, Activity } from "lucide-react";
import { servicesSubMenus } from "@/components/layout/menus";

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

function useCountUp(target: number, start: boolean, duration = 1300) {
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
/*  Styles (self-contained, namespaced reg-)                           */
/* ------------------------------------------------------------------ */

const regStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.reg-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 72%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 92% 78% at 50% 22%, black 6%, transparent 80%);
  mask-image: radial-gradient(ellipse 92% 78% at 50% 22%, black 6%, transparent 80%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 7%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes reg-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.reg-blink { animation: reg-blink 1s step-end infinite; }

@keyframes reg-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.reg-pulse { animation: reg-pulse 1.6s ease-out infinite; }

@keyframes reg-dash { to { stroke-dashoffset: -100; } }
.reg-dash { stroke-dasharray: 6 6; animation: reg-dash 2.2s linear infinite; }

@keyframes reg-travel { 0% { left: 4%; } 100% { left: 96%; } }
.reg-travel { animation: reg-travel 3.4s linear infinite; }

@keyframes reg-scan { 0% { top: 6%; } 100% { top: 96%; } }
.reg-scan {
  position: absolute; left: 0; right: 0; height: 2px;
  background: linear-gradient(to right, transparent, color-mix(in srgb, var(--primary) 30%, transparent), transparent);
  animation: reg-scan 4.4s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .reg-blink, .reg-pulse, .reg-dash, .reg-travel, .reg-scan { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  Small bits                                                         */
/* ------------------------------------------------------------------ */

function SpecLeader({
  k,
  v,
  accent = false,
}: {
  k: string;
  v: string;
  accent?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center font-tech text-[10px] tracking-[0.16em]">
      <span className="text-muted-foreground">{k}</span>
      <span className="mx-2.5 h-px flex-1 border-b border-dashed border-border" />
      <span
        className={
          accent
            ? "font-semibold text-secondary"
            : "font-semibold text-foreground"
        }
      >
        {v}
      </span>
    </div>
  );
}

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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export  function ServicePageContent() {
  const filteredServices = servicesSubMenus.filter(
    (service) =>
      service.title !== "Overview of E-services" &&
      service.href !== "/services",
  );

  const featured = filteredServices[0];
  const rest = filteredServices.slice(1);

  const countRef = useRef<HTMLDivElement | null>(null);
  const countStarted = useInView(countRef, { once: true, amount: 0.6 });
  const entryCount = useCountUp(filteredServices.length, countStarted);

  const FeaturedIcon = featured?.icon;

  return (
    <section className="relative isolate min-h-screen overflow-x-clip bg-background py-20 text-foreground lg:py-28">
      <style>{regStyles}</style>

      {/* ambient layer — trapped so it can never add scroll */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="reg-dotgrid absolute inset-0" />
        <span className="font-display absolute -top-4 right-1 hidden select-none text-[9rem] font-bold leading-none text-stroke-faint lg:block xl:text-[12rem]">
          INDEX
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* side annotation */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-28 -left-1 hidden -rotate-90 font-tech text-[9px] tracking-[0.32em] text-muted-foreground/45 xl:block"
        >
          CATALOG // SERVICE_REGISTRY
        </div>

        {/* ── masthead (asymmetric) ── */}
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
              <Hash className="h-3.5 w-3.5 shrink-0 text-secondary" />
              <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
                <span className="text-secondary">[</span> SERVICE_REGISTRY{" "}
                <span className="text-secondary">]</span> FULL CATALOG ·{" "}
                {String(filteredServices.length).padStart(2, "0")} ENTRIES
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display mt-5 text-[2.5rem] font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-[3.8rem]"
            >
              <span className="block">THE FULL</span>
              <span className="text-stroke-strong block">SERVICE INDEX</span>
              <span className="block">
                <span className="text-secondary">.</span>
                <span className="reg-blink ml-3 inline-block h-[0.6em] w-[0.4em] translate-y-[0.06em] bg-secondary" />
              </span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex items-center gap-3"
            >
              <span className="h-3 w-3 shrink-0 bg-secondary" />
              <span className="font-tech text-[11px] tracking-[0.22em] text-muted-foreground">
                NOT A MENU OF PRODUCTS — A REGISTRY OF CAPABILITIES.
              </span>
            </motion.div>
          </div>

          <div ref={countRef} className="min-w-0 lg:col-span-5 lg:pt-2">
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Each entry below is a capability we deliver in-house — and every
              one plugs into the same team, the same roadmap, the same SLA.
              Browse the registry; open any spec.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-6 grid grid-cols-3 gap-3"
            >
              <div className="clip-corner col-span-1 border border-border bg-card p-4">
                <div className="font-display text-3xl font-bold leading-none tracking-tight text-foreground sm:text-4xl">
                  {String(entryCount).padStart(2, "0")}
                </div>
                <div className="mt-2 font-tech text-[9px] tracking-[0.22em] text-primary">
                  ENTRIES
                </div>
              </div>
              <div className="clip-corner col-span-2 flex flex-col justify-center gap-2 border border-border bg-card p-4">
                <SpecLeader k="FORMAT" v="REGISTRY" />
                <SpecLeader k="DEPTH" v="END-TO-END" />
                <SpecLeader k="SUBCONTRACTORS" v="00" accent />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── featured spec panel ── */}
        {featured && FeaturedIcon && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="mt-14 lg:mt-16"
          >
            <Link
              href={featured.href}
              className="group block"
              aria-label={featured.title}
            >
              <div className="clip-corner relative grid min-w-0 grid-cols-1 overflow-hidden border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary lg:grid-cols-12">
                {/* left navy spec rail */}
                <div className="relative flex min-w-0 flex-col justify-between gap-6 bg-primary p-6 text-primary-foreground sm:p-8 lg:col-span-4">
                  <span aria-hidden className="reg-scan pointer-events-none" />
                  <div className="relative z-10 flex items-center gap-2 font-tech text-[10px] tracking-[0.26em] text-white/60">
                    <span className="reg-pulse h-1.5 w-1.5 bg-secondary" />
                    FEATURED_ENTRY
                  </div>
                  <div className="relative z-10">
                    <div className="font-display text-6xl font-bold leading-none tracking-tighter text-white/90 sm:text-7xl">
                      01
                    </div>
                    <div className="mt-5 inline-flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5">
                      <FeaturedIcon className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
                  <div className="relative z-10 font-tech text-[10px] tracking-[0.2em] text-white/45">
                    PRIORITY // PRIMARY
                  </div>
                </div>

                {/* right body */}
                <div className="relative flex min-w-0 flex-col p-6 sm:p-8 lg:col-span-8">
                  <CropTicks />
                  <div className="flex min-w-0 items-start justify-between gap-4">
                    <h2 className="font-display min-w-0 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {featured.title}
                    </h2>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border text-primary transition-all duration-300 group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {featured.description}
                  </p>

                  <div className="mt-auto grid min-w-0 grid-cols-1 gap-x-8 gap-y-2 pt-6 sm:grid-cols-2">
                    <SpecLeader k="STATUS" v="ACTIVE" accent />
                    <SpecLeader k="OWNERSHIP" v="IN-HOUSE" />
                    <SpecLeader k="DELIVERY" v="END-TO-END" />
                    <SpecLeader k="SLA" v="SINGLE" />
                  </div>

                  {/* mini pipeline */}
                  <div
                    className="relative mt-6 hidden h-10 items-center sm:flex"
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 400 40"
                      preserveAspectRatio="none"
                      className="h-10 w-full"
                    >
                      <line
                        x1="20"
                        y1="20"
                        x2="380"
                        y2="20"
                        className="reg-dash stroke-border"
                        strokeWidth="2"
                      />
                      {[20, 200, 380].map((x, i) => (
                        <rect
                          key={i}
                          x={x - 6}
                          y="14"
                          width="12"
                          height="12"
                          className={
                            i === 1 ? "fill-secondary" : "fill-primary"
                          }
                        />
                      ))}
                    </svg>
                    <span className="reg-travel absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 bg-secondary" />
                  </div>
                </div>

                {/* bottom accent */}
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </Link>
          </motion.div>
        )}

        {/* ── registry grid ── */}
        {rest.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={container}
            className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5"
          >
            {rest.map((service, i) => {
              const Icon = service.icon;
              const idx = String(i + 2).padStart(2, "0");
              return (
                <motion.div key={service.href} variants={cardIn}>
                  <Link
                    href={service.href}
                    className="group block h-full"
                    aria-label={service.title}
                  >
                    <div className="clip-corner group relative flex h-full min-w-0 flex-col overflow-hidden border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary sm:p-7">
                      <CropTicks />

                      {/* top row: index + arrow */}
                      <div className="relative z-10 flex min-w-0 items-center justify-between gap-3">
                        <span className="flex min-w-0 items-center gap-2.5 font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
                          <span className="font-semibold text-secondary">
                            {idx}
                          </span>
                          <span className="h-3 w-px bg-border" />
                          <span className="truncate">ENTRY</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 -translate-y-0.5 translate-x-0.5 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                      </div>

                      {/* icon + title */}
                      <div className="relative z-10 mt-5 flex min-w-0 items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-background transition-colors duration-300 group-hover:border-primary">
                          <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-secondary" />
                        </span>
                        <h3 className="font-display min-w-0 pt-1 text-xl font-bold leading-tight tracking-tight text-foreground">
                          {service.title}
                        </h3>
                      </div>

                      <p className="relative z-10 mt-4 min-w-0 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {service.description}
                      </p>

                      {/* footer */}
                      <div className="relative z-10 mt-auto flex min-w-0 items-center justify-between gap-3 border-t border-border pt-4 font-tech text-[10px] tracking-[0.2em] text-muted-foreground">
                        <span className="flex items-center gap-2 transition-colors duration-300 group-hover:text-primary">
                          <Activity className="h-3 w-3 text-secondary" />
                          OPEN SPEC
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                      </div>

                      {/* bottom accent */}
                      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {filteredServices.length === 0 && (
          <div className="mt-14 border border-dashed border-border p-10 text-center font-tech text-sm tracking-[0.2em] text-muted-foreground">
            NO ENTRIES IN REGISTRY
          </div>
        )}

        {/* ── closing index strip ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-tech text-[10px] tracking-[0.24em] text-muted-foreground lg:mt-16"
        >
          <span className="flex items-center gap-2.5">
            <span className="reg-pulse h-1.5 w-1.5 bg-secondary" />
            END_OF_REGISTRY //{" "}
            {String(filteredServices.length).padStart(2, "0")} ENTRIES INDEXED
          </span>
          <span className="flex items-center gap-2.5">
            <Plus className="h-3 w-3 rotate-45 text-secondary" />0
            SUBCONTRACTORS · 1 ACCOUNTABLE TEAM
          </span>
        </motion.div>
      </div>
    </section>
  );
}
