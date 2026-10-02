"use client";

import { HomeHeroPage } from "./home-hero.page";
import { HomeClientsPage } from "./home-clients.page";
import { HomeFeaturesPage } from "./home-features.page";
import { HomeWhyChooseUsPage } from "./home-why-choose-us.page.";

export function HomeContentPage() {
  return (
    <div>
      <div>
        <HomeHeroPage />
      </div>
      <HomeClientsPage />
      <div id="features">
        <HomeFeaturesPage />
      </div>
      <div id="why-us">
        <HomeWhyChooseUsPage />
      </div>
    </div>
  );
}
