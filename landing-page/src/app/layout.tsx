import '@/configs/setup-console';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Roboto, Bebas_Neue } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Itrack Solutions | Enterprise IT Solutions & Products',
  description:
    'Itrack Solutions delivers custom IT solutions, enterprise software development, mobile applications, and innovative tech products including industrial mobile devices, RFID stickers, printers, and POS hardware. Trusted by businesses for scalable, secure technology infrastructure.',
  keywords: [
    'IT solutions',
    'custom software development',
    'enterprise IT services',
    'mobile app development',
    'industrial mobile devices',
    'RFID stickers',
    'POS hardware',
    'thermal printers',
    'technology infrastructure',
    'IT consulting',
    'Itrack Solutions',
  ],
  authors: [{ name: 'Itrack Solutions' }],
  creator: 'Itrack Solutions',
  publisher: 'Itrack Solutions',
  generator: 'Next.js',
  applicationName: 'Itrack Solutions',
  category: 'Technology',
  metadataBase: new URL('https://itracksolutions.com'),
  openGraph: {
    title: 'Itrack Solutions | Enterprise IT Solutions & Products',
    description:
      'Custom IT solutions, software development, and innovative tech products for enterprise clients. Industrial devices, RFID, printers, and POS systems.',
    url: 'https://itracksolutions.com',
    siteName: 'Itrack Solutions',
    type: 'website',
    images: [
      {
        url: 'https://itracksolutions.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Itrack Solutions - IT Solutions & Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itrack Solutions | Enterprise IT Solutions & Products',
    description:
      'Custom IT solutions and innovative tech products for your business needs',
    images: ['https://itracksolutions.com/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
