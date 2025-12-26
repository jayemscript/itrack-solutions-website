'use client';

import React from 'react';
import { CheckCircle2, TrendingUp, Award } from 'lucide-react';

export default function HomePageWhyUs() {
  const reasons = [
    {
      icon: CheckCircle2,
      title: 'Proven Track Record',
      description:
        'Over 500+ successful projects delivered across industries with 98% client satisfaction rate',
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions',
      description:
        'Infrastructure designed to grow with your business without compromising performance',
    },
    {
      icon: Award,
      title: 'Industry Expertise',
      description:
        '10+ years of experience building enterprise-grade systems for Fortune 500 companies',
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-card dark:bg-card border-t border-border dark:border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 dark:bg-white/10 border border-primary/30 dark:border-white/20 mb-4">
                <span className="text-sm font-semibold text-primary dark:text-white">
                  Why Itrack Solutions
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
                Built for Success
              </h2>
              <p className="text-lg text-muted-foreground dark:text-slate-300 leading-relaxed">
                We don't just build software. We build partnerships with our
                clients to deliver transformative solutions that drive real
                business value.
              </p>
            </div>

            {/* Reasons List */}
            <div className="space-y-4">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-primary dark:text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground dark:text-white mb-1">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-muted-foreground dark:text-slate-300">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="p-6 md:p-8 rounded-lg bg-background dark:bg-background border border-border dark:border-white/10 hover:border-primary/50 dark:hover:border-white/30 transition-colors">
              <p className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-2">
                500+
              </p>
              <p className="text-sm text-muted-foreground dark:text-slate-300">
                Projects Delivered
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-lg bg-background dark:bg-background border border-border dark:border-white/10 hover:border-primary/50 dark:hover:border-white/30 transition-colors">
              <p className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-2">
                98%
              </p>
              <p className="text-sm text-muted-foreground dark:text-slate-300">
                Client Satisfaction
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-lg bg-background dark:bg-background border border-border dark:border-white/10 hover:border-primary/50 dark:hover:border-white/30 transition-colors">
              <p className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-2">
                10+
              </p>
              <p className="text-sm text-muted-foreground dark:text-slate-300">
                Years Experience
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-lg bg-background dark:bg-background border border-border dark:border-white/10 hover:border-primary/50 dark:hover:border-white/30 transition-colors">
              <p className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-2">
                24/7
              </p>
              <p className="text-sm text-muted-foreground dark:text-slate-300">
                Dedicated Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
