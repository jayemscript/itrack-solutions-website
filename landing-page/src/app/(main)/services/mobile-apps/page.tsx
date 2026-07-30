import type { Metadata } from 'next';
import ServicesPageMobileApps from '../components/services-page-mobile-apps';

export const metadata: Metadata = {
  title: 'Mobile Apps | Itrack Solutions',
  description:
    'Innovative mobile applications designed to enhance user engagement and streamline business operations. Discover Innovative mobile applications designed to enhance user engagement and streamline business operations. Discover our mobile app solutions tailored to your needs.',
};

export default function MobileApps() {
  return (
    <div>
      <ServicesPageMobileApps />
    </div>
  );
}
