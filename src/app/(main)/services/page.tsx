import type { Metadata } from "next";
import { ServicePageContent } from "@/components/services";
import { getServiceCatalogPage } from "@/lib/catalog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Access a variety of IT services designed to help your business thrive in the digital age. Explore Different solutions tailored to your needs.",
};
export default async function ServicesPage() {
  const initialPage = await getServiceCatalogPage();
  return (
    <div>
      <ServicePageContent initialPage={initialPage} />
    </div>
  );
}
