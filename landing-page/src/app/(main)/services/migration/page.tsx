import type { Metadata } from 'next';
import { MigrationServicePage} from '@/components/services';

export const metadata: Metadata = {
  title: "Migration Services| Itrack Solutions",
  description: "Migration Services.",
};

export default function MigrationPage() {
  return (
    <div>
      <MigrationServicePage />
    </div>
  );
}
