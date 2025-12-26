'use client';

import React from 'react';
import { Code2, Cloud, Shield, Zap, Users, BarChart3 } from 'lucide-react';

export default function HomePageFeatures() {
  const features = [
    {
      icon: Code2,
      title: 'Custom Development',
      description: 'Tailored solutions built for your unique business needs',
    },
    {
      icon: Cloud,
      title: 'Cloud Ready',
      description: 'Scalable infrastructure that grows with your business',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security and compliance standards',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance and minimal downtime',
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Dedicated team always ready to help',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Real-time insights and detailed reporting',
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-background dark:bg-background">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
            Everything you need to build, scale, and manage your digital
            infrastructure
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-lg border border-border dark:border-white/10 bg-card dark:bg-card hover:border-primary/50 dark:hover:border-white/30 hover:shadow-lg dark:hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 dark:bg-white/10 mb-4 group-hover:bg-primary/20 dark:group-hover:bg-white/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary dark:text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
