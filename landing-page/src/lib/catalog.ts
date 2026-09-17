import { GetAllProductsCatalogs } from "@/api/products";
import { GetAllServicesCatalogs } from "@/api/services";
import type { GetAllPaginatedParams } from "@/interfaces/common";
import type { IProductCatalogs, TGetAllPaginatedResponse as TProductResponse } from "@/interfaces/products";
import type { IServicesCatalogs, TGetAllPaginatedResponse as TServiceResponse } from "@/interfaces/services";
import { PRODUCTS_CATEGORY, SERVICES_CATEGORY } from "@/interfaces/constants/catalog";

export const CATALOG_PAGE_SIZE = 10;
export type ProductCategory = (typeof PRODUCTS_CATEGORY)[number];
export type ServiceCategory = (typeof SERVICES_CATEGORY)[number];

export function isProductCategory(value: string): value is ProductCategory {
  return PRODUCTS_CATEGORY.includes(value as ProductCategory);
}

export function isServiceCategory(value: string): value is ServiceCategory {
  return SERVICES_CATEGORY.includes(value as ServiceCategory);
}

function catalogSlug(value: string): string {
  return value.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export interface CatalogPage<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

function normalizePage<T>(
  data: Record<string, unknown> | null | undefined,
  key: string,
): CatalogPage<T> | null {
  if (!data || !Array.isArray(data[key])) return null;

  return {
    items: data[key] as T[],
    totalItems: Number(data.totalItems ?? data[key].length),
    totalPages: Number(data.totalPages ?? 1),
    currentPage: Number(data.currentPage ?? 1),
  };
}

export async function getProductCatalogPage(
  params: GetAllPaginatedParams = { page: 1, limit: CATALOG_PAGE_SIZE },
): Promise<CatalogPage<IProductCatalogs> | null> {
  try {
    const response: TProductResponse = await GetAllProductsCatalogs({
      page: params.page ?? 1,
      limit: params.limit ?? CATALOG_PAGE_SIZE,
      keyword: params.keyword,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      filters: params.filters,
    });
    return normalizePage<IProductCatalogs>(response.data, "product_catalogs");
  } catch {
    return null;
  }
}

export async function getServiceCatalogPage(
  params: GetAllPaginatedParams = { page: 1, limit: CATALOG_PAGE_SIZE },
): Promise<CatalogPage<IServicesCatalogs> | null> {
  try {
    const response: TServiceResponse = await GetAllServicesCatalogs({
      page: params.page ?? 1,
      limit: params.limit ?? CATALOG_PAGE_SIZE,
      keyword: params.keyword,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
      filters: params.filters,
    });
    return normalizePage<IServicesCatalogs>(response.data, "services_catalogs");
  } catch {
    return null;
  }
}

export async function getProductCatalogByCode(code: string) {
  const page = await getProductCatalogPage({ page: 1, limit: 100 });
  const item = page?.items.find((entry) => entry.code === code || catalogSlug(entry.name) === code || catalogSlug(entry.category) === code) ?? null;
  if (!item) return null;
  return {
    item,
    relatedItems: page?.items.filter((entry) => entry.category === item.category) ?? [],
  };
}

export async function getServiceCatalogByCode(code: string) {
  const page = await getServiceCatalogPage({ page: 1, limit: 100 });
  const item = page?.items.find((entry) => entry.code === code || catalogSlug(entry.name) === code || catalogSlug(entry.category) === code) ?? null;
  if (!item) return null;
  return {
    item,
    relatedItems: page?.items.filter((entry) => entry.category === item.category) ?? [],
  };
}
