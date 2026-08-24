"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Clock, Mail, MapPin, PhoneCall } from "lucide-react";

interface ContactChannel {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}

interface QuickLink {
  id: string;
  label: string;
  description: string;
  href: string;
}

interface TopicOption {
  value: string;
  label: string;
}

const HERO = {
  eyebrow: "CONTACT",
  headline: {
    lead: "Tell us what's going on,",
    emphasis: "we'll take it from there.",
  },
  description:
    "One form, one team. Whether it's a new system, a broken one, or you're not sure yet — send it here and the right person on our team will follow up.",
};

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "sales",
    icon: PhoneCall,
    label: "Sales & Consultation",
    value: "+63 900 000 0000",
    href: "tel:+639000000000",
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "hello@itracksolutions.com",
    href: "mailto:hello@itracksolutions.com",
  },
  {
    id: "office",
    icon: MapPin,
    label: "Office",
    value: "Tandang Sora, NCR, Metro Manila Quezon City Philipppines",
  },
  {
    id: "hours",
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri, 8:00 AM – 6:00 PM PHT",
  },
];

const QUICK_LINKS: QuickLink[] = [
  {
    id: "consultation",
    label: "Book a Consultation",
    description: "Scoping a new project or system",
    href: "/services/consultation",
  },
  {
    id: "support",
    label: "Get Support",
    description: "Something's broken or acting up",
    href: "/services/support",
  },
];

const TOPIC_OPTIONS: TopicOption[] = [
  { value: "general", label: "General Inquiry" },
  { value: "custom-development", label: "Custom Development" },
  { value: "mobile-apps", label: "Mobile Apps" },
  { value: "migration", label: "Legacy Migration" },
  { value: "consultation", label: "Consultation" },
  { value: "support", label: "Support & Maintenance" },
  { value: "products", label: "Hardware & Products" },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
  message: string;
}

const INITIAL_FORM_STATE: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  topic: TOPIC_OPTIONS[0].value,
  message: "",
};

export function ContactContentPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactBodySection />
    </>
  );
}

function ContactHeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <BlueprintBackdrop />

      <div className="relative mx-auto max-w-4xl px-6 pb-12 pt-24 lg:px-8 lg:pb-16 lg:pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="font-mono text-[11px] font-medium uppercase tracking-widest text-secondary"
          >
            {HERO.eyebrow}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
          >
            <span className="block">{HERO.headline.lead}</span>
            <span className="block text-primary">{HERO.headline.emphasis}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {HERO.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function ContactBodySection() {
  return (
    <section className="bg-background pb-20 lg:pb-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-2"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              {CONTACT_CHANNELS.map((channel) => (
                <ContactChannelRow key={channel.id} channel={channel} />
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 space-y-3">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {link.label}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactChannelRow({ channel }: { channel: ContactChannel }) {
  const Icon = channel.icon;
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      <div>
        <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          {channel.label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-foreground">
          {channel.value}
        </p>
      </div>
    </>
  );

  if (channel.href) {
    return (
      <a
        href={channel.href}
        className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/30"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4">
      {content}
    </div>
  );
}

function ContactForm() {
  const [formState, setFormState] =
    useState<ContactFormState>(INITIAL_FORM_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof ContactFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex h-full flex-col items-start justify-center rounded-2xl border border-border bg-card p-8">
        <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-secondary">
          MESSAGE SENT
        </span>
        <h3 className="mt-3 text-2xl font-bold text-foreground">
          We've got it.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Someone from our team will follow up at{" "}
          {formState.email || "the email you provided"} within one business day.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setFormState(INITIAL_FORM_STATE);
            setIsSubmitted(false);
          }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            required
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Juan Dela Cruz"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="juan@company.com"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={formState.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Optional"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formState.company}
            onChange={(event) => updateField("company", event.target.value)}
            placeholder="Optional"
            className="mt-1.5"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="topic">What's this about?</Label>
          <select
            id="topic"
            value={formState.topic}
            onChange={(event) => updateField("topic", event.target.value)}
            className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {TOPIC_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            required
            value={formState.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Tell us what you're working with and what you need."
            rows={5}
            className="mt-1.5"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
        <span className="inline-flex items-center gap-2">
          Send Message
          <ArrowRight className="h-4 w-4" />
        </span>
      </Button>
    </form>
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
