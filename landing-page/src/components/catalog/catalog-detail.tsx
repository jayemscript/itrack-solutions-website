import Link from "next/link";
import type { IProductCatalogs } from "@/interfaces/products";
import type { IServicesCatalogs } from "@/interfaces/services";
import { CatalogHtml } from "@/components/catalog/catalog-html";

export function CatalogDetail({ item, kind }: { item: IProductCatalogs | IServicesCatalogs; kind: "product" | "service" }) {
  const listingPath = kind === "product" ? "/products" : "/services";
  return (
    <main className="bg-background px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <Link href={listingPath} className="font-mono text-xs text-muted-foreground hover:text-primary">
          ← Back to {kind === "product" ? "products" : "services"}
        </Link>
        <span className="mt-10 block font-mono text-[11px] uppercase tracking-widest text-secondary">
          {item.category}
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{item.name}</h1>
        <CatalogHtml html={item.description} className="catalog-rich-text mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground" />
        <p className="mt-6 text-sm text-muted-foreground">Status: {item.isActive ? "Active" : "Inactive"}</p>
        <Link href="/services/consultation" className="mt-10 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Talk to our team
        </Link>
      </div>
    </main>
  );
}
