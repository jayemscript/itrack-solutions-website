import type { Metadata } from "next";
import AboutPageContent from "@/app/(main)/about/about-page-contents/about-page-content";

export const metadata: Metadata = {
  title: "About Us | Itrack Solutions - IT Solutions & Products",
  description:
    "Learn about Itrack Solutions, our mission, core values, and the expert team behind our innovative IT solutions and products. Discover what makes us different.",
  keywords: [
    "About Itrack Solutions",
    "IT Company",
    "Our Team",
    "Company Values",
    "Mission Vision",
    "IT Solutions Provider",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itracksolutions.com/about",
    siteName: "iTrack Solutions",
    title: "About Us | Itrack Solutions",
    description:
      "Learn about our mission, values, and expert team dedicated to IT excellence",
    images: [
      {
        url: "https://itracksolutions.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "iTrack Solutions Team",
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
