import {
  Home,
  Code2,
  Zap,
  Info,
  Briefcase,
  Users,
  Shield,
  Cloud,
  Database,
  Lock,
  Smartphone,
  Settings,
} from 'lucide-react';

// --- Submenu definitions for IT Solutions ---

const homeSubMenus = [
  {
    title: 'Features',
    href: '/#features',
    description: 'Key features of our solutions',
    icon: Zap,
  },
  {
    title: 'Why Choose Us',
    href: '/#why-us',
    description: 'What makes us different',
    icon: Shield,
  },
];

const servicesSubMenus = [
  {
    title: 'All Services',
    href: '/services',
    description: 'Explore all IT solutions',
    icon: Code2,
  },
  {
    title: 'Custom Development',
    href: '/services/custom-development',
    description: 'Tailored software solutions',
    icon: Code2,
  },
  {
    title: 'Mobile Apps',
    href: '/services/mobile-apps',
    description: 'Mobile App development',
    icon: Smartphone,
  },
];

const productSubMenus = [
  {
    title: 'All Products',
    href: '/products',
    description:
      'We also offer various IT Products to cater to your business needs',
    icon: Briefcase,
  },
  {
    title: 'Industrial Mobile Devices',
    href: '/products/industrial-mobile-devices',
    description: 'Mobile devices for inventory management',
    icon: Smartphone,
  },
  {
    title: 'RFID Stickers',
    href: '/products/rfid-stickers',
    description: 'RFID tracking solutions',
    icon: Code2,
  },
  {
    title: 'Printers',
    href: '/products/printers',
    description: 'Industrial grade printers',
    icon: Settings,
  },
  {
    title: 'POS Hardware',
    href: '/products/pos-hardware',
    description: 'Point of Sale hardware solutions',
    icon: Briefcase,
  },
];

const aboutSubMenus = [
  {
    title: 'About Us',
    href: '/about',
    description: 'Learn about Itrack Solutions',
    icon: Info,
  },
  {
    title: 'Our Team',
    href: '/about#team',
    description: 'Meet our experts',
    icon: Users,
  },
  {
    title: 'Our Values',
    href: '/about#values',
    description: 'What we believe in',
    icon: Shield,
  },
];

export { homeSubMenus, servicesSubMenus, productSubMenus, aboutSubMenus };
