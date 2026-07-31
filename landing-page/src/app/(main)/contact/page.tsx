import type { Metadata } from "next";
import { ContactContentPage } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us | Itrack Solutions - Get in Touch",
  description:
    "Contact Itrack Solutions for inquiries about our IT services and products. Reach out to our team for custom solutions tailored to your business needs.",
  keywords: [
    "Contact",
    "Get in Touch",
    "Support",
    "Inquiry",
    "IT Solutions",
    "Itrack Solutions",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itracksolutions.com/contact",
    siteName: "iTrack Solutions",
    title: "Contact Us | Itrack Solutions",
    description:
      "Get in touch with our team for IT solutions and product inquiries",
    images: [
      {
        url: "https://itracksolutions.com/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Itrack Solutions",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactContentPage />;
}
