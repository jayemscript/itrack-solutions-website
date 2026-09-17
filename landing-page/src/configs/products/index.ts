const PRODUCTS_BASEURL = "/product-catalogs";
const PRODUCTS_ENDPOINT = {
  PAGINATED: "/paginated",
  CREATE: "/create",
  UPDATE: "/update",
  IMAGES: (catalogId: string) => `/${catalogId}/images`,
  IMAGE: (catalogId: string, imageId: string) =>
    `/${catalogId}/images/${imageId}`,
  IMAGE_FILE: (catalogId: string, imageId: string) =>
    `/${catalogId}/images/${imageId}/file`,
};

export { PRODUCTS_BASEURL, PRODUCTS_ENDPOINT };
