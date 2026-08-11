import type { Metadata } from 'next';
import { SupportMaintenanceServicePage} from '@/components/services';

export const metadata: Metadata = {
  title: "Support and Maintenance Services | Itrack Solutions",
  description: "Support and Maintenance",
};

export default function SupportAndMaintenancePage() {
  return (
    <div>
      <SupportMaintenanceServicePage />
    </div>
  );
}
