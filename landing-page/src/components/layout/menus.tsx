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
  RefreshCw,
  ClipboardList,
  LifeBuoy,
  Radio,
  Cpu,
  Printer,
  ScanLine,
  Network,
} from 'lucide-react';

// --- Submenu definitions for IT Solutions ---

const homeSubMenus = [
  {
    title: 'Features',
    href: '/?section=features',
    description: 'Key features of our solutions',
    icon: Zap,
  },
  {
    title: 'Why Choose Us',
    href: '/?section=why-us',
    description: 'What makes us different',
    icon: Shield,
  },
];

const servicesSubMenus = [
  {
    title: "All Services",
    href: "/services",
    description: "Explore all IT solutions",
    icon: Code2,
  },
  {
    title: "Custom Development",
    href: "/services/custom-development",
    description: "Tailored software solutions",
    icon: Code2,
  },
  {
    title: "Mobile Apps",
    href: "/services/mobile-apps",
    description: "Mobile App development",
    icon: Smartphone,
  },
  {
    title: "Legacy Migration",
    href: "/services/migration",
    description: "Modernize aging systems",
    icon: RefreshCw,
  },
  {
    title: "Consultation",
    href: "/services/consultation",
    description: "Project scoping & technical audits",
    icon: ClipboardList,
  },
  {
    title: "Support & Maintenance",
    href: "/services/support",
    description: "Ongoing fixes & monitoring",
    icon: LifeBuoy,
  },
];

const productSubMenus = [
  {
    title: "All Products",
    href: "/products",
    description:
      "We also offer various IT Products to cater to your business needs",
    icon: Briefcase,
  },
  {
    title: "Industrial Mobile Devices",
    href: "/products/industrial-mobile-devices",
    description: "Mobile devices for inventory management",
    icon: Smartphone,
  },
  {
    title: "RFID Stickers",
    href: "/products/rfid-stickers",
    description: "RFID tracking solutions",
    icon: Radio,
  },
  {
    title: "POS Hardware",
    href: "/products/pos-hardware",
    description: "Point of Sale hardware solutions",
    icon: Cpu,
  },
  {
    title: "Printers",
    href: "/products/printers",
    description: "Industrial grade printers",
    icon: Printer,
  },
  {
    title: "Barcode Scanners",
    href: "/products/barcode-scanners",
    description: "Scanning devices for retail and warehousing",
    icon: ScanLine,
  },
  {
    title: "Networking Equipment",
    href: "/products/networking-equipment",
    description:
      "Switches, access points, and cabling to keep everything online",
    icon: Network,
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
    href: '/about?section=team',
    description: 'Meet our experts',
    icon: Users,
  },
  {
    title: 'Our Values',
    href: '/about?section=values',
    description: 'What we believe in',
    icon: Shield,
  },
];

export { homeSubMenus, servicesSubMenus, productSubMenus, aboutSubMenus };
