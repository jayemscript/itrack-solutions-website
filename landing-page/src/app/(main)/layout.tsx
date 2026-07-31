//src/app(public)/layout.tsx

"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function PublicRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {/* <div className="flex h-[100vh]"> */}
      <div className="flex min-h-screen scroll-smooth">
        {/* Main Content */}
        <div className="flex min-w-0 max-w-full flex-1 flex-col overflow-x-clip">
          <div className="min-w-0 max-w-full flex-1">
            <div className={`sticky z-50 ${isScrolled ? "top-3" : "top-0"}`}>
              <Header isScrolled={isScrolled} />
            </div>
            <div className="">{children}</div>
            <Footer />
            <button
              type="button"
              aria-label="Scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`fixed right-5 bottom-5 z-60 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-all duration-300 hover:-translate-y-1 ${isScrolled ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
