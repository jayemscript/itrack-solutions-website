import type { Metadata } from "next";
import { PosHardwarePage } from "@/components/products";

export const metadata: Metadata = {
  title: "POS Hardware Solutions | Point of Sale Systems | iTrack Solutions",
  description:
    "Complete Point of Sale hardware systems including terminals, card readers, receipt printers, and peripherals. Designed for retail and hospitality businesses to streamline transactions.",
  keywords: [
    "POS Hardware",
    "Point of Sale",
    "POS Terminals",
    "Card Readers",
    "Receipt Printers",
    "POS System",
    "Retail Hardware",
    "iTrack Solutions",
  ],
  openGraph: {
    type: "website",
    title: "POS Hardware Solutions | Point of Sale Systems",
    description:
      "Complete POS hardware systems for retail and hospitality businesses",
    url: "https://itracksolutions.com/products/pos-hardware",
  },
};

export default function POSHardwarePage() {
  return <PosHardwarePage />;
}
