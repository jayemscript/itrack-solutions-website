import { BasePaginationResponse, CommonResponse } from "../common";
import { IServiceCatalogImage, IServicesCatalogs } from "./data";

export interface IGetAllPaginatedService extends BasePaginationResponse<IServicesCatalogs> {
  services_catalogs: IServicesCatalogs[];
}

export type TGetAllPaginatedResponse = CommonResponse<IGetAllPaginatedService>;

export type TCommandResponse = CommonResponse<IServicesCatalogs>;
export type TServiceImageResponse = CommonResponse<IServiceCatalogImage>;
export type TServiceImagesResponse = CommonResponse<IServiceCatalogImage[]>;
