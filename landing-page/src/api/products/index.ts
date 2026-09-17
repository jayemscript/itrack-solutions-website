import axios from "@/configs/axios-client";
import { handleRequest } from "@/configs/api.helper";
import {
  ICreateProductCatalog,
  IProductCatalogImage,
  IUpdateProductCatalogImage,
  IUpdateProductCatalog,
  TCommandResponse,
  TProductImageResponse,
  TProductImagesResponse,
  TGetAllPaginatedResponse,
} from "@/interfaces/products";
import { GetAllPaginatedParams } from "@/interfaces/common";
import { PRODUCTS_BASEURL, PRODUCTS_ENDPOINT } from "@/configs/products";

export async function GetAllProductsCatalogs(
  params: GetAllPaginatedParams,
): Promise<TGetAllPaginatedResponse> {
  return handleRequest(
    axios.get(`${PRODUCTS_BASEURL}${PRODUCTS_ENDPOINT.PAGINATED}`, {
      params: {
        page: params.page,
        limit: params.limit,
        keyword: params.keyword,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        filters: params.filters ? JSON.stringify(params.filters) : undefined,
      },
      public: true,
    }),
  );
}

export async function CreateProduct(
  payload: ICreateProductCatalog,
): Promise<TCommandResponse> {
  return handleRequest(
    axios.post(`${PRODUCTS_BASEURL}${PRODUCTS_ENDPOINT.CREATE}`, payload, {
      public: true,
    }),
  );
}

export async function UpdateProduct(
  id: string,
  payload: IUpdateProductCatalog,
) {
  return handleRequest<TCommandResponse>(
    axios.patch(
      `${PRODUCTS_BASEURL}${PRODUCTS_ENDPOINT.UPDATE}/${id}`,
      payload,
      {
        public: true,
      },
    ),
  );
}

export async function GetProductImages(
  catalogId: string,
): Promise<TProductImagesResponse> {
  return handleRequest(
    axios.get(`${PRODUCTS_BASEURL}${PRODUCTS_ENDPOINT.IMAGES(catalogId)}`, {
      public: true,
    }),
  );
}

export async function UploadProductImage(
  catalogId: string,
  file: File,
): Promise<TProductImageResponse> {
  const formData = new FormData();
  formData.append("file", file);
  return handleRequest(
    axios.post(
      `${PRODUCTS_BASEURL}${PRODUCTS_ENDPOINT.IMAGES(catalogId)}`,
      formData,
      { public: true },
    ),
  );
}

export async function UpdateProductImage(
  catalogId: string,
  imageId: string,
  payload: IUpdateProductCatalogImage,
): Promise<TProductImageResponse> {
  return handleRequest(
    axios.patch(
      `${PRODUCTS_BASEURL}${PRODUCTS_ENDPOINT.IMAGE(catalogId, imageId)}`,
      payload,
      { public: true },
    ),
  );
}

export async function DeleteProductImage(
  catalogId: string,
  imageId: string,
) {
  return handleRequest(
    axios.delete(
      `${PRODUCTS_BASEURL}${PRODUCTS_ENDPOINT.IMAGE(catalogId, imageId)}`,
      { public: true },
    ),
  );
}
