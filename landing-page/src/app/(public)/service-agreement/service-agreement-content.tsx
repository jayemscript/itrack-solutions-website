'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Handshake,
  Clock,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Shield,
} from 'lucide-react';

export default function ServiceAgreementContent() {
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
      icon: Handshake,
      title: '1. Scope of Services',
      content:
        'Itrack Solutions agrees to provide IT consulting, software development, system integration, and support services as outlined in the specific Statement of Work (SOW) or project specification provided to the Client. Services shall be performed in a professional manner consistent with industry standards and best practices.',
    },
    {
      icon: CheckCircle2,
      title: '2. Deliverables & Timeline',
      content:
        'All project deliverables, timelines, and milestones are detailed in the SOW. Itrack Solutions will make reasonable efforts to meet agreed-upon deadlines. Extensions may be granted if delays result from Client-requested changes, unavailable resources, or unforeseen circumstances beyond reasonable control.',
    },
    {
      icon: DollarSign,
      title: '3. Payment Terms',
      content:
        'Fees for services are outlined in the SOW or quotation. Payment is due within 30 days of invoice issuance unless otherwise specified. Late payments may incur a monthly interest charge of 1.5%. Expenses such as travel, software licenses, and third-party tools will be billed separately with prior approval.',
    },
    {
      icon: Clock,
      title: '4. Service Level Agreement (SLA)',
      content:
        'Itrack Solutions commits to 99% uptime for hosted services (measured monthly). Support response times vary by severity: Critical (1 hour), High (4 hours), Medium (8 hours), Low (24 hours). SLA excludes scheduled maintenance and client-caused downtime.',
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
              Service Agreement
            </h1>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              This Service Agreement outlines the terms, conditions, and
              expectations for all IT solutions and services provided by Itrack
              Solutions to our clients.
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
            <span className="font-semibold">Last Updated:</span> December 2024 |{' '}
            <span className="font-semibold">Effective Date:</span> Upon
            Execution
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
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold pt-1">
                  5. Confidentiality & IP Rights
                </h2>
              </div>
              <div className="space-y-4 pl-16">
                <div>
                  <h3 className="font-semibold mb-2">Confidentiality:</h3>
                  <p className="leading-relaxed">
                    Both parties agree to maintain confidentiality of
                    proprietary information shared during the engagement. This
                    obligation continues for 3 years after project completion or
                    contract termination.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Intellectual Property:</h3>
                  <p className="leading-relaxed">
                    Custom deliverables developed under this agreement are owned
                    by the Client upon full payment. Pre-existing tools,
                    frameworks, and methodologies remain the property of Itrack
                    Solutions and may be reused in other projects.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">
                6. Client Responsibilities
              </h2>
              <ul className="space-y-3 pl-6">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Provide timely feedback, approvals, and necessary
                    documentation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Designate a primary contact for project communications
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Ensure access to required systems, data, and infrastructure
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Comply with security protocols and data protection
                    requirements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Maintain proper backups and disaster recovery procedures
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
              <h2 className="text-2xl font-semibold">
                7. Support & Maintenance
              </h2>
              <p className="leading-relaxed mb-4">
                After project delivery, Itrack Solutions offers optional support
                and maintenance packages including:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    <strong>24/7 Emergency Support:</strong> For critical issues
                    affecting operations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    <strong>Regular Maintenance:</strong> Scheduled updates,
                    patches, and optimization
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    <strong>Performance Monitoring:</strong> Continuous system
                    health checks and reporting
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
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg flex-shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold pt-1">
                  8. Limitation of Liability
                </h2>
              </div>
              <p className="leading-relaxed pl-16">
                Except for data breach or breach of confidentiality, Itrack
                Solutions' total liability shall not exceed the fees paid in the
                12 months preceding the claim. In no event shall either party be
                liable for indirect, incidental, consequential, or punitive
                damages, including loss of profits or revenue.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">9. Term & Termination</h2>
              <p className="leading-relaxed mb-4">
                This agreement begins on the Effective Date and continues until
                project completion or as mutually agreed. Either party may
                terminate with 30 days written notice. Upon termination:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Itrack Solutions will deliver all completed work and
                    documentation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Client is responsible for payment of all services rendered
                    to date
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                  <span>Confidentiality obligations remain in effect</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">10. Dispute Resolution</h2>
              <p className="leading-relaxed">
                Any disputes arising from this agreement shall first be
                addressed through good-faith negotiation between the parties'
                representatives. If unresolved after 30 days, disputes may be
                submitted to mediation or arbitration as per applicable laws.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 rounded-lg border border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">
                For inquiries or clarifications regarding this Service
                Agreement, please contact:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  contracts@itracksolutions.com
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> +1 (555)
                  123-4567
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
