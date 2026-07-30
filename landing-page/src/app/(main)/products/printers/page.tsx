import type { Metadata } from 'next';
import PrintersContent from '../components/product-printers';

export const metadata: Metadata = {
  title:
    'Industrial Grade Printers | Thermal & Barcode Printers | iTrack Solutions',
  description:
    'High-performance industrial thermal and barcode printers built for continuous operation. Perfect for shipping labels, receipts, and inventory tags with exceptional reliability and speed.',
  keywords: [
    'Industrial Printers',
    'Thermal Printers',
    'Barcode Printers',
    'Label Printers',
    'Shipping Labels',
    'Receipt Printers',
    'iTrack Solutions',
  ],
  openGraph: {
    type: 'website',
    title: 'Industrial Grade Printers | Thermal & Barcode Solutions',
    description:
      'High-performance industrial printers for label, shipping, and receipt printing',
    url: 'https://itracksolutions.com/products/printers',
  },
};

export default function PrintersPage() {
  return <PrintersContent />;
}
