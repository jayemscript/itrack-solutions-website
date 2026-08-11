"use client";

import { Button } from "@/components/ui";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Activity, ArrowRight, PhoneCall } from "lucide-react";

interface HeroCta {
  id: string;
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

interface HeroStat {
  id: string;
  value: string;
  label: string;
}

interface HeroImageTile {
  id: string;
  kind: "image";
  imageUrl: string;
  imageAlt: string;
  caption: string;
  span: "tall" | "normal";
}

interface HeroStatTile {
  id: string;
  kind: "stat";
  value: string;
  label: string;
}

type HeroBentoTile = HeroImageTile | HeroStatTile;

interface HomeHeroContent {
  statusLabel: string;
  headline: {
    lead: string;
    emphasis: string;
  };
  description: string;
  ctas: HeroCta[];
  stats: HeroStat[];
  visual: {
    badgeLabel: string;
    tiles: HeroBentoTile[];
  };
}

const homeHeroContent: HomeHeroContent = {
  statusLabel: "SOLUTIONS DESK — CONSULTATION TO DEPLOYMENT",
  headline: {
    lead: "We don't just sell hardware.",
    emphasis: "We engineer the system around it.",
  },
  description:
    "POS, RFID, self-service kiosks, scanners, printers, networking — Itrack Solutions INC designs, integrates, deploys, and supports the technology system your business actually runs on, not just the boxes it's made of.",
  ctas: [
    {
      id: "consult",
      label: "Request a Consultation",
      href: "#contact",
      variant: "primary",
    },
    {
      id: "solutions",
      label: "Explore Solutions",
      href: "#solutions",
      variant: "secondary",
    },
  ],
  stats: [
    { id: "deployments", value: "120+", label: "Custom deployments shipped" },
    { id: "industries", value: "15", label: "Industries supported" },
    { id: "support", value: "24/7", label: "System support & response" },
  ],
  visual: {
    badgeLabel: "Live Deployment",
    tiles: [
      {
        id: "kiosk",
        kind: "image",
        imageUrl:
          "https://images.unsplash.com/photo-1613652056837-fda5bddd1503?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Self-service ordering kiosk installed at a business counter",
        caption: "Self-Service Kiosks",
        span: "tall",
      },
      {
        id: "pos",
        kind: "image",
        imageUrl:
          "https://images.unsplash.com/photo-1742240216264-f0aac25ef4ba?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Point-of-sale terminal ready to take an order",
        caption: "POS & Business Systems",
        span: "normal",
      },
      {
        id: "uptime",
        kind: "stat",
        value: "99.98%",
        label: "Average system uptime across active deployments",
      },
    ],
  },
};

const columnVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const bentoContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const bentoTileVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function HomeHeroPage() {
  const content = homeHeroContent;

  return (
    <section className="relative overflow-hidden bg-background">
      <BlueprintBackdrop />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-20 pt-28 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-36">
        <motion.div
          variants={columnVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-6 xl:col-span-6"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5"
          >
            <StatusDot />
            <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              {content.statusLabel}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
          >
            <span className="block">{content.headline.lead}</span>
            <span className="block text-primary">
              {content.headline.emphasis}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {content.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            {content.ctas.map((cta) => (
              <HeroCtaButton key={cta.id} cta={cta} />
            ))}
          </motion.div>

          <motion.dl
            variants={itemVariants}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {content.stats.map((stat) => (
              <div key={stat.id}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-2xl font-semibold text-primary sm:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="lg:col-span-6 xl:col-span-6">
          <HeroVisualPanel visual={content.visual} />
        </div>
      </div>
    </section>
  );
}

function StatusDot() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className="relative flex h-2 w-2">
      {!shouldReduceMotion && (
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-secondary"
          animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
    </span>
  );
}

function HeroCtaButton({ cta }: { cta: HeroCta }) {
  const isPrimary = cta.variant === "primary";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className="w-full sm:w-auto"
    >
      <Button
        asChild
        size="lg"
        variant={isPrimary ? "default" : "outline"}
        className="w-full sm:w-auto"
      >
        <a
          href={cta.href}
          className="group inline-flex items-center justify-center gap-2"
        >
          {isPrimary ? (
            <PhoneCall className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
          {cta.label}
        </a>
      </Button>
    </motion.div>
  );
}

function HeroVisualPanel({ visual }: { visual: HomeHeroContent["visual"] }) {
  const tallTile = visual.tiles.find(
    (tile): tile is HeroImageTile =>
      tile.kind === "image" && tile.span === "tall",
  );
  const otherTiles = visual.tiles.filter((tile) => tile.id !== tallTile?.id);

  return (
    <motion.div
      variants={bentoContainerVariants}
      initial="hidden"
      animate="show"
      className="relative mx-auto w-full max-w-[560px]"
    >
      <div className="grid aspect-[6/5] grid-cols-2 grid-rows-2 gap-4">
        {tallTile && (
          <motion.div
            variants={bentoTileVariants}
            className="relative row-span-2"
          >
            <BentoImageTile tile={tallTile} />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
              className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-card/95 px-3 py-1.5 shadow-md backdrop-blur"
            >
              <StatusDot />
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-foreground">
                {visual.badgeLabel}
              </span>
            </motion.div>
          </motion.div>
        )}

        {otherTiles.map((tile) => (
          <motion.div
            key={tile.id}
            variants={bentoTileVariants}
            className="relative"
          >
            {tile.kind === "image" ? (
              <BentoImageTile tile={tile} />
            ) : (
              <BentoStatTile tile={tile} />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function BentoImageTile({ tile }: { tile: HeroImageTile }) {
  return (
    <div className="group h-full w-full overflow-hidden rounded-2xl border border-border shadow-md">
      <div className="relative h-full w-full overflow-hidden">
        <img
          src={tile.imageUrl}
          alt={tile.imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/0 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-foreground shadow-sm">
          {tile.caption}
        </span>
      </div>
    </div>
  );
}

function BentoStatTile({ tile }: { tile: HeroStatTile }) {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-md">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Activity className="h-5 w-5 text-primary" />
      </span>
      <div>
        <p className="font-mono text-2xl font-semibold leading-none text-foreground">
          {tile.value}
        </p>
        <p className="mt-2 text-xs leading-snug text-muted-foreground">
          {tile.label}
        </p>
      </div>
    </div>
  );
}

function BlueprintBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse at 30% 20%, black 0%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 30% 20%, black 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
