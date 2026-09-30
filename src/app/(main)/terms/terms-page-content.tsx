'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertCircle, Scale, Zap } from 'lucide-react';

export default function TermsPageContent() {
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
      icon: BookOpen,
      title: '1. Acceptance of Terms',
      content:
        'By accessing and using Itrack Solutions website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      icon: Scale,
      title: '2. Use License',
      content:
        'Permission is granted to temporarily download one copy of the materials (information or software) on Itrack Solutions website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:',
      bullets: [
        'Modify or copy the materials',
        'Use the materials for any commercial purpose or for any public display',
        'Attempt to decompile or reverse engineer any software contained on Itrack Solutions website',
        'Remove any copyright or other proprietary notations from the materials',
        'Transfer the materials to another person or "mirror" the materials on any other server',
      ],
    },
    {
      icon: AlertCircle,
      title: '3. Disclaimer',
      content:
        'The materials on Itrack Solutions website are provided on an "as is" basis. Itrack Solutions makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    },
    {
      icon: Zap,
      title: '4. Limitations',
      content:
        'In no event shall Itrack Solutions or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Itrack Solutions website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.',
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
              Terms & Conditions
            </h1>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              Please read these terms and conditions carefully before using our
              website and services. Your use of our website constitutes your
              agreement to these terms.
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
                  <p className="leading-relaxed pl-16">{section.content}</p>
                  {section.bullets && (
                    <ul className="space-y-2 pl-16">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
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
              <h2 className="text-2xl font-semibold">
                5. Accuracy of Materials
              </h2>
              <p className="leading-relaxed">
                The materials appearing on Itrack Solutions website could
                include technical, typographical, or photographic errors. Itrack
                Solutions does not warrant that any of the materials on the
                website are accurate, complete, or current. Itrack Solutions may
                make changes to the materials contained on the website at any
                time without notice.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">6. Links</h2>
              <p className="leading-relaxed">
                Itrack Solutions has not reviewed all of the sites linked to its
                website and is not responsible for the contents of any such
                linked site. The inclusion of any link does not imply
                endorsement by Itrack Solutions of the site. Use of any such
                linked website is at the user's own risk.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">7. Modifications</h2>
              <p className="leading-relaxed">
                Itrack Solutions may revise these terms of service for the
                website at any time without notice. By using this website, you
                are agreeing to be bound by the then current version of these
                terms of service.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">8. Governing Law</h2>
              <p className="leading-relaxed">
                These terms and conditions are governed by and construed in
                accordance with the laws of the jurisdiction in which Itrack
                Solutions operates, and you irrevocably submit to the exclusive
                jurisdiction of the courts in that location.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">
                9. Intellectual Property Rights
              </h2>
              <p className="leading-relaxed">
                All content on Itrack Solutions website, including text,
                graphics, logos, images, and software, is the property of Itrack
                Solutions or its content suppliers and is protected by
                international copyright laws. Unauthorized use of any materials
                is prohibited.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">10. User Obligations</h2>
              <p className="leading-relaxed mb-4">You agree not to:</p>
              <ul className="space-y-2 pl-6">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Use the website for unlawful purposes or to solicit others
                    to commit unlawful acts
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Harass, abuse, or threaten other users or service providers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Attempt to gain unauthorized access to our systems or
                    networks
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>Transmit viruses, worms, or other malicious code</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 rounded-lg border border-border"
            >
              <p className="text-sm text-muted-foreground">
                For questions regarding these Terms & Conditions, please contact
                us at{' '}
                <span className="font-semibold">legal@itracksolutions.com</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
