// app/page.tsx
import type { Metadata } from 'next';
import HomePageContent from '@/components/pages/home-page-contents/home-page.content';
import PublicRouteLayout from '@/app/(main)/layout';

export const metadata: Metadata = {
  title: 'Home | Itrack Solutions - IT Solutions & Products',
  description: 'Welcome to Itrack Solutions - Your Partner in IT Solutions and Products',
};

export default async function Home() {
  return (
    <PublicRouteLayout>
      <HomePageContent />
    </PublicRouteLayout>
  );
}
