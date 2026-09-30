export interface ICreateProductCatalog {
  code: string;
  category: string;
  name: string;
  description: string;
  sortOrder?: number;
  isActive: boolean;
}

export interface IUpdateProductCatalog extends Partial<ICreateProductCatalog> {}

export interface IUpdateProductCatalogImage {
  isPrimary?: boolean;
  sortOrder?: number;
}
