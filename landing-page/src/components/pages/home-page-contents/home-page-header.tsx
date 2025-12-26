'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-card dark:from-background dark:via-background dark:to-card">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content Section */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/30 dark:border-primary/40">
              <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary"></span>
              <span className="text-sm font-medium ">IT Solutions</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground dark:text-foreground">
                We Build{' '}
                <span className="text-primary dark:text-primary-foreground">
                  Customized Systems
                </span>{' '}
                For Your Business
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground dark:text-muted-foreground leading-relaxed max-w-lg">
                Enterprise-grade solutions tailored to your unique business
                needs. From system design to deployment, we deliver scalable and
                secure technology infrastructure.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-primary text-blue-500 hover:bg-primary/5 dark:hover:bg-primary/10 font-semibold rounded-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative hidden lg:flex flex-col items-center justify-center gap-6">
            {/* Main Hero Image */}
            <div className="relative w-full h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-border dark:border-border/50 bg-card dark:bg-card/50">
              <Image
                src="/images/img-hero-1.jpg"
                alt="Itrack Solutions - Dashboard"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Side Images Grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="relative h-40 rounded-xl overflow-hidden shadow-lg border border-border dark:border-border/50 bg-card dark:bg-card/50">
                <Image
                  src="/images/img-hero-2.jpg"
                  alt="Itrack Solutions - Analytics"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="relative h-40 rounded-xl overflow-hidden shadow-lg border border-border dark:border-border/50 bg-card dark:bg-card/50">
                <Image
                  src="/images/img-hero-3.jpg"
                  alt="Itrack Solutions - Integration"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Mobile Image Section */}
          <div className="relative flex lg:hidden flex-col gap-4">
            <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg border border-border dark:border-border/50 bg-card dark:bg-card/50">
              <Image
                src="/images/img-hero-1.jpg"
                alt="Itrack Solutions - Dashboard"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-32 rounded-lg overflow-hidden shadow-md border border-border dark:border-border/50 bg-card dark:bg-card/50">
                <Image
                  src="/images/img-hero-2.jpg"
                  alt="Itrack Solutions - Analytics"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden shadow-md border border-border dark:border-border/50 bg-card dark:bg-card/50">
                <Image
                  src="/images/img-hero-3.jpg"
                  alt="Itrack Solutions - Integration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent dark:via-primary/30"></div>
    </section>
  );
}
