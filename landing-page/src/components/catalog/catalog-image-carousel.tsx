"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { API_BASE_URL } from "@/configs/domain-config";
import { PRODUCTS_BASEURL, PRODUCTS_ENDPOINT } from "@/configs/products";
import { SERVICES_BASEURL, SERVICES_ENDPOINT } from "@/configs/services";
import type { IProductCatalogImage } from "@/interfaces/products";
import type { IServiceCatalogImage } from "@/interfaces/services";

type CatalogImage = IProductCatalogImage | IServiceCatalogImage;

export function CatalogImageCarousel({
  catalogId,
  images = [],
  kind,
  alt,
  compact = false,
}: {
  catalogId: string;
  images?: CatalogImage[];
  kind: "product" | "service";
  alt: string;
  compact?: boolean;
}) {
  const orderedImages = [...images].sort((a, b) =>
    a.isPrimary !== b.isPrimary
      ? a.isPrimary
        ? -1
        : 1
      : a.sortOrder - b.sortOrder,
  );
  const [current, setCurrent] = useState(0);

  if (!orderedImages.length) {
    return (
      <div
        className={`${compact ? "h-36" : "h-72"} flex items-center justify-center rounded-xl bg-muted`}
        aria-label="No catalog image available"
      >
        <ImageOff className="h-8 w-8 text-muted-foreground/50" />
      </div>
    );
  }

  const image = orderedImages[current] ?? orderedImages[0];
  const imageUrl =
    kind === "product"
      ? `${API_BASE_URL}${PRODUCTS_BASEURL}${PRODUCTS_ENDPOINT.IMAGE_FILE(catalogId, image.id)}`
      : `${API_BASE_URL}${SERVICES_BASEURL}${SERVICES_ENDPOINT.IMAGE_FILE(catalogId, image.id)}`;
  const move = (direction: number) =>
    setCurrent(
      (index) =>
        (index + direction + orderedImages.length) % orderedImages.length,
    );
  const controlClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-muted">
      <img
        src={imageUrl}
        alt={alt}
        className={`${compact ? "h-36" : "h-72"} w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
      />
      {orderedImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => { controlClick(event); move(-1); }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(event) => { controlClick(event); move(1); }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-background/75 px-2 py-1">
            {orderedImages.map((entry, index) => (
              <button
                key={entry.id}
                type="button"
                onClick={(event) => { controlClick(event); setCurrent(index); }}
                aria-label={`Show image ${index + 1}`}
                className={`h-1.5 w-1.5 rounded-full ${index === current ? "bg-primary" : "bg-muted-foreground/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
