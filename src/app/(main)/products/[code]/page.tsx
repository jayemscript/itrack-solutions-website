import { notFound } from "next/navigation";
import {
  BarCodeScannersPage,
  ConsumablesPage,
  IndustrialMobileDevicePage,
  NetworkingEquipmentPage,
  PosHardwarePage,
  ProductPrintersPage,
  RFIDStickerPage,
  SecurityCameraPage,
} from "@/components/products";

const productPages = {
  "industrial-mobile-devices": IndustrialMobileDevicePage,
  "mobile-computers": IndustrialMobileDevicePage,
  "barcode-printers": ProductPrintersPage,
  "id-printers": ProductPrintersPage,
  "security-camera": SecurityCameraPage,
  consumables: ConsumablesPage,
  "rfid-readers-and-tags": RFIDStickerPage,
  "rfid-stickers": RFIDStickerPage,
  "pos-hardware": PosHardwarePage,
  printers: ProductPrintersPage,
  "barcode-scanners": BarCodeScannersPage,
  "networking-equipment": NetworkingEquipmentPage,
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const Page = productPages[decodeURIComponent(code) as keyof typeof productPages];

  if (!Page) notFound();
  return <Page />;
}
