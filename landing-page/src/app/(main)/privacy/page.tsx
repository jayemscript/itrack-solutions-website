import { Metadata } from 'next';
import PrivacyPageContent from './privacy-page-content';

export const metadata: Metadata = {
  title: 'Privacy Policy | Itrack Solutions',
  description:
    'Learn how Itrack Solutions collects, uses, and protects your personal information. Our privacy policy outlines our commitment to data security and transparency.',
  keywords: [
    'privacy policy',
    'data protection',
    'GDPR compliance',
    'data security',
    'personal information',
    'Itrack Solutions',
  ],
  openGraph: {
    title: 'Privacy Policy | Itrack Solutions',
    description:
      'Learn how Itrack Solutions protects your personal information and complies with data protection regulations.',
    type: 'website',
    url: 'https://itracksolutions.com/privacy',
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

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
