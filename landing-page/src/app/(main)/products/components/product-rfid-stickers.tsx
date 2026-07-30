import React from 'react';
import {
  Barcode,
  Radio,
  Shield,
  Database,
  Zap,
  Layers,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RFIDStickersContent() {
  const features = [
    {
      icon: Radio,
      title: 'Wireless Reading',
      description: 'Read tags from multiple meters away without line of sight',
    },
    {
      icon: Shield,
      title: 'Durable & Weather-Resistant',
      description: 'Industrial-grade materials withstand harsh environments',
    },
    {
      icon: Database,
      title: 'High Data Storage',
      description: 'Store detailed information directly on each tag',
    },
    {
      icon: Layers,
      title: 'Multiple Frequencies',
      description: 'UHF and HF options for different applications',
    },
  ];

  const specifications = [
    {
      category: 'Frequency',
      details: 'UHF (865-928 MHz) and HF (13.56 MHz) options',
    },
    {
      category: 'Read Range',
      details: 'Up to 10 meters for UHF, 1+ meter for HF tags',
    },
    {
      category: 'Memory',
      details: '96-512 bits user programmable storage',
    },
    {
      category: 'Material',
      details: 'Polyester or vinyl with adhesive backing',
    },
    {
      category: 'Durability',
      details: 'Water, oil, and chemical resistant',
    },
    {
      category: 'Temperature',
      details: '-20°C to +60°C operating range',
    },
  ];

  const useCases = [
    {
      title: 'Asset Tracking',
      description:
        'Track valuable equipment and tools throughout your facility',
    },
    {
      title: 'Supply Chain',
      description: 'Monitor inventory movement from warehouse to delivery',
    },
    {
      title: 'Logistics',
      description: 'Real-time shipment tracking and container identification',
    },
    {
      title: 'Document Management',
      description:
        'Organize and locate files, records, and archives efficiently',
    },
  ];

  const advantages = [
    'No line-of-sight required for reading',
    'Read multiple tags simultaneously',
    'Faster than barcode scanning',
    'Weatherproof and reusable',
    'Cost-effective for large-scale tracking',
    'Easy integration with existing systems',
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
                  RFID Stickers & Tags
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                  Advanced RFID tracking solutions for asset management and
                  supply chain optimization. Read tags wirelessly without line
                  of sight for unmatched efficiency and accuracy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 h-auto">
                  Get Pricing
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/20 font-semibold px-8 py-3 h-auto"
                >
                  Compare Tags
                </Button>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-96 lg:h-[450px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100/50 to-slate-100 dark:from-blue-900/20 dark:to-slate-800">
                <div className="text-center">
                  <Barcode className="w-24 h-24 mx-auto text-blue-600 dark:text-blue-400 opacity-50 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">
                    RFID Stickers Image
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
              Advanced technology for comprehensive asset tracking
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

      {/* Advantages */}
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-r from-emerald-50 to-slate-50 dark:from-emerald-950/20 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose RFID?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Superior advantages over traditional barcoding methods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage) => (
              <div key={advantage} className="flex items-start gap-3 p-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700 dark:text-slate-300">
                  {advantage}
                </p>
              </div>
            ))}
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
              Industrial-grade RFID tag specifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specifications.map((spec) => (
              <div
                key={spec.category}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-800 border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-start gap-4">
                  <Radio className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
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
              Ideal applications for RFID tracking technology
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
            Streamline Your Asset Tracking
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Discover how RFID stickers can revolutionize your inventory and
            asset management operations. Get in touch for a custom solution
            tailored to your needs.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-blue-50 text-blue-600 font-semibold px-10 py-3 h-auto"
          >
            Request a Demo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
