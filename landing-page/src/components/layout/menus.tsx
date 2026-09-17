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
  Printer,
  ScanLine,
} from 'lucide-react';
import {
  PRODUCT_CATALOG_CODES,
  SERVICE_CATALOG_CODES,
} from '@/interfaces/constants/catalog';

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
    href: `/services/${SERVICE_CATALOG_CODES.CUSTOMIZE_SYSTEM}`,
    description: "Tailored software solutions",
    icon: Code2,
  },
  {
    title: "Mobile Apps",
    href: `/services/${SERVICE_CATALOG_CODES.MOBILE_APPS}`,
    description: "Mobile App development",
    icon: Smartphone,
  },
  {
    title: "Legacy Migration",
    href: `/services/${SERVICE_CATALOG_CODES.LEGACY_MIGRATION}`,
    description: "Modernize aging systems",
    icon: RefreshCw,
  },
  {
    title: "Consultation",
    href: `/services/${SERVICE_CATALOG_CODES.CONSULTATION}`,
    description: "Project scoping & technical audits",
    icon: ClipboardList,
  },
  {
    title: "Support & Maintenance",
    href: `/services/${SERVICE_CATALOG_CODES.SUPPORT_AND_MAINTENANCE}`,
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
    title: "Mobile Computers",
    href: `/products/${PRODUCT_CATALOG_CODES.MOBILE_COMPUTERS}`,
    description: "Mobile devices for inventory management",
    icon: Smartphone,
  },
  {
    title: "Barcode Scanners",
    href: `/products/${PRODUCT_CATALOG_CODES.BARCODE_SCANNERS}`,
    description: "Scanning devices for retail and warehousing",
    icon: ScanLine,
  },
  {
    title: "Barcode Printers",
    href: `/products/${PRODUCT_CATALOG_CODES.BARCODE_PRINTERS}`,
    description: "Industrial label printing solutions",
    icon: Printer,
  },
  {
    title: "ID Printers",
    href: `/products/${PRODUCT_CATALOG_CODES.ID_PRINTERS}`,
    description: "Professional ID card printing solutions",
    icon: Printer,
  },
  {
    title: "Security Cameras",
    href: `/products/${PRODUCT_CATALOG_CODES.SECURITY_CAMERAS}`,
    description: "Business security and monitoring solutions",
    icon: Shield,
  },
  {
    title: "Consumables",
    href: `/products/${PRODUCT_CATALOG_CODES.CONSUMABLES}`,
    description: "Labels, ribbons, receipt rolls, and supplies",
    icon: Briefcase,
  },
  {
    title: "RFID Readers & Tags",
    href: `/products/${PRODUCT_CATALOG_CODES.RFID_READERS_AND_TAGS}`,
    description: "RFID tracking solutions",
    icon: Radio,
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
