import type { Metadata } from 'next';
import RFIDStickersContent from '../components/product-rfid-stickers';

export const metadata: Metadata = {
  title: 'RFID Stickers & Tags | Asset Tracking Solutions | iTrack Solutions',
  description:
    'Advanced RFID tracking solutions for asset management and supply chain optimization. Industrial-grade RFID stickers and tags for inventory, logistics, and supply chain operations.',
  keywords: [
    'RFID Tags',
    'RFID Stickers',
    'Asset Tracking',
    'Inventory Management',
    'Supply Chain',
    'Logistics',
    'Barcode Alternative',
    'iTrack Solutions',
  ],
  openGraph: {
    type: 'website',
    title: 'RFID Stickers & Tags | Asset Tracking Solutions',
    description:
      'Industrial-grade RFID tracking solutions for inventory and supply chain management',
    url: 'https://itracksolutions.com/products/rfid-stickers',
  },
};

export default function RFIDStickersPage() {
  return <RFIDStickersContent />;
}
