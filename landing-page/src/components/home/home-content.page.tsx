"use client";

import { HomeHeroPage, HomeFeaturesPage, HomeWhyChooseUsPage } from "./index";

export function HomeContentPage() {
  return (
    <div>
      <div>
        <HomeHeroPage />
      </div>
      <div id="features">
        <HomeFeaturesPage />
      </div>
      <div id="why-us">
        <HomeWhyChooseUsPage />
      </div>
    </div>
  );
}
