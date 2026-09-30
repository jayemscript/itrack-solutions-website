import axios from "@/configs/axios-client";
import { handleRequest } from "@/configs/api.helper";
import {
  ICreateServiceCatalog,
  IServiceCatalogImage,
  IUpdateServiceCatalogImage,
  IUpdateServiceCatalog,
  TCommandResponse,
  TServiceImageResponse,
  TServiceImagesResponse,
  TGetAllPaginatedResponse,
} from "@/interfaces/services";
import { GetAllPaginatedParams } from "@/interfaces/common";
import { SERVICES_BASEURL, SERVICES_ENDPOINT } from "@/configs/services";

export async function GetAllServicesCatalogs(
  params: GetAllPaginatedParams,
): Promise<TGetAllPaginatedResponse> {
  return handleRequest(
    axios.get(`${SERVICES_BASEURL}${SERVICES_ENDPOINT.PAGINATED}`, {
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

export async function CreateService(
  payload: ICreateServiceCatalog,
): Promise<TCommandResponse> {
  return handleRequest(
    axios.post(`${SERVICES_BASEURL}${SERVICES_ENDPOINT.CREATE}`, payload, {
      public: true,
    }),
  );
}

export async function UpdateService(
  id: string,
  payload: IUpdateServiceCatalog,
) {
  return handleRequest(
    axios.patch(
      `${SERVICES_BASEURL}${SERVICES_ENDPOINT.UPDATE}/${id}`,
      payload,
      {
        public: true,
      },
    ),
  );
}

export async function GetServiceImages(
  catalogId: string,
): Promise<TServiceImagesResponse> {
  return handleRequest(
    axios.get(`${SERVICES_BASEURL}${SERVICES_ENDPOINT.IMAGES(catalogId)}`, {
      public: true,
    }),
  );
}

export async function UploadServiceImage(
  catalogId: string,
  file: File,
): Promise<TServiceImageResponse> {
  const formData = new FormData();
  formData.append("file", file);
  return handleRequest(
    axios.post(
      `${SERVICES_BASEURL}${SERVICES_ENDPOINT.IMAGES(catalogId)}`,
      formData,
      { public: true },
    ),
  );
}

export async function UpdateServiceImage(
  catalogId: string,
  imageId: string,
  payload: IUpdateServiceCatalogImage,
): Promise<TServiceImageResponse> {
  return handleRequest(
    axios.patch(
      `${SERVICES_BASEURL}${SERVICES_ENDPOINT.IMAGE(catalogId, imageId)}`,
      payload,
      { public: true },
    ),
  );
}

export async function DeleteServiceImage(catalogId: string, imageId: string) {
  return handleRequest(
    axios.delete(
      `${SERVICES_BASEURL}${SERVICES_ENDPOINT.IMAGE(catalogId, imageId)}`,
      { public: true },
    ),
  );
}
