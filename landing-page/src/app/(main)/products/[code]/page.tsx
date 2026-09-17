import { notFound } from "next/navigation";
import { CatalogDetail } from "@/components/catalog/catalog-detail";
import { getProductCatalogByCode } from "@/lib/catalog";

export const revalidate = 60;

export default async function ProductCatalogPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const item = await getProductCatalogByCode(decodeURIComponent(code));
  if (!item) notFound();
  return <CatalogDetail item={item} kind="product" />;
}
