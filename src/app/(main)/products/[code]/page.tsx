import { notFound } from "next/navigation";
import { CatalogDetail } from "@/components/catalog/catalog-detail";
import { getProductCatalogByCode } from "@/lib/catalog";

export const revalidate = 60;

export default async function ProductCatalogPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const catalog = await getProductCatalogByCode(decodeURIComponent(code));
  if (!catalog) notFound();
  return (
    <CatalogDetail
      item={catalog.item}
      relatedItems={catalog.relatedItems}
      kind="product"
    />
  );
}
