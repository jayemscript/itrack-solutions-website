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
  Gauge,
  Layers,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Zap,
  Target,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CONTACT_POINTS = [
  {
    code: "COM-01",
    label: "GENERAL INQUIRY",
    value: "hello@itracksolutions.com",
    icon: Mail,
    status: "active",
    response: "<4h",
  },
  {
    code: "COM-02",
    label: "SALES / QUOTE",
    value: "+63 (2) 8123-4567",
    icon: Phone,
    status: "active",
    response: "<2h",
  },
  {
    code: "COM-03",
    label: "SUPPORT DESK",
    value: "support@itracksolutions.com",
    icon: Mail,
    status: "active",
    response: "<1h",
  },
  {
    code: "COM-04",
    label: "HEADQUARTERS",
    value: "Manila, Philippines",
    icon: MapPin,
    status: "active",
    response: "N/A",
  },
];

const ROUTING_RULES = [
  {
    keyword: "hardware",
    owner: "OPS-01 · Chris Peralta",
    sys: "Product Line B/C/D",
  },
  {
    keyword: "software",
    owner: "DEV-01 · John Estel Peralta",
    sys: "Custom Development",
  },
  {
    keyword: "support",
    owner: "OPS-02 · Rhona Ceres Rosel",
    sys: "Managed Services",
  },
  {
    keyword: "quote",
    owner: "CMD-01 · Ramil Peralta",
    sys: "Strategy & Pricing",
  },
  {
    keyword: "billing",
    owner: "FIN-01 · Melfel Taccabban",
    sys: "Finance & HR",
  },
];

const SLA_METRICS = [
  { label: "AVG RESPONSE", value: "<4h", icon: Clock, accent: true },
  { label: "BUSINESS HOURS", value: "MON–FRI 9–6", icon: Gauge, accent: false },
  { label: "TEAM SIZE", value: "7 MEMBERS", icon: Users, accent: false },
  { label: "SUBCONTRACTORS", value: "ZERO", icon: ShieldCheck, accent: true },
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
/*  Styles (self-contained, namespaced contact-)                       */
/* ------------------------------------------------------------------ */

const contactStyles = `
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-500-normal.css');
@import url('https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-600-normal.css');

.font-display { font-family: 'Space Grotesk', var(--font-sans); }
.font-tech { font-family: 'IBM Plex Mono', var(--font-mono); }

.contact-dotgrid {
  background-image: radial-gradient(color-mix(in srgb, var(--border) 72%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 92% 80% at 50% 14%, black 6%, transparent 80%);
  mask-image: radial-gradient(ellipse 92% 80% at 50% 14%, black 6%, transparent 80%);
}

.text-stroke-strong { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 88%, transparent); color: transparent; }
.text-stroke-faint  { -webkit-text-stroke: 2px color-mix(in srgb, var(--foreground) 7%, transparent); color: transparent; }
.text-stroke-light  { -webkit-text-stroke: 1.5px color-mix(in srgb, var(--background) 14%, transparent); color: transparent; }

.clip-corner { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }

@keyframes contact-blink { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }
.contact-blink { animation: contact-blink 1s step-end infinite; }

@keyframes contact-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 55%, transparent); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.contact-pulse { animation: contact-pulse 1.6s ease-out infinite; }

@keyframes contact-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.contact-marquee { animation: contact-marquee 30s linear infinite; }
.contact-marquee:hover { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .contact-blink, .contact-pulse, .contact-marquee { animation: none; }
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
      <span className="contact-pulse h-2 w-2 shrink-0 bg-secondary" />
      <span className="font-tech text-[11px] tracking-[0.28em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function ContactContentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const statRef = useRef<HTMLDivElement | null>(null);
  const statStarted = useInView(statRef, { once: true, amount: 0.6 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="relative isolate w-full overflow-x-clip bg-background text-foreground">
      <style>{contactStyles}</style>

      {/* ── context bar ── */}
      <div className="relative z-20 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-2.5 sm:px-6 lg:px-8">
          <span className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
            <Terminal className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">
              itrack <span className="text-border">/</span> contact{" "}
              <span className="text-border">/</span>{" "}
              <span className="text-foreground">intake-console</span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-primary">
            <span className="contact-pulse h-1.5 w-1.5 bg-primary" />
            ALL CHANNELS OPEN
          </span>
        </div>
      </div>

      {/* ════════════════════════ HERO — manifesto + routing ════════════════════════ */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="contact-dotgrid absolute inset-0" />
          <span className="font-display absolute -top-6 right-0 hidden select-none text-[9rem] font-bold leading-none text-stroke-faint lg:block xl:text-[12rem]">
            TALK
          </span>
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8"
          >
            {/* left masthead */}
            <div className="min-w-0 lg:col-span-6">
              <motion.div variants={fadeUp}>
                <SectionTag>
                  <span className="text-secondary">[</span> CONTACT_ITRACK{" "}
                  <span className="text-secondary">]</span> OPERATIONAL INTAKE
                </SectionTag>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display mt-5 text-[2.6rem] font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-[3.9rem]"
              >
                <span className="block">SKIP THE</span>
                <span className="text-stroke-strong block">SALES REP.</span>
                <span className="block">
                  TALK TO THE <span className="text-secondary">BUILDERS.</span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                No gatekeepers, no ticket queues, no "we'll get back to you."
                Your message routes directly to the subsystem owner who will
                actually do the work. One team, one inbox, zero handoffs.
              </motion.p>

              <motion.div
                ref={statRef}
                variants={fadeUp}
                className="mt-9 grid grid-cols-2 gap-3 border-t border-border pt-6 sm:grid-cols-4"
              >
                {SLA_METRICS.map(({ label, value, icon: Icon, accent }) => (
                  <div key={label} className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        className={`h-4 w-4 ${accent ? "text-secondary" : "text-primary"}`}
                      />
                      <span className="font-tech text-[9px] tracking-[0.2em] text-muted-foreground">
                        {label}
                      </span>
                    </div>
                    <div
                      className={`font-display text-xl font-bold leading-none tracking-tight ${accent ? "text-secondary" : "text-foreground"}`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* right — routing rules */}
            <motion.div variants={fadeUp} className="min-w-0 lg:col-span-6">
              <div className="clip-corner relative overflow-hidden border border-border bg-card p-6">
                <CropTicks />
                <div className="mb-4 font-tech text-[10px] tracking-[0.28em] text-muted-foreground">
                  ROUTING_MATRIX // AUTO-ASSIGN
                </div>
                <div className="space-y-3">
                  {ROUTING_RULES.map((r, i) => (
                    <div
                      key={r.keyword}
                      className="group flex min-w-0 items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <span className="clip-corner flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-background font-tech text-[10px] font-semibold text-secondary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-tech text-[10px] tracking-[0.16em] text-muted-foreground">
                          IF CONTAINS:{" "}
                          <span className="font-semibold text-foreground">
                            "{r.keyword}"
                          </span>
                        </div>
                        <div className="mt-0.5 text-xs text-foreground">
                          →{" "}
                          <span className="font-semibold text-secondary">
                            {r.owner}
                          </span>
                          <span className="mx-2 text-border">|</span>
                          <span className="text-muted-foreground">{r.sys}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─ channels marquee ── */}
      <div className="relative border-y border-border bg-card/40">
        <div className="overflow-hidden py-3">
          <div className="contact-marquee flex w-max whitespace-nowrap">
            {[
              "EMAIL",
              "PHONE",
              "IN-PERSON",
              "DEMO UNIT",
              "QUOTE REQUEST",
              "SUPPORT TICKET",
              "PARTNER INQUIRY",
              "CAREER",
            ]
              .concat([
                "EMAIL",
                "PHONE",
                "IN-PERSON",
                "DEMO UNIT",
                "QUOTE REQUEST",
                "SUPPORT TICKET",
                "PARTNER INQUIRY",
                "CAREER",
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

      {/* ════════════════════════ INTAKE CONSOLE — form + contact points ════════════════════════ */}
      <section className="relative border-t border-border py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12"
          >
            {/* left — terminal form */}
            <div className="min-w-0 lg:col-span-7">
              <motion.div variants={fadeUp}>
                <SectionTag>
                  <span className="text-secondary">[</span> SUBMIT_REQUEST{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3rem]"
              >
                <span className="block">OPEN A</span>
                <span className="text-stroke-strong block">TICKET.</span>
              </motion.h2>

              <motion.div variants={fadeUp} className="mt-8">
                <form
                  onSubmit={handleSubmit}
                  className="clip-corner relative overflow-hidden border border-border bg-card p-6 sm:p-8"
                >
                  <CropTicks />

                  {/* terminal header */}
                  <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                    <span className="flex items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                      <Terminal className="h-3.5 w-3.5 text-secondary" />
                      itrack intake --new
                    </span>
                    <span
                      className={`font-tech text-[10px] tracking-[0.2em] ${submitted ? "text-secondary" : "text-primary"}`}
                    >
                      {submitted ? "✓ SUBMITTED" : "AWAITING INPUT"}
                    </span>
                  </div>

                  {/* fields */}
                  <div className="space-y-4">
                    {[
                      {
                        id: "name",
                        label: "NAME",
                        placeholder: "Your full name",
                        type: "text",
                      },
                      {
                        id: "email",
                        label: "EMAIL",
                        placeholder: "you@company.com",
                        type: "email",
                      },
                      {
                        id: "company",
                        label: "COMPANY",
                        placeholder: "Organization name",
                        type: "text",
                      },
                    ].map((field) => (
                      <div key={field.id} className="group">
                        <label
                          htmlFor={field.id}
                          className="mb-1.5 block font-tech text-[10px] tracking-[0.24em] text-muted-foreground"
                        >
                          {field.label} //
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field.id]: e.target.value,
                            })
                          }
                          className="w-full border border-border bg-background px-3 py-2.5 font-tech text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors focus:border-primary"
                          required
                        />
                      </div>
                    ))}

                    <div className="group">
                      <label
                        htmlFor="message"
                        className="mb-1.5 block font-tech text-[10px] tracking-[0.24em] text-muted-foreground"
                      >
                        MESSAGE //
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Describe your project, requirements, or question..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full resize-none border border-border bg-background px-3 py-2.5 font-tech text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* submit */}
                  <button
                    type="submit"
                    disabled={submitted}
                    className="clip-corner mt-6 w-full bg-secondary px-6 py-3.5 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitted ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check className="h-4 w-4" /> REQUEST RECEIVED
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        SUBMIT REQUEST <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </button>

                  {/* blinking cursor when not submitted */}
                  {!submitted && (
                    <div className="mt-3 flex items-center gap-2 font-tech text-[10px] tracking-[0.18em] text-muted-foreground/60">
                      <span className="contact-blink h-3 w-2 bg-secondary" />
                      READY FOR INPUT...
                    </div>
                  )}
                </form>
              </motion.div>
            </div>

            {/* right — contact points */}
            <div className="min-w-0 lg:col-span-5">
              <motion.div variants={fadeUp} className="mb-6">
                <SectionTag>
                  <span className="text-secondary">[</span> DIRECT_CHANNELS{" "}
                  <span className="text-secondary">]</span>
                </SectionTag>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-3xl"
              >
                <span className="block">OR REACH US</span>
                <span className="text-stroke-strong block">DIRECTLY.</span>
              </motion.h2>

              <motion.div variants={container} className="mt-8 space-y-3">
                {CONTACT_POINTS.map((cp) => {
                  const Icon = cp.icon;
                  return (
                    <motion.div
                      key={cp.code}
                      variants={cardIn}
                      className="group clip-corner relative flex min-w-0 items-center gap-4 overflow-hidden border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary sm:p-5"
                    >
                      <CropTicks />
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-background transition-colors duration-300 group-hover:border-primary">
                        <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-secondary" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.22em] text-muted-foreground">
                          <span className="font-semibold text-secondary">
                            {cp.code}
                          </span>
                          <span className="h-3 w-px bg-border" />
                          <span className="truncate">{cp.label}</span>
                        </div>
                        <div className="mt-1 text-sm font-medium text-foreground">
                          {cp.value}
                        </div>
                        <div className="mt-1 flex items-center gap-2 font-tech text-[9px] tracking-[0.16em]">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${cp.status === "active" ? "bg-primary contact-pulse" : "bg-muted-foreground"}`}
                          />
                          <span className="text-muted-foreground">
                            RESPONSE:{" "}
                            <span className="font-semibold text-foreground">
                              {cp.response}
                            </span>
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
                      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover:scale-x-100" />
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* founder direct line */}
              <motion.div
                variants={fadeUp}
                className="clip-corner mt-6 flex items-center gap-4 border border-secondary/30 bg-secondary/5 p-4 sm:p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-secondary/10">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-tech text-[10px] tracking-[0.24em] text-secondary">
                    FOUNDER DIRECT LINE
                  </div>
                  <div className="mt-1 text-sm font-bold text-foreground">
                    Ramil Peralta · ramil@itracksolutions.com
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    For strategic partnerships and enterprise engagements
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════ CTA — next steps console ════════════════════════ */}
      <section className="relative scroll-mt-24 border-t border-border py-16 lg:py-24">
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
              NEXT
            </span>

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              {/* prompt */}
              <div className="min-w-0 lg:col-span-7">
                <div className="flex min-w-0 items-center gap-2 font-tech text-[10px] tracking-[0.24em] text-secondary">
                  <span className="contact-pulse h-1.5 w-1.5 bg-secondary" />
                  WHAT_HAPPENS_NEXT //
                </div>

                <div className="mt-5 min-w-0 overflow-hidden border border-background/15 bg-background/5 p-4 font-tech text-[12px] sm:text-[13px]">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="select-none text-secondary">01.</span>
                      <span className="text-background/90">
                        Your request routes to the correct subsystem owner
                        within 15 minutes.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="select-none text-secondary">02.</span>
                      <span className="text-background/90">
                        You receive a personal reply — not an auto-responder —
                        within 4 hours.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="select-none text-secondary">03.</span>
                      <span className="text-background/90">
                        We schedule a 30-min discovery call with the actual team
                        members.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="select-none text-secondary">04.</span>
                      <span className="text-background/90">
                        You get a scoped proposal with pricing, timeline, and
                        assigned owners.
                      </span>
                    </div>
                  </div>
                </div>

                <h2 className="font-display mt-6 text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-[3.2rem]">
                  <span className="block">READY TO</span>
                  <span className="block">
                    <span className="text-secondary">START?</span>
                  </span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/65 sm:text-base">
                  Fill out the form above or reach out through any direct
                  channel. Either way, you're talking to the people who will
                  actually do the work — not a sales rep who disappears after
                  the signature.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="#contact"
                    className="clip-corner group inline-flex items-center justify-center gap-3 bg-secondary px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-background hover:text-foreground"
                  >
                    SCROLL TO FORM
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/about"
                    className="clip-corner inline-flex items-center justify-center gap-3 border border-background/25 px-7 py-4 font-tech text-xs font-semibold tracking-[0.2em] text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/10"
                  >
                    MEET THE TEAM
                  </Link>
                </div>
              </div>

              {/* readout */}
              <div className="min-w-0 lg:col-span-5">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["ROUTE TIME", "<15 MIN", Zap],
                    ["REPLY TIME", "<4 HRS", Clock],
                    ["DISCOVERY", "30 MIN", Target],
                    ["PROPOSAL", "48 HRS", FileText],
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
                      NO AUTO-RESPONDERS. NO TICKET QUEUES.
                    </div>
                    <div className="truncate text-[11px] text-background/55">
                      humans only, from first touch to final delivery
                    </div>
                  </div>
                </div>

                <div className="clip-corner mt-3 flex items-center justify-between gap-3 border border-background/15 bg-background/5 p-4 font-tech text-[11px] tracking-[0.16em]">
                  <span className="text-background/55">INTAKE STATUS</span>
                  <span className="font-semibold text-secondary">OPEN</span>
                  <span className="flex items-center gap-1.5 text-background/40">
                    <Gauge className="h-3 w-3" /> all hands available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* footer index */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 font-tech text-[10px] tracking-[0.24em] text-muted-foreground">
            <span className="flex items-center gap-2.5">
              <Hash className="h-3 w-3 text-secondary" />
              CONTACT // OPERATIONAL_INTAKE
            </span>
            <span className="flex items-center gap-2.5">
              <Plus className="h-3 w-3 rotate-45 text-secondary" />
              END OF SITE MAP →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
