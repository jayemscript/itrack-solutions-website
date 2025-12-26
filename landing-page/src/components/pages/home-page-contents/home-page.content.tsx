// src/components/pages/home-page-contents/home-page.content.tsx
'use client';

import React from 'react';
import HeroSection from './home-page-header';
import HomePageFeatures from './home-page-features';
import HomePageWhyUs from './home-page-why-us';

export default function HomePageContent() {
  return (
    <div>
      <HeroSection />
      <div id="features">
        <HomePageFeatures />
      </div>
      <div id="why-us">
        <HomePageWhyUs />
      </div>
    </div>
  );
}
