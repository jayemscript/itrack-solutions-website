import { sanitizeCatalogHtml } from "@/lib/catalog-html";

export function CatalogHtml({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={`catalog-rich-text [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:border-l-2 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_h3]:mt-3 [&_h3]:font-semibold [&_h4]:mt-2 [&_h4]:font-semibold [&_li]:ml-5 [&_ol]:my-2 [&_ol]:list-decimal [&_p+p]:mt-2 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: sanitizeCatalogHtml(html) }}
    />
  );
}
