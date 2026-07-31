import { Metadata } from 'next';
import TermsPageContent from './terms-page-content';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Itrack Solutions',
  description:
    'Review the terms and conditions governing the use of Itrack Solutions services and website. Understand your rights and responsibilities when using our IT solutions.',
  keywords: [
    'terms and conditions',
    'terms of service',
    'user agreement',
    'service terms',
    'legal terms',
    'Itrack Solutions',
  ],
  openGraph: {
    title: 'Terms & Conditions | Itrack Solutions',
    description:
      'Terms and conditions governing the use of Itrack Solutions services and website.',
    type: 'website',
    url: 'https://itracksolutions.com/terms',
    siteName: 'Itrack Solutions',
    images: [
      {
        url: 'https://itracksolutions.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function TermsPage() {
  return <TermsPageContent />;
}
