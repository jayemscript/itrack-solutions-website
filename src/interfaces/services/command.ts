export interface ICreateServiceCatalog {
  code: string;
  category: string;
  name: string;
  description: string;
  sortOrder?: number;
  isActive: boolean;
}

export interface IUpdateServiceCatalog extends Partial<ICreateServiceCatalog> {}

export interface IUpdateServiceCatalogImage {
  isPrimary?: boolean;
  sortOrder?: number;
}
