import { notFound, redirect } from "next/navigation";

const productAnchors: Record<string, string> = {
  "industrial-mobile-devices": "product-industrial-mobile-devices",
  "mobile-computers": "product-industrial-mobile-devices",
  "barcode-scanners": "product-barcode-scanners",
  "barcode-printers": "product-barcode-printers",
  "id-printers": "product-id-printers",
  "security-camera": "product-security-camera",
  consumables: "product-consumables",
  "rfid-readers-and-tags": "product-rfid-readers-and-tags",
  "rfid-stickers": "product-rfid-readers-and-tags",
  printers: "product-barcode-printers",
  "pos-hardware": "products",
  "networking-equipment": "products",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const anchor = productAnchors[decodeURIComponent(code)];

  if (!anchor) notFound();
  redirect(`/#${anchor}`);
}
