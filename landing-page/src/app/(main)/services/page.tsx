import type { Metadata } from "next";
import { ServicePageContent } from "@/components/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Access a variety of IT services designed to help your business thrive in the digital age. Explore Different solutions tailored to your needs.",
};
export default function ServicesPage() {
  return (
    <div>
      <ServicePageContent />
    </div>
  );
}
