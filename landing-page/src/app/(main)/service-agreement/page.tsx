import { Metadata } from 'next';
import ServiceAgreementContent from './service-agreement-content';

export const metadata: Metadata = {
  title: 'Service Agreement | Itrack Solutions',
  description:
    'Review the service agreement for Itrack Solutions IT solutions and services. Understand the scope of services, deliverables, payment terms, and client responsibilities.',
  keywords: [
    'service agreement',
    'SLA',
    'service level agreement',
    'IT services agreement',
    'service terms',
    'Itrack Solutions',
  ],
  openGraph: {
    title: 'Service Agreement | Itrack Solutions',
    description:
      'Service agreement outlining the terms, conditions, and scope of IT solutions provided by Itrack Solutions.',
    type: 'website',
    url: 'https://itracksolutions.com/service-agreement',
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

export default function ServiceAgreement() {
  return <ServiceAgreementContent />;
}
