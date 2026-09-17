import { notFound } from "next/navigation";
import { CatalogDetail } from "@/components/catalog/catalog-detail";
import { getServiceCatalogByCode } from "@/lib/catalog";

export const revalidate = 60;

export default async function ServiceCatalogPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const item = await getServiceCatalogByCode(decodeURIComponent(code));
  if (!item) notFound();
  return <CatalogDetail item={item} kind="service" />;
}
