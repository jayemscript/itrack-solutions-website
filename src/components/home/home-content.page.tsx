"use client";

import { HomeFeaturesPage } from "./home-features.page";
import { HomeWhyChooseUsPage } from "./home-why-choose-us.page.";
import { AboutContentPage } from "@/components/about";
import { ContactContentPage } from "@/components/contact";
import { ProductsContentPage } from "@/components/products/products-content.page";
import { ServicePageContent } from "@/components/services/services-content.page";

export function HomeContentPage() {
  return (
    <main>
      <section id="home" className="scroll-mt-28">
        <div className="w-full">
          <img src="/images/hero-image.jpg" alt="" className="block w-full" />
        </div>
      </section>
      <HomeFeaturesPage />
      <HomeWhyChooseUsPage />
      <ServicePageContent />
      <ProductsContentPage />
      <section id="about" className="scroll-mt-28">
        <AboutContentPage />
      </section>
      <ContactContentPage />
    </main>
  );
}
