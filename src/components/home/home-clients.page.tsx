"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const clients = [
  { name: "AirAsia", image: "/images/air-asia-logo.png" },
  { name: "Analog Devices", image: "/images/analog-devices-logo.png" },
  { name: "Bangko Sentral ng Pilipinas", image: "/images/bsp-logo.png" },
  { name: "Cantier", image: "/images/cantier-logo.png" },
  { name: "DB Schenker", image: "/images/db-schenker-logo.png" },
  { name: "Golden ABC", image: "/images/golden_abc_logo.png" },
  { name: "LBC", image: "/images/lbc-logo.jpg" },
  { name: "Moldex", image: "/images/moldex-logo.png" },
  { name: "Nexem", image: "/images/nexem.png" },
  { name: "Teleperformance", image: "/images/teleperformance-logo.png" },
  { name: "AP Cargo", image: "/images/apcargo-main-logo.png" },
];

export function HomeClientsPage() {
  const [api, setApi] = useState<CarouselApi>();
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (!api || hasFocus) return;

    const interval = window.setInterval(() => api.scrollNext(), 1000);
    return () => window.clearInterval(interval);
  }, [api, hasFocus]);

  return (
    <section
      aria-labelledby="home-clients-heading"
      className="border-y border-border bg-muted/30 py-14 sm:py-16"
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHasFocus(false);
        }
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-secondary">
            OUR CLIENTS
          </p>
          <h2
            id="home-clients-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            Trusted by leading organizations
          </h2>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true, slidesToScroll: 1 }}
          className="mx-10"
          aria-label="Client organizations"
        >
          <CarouselContent>
            {clients.map((client) => (
              <CarouselItem
                key={client.name}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/5"
              >
                <div className="flex h-24 items-center justify-center rounded-xl border border-border bg-card px-5 py-4">
                  <div className="relative h-14 w-full">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      sizes="(min-width: 1024px) 180px, (min-width: 640px) 160px, 45vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            aria-label="Previous clients"
            className="-left-10 z-10"
          />
          <CarouselNext aria-label="Next clients" className="-right-10 z-10" />
        </Carousel>
      </div>
    </section>
  );
}
