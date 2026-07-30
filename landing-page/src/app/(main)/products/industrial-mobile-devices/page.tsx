import type { Metadata } from 'next';
import IndustrialMobileDevicesContent from '../components/product-industrial-mobile-devices';

export const metadata: Metadata = {
  title:
    'Industrial Mobile Devices | Inventory & Asset Tracking | iTrack Solutions',
  description:
    'Rugged industrial mobile devices designed for inventory management and asset tracking. Built for durability with extended battery life, perfect for field operations and demanding business environments.',
  keywords: [
    'Industrial Mobile Devices',
    'Rugged Phones',
    'Inventory Management',
    'Asset Tracking',
    'Field Devices',
    'Barcode Scanners',
    'Mobile Inventory',
    'iTrack Solutions',
  ],
  openGraph: {
    type: 'website',
    title: 'Industrial Mobile Devices | Inventory & Asset Tracking',
    description:
      'Rugged mobile devices for inventory management and asset tracking operations',
    url: 'https://itracksolutions.com/products/industrial-mobile-devices',
  },
};

export default function IndustrialMobileDevicesPage() {
  return <IndustrialMobileDevicesContent />;
}
