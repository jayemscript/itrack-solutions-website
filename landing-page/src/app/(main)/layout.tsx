// src/app(public)/layout.tsx

"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { DotField } from "@/components/backgrounds/dot-field";

export default function PublicRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="#A855F7"
          gradientTo="#B497CF"
          glowColor="#120F17"
    >
      <div className="flex min-h-screen flex-col">
        <div className="sticky top-0">
          <Header />
        </div>

        <div className="flex-1">
          <div>{children}</div>
          <Footer />
        </div>
      </div>
    </DotField>
  );
}
