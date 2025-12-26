// app/page.tsx
import type { Metadata } from 'next';
import HomePageContent from '@/components/pages/home-page-contents/home-page.content';
import PublicRouteLayout from '@/app/(public)/layout';

export const metadata: Metadata = {
  title: 'Home | E-Services',
  description: 'Welcome to Barangay Luntian E-Services',
};

export default async function Home() {
  return (
    <PublicRouteLayout>
      <HomePageContent />
    </PublicRouteLayout>
  );
}
