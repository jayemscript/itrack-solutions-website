import type { Metadata } from "next";
import { CustomDevelopmentPage } from "@/components/services";

export const metadata: Metadata = {
  title: "Custom Development | Itrack Solutions",
  description:
    "Tailored software solutions designed to meet your specific business needs and challenges.",
};

export default function CustomDevelopment() {
  return (
    <div>
      <CustomDevelopmentPage />
    </div>
  );
}
