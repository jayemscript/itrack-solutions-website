import { notFound, redirect } from "next/navigation";

const productCodes = new Set([
  "industrial-mobile-devices",
  "mobile-computers",
  "barcode-scanners",
  "barcode-printers",
  "id-printers",
  "security-camera",
  "consumables",
  "rfid-readers-and-tags",
  "rfid-stickers",
  "printers",
  "pos-hardware",
  "networking-equipment",
]);

export default async function ProductPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const productCode = decodeURIComponent(code);

  if (!productCodes.has(productCode)) notFound();
  redirect("/#products");
}
