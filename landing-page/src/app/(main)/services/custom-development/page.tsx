import type { Metadata } from 'next';
import ServicesPageCustomDevelopment from '../components/services-page-custom-development';

export const metadata: Metadata = {
  title: 'Custom Development | Itrack Solutions',
  description:
    'Tailored software solutions designed to meet your specific business needs and challenges.',
};

export default function CustomDevelopment() {
  return (
    <div>
      <ServicesPageCustomDevelopment />
    </div>
  );
}
