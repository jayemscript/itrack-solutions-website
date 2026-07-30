import React from 'react';
import {
  Printer,
  Zap,
  Shield,
  Gauge,
  Layers,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrintersContent() {
  const features = [
    {
      icon: Zap,
      title: 'High-Speed Printing',
      description: 'Print up to 150mm/s for maximum productivity',
    },
    {
      icon: Shield,
      title: 'Industrial Durability',
      description:
        'Built for continuous 24/7 operation in demanding environments',
    },
    {
      icon: Gauge,
      title: 'Excellent Print Quality',
      description:
        '203-600 DPI resolution for clear, readable labels and barcodes',
    },
    {
      icon: Layers,
      title: 'Multiple Paper Widths',
      description: 'Support for 1" to 6" wide labels and thermal paper',
    },
  ];

  const printerTypes = [
    {
      name: 'Desktop Thermal Printers',
      resolution: '203-300 DPI',
      speed: '100-150 mm/s',
      ideal: 'Small warehouses, retail stores, shipping centers',
    },
    {
      name: 'Industrial Label Printers',
      resolution: '203-600 DPI',
      speed: '100-150 mm/s',
      ideal: 'Manufacturing, large warehouses, logistics hubs',
    },
    {
      name: 'Mobile Receipt Printers',
      resolution: '203 DPI',
      speed: '80-100 mm/s',
      ideal: 'Portable POS, delivery confirmation, field reports',
    },
    {
      name: 'RFID Tag Printers',
      resolution: '203 DPI',
      speed: '100-150 mm/s',
      ideal: 'RFID tag encoding and printing, asset tracking',
    },
  ];

  const specifications = [
    {
      category: 'Print Method',
      details: 'Thermal direct and thermal transfer printing',
    },
    {
      category: 'Resolution',
      details: '203-600 DPI for crystal-clear output',
    },
    {
      category: 'Print Speed',
      details: 'Up to 150mm/s for fast production',
    },
    {
      category: 'Paper Support',
      details: '1" to 6" wide labels, tags, and thermal paper',
    },
    {
      category: 'Memory',
      details: '256MB flash and 128MB SDRAM standard',
    },
    {
      category: 'Connectivity',
      details: 'USB, Serial, Ethernet, WiFi, and Bluetooth options',
    },
  ];

  const useCases = [
    {
      title: 'Shipping & Logistics',
      description:
        'Print shipping labels, tracking labels, and manifests continuously',
    },
    {
      title: 'Retail & E-commerce',
      description: 'Generate price tags, product labels, and customer receipts',
    },
    {
      title: 'Warehouse Management',
      description: 'Print inventory labels, location stickers, and bin labels',
    },
    {
      title: 'Manufacturing',
      description:
        'Print product labels, serial numbers, and QR codes for tracking',
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
                  Industrial Grade Printers
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                  High-performance thermal and barcode printers built for
                  continuous operation in demanding business environments.
                  Perfect for label, shipping, and receipt printing with
                  exceptional reliability.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 h-auto">
                  Explore Models
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
                  <Printer className="w-24 h-24 mx-auto text-blue-600 dark:text-blue-400 opacity-50 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">
                    Printer Device Image
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
              Professional printing capabilities for industrial operations
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

      {/* Printer Types */}
      <section className="relative w-full py-16 md:py-24 bg-background dark:bg-background border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Printer Models
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Choose the right printer for your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {printerTypes.map((printer) => (
              <div
                key={printer.name}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-800 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {printer.name}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Resolution
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {printer.resolution}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Print Speed
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {printer.speed}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Ideal For
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {printer.ideal}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="relative w-full py-16 md:py-24 bg-card dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Technical Specifications
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Professional specifications for demanding printing operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specifications.map((spec) => (
              <div
                key={spec.category}
                className="p-6 rounded-xl bg-background dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
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
      <section className="relative w-full py-16 md:py-24 bg-background dark:bg-background border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Perfect For
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Industries and applications where our printers excel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="p-8 rounded-xl border-l-4 border-blue-500 bg-card dark:bg-slate-800 hover:shadow-lg transition-shadow"
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
            Boost Your Printing Productivity
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Find the perfect industrial printer for your business needs. Our
            team can help you choose the right model and provide expert support
            for maximum performance.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-blue-50 text-blue-600 font-semibold px-10 py-3 h-auto"
          >
            Talk to Our Experts
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
