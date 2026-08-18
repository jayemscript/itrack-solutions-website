import type { Metadata } from "next";
import { BarCodeScannersPage } from "@/components/products";

export const metadata: Metadata = {
  title:
    "Barcode Scanners | Handheld & Fixed-Mount Scanning | iTrack Solutions",
  description:
    "Handheld and fixed-mount barcode scanners for retail, warehousing, and field operations. 1D & 2D scanning, wireless and rugged options, paired with your POS or inventory system before deployment.",
  keywords: [
    "Barcode Scanners",
    "Handheld Scanners",
    "Fixed-Mount Scanners",
    "1D 2D Scanning",
    "Warehouse Scanning",
    "Retail Checkout Scanners",
    "Inventory Scanning",
    "iTrack Solutions",
  ],
  openGraph: {
    type: "website",
    title: "Barcode Scanners | Handheld & Fixed-Mount Scanning",
    description:
      "Handheld and fixed-mount barcode scanners for retail, warehousing, and field operations",
    url: "https://itracksolutions.com/products/barcode-scanners",
  },
};

export default function BarcodeScannersRoutePage() {
  return <BarCodeScannersPage />;
}
