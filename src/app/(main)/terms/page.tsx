import type { Metadata } from "next";
import TermsPageContent from "./terms-page-content";

export const metadata: Metadata = {
  title: "Terms and Conditions | Itrack Solutions",
  description: "Read the Itrack Solutions terms and conditions.",
};

export default function TermsPage() {
  return <TermsPageContent />;
}
