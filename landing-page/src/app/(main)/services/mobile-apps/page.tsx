import type { Metadata } from 'next';
import { MobileAppsPage} from '@/components/services';

export const metadata: Metadata = {
  title: 'Mobile Apps | Itrack Solutions',
  description:
    'Innovative mobile applications designed to enhance user engagement and streamline business operations. Discover Innovative mobile applications designed to enhance user engagement and streamline business operations. Discover our mobile app solutions tailored to your needs.',
};

export default function MobileApps() {
  return (
    <div>
      <MobileAppsPage />
    </div>
  );
}
