import React from 'react';
import {
  ShoppingCart,
  CreditCard,
  Monitor,
  Users,
  Zap,
  Lock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function POSHardwareContent() {
  const features = [
    {
      icon: Monitor,
      title: 'Touchscreen Terminals',
      description:
        'Responsive 7"-15" displays for intuitive customer and staff interaction',
    },
    {
      icon: CreditCard,
      title: 'Secure Card Processing',
      description:
        'EMV/NFC/Chip-enabled readers with PCI DSS Level 1 compliance',
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description:
        'Lightning-quick transactions with redundant connectivity options',
    },
    {
      icon: Lock,
      title: 'Enhanced Security',
      description:
        'Encryption and tokenization for complete payment data protection',
    },
  ];

  const components = [
    {
      name: 'POS Terminals',
      description:
        'All-in-one systems with built-in processor, display, and connectivity',
      features: '7"-15" touchscreen, Thermal printer, EMV reader',
    },
    {
      name: 'Card Readers',
      description: 'Standalone readers supporting multiple payment types',
      features: 'Magnetic stripe, EMV chip, NFC contactless, Mobile support',
    },
    {
      name: 'Receipt Printers',
      description:
        'High-speed thermal printers for receipts and transaction records',
      features: '80mm or 58mm wide, 150-200mm/s print speed',
    },
    {
      name: 'Barcode Scanners',
      description: '1D/2D scanners for fast product and inventory lookups',
      features: 'Wired/wireless, Multiple scan modes, Fast recognition',
    },
    {
      name: 'Cash Drawers',
      description: 'Secure electronic cash storage with audit trails',
      features: '5-bill, 8-coin compartments, Reliable solenoid locking',
    },
    {
      name: 'Customer Displays',
      description: 'Secondary displays showing transactions to customers',
      features: '7" LED display, USB/Serial connectivity, Auto-brightness',
    },
  ];

  const specifications = [
    {
      category: 'Processor',
      details: 'Intel/ARM-based with multi-core for smooth operations',
    },
    {
      category: 'Memory',
      details: '4GB RAM, 32GB-64GB SSD storage standard',
    },
    {
      category: 'Connectivity',
      details: 'Ethernet, WiFi 6, 4G LTE, Bluetooth 5.2',
    },
    {
      category: 'Display',
      details: '7"-15" capacitive touchscreen, 1280x800 minimum resolution',
    },
    {
      category: 'Compatibility',
      details: 'Works with major POS software platforms (Square, Toast, etc)',
    },
    {
      category: 'Support',
      details: '24/7 technical support and regular software updates',
    },
  ];

  const useCases = [
    {
      title: 'Retail Stores',
      description:
        'Fast checkout experience with inventory integration and loyalty programs',
    },
    {
      title: 'Restaurants & Cafes',
      description:
        'Order management, table service, and kitchen display systems',
    },
    {
      title: 'Quick Service',
      description:
        'Counter service with fast order entry and payment processing',
    },
    {
      title: 'Grocery Stores',
      description:
        'High-volume transactions with barcode scanning and weighted items',
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
                  POS Hardware Solutions
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                  Complete Point of Sale hardware systems designed for retail
                  and hospitality businesses. Streamline transactions, enhance
                  customer experience, and increase operational efficiency.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 h-auto">
                  Get a Quote
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/20 font-semibold px-8 py-3 h-auto"
                >
                  View Demo
                </Button>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative h-96 lg:h-[450px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100/50 to-slate-100 dark:from-blue-900/20 dark:to-slate-800">
                <div className="text-center">
                  <ShoppingCart className="w-24 h-24 mx-auto text-blue-600 dark:text-blue-400 opacity-50 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">
                    POS Hardware Image
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
              Everything needed for modern retail operations
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

      {/* Hardware Components */}
      <section className="relative w-full py-16 md:py-24 bg-background dark:bg-background border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Hardware Components
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Build your complete POS system from modular components
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {components.map((component) => (
              <div
                key={component.name}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-800 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {component.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  {component.description}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                  {component.features}
                </p>
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
              Enterprise-grade specifications for reliable operations
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
              Industries where our POS systems make a difference
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

      {/* Benefits Section */}
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-950/20 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Business Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Faster Checkout Process',
              'Increased Customer Satisfaction',
              'Real-time Inventory Sync',
              'Better Sales Analytics',
              'Reduced Transaction Errors',
              'Secure Payment Processing',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 p-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <p className="text-slate-700 dark:text-slate-300 font-semibold">
                  {benefit}
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
            Transform Your Checkout Experience
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Our POS hardware solutions are trusted by thousands of retailers and
            restaurants. Let us help you find the perfect system for your
            business.
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-blue-50 text-blue-600 font-semibold px-10 py-3 h-auto"
          >
            Schedule a Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
