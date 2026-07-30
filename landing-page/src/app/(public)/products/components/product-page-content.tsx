'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { productSubMenus } from '@/components/layout/menus';
import { motion, easeInOut } from 'framer-motion';
import {
  Smartphone,
  Barcode,
  Printer,
  ShoppingCart,
  TrendingUp,
  Zap,
  Award,
  Target,
} from 'lucide-react';

export default function ProductPageContent() {
  // Filter to get only product items (excluding the "All Products" item)
  const filteredProducts = productSubMenus.filter(
    (product) => product.href !== '/products',
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeInOut },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: easeInOut },
    },
  };

  // Product features/benefits
  const productBenefits = [
    {
      icon: Award,
      title: 'Industrial Grade Quality',
      description:
        'Built to withstand demanding business environments and heavy use',
    },
    {
      icon: TrendingUp,
      title: 'Affordable Pricing',
      description:
        'Premium quality products at competitive prices for all business sizes',
    },
    {
      icon: Target,
      title: 'Business Focused',
      description:
        'Designed specifically for business needs and operational efficiency',
    },
    {
      icon: Zap,
      title: 'Easy Integration',
      description: 'Seamless integration with existing systems and workflows',
    },
  ];

  return (
    <section className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-700 dark:text-blue-400 mb-4">
            IT Products & Solutions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We also offer various IT Products to cater to your business needs.
            Industrial Grade Products at Affordable Prices.
          </p>
        </motion.div>

        {/* Products Grid with Framer Motion */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => {
            const Icon = product.icon;

            return (
              <motion.div key={product.href} variants={cardVariants}>
                <Link href={product.href} className="group block h-full">
                  <Card
                    className={cn(
                      'relative h-full overflow-hidden cursor-pointer',
                      'transition-all duration-300 ease-out',
                      'border border-blue-100 dark:border-blue-900',
                      'bg-white dark:bg-slate-900',
                      'hover:shadow-2xl hover:shadow-blue-500/15',
                      'hover:border-blue-300 dark:hover:border-blue-700',
                      'hover:-translate-y-2',
                      'active:scale-[0.98]',
                    )}
                  >
                    <CardHeader className="p-8">
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div
                          className={cn(
                            'flex-shrink-0 p-4 rounded-2xl',
                            'bg-blue-50 dark:bg-blue-900/30',
                            'transition-all duration-300',
                            'group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50',
                            'group-hover:scale-125 group-hover:shadow-lg',
                          )}
                        >
                          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <CardTitle
                            className={cn(
                              'text-2xl font-bold mb-3',
                              'text-slate-900 dark:text-slate-100',
                              'transition-colors duration-300',
                              'group-hover:text-blue-700 dark:group-hover:text-blue-400',
                            )}
                          >
                            {product.title}
                          </CardTitle>
                          <CardDescription className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            {product.description}
                          </CardDescription>
                        </div>
                      </div>

                      {/* Learn More Link */}
                      <div className="mt-6 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all duration-300">
                        <span>Learn More</span>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    </CardHeader>

                    {/* Bottom accent bar */}
                    <div
                      className={cn(
                        'absolute inset-x-0 bottom-0 h-1',
                        'bg-gradient-to-r from-blue-500 to-blue-600',
                        'transform scale-x-0 group-hover:scale-x-100',
                        'transition-transform duration-300 ease-out',
                        'origin-left',
                      )}
                    />
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Why Choose Our Products Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-950/20 dark:to-slate-900/20 rounded-2xl p-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-12 text-center">
            Why Choose Our Products?
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {productBenefits.map((benefit) => {
              const BenefitIcon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  className="flex items-start gap-4"
                  variants={featureVariants}
                >
                  <div className="flex-shrink-0 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <BenefitIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Product Categories Overview */}
        <motion.div
          className="bg-card dark:bg-slate-900 rounded-2xl p-12 border border-blue-100 dark:border-blue-900"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Product Categories
          </h2>

          <div className="space-y-6">
            {/* Industrial Mobile Devices */}
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                Industrial Mobile Devices
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Rugged mobile devices designed for inventory management, asset
                tracking, and field operations. Built to withstand harsh
                environments with enhanced durability and extended battery life
                for demanding business applications.
              </p>
            </div>

            {/* RFID Stickers */}
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                RFID Stickers & Tags
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Advanced RFID tracking solutions for asset management and supply
                chain optimization. Our industrial-grade stickers provide
                reliable identification and tracking capabilities for inventory
                and logistics operations.
              </p>
            </div>

            {/* Printers */}
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                Industrial Grade Printers
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                High-performance thermal and barcode printers built for
                continuous operation in industrial environments. Perfect for
                label printing, shipping labels, and receipt generation with
                exceptional reliability and speed.
              </p>
            </div>

            {/* POS Hardware */}
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                POS Hardware Solutions
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Complete Point of Sale hardware systems including terminals,
                card readers, receipt printers, and peripherals. Designed for
                retail and hospitality businesses to streamline transactions and
                improve customer experience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p className="text-lg text-muted-foreground mb-8">
            Ready to enhance your business with our industrial-grade products?
          </p>
          <Link href="/contact">
            <button
              className={cn(
                'px-8 py-3 rounded-lg font-semibold',
                'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
                'text-white',
                'transition-all duration-300 ease-out',
                'hover:shadow-lg hover:shadow-blue-500/50',
                'hover:scale-105',
                'active:scale-95',
              )}
            >
              Get in Touch
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
