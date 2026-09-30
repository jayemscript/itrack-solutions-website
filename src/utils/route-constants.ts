// src/utils/route-constants.ts
export const publicRoutes = ['/'];

export const privateRoutes = [
  '/employee',
  '/asset',
  '/inventory',
  '/admin',
  '/monitor',
  '/management',
  '/dashboard',
  '/profile',
  '/account',
  '/search',
  '/system',
];

export const routesByCategory = {
  admin: [
    {
      label: 'Admin - Users',
      value: '/admin?tab=users',
    },
    {
      label: 'Admin - Roles',
      value: '/admin?tab=roles',
    },
    {
      label: 'Admin - Permissions',
      value: '/admin?tab=permissions',
    },
    {
      label: 'Admin - Registry',
      value: '/admin?tab=registry',
    },
    {
      label: 'Admin - System Audit Logs',
      value: '/admin?tab=audits_logs',
    },
  ],
  reports: [
    {
      label: 'Reports - Complaint Summary',
      value: '/reports?tab=complaint-summary',
    },
    {
      label: 'Reports - Complaint Status',
      value: '/reports?tab=complaint-status',
    },
    {
      label: 'Reports - Complaint Category',
      value: '/reports?tab=complaint-category',
    },
    {
      label: 'Reports - Complaint Resolution',
      value: '/reports?tab=complaint-resolution',
    },
  ],
  monitoring: [
    {
      label: 'Monitoring - Complaints & Requests',
      value: '/monitoring?tab=complaints-requests',
    },
    {
      label: 'Monitoring - Permits & Clearances',
      value: '/monitoring?tab=permits-clearances',
    },
    {
      label: 'Monitoring - Assistance & Benefits',
      value: '/monitoring?tab=assistance-benefits',
    },
    {
      label: 'Monitoring - Community Activities',
      value: '/monitoring?tab=community-activities',
    },
  ],

  analytics: [
    {
      label: 'Analytics - Service Utilization',
      value: '/analytics?tab=service-utilization',
    },
    {
      label: 'Analytics - Complaints & Requests Trends',
      value: '/analytics?tab=complaints-trends',
    },
    {
      label: 'Analytics - Permits & Clearances Insights',
      value: '/analytics?tab=permits-insights',
    },
    {
      label: 'Analytics - Assistance & Benefits Metrics',
      value: '/analytics?tab=assistance-metrics',
    },
  ],

  management: [
    {
      label: 'E-Services Management - Certificate of Indigency',
      value: '/management?tab=certificate-of-indigency',
    },
    {
      label: 'E-Services Management - Barangay Clearance',
      value: '/management?tab=barangay-clearance',
    },
    {
      label: 'E-Services Management - Certificate of Residency',
      value: '/management?tab=certificate-of-residency',
    },
    {
      label: 'E-Services Management - Community Tax Certificate',
      value: '/management?tab=certificate-of-community-tax',
    },
    {
      label: 'E-Services Management - Business Permit',
      value: '/management?tab=business-permit',
    },
    {
      label: 'E-Services Management - Certificate of Complaint',
      value: '/management?tab=certificate-complaint',
    },
    {
      label: 'E-Services Management - Building Permit',
      value: '/management?tab=building-permit',
    },
    {
      label: 'E-Services Management - Good Moral Certificate',
      value: '/management?tab=certificate-of-good-moral',
    },
  ],

  // Add more categories as needed
};

// Helper to get routes for a specific category
export const getRoutesByCategory = (
  category: keyof typeof routesByCategory,
) => {
  return routesByCategory[category] || [];
};

// Helper to get all route values (for default selection)
export const getAllRouteValues = () => {
  return Object.values(routesByCategory)
    .flat()
    .map((r) => r.value);
};

// Type for route items
export type RouteItem = {
  label: string;
  value: string;
};

// Type for category keys
export type RouteCategory = keyof typeof routesByCategory;
