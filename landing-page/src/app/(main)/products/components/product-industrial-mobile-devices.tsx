import React from 'react';
import {
  Smartphone,
  Battery,
  Shield,
  MapPin,
  Cpu,
  Zap,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function IndustrialMobileDevicesContent() {
  const features = [
    {
      icon: Shield,
      title: 'Military-Grade Durability',
      description:
        'IP67 rated with shock resistance, perfect for harsh field environments',
    },
    {
      icon: Battery,
      title: 'Extended Battery Life',
      description: 'All-day operation with quick charging capabilities',
    },
    {
      icon: Smartphone,
      title: 'Android-Based OS',
      description: 'Familiar interface with enterprise customization options',
    },
    {
      icon: Cpu,
      title: 'Integrated Scanners',
      description:
        '1D/2D barcode and RFID scanning built-in for inventory work',
    },
  ];

  const specifications = [
    {
      category: 'Display',
      details: 'High-brightness 5-6" touchscreen, readable in sunlight',
    },
    {
      category: 'Processing',
      details: 'Quad-core processor with 4GB+ RAM for smooth multitasking',
    },
    {
      category: 'Connectivity',
      details: '4G LTE, WiFi 6, Bluetooth 5.2, NFC capabilities',
    },
    {
      category: 'Storage',
      details: '64GB-128GB expandable storage for large databases',
    },
    {
      category: 'Scanning',
      details: 'High-performance barcode and RFID scanner modules',
    },
    {
      category: 'Battery',
      details: '5000+ mAh with hot-swap capability available',
    },
  ];

  const useCases = [
    {
      title: 'Warehouse Management',
      description: 'Real-time inventory tracking and stock level updates',
    },
    {
      title: 'Retail Operations',
      description: 'Mobile checkout, price lookup, and inventory audits',
    },
    {
      title: 'Asset Management',
      description: 'Track equipment, tools, and assets across locations',
    },
    {
      title: 'Field Service',
      description:
        'Service technician devices with job dispatch and documentation',
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
                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 mb-4">
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                    Product Solutions
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                  Industrial Mobile Devices
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                  Rugged mobile devices built for inventory management, asset
                  tracking, and field operations. Designed to withstand
                  demanding business environments with integrated scanning
                  capabilities and extended battery life.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 h-auto">
                  Request Quote
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/20 font-semibold px-8 py-3 h-auto"
                >
                  View Specs
                </Button>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-96 lg:h-[450px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100/50 to-slate-100 dark:from-blue-900/20 dark:to-slate-800">
                <div className="text-center">
                  <Smartphone className="w-24 h-24 mx-auto text-blue-600 dark:text-blue-400 opacity-50 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">
                    Mobile Device Image
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="relative w-full py-16 md:py-24 bg-card dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Key Features
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need for reliable field operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl bg-background dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="relative w-full py-16 md:py-24 bg-background dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Technical Specifications
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Enterprise-grade specifications for demanding operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specifications.map((spec) => (
              <div
                key={spec.category}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-800 border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {spec.category}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {spec.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="relative w-full py-16 md:py-24 bg-card dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Perfect For
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Ideal solutions for various business operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="p-8 rounded-xl border-l-4 border-blue-500 bg-background dark:bg-slate-800 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Upgrade Your Operations?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss your specific requirements and
            find the perfect industrial mobile device solution for your
            business.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-blue-50 text-blue-600 font-semibold px-10 py-3 h-auto"
          >
            Contact Our Team
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
