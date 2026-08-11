import type { Metadata } from 'next';
import { ConsultationServicePage} from '@/components/services';

export const metadata: Metadata = {
  title: "Consultation Services| Itrack Solutions",
  description: "Consultation Services.",
};

export default function ConsultationPage() {
  return (
    <div>
      <ConsultationServicePage />
    </div>
  );
}
