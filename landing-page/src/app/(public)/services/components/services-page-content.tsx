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
import { servicesSubMenus } from '@/components/navigation/public_navs/menus';
import { motion, easeInOut } from 'framer-motion';

export default function ServicePageContent() {
  const filteredServices = servicesSubMenus.filter(
    (service) =>
      service.title !== 'Overview of E-services' &&
      service.href !== '/services',
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

  return (
    <section className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 dark:text-blue-400 mb-4">
            Itrack Solutions Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a range of services designed to elevate your business
          </p>
        </div>

        {/* Services Grid with Framer Motion */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div key={service.href} variants={cardVariants}>
                <Link href={service.href} className="group block">
                  <Card
                    className={cn(
                      'relative h-full overflow-hidden cursor-pointer',
                      'transition-all duration-300 ease-out',
                      'border border-blue-100 dark:border-blue-900',
                      'bg-white dark:bg-slate-900',
                      'hover:shadow-xl hover:shadow-blue-500/10',
                      'hover:border-blue-300 dark:hover:border-blue-700',
                      'hover:-translate-y-1',
                      'active:scale-[0.98]',
                    )}
                  >
                    <CardHeader className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={cn(
                            'flex-shrink-0 p-3 rounded-xl',
                            'bg-blue-50 dark:bg-blue-900/30',
                            'transition-all duration-300',
                            'group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50',
                            'group-hover:scale-110',
                          )}
                        >
                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <CardTitle
                            className={cn(
                              'text-lg font-semibold mb-2',
                              'text-slate-900 dark:text-slate-100',
                              'transition-colors duration-300',
                              'group-hover:text-blue-700 dark:group-hover:text-blue-400',
                            )}
                          >
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {service.description}
                          </CardDescription>
                        </div>
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
      </div>
    </section>
  );
}
