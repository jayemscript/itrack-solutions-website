import type { Metadata } from "next";
import ServiceAgreementContent from "./service-agreement-content";

export const metadata: Metadata = {
  title: "Service Agreement | Itrack Solutions",
  description: "Read the Itrack Solutions service agreement.",
};

export default function ServiceAgreementPage() {
  return <ServiceAgreementContent />;
}
