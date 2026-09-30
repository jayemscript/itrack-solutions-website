"use client";

import { useState } from "react";
import { GetAllProductsCatalogs } from "@/api/products";
import { GetAllServicesCatalogs } from "@/api/services";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { CatalogPage } from "@/lib/catalog";
import type { IProductCatalogs } from "@/interfaces/products";
import type { IServicesCatalogs } from "@/interfaces/services";

type CatalogItem = IProductCatalogs | IServicesCatalogs;

interface Props<T extends CatalogItem> {
  page: CatalogPage<T>;
  onPage: (page: CatalogPage<T>) => void;
  kind: "products" | "services";
}

export function CatalogPagination<T extends CatalogItem>({ page, onPage, kind }: Props<T>) {
  const [loading, setLoading] = useState(false);
  if (page.totalPages <= 1) return null;

  const loadPage = async (nextPage: number) => {
    if (loading || nextPage < 1 || nextPage > page.totalPages) return;
    setLoading(true);
    try {
      const response = kind === "products"
        ? await GetAllProductsCatalogs({ page: nextPage, limit: 10 })
        : await GetAllServicesCatalogs({ page: nextPage, limit: 10 });
      const data = response.data;
      const items = (kind === "products" ? data.product_catalogs : data.services_catalogs) as T[];
      onPage({
        items,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      });
    } catch {
      // Keep the current page visible when a later page cannot be loaded.
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#catalog"
            aria-disabled={page.currentPage === 1 || loading}
            onClick={(event) => { event.preventDefault(); void loadPage(page.currentPage - 1); }}
          />
        </PaginationItem>
        {Array.from({ length: page.totalPages }, (_, index) => index + 1).map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#catalog"
              isActive={number === page.currentPage}
              onClick={(event) => { event.preventDefault(); void loadPage(number); }}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#catalog"
            aria-disabled={page.currentPage === page.totalPages || loading}
            onClick={(event) => { event.preventDefault(); void loadPage(page.currentPage + 1); }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
