import { BaseFields } from "../common";

export interface IProductCatalogs extends BaseFields {
  code: string;
  category: string;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
  images?: IProductCatalogImage[];
}

export interface IProductCatalogImage extends BaseFields {
  catalogId: string;
  fileMediaFileId: string;
  isPrimary: boolean;
  sortOrder: number;
}
