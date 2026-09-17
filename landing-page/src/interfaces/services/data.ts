import { BaseFields } from "../common";

export interface IServicesCatalogs extends BaseFields {
  code: string;
  category: string;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface IServiceCatalogImage extends BaseFields {
  catalogId: string;
  fileMediaFileId: string;
  isPrimary: boolean;
  sortOrder: number;
}
