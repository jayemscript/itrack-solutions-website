import { BasePaginationResponse, CommonResponse } from "../common";
import { IProductCatalogImage, IProductCatalogs } from "./data";

export interface IGetAllPaginatedProducts extends BasePaginationResponse<IProductCatalogs> {
  product_catalogs: IProductCatalogs[];
}

export type TGetAllPaginatedResponse = CommonResponse<IGetAllPaginatedProducts>;

export type TCommandResponse = CommonResponse<IProductCatalogs>;
export type TProductImageResponse = CommonResponse<IProductCatalogImage>;
export type TProductImagesResponse = CommonResponse<IProductCatalogImage[]>;
