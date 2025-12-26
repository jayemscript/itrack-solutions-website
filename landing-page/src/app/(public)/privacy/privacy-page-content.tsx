'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPageContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const sections = [
    {
      icon: FileText,
      title: '1. Information We Collect',
      content: [
        'Personal identification information (name, email, phone number, company name)',
        'Technical data (IP address, browser type, device information, usage patterns)',
        'Communication data (messages, inquiries, support tickets)',
        'Payment information (processed securely through third-party providers)',
        'Cookies and similar tracking technologies for site analytics and user experience',
      ],
    },
    {
      icon: Eye,
      title: '2. How We Use Your Information',
      content: [
        'Deliver and improve our IT solutions and services',
        'Process orders and provide customer support',
        'Send service updates, security alerts, and support messages',
        'Analyze usage patterns to enhance user experience',
        'Comply with legal obligations and protect against fraud',
        'Market new products and services (with your consent)',
      ],
    },
    {
      icon: Lock,
      title: '3. Data Security',
      content: [
        'We implement industry-standard encryption (SSL/TLS) for data in transit',
        'Sensitive data is encrypted at rest using AES-256 encryption',
        'Access to personal data is restricted to authorized personnel only',
        'Regular security audits and penetration testing are conducted',
        'We maintain compliance with GDPR, CCPA, and other data protection regulations',
        'Incident response procedures are in place for potential data breaches',
      ],
    },
    {
      icon: Shield,
      title: '4. Data Sharing & Third Parties',
      content: [
        'We do not sell your personal information to third parties',
        'Data may be shared with trusted partners only for service delivery',
        'Service providers are bound by confidentiality agreements',
        'We may disclose information when required by law or to protect rights',
        'International data transfers comply with appropriate safeguards',
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              At Itrack Solutions, we are committed to protecting your privacy
              and ensuring transparency about how we collect, use, and safeguard
              your personal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="relative w-full py-6 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            className="text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-semibold">Last Updated:</span> December 2024
          </motion.p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative w-full py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-semibold pt-1">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-3 pl-16">
                    {section.content.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-muted-foreground" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}

            {/* Additional Sections */}
            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">5. Your Rights</h2>
              <ul className="space-y-3 pl-6">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    <strong>Access:</strong> You have the right to request a
                    copy of your personal data
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    <strong>Correction:</strong> You can request corrections to
                    inaccurate information
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    <strong>Deletion:</strong> You may request deletion of your
                    data (subject to legal requirements)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    <strong>Opt-out:</strong> You can unsubscribe from marketing
                    communications at any time
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">6. Cookies & Tracking</h2>
              <p className="leading-relaxed">
                Our website uses cookies to enhance user experience and analyze
                traffic. You can control cookie settings through your browser.
                Essential cookies are necessary for site functionality, while
                analytics cookies help us improve our services.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">7. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal information only as long as necessary to
                provide our services or comply with legal obligations.
                Typically, data is retained for 3-7 years after the relationship
                ends, unless longer retention is required by law.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">8. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this privacy policy or wish to
                exercise your data rights, please contact our Privacy Officer at{' '}
                <span className="font-semibold">
                  privacy@itracksolutions.com
                </span>
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 rounded-lg border border-border"
            >
              <p className="text-sm text-muted-foreground">
                This privacy policy is subject to change. We recommend reviewing
                it periodically for updates. Continued use of our services
                constitutes acceptance of this policy.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
