import type { Metadata } from "next";
import PrivacyPageContent from "./privacy-page-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Itrack Solutions",
  description: "Read the Itrack Solutions privacy policy.",
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
