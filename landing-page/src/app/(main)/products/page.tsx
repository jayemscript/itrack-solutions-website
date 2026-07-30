import type { Metadata } from 'next';
import ProductPageContent from '@/app/(main)/products/components/product-page-content';

export const metadata: Metadata = {
  title:
    'IT Products | Industrial Grade Solutions at Affordable Prices | iTrack Solutions',
  description:
    'Discover our range of IT products including industrial mobile devices, RFID tracking solutions, industrial printers, and POS hardware. We offer industrial-grade products at affordable prices to cater to your business needs.',
  keywords: [
    'IT Products',
    'Industrial Mobile Devices',
    'RFID Tracking',
    'Barcode Printers',
    'POS Hardware',
    'Industrial Equipment',
    'Inventory Management',
    'Supply Chain Solutions',
    'iTrack Solutions',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://itracksolutions.com/products',
    siteName: 'iTrack Solutions',
    title: 'IT Products | Industrial Grade Solutions at Affordable Prices',
    description:
      'Industrial-grade IT products for inventory management, asset tracking, and retail operations. RFID solutions, mobile devices, printers, and POS hardware.',
    images: [
      {
        url: 'https://itracksolutions.com/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'iTrack Solutions Products',
      },
    ],
  },
};

export default function ProductsPage() {
  return <ProductPageContent />;
}
