"use client";

import { HomeHeroPage } from "./home-hero.page";
import { HomeClientsPage } from "./home-clients.page";
import { HomeFeaturesPage } from "./home-features.page";
import { HomeWhyChooseUsPage } from "./home-why-choose-us.page.";
import { ProductsContentPage } from "@/components/products/products-content.page";
import {
  BarCodeScannersPage,
  ConsumablesPage,
  IDPrintersPage,
  IndustrialMobileDevicePage,
  ProductPrintersPage,
  RFIDReadersAndTagsPage,
  SecurityCameraPage,
} from "@/components/products";
import { ServicePageContent } from "@/components/services/services-content.page";
import {
  ConsultationServicePage,
  CustomDevelopmentPage,
  MigrationServicePage,
  MobileAppsPage,
  SupportMaintenanceServicePage,
} from "@/components/services";
import { AboutContentPage } from "@/components/about";
import { ContactContentPage } from "@/components/contact";
import PrivacyPageContent from "@/app/(main)/privacy/privacy-page-content";
import TermsPageContent from "@/app/(main)/terms/terms-page-content";
import ServiceAgreementContent from "@/app/(main)/service-agreement/service-agreement-content";

export function HomeContentPage() {
  return (
    <div>
      <div id="home" className="scroll-mt-28">
        <HomeHeroPage />
      </div>
      <HomeClientsPage />
      <div id="features" className="scroll-mt-28">
        <HomeFeaturesPage />
      </div>
      <HomeWhyChooseUsPage />

      <ProductsContentPage />
      <div id="product-industrial-mobile-devices" className="scroll-mt-28">
        <IndustrialMobileDevicePage />
      </div>
      <div id="product-barcode-scanners" className="scroll-mt-28">
        <BarCodeScannersPage />
      </div>
      <div id="product-barcode-printers" className="scroll-mt-28">
        <ProductPrintersPage />
      </div>
      <div id="product-id-printers" className="scroll-mt-28">
        <IDPrintersPage />
      </div>
      <div id="product-security-camera" className="scroll-mt-28">
        <SecurityCameraPage />
      </div>
      <div id="product-consumables" className="scroll-mt-28">
        <ConsumablesPage />
      </div>
      <div id="product-rfid-readers-and-tags" className="scroll-mt-28">
        <RFIDReadersAndTagsPage />
      </div>

      <ServicePageContent />
      <div id="service-custom-development" className="scroll-mt-28">
        <CustomDevelopmentPage />
      </div>
      <div id="service-mobile-apps" className="scroll-mt-28">
        <MobileAppsPage />
      </div>
      <div id="service-migration" className="scroll-mt-28">
        <MigrationServicePage />
      </div>
      <div id="service-consultation" className="scroll-mt-28">
        <ConsultationServicePage />
      </div>
      <div id="service-support" className="scroll-mt-28">
        <SupportMaintenanceServicePage />
      </div>

      <div id="about" className="scroll-mt-28">
        <AboutContentPage />
      </div>
      <div id="contact" className="scroll-mt-28">
        <ContactContentPage />
      </div>

      <section id="legal" className="scroll-mt-28 bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold tracking-tight text-foreground">
            Legal Information
          </h2>
          <div id="privacy-policy" className="scroll-mt-28">
            <PrivacyPageContent />
          </div>
          <div id="terms" className="scroll-mt-28">
            <TermsPageContent />
          </div>
          <div id="service-agreement" className="scroll-mt-28">
            <ServiceAgreementContent />
          </div>
        </div>
      </section>
    </div>
  );
}
