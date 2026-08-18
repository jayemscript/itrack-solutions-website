import type { Metadata } from "next";
import { NetworkingEquipmentPage } from "@/components/products";

export const metadata: Metadata = {
  title:
    "Networking Equipment | Switches, Access Points & Cabling | iTrack Solutions",
  description:
    "Switches, wireless access points, structured cabling, and firewalls that keep every POS, kiosk, and scanner online. Site surveys, network segmentation, and ongoing monitoring included.",
  keywords: [
    "Networking Equipment",
    "Switches",
    "Wireless Access Points",
    "Structured Cabling",
    "Network Security",
    "Business Networking",
    "Network Segmentation",
    "iTrack Solutions",
  ],
  openGraph: {
    type: "website",
    title: "Networking Equipment | Switches, Access Points & Cabling",
    description:
      "Switches, access points, and structured cabling that keep every device on your network online",
    url: "https://itracksolutions.com/products/networking-equipment",
  },
};

export default function NetworkingEquipmentRoutePage() {
  return <NetworkingEquipmentPage />;
}
