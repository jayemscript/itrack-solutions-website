"use client";

import React from "react";
import Image from "next/image";
import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { ThemeButtons } from "@/components/customs/theme-buttons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { name: "Custom Development", href: "/services/custom-development" },
    { name: "Mobile Apps", href: "/services/mobile-apps" },
  ];

  const resources = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Service Agreement", href: "/service-agreement" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/itracksolutions",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/company/itracksolutions",
      color: "hover:text-blue-700 dark:hover:text-blue-300",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/itracksolutions",
      color: "hover:text-sky-500 dark:hover:text-sky-400",
    },
  ];

  return (
    <footer className="bg-card dark:bg-card border-t border-border dark:border-border text-foreground dark:text-foreground transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/itrack-logo.jpg"
                alt="Itrack Solutions logo"
                width={48}
                height={48}
                className="rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-foreground font-semibold text-lg">
                  Itrack Solutions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Custom IT Solutions
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enterprise-grade IT solutions tailored to your business needs. We
              deliver scalable, secure, and innovative technology
              infrastructure.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 rounded-lg bg-muted dark:bg-muted flex items-center justify-center transition-all duration-300 ${social.color} hover:bg-accent dark:hover:bg-accent hover:scale-110`}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4 flex items-center">
              <span className="w-8 h-0.5 bg-primary mr-2"></span>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-muted mr-2 group-hover:bg-primary transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4 flex items-center">
              <span className="w-8 h-0.5 bg-primary mr-2"></span>
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-muted mr-2 group-hover:bg-primary transition-colors"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4 flex items-center">
              <span className="w-8 h-0.5 bg-primary mr-2"></span>
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Tandang Sora, Culiat Quezon City, Metro Manila,
                  Philippines
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+63 2 8123-4567"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +63 2 8123-4567
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:hello@itracksolutions.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  hello@itracksolutions.com
                </a>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-4 p-3 bg-muted dark:bg-muted rounded-lg border border-border dark:border-border">
              <p className="text-xs font-semibold text-foreground mb-1">
                Business Hours
              </p>
              <p className="text-xs text-muted-foreground">
                Mon - Fri: 9:00 AM - 6:00 PM
              </p>
              <p className="text-xs text-muted-foreground">EST (UTC -5)</p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="border-t border-border dark:border-border pt-8 mb-8">
          <h4 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-4 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            Our Location
          </h4>
          <div className="rounded-lg overflow-hidden shadow-lg border border-border dark:border-border h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1766714053096!6m8!1m7!1sVhAenbM1K-mivkyw5-X1Sw!2m2!1d14.67073227899277!2d121.049575157173!3f3.2906518014617063!4f-18.109464293259975!5f0.7820865974627469"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Itrack Solutions Location"
            ></iframe>
          </div>
        </div>

        {/* Resources Links */}
        <div className="border-t border-border dark:border-border pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {resources.map((resource) => (
              <a
                key={resource.name}
                href={resource.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {resource.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border dark:border-border bg-muted dark:bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p className="text-foreground">
                © {currentYear} Itrack Solutions. All rights reserved.
              </p>
              <p className="text-xs mt-1 text-muted-foreground">
                Building tomorrow's technology solutions today.
              </p>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Theme:</span>
              <ThemeButtons />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
