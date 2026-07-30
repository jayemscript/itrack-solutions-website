import React from 'react';
import Image from 'next/image';
import {
  Smartphone,
  Zap,
  Shield,
  Globe,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ServicesPageMobileApps() {
  const features = [
    {
      icon: Smartphone,
      title: 'Native & Cross-Platform',
      description:
        'iOS, Android, and cross-platform solutions with native performance',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Optimized apps for superior performance and instant user experience',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and data protection standards',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description:
        'Apps designed for worldwide audience with multi-language support',
    },
  ];

  const process = [
    {
      step: 1,
      title: 'Ideation',
      description:
        'Understand your vision and design the perfect mobile experience',
    },
    {
      step: 2,
      title: 'Design & Prototype',
      description: 'Create intuitive UI/UX with interactive prototypes',
    },
    {
      step: 3,
      title: 'Development',
      description:
        'Build robust, scalable apps using latest mobile technologies',
    },
    {
      step: 4,
      title: 'Launch & Support',
      description:
        'Deploy to app stores and provide ongoing updates and support',
    },
  ];

  const techStack = [
    'React Native',
    'Flutter',
    'Swift',
    'Kotlin',
    'Firebase',
    'AWS',
    'REST APIs',
    'WebSockets',
  ];

  const useCases = [
    {
      title: 'E-Commerce Apps',
      description:
        'Feature-rich shopping apps with secure payments and inventory sync',
    },
    {
      title: 'Social & Messaging',
      description:
        'Real-time communication apps with rich media and notifications',
    },
    {
      title: 'Fintech Solutions',
      description:
        'Banking and payment apps with advanced security and compliance',
    },
    {
      title: 'Health & Fitness',
      description:
        'Wellness apps with real-time tracking and health data integration',
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
                    Mobile App Development
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground dark:text-white mb-4">
                  Engage Users On Mobile
                </h1>
                <p className="text-lg text-muted-foreground dark:text-slate-300 leading-relaxed max-w-lg">
                  Innovative mobile applications designed to enhance user
                  engagement and streamline business operations. Discover our
                  mobile app solutions tailored to your needs
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 h-auto">
                  Build Your App
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 dark:border-white dark:text-white dark:hover:bg-white/10 font-semibold px-8 py-3 h-auto"
                >
                  View Portfolio
                </Button>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-96 lg:h-[450px] rounded-2xl overflow-hidden bg-muted dark:bg-muted border border-border dark:border-white/10 shadow-lg">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-white/5 dark:to-white/10">
                <div className="text-center">
                  <Smartphone className="w-16 h-16 mx-auto text-primary dark:text-white opacity-50 mb-4" />
                  <p className="text-muted-foreground dark:text-slate-400">
                    Mobile App Development Image
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
            Ready to Launch Your Mobile App?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let's transform your app idea into a reality that users will love.
            Contact us today to get started.
          </p>
          <Button className="bg-white hover:bg-slate-100 text-primary font-semibold px-8 py-3 h-auto">
            Start Your App Journey
          </Button>
        </div>
      </section>
    </div>
  );
}
