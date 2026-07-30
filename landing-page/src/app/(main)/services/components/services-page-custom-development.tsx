import React from 'react';
import Image from 'next/image';
import {
  Code2,
  Zap,
  Shield,
  Users,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ServicesPageCustomDevelopment() {
  const features = [
    {
      icon: Code2,
      title: 'Full Stack Development',
      description:
        'Frontend, backend, and database solutions tailored to your needs',
    },
    {
      icon: Zap,
      title: 'Fast Implementation',
      description:
        'Agile approach for quick delivery without sacrificing quality',
    },
    {
      icon: Shield,
      title: 'Secure & Scalable',
      description: 'Enterprise-grade security with growth-ready architecture',
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'Your own development team focused on your project success',
    },
  ];

  const process = [
    {
      step: 1,
      title: 'Discovery',
      description:
        'We understand your business goals, challenges, and requirements',
    },
    {
      step: 2,
      title: 'Strategy',
      description: 'Create detailed technical roadmap and architecture design',
    },
    {
      step: 3,
      title: 'Development',
      description:
        'Build your solution with regular updates and feedback loops',
    },
    {
      step: 4,
      title: 'Deployment',
      description: 'Launch, monitor, and optimize for maximum performance',
    },
  ];

  const techStack = [
    'React/Next.js',
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'AWS/Cloud',
    'Docker',
    'GraphQL',
  ];

  const useCases = [
    {
      title: 'Enterprise Systems',
      description: 'Complex business applications for large organizations',
    },
    {
      title: 'SaaS Platforms',
      description:
        'Scalable multi-tenant applications with subscription models',
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile solutions',
    },
    {
      title: 'API Integration',
      description:
        'Seamless integration with existing systems and third-party services',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-card dark:from-background dark:to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 dark:bg-white/10 border border-primary/30 dark:border-white/20 mb-4">
                  <span className="text-sm font-semibold text-primary dark:text-white">
                    Custom Development
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground dark:text-white mb-4">
                  Build Your Perfect System
                </h1>
                <p className="text-lg text-muted-foreground dark:text-slate-300 leading-relaxed max-w-lg">
                  Tailored software solutions designed specifically for your
                  business. From concept to deployment, we build systems that
                  solve your unique challenges.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 h-auto">
                  Start Your Project
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 dark:border-white dark:text-white dark:hover:bg-white/10 font-semibold px-8 py-3 h-auto"
                >
                  View Case Studies
                </Button>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-96 lg:h-[450px] rounded-2xl overflow-hidden bg-muted dark:bg-muted border border-border dark:border-white/10 shadow-lg">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-white/5 dark:to-white/10">
                <div className="text-center">
                  <Code2 className="w-16 h-16 mx-auto text-primary dark:text-white opacity-50 mb-4" />
                  <p className="text-muted-foreground dark:text-slate-400">
                    Custom Development Image
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full py-16 md:py-24 bg-card dark:bg-card border-t border-border dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white text-center mb-12">
            What We Deliver
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-background dark:bg-background border border-border dark:border-white/10 hover:border-primary/50 dark:hover:border-white/30 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 dark:bg-white/10 mb-4">
                    <Icon className="w-6 h-6 text-primary dark:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative w-full py-16 md:py-24 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white text-center mb-12">
            Our Development Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="p-6 rounded-lg bg-card dark:bg-card border border-border dark:border-white/10">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary flex items-center justify-center text-white font-bold text-lg">
                      {item.step}
                    </div>
                    {index < process.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-muted-foreground dark:text-slate-400 ml-4 hidden lg:block" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative w-full py-16 md:py-24 bg-card dark:bg-card border-t border-border dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white text-center mb-12">
            Technologies We Use
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-background dark:bg-background border border-border dark:border-white/10 text-center hover:border-primary/50 dark:hover:border-white/30 transition-colors"
              >
                <p className="font-semibold text-foreground dark:text-white text-sm">
                  {tech}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative w-full py-16 md:py-24 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white text-center mb-12">
            Perfect For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-8 rounded-lg bg-card dark:bg-card border border-border dark:border-white/10 hover:border-primary/50 dark:hover:border-white/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary dark:text-white flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-slate-300">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-16 md:py-24 bg-primary dark:bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your System?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a custom solution
            that drives your business forward.
          </p>
          <Button className="bg-white hover:bg-slate-100 text-primary font-semibold px-8 py-3 h-auto">
            Schedule a Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}
