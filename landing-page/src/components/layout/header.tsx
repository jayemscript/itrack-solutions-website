'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import HeaderNavDesktop from './header-nav-desktop';
import HeaderNavMobile from './header-nav-mobile';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-primary dark:bg-primary shadow-md border-b border-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
          >
            <Image
              src="/images/itrack-logo.jpg"
              alt="Itrack Solutions logo"
              width={40}
              height={40}
              className="rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
              priority
            />
            <div className="flex flex-col">
              <span className="text-primary-foreground font-bold text-base leading-tight">
                Itrack
              </span>
              <span className="text-primary-foreground/90 text-xs font-medium">
                Solutions
              </span>
            </div>
          </Link>
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <HeaderNavDesktop />
          </div>
          <div className="flex items-center space-x-3">
            {/* CTA Button Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link href="/contact">
                <Button
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/95 font-semibold"
                  size="sm"
                >
                  Get In Touch
                </Button>
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden pb-4 overflow-hidden"
            >
              <div className="border-t border-primary-foreground/20 mt-3 pt-4 space-y-2">
                <HeaderNavMobile onNavigate={() => setIsOpen(false)} />
                <div className="flex flex-col items-stretch space-y-2 px-2 pt-4 border-t border-primary-foreground/20">
                  <Link href="/contact" className="w-full">
                    <Button
                      className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
                      size="sm"
                    >
                      Get In Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
