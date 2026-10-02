import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui";

interface AdditionalProductPageProps {
  title: string;
  description: string;
  highlights: string[];
}

function AdditionalProductPage({
  title,
  description,
  highlights,
}: AdditionalProductPageProps) {
  return (
    <main className="bg-background px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/products"
          className="font-mono text-xs text-muted-foreground hover:text-primary"
        >
          ← Back to products
        </Link>
        <span className="mt-10 block font-mono text-[11px] uppercase tracking-widest text-secondary">
          PRODUCTS
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm text-foreground"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {highlight}
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="mt-10">
          <Link href="/services/consultation" className="inline-flex items-center gap-2">
            Ask us about {title} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}

export function SecurityCameraPage() {
  return (
    <AdditionalProductPage
      title="Security Camera"
      description="Business camera systems selected for your site, coverage needs, and existing network setup."
      highlights={[
        "Indoor and outdoor camera options",
        "Coverage planned around your facility",
        "Integration with your network and monitoring workflow",
      ]}
    />
  );
}

export function ConsumablesPage() {
  return (
    <AdditionalProductPage
      title="Consumables"
      description="The labels, ribbons, receipt rolls, and supplies that keep your printers and day-to-day operations ready."
      highlights={[
        "Labels matched to your printer",
        "Ribbons and receipt rolls for daily use",
        "Supply recommendations for your workflow",
      ]}
    />
  );
}
