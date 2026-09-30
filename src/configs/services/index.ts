const SERVICES_BASEURL = "/services-catalogs";
const SERVICES_ENDPOINT = {
  PAGINATED: "/paginated",
  CREATE: "/create",
  UPDATE: "/update",
  IMAGES: (catalogId: string) => `/${catalogId}/images`,
  IMAGE: (catalogId: string, imageId: string) =>
    `/${catalogId}/images/${imageId}`,
  IMAGE_FILE: (catalogId: string, imageId: string) =>
    `/${catalogId}/images/${imageId}/file`,
};

export { SERVICES_BASEURL, SERVICES_ENDPOINT };
