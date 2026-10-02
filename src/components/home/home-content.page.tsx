"use client";

import {
  HomeHeroPage,
  HomeClientsPage,
  HomeFeaturesPage,
  HomeWhyChooseUsPage,
} from "./index";

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
