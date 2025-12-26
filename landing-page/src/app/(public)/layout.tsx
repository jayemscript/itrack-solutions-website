//src/app(public)/layout.tsx

'use client';

import Header from '@/components/navigation/public_navs/header';
import Footer from '@/components/navigation/public_navs/footer';

export default function PublicRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <div className="flex h-[100vh]"> */}
      <div className="flex min-h-screen scroll-smooth">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="sticky top-0 z-20">
            <Header />
          </div>

          <div className="flex-1 overflow-auto">
            <div className="">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
