import Link from "next/link";
import type { IProductCatalogs } from "@/interfaces/products";
import type { IServicesCatalogs } from "@/interfaces/services";
import { CatalogHtml } from "@/components/catalog/catalog-html";
import { CatalogImageCarousel } from "@/components/catalog/catalog-image-carousel";

export function CatalogDetail({ item, relatedItems = [], kind }: { item: IProductCatalogs | IServicesCatalogs; relatedItems?: (IProductCatalogs | IServicesCatalogs)[]; kind: "product" | "service" }) {
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
        <div className="mt-8 max-w-3xl">
          <CatalogImageCarousel catalogId={item.id} images={item.images} kind={kind} alt={item.name} />
        </div>
        <CatalogHtml html={item.description} className="catalog-rich-text mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground" />
        <p className="mt-6 text-sm text-muted-foreground">Status: {item.isActive ? "Active" : "Inactive"}</p>
        {relatedItems.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {kind === "product" ? "Products in this catalog" : "Services in this catalog"}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedItems.map((relatedItem) => (
                <article key={relatedItem.id} className="rounded-2xl border border-border bg-card p-5">
                  <CatalogImageCarousel catalogId={relatedItem.id} images={relatedItem.images} kind={kind} alt={relatedItem.name} compact />
                  <h3 className="text-lg font-semibold text-foreground">{relatedItem.name}</h3>
                  <CatalogHtml html={relatedItem.description} className="catalog-rich-text mt-2 text-sm leading-relaxed text-muted-foreground" />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-secondary">{relatedItem.code}</p>
                </article>
              ))}
            </div>
          </section>
        )}
        <Link href="/services/consultation" className="mt-10 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Talk to our team
        </Link>
      </div>
    </main>
  );
}
