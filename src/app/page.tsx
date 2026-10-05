// app/page.tsx
import type { Metadata } from "next";
import { HomeContentPage } from "@/components/home";
import PublicRouteLayout from "@/app/(main)/layout";

export const metadata: Metadata = {
  title: "Itrack Solutions | IT Solutions & Products",
  description:
    "Explore Itrack Solutions products, services, company information, and contact details on one page.",
};

export default function Home() {
  return (
    <PublicRouteLayout>
      <HomeContentPage />
    </PublicRouteLayout>
  );
}
