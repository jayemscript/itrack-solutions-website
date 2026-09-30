// app/page.tsx
import type { Metadata } from "next";
import { HomeContentPage } from "@/components/home";
import PublicRouteLayout from "@/app/(main)/layout";

export const metadata: Metadata = {
  title: "Home | Itrack Solutions - IT Solutions & Products",
  description:
    "Welcome to Itrack Solutions - Your Partner in IT Solutions and Products",
};

export default async function Home() {
  return (
    <PublicRouteLayout>
      <HomeContentPage />
    </PublicRouteLayout>
  );
}
