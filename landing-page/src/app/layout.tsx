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
  title: 'Barangay E-Services | Online Barangay Certificates & Local Services',
  description:
    'Access barangay services online such as Barangay Clearance, Certificate of Indigency, Residency, and other local documents. Fast, secure, and hassle-free e-services for residents.',
  keywords: [
    'barangay e services',
    'barangay online services',
    'barangay clearance online',
    'certificate of indigency online',
    'barangay residency certificate',
    'local government services',
    'Philippines barangay system',
    'online barangay appointment',
  ],
  authors: [{ name: 'Barangay E-Services System' }],
  generator: 'Next.js',
  applicationName: 'Barangay E-Services',
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: 'Barangay E-Services | Fast & Secure Online Barangay Transactions',
    description:
      'Request Barangay Clearance, Indigency, Residency, and other barangay certificates online.',
    url: 'https://your-domain.com',
    siteName: 'Barangay E-Services',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
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
