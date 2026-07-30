'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Target,
  Heart,
  Users,
  Shield,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Ramil Peralta',
    title: 'Founder / Owner',
    image: '/images/team/ramil.jpg',
  },
  {
    name: 'Chris Peralta',
    title: 'Senior IT Manager',
    image: '/images/team/chris.jpg',
  },
  {
    name: 'Rhona Ceres Rosel',
    title: 'IT Manager',
    image: '/images/team/rhona.jpg',
  },
  {
    name: 'John Estel Peralta',
    title: 'Senior Full Stack Developer',
    image: '/images/team/john-estel.jpg',
  },
  {
    name: 'Carl Oring',
    title: 'Senior Full Stack Developer',
    image: '/images/team/carl.jpg',
  },
  {
    name: 'John Mark Pulmano',
    title: 'Junior Full Stack Developer',
    image: '/images/team/john-mark.jpg',
  },
  {
    name: 'Melfel Taccabban',
    title: 'Finance and HR',
    image: '/images/team/melfel.jpg',
  },
];

const coreValues = [
  {
    icon: Target,
    title: 'Customer Focus',
    description:
      'We prioritize our clients needs and deliver solutions that exceed expectations',
  },
  {
    icon: Heart,
    title: 'Excellence',
    description:
      'We maintain the highest standards in all our products and services',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in teamwork and building strong partnerships',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description:
      'We conduct business with honesty, transparency, and ethical practices',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We continuously innovate to stay ahead of technology trends',
  },
  {
    icon: Briefcase,
    title: 'Professionalism',
    description: 'We deliver professional solutions backed by expert knowledge',
  },
];

export default function AboutPageContent() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-card dark:from-background dark:to-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-700 dark:text-blue-400 mb-4">
              About Itrack Solutions
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Innovative IT solutions and industrial-grade products designed to
              transform your business operations and drive growth in the digital
              age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative w-full py-16 md:py-24 bg-card dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Our Mission
                </h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                To empower businesses with cutting-edge IT solutions and
                industrial-grade products that enhance operational efficiency,
                streamline processes, and drive sustainable growth. We are
                committed to delivering innovative, reliable, and cost-effective
                solutions that meet the evolving needs of our clients.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Our Vision
                </h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                To be the leading provider of innovative IT solutions and
                industrial products, recognized for our excellence, reliability,
                and customer-centric approach. We aspire to be the trusted
                partner for businesses transforming their operations through
                technology.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative w-full py-16 md:py-24 bg-background dark:bg-background border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The principles that guide our decisions and actions
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="p-6 rounded-xl bg-card dark:bg-slate-800 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow"
                  variants={itemVariants}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section
        id="team"
        className="relative w-full py-16 md:py-24 bg-card dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Expert professionals dedicated to delivering excellence and
              innovation
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                className="group text-center"
                variants={itemVariants}
              >
                {/* Avatar Placeholder */}
                <div className="relative mb-4 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-slate-100 dark:from-blue-900/30 dark:to-slate-800 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800 group-hover:border-blue-400 dark:group-hover:border-blue-600 transition-colors">
                  <div className="text-center">
                    <Users className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 opacity-50 mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Team Member
                    </p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {member.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative w-full py-16 md:py-24 bg-background dark:bg-background border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Itrack Solutions?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Here's what sets us apart from the competition
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                title: 'Expert Team',
                description:
                  'Experienced professionals with proven track records in IT solutions',
              },
              {
                title: 'Quality Products',
                description:
                  'Industrial-grade products built to withstand demanding business environments',
              },
              {
                title: 'Customer Support',
                description:
                  'Dedicated support team available to assist your business needs',
              },
              {
                title: 'Innovative Solutions',
                description:
                  'Cutting-edge technology solutions tailored to your requirements',
              },
              {
                title: 'Affordable Pricing',
                description:
                  'Premium solutions at competitive prices for all business sizes',
              },
              {
                title: 'Proven Results',
                description:
                  'Track record of successful implementations and satisfied clients',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-800 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our IT solutions and products can transform your
              business. Get in touch with our team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white hover:bg-blue-50 text-blue-600 font-semibold px-10 py-3 h-auto w-full sm:w-auto"
                >
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white hover:bg-blue-50 text-blue-600 font-semibold px-10 py-3 h-auto w-full sm:w-auto"
                >
                  Explore Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
