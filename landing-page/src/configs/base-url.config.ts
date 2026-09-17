const AUTH_BASEURL = "/auth";
const AUTH_ENDPOINTS = {
  REGISTER: "/register",
  REGISTER_ADMIN: "/register-admin",
  LOGIN: "/login",
  REFRESH: "/refresh",
  LOGOUT: "/logout",
  VERIFY: "/verify",
};

const USER_BASEURL = "/user";
const USER_ENDPOINTS = {
  ME: "/me",
  PROFILE_UPDATE: "/profile-update",
  PROFILE_IMAGE_UPLOAD_AUTHORIZATION: "/profile-image/upload-authorization",
  PROFILE_IMAGE: "/profile-image",
  PROFILE_IMAGE_DOWNLOAD_AUTHORIZATION: "/profile-image/download-authorization",
};

const USERS_ACCOUNT_BASEURL = "/users-account";
const USERS_ACCOUNT_ENDPOINTS = {
  PROFILE: "/profile",
  ALL: "/all",
  ACCOUNT_UPDATE: "/admin/users",
  DEACTIVATE: "/admin/users",
  ACTIVATE: "/admin/users",
};

const WAITLIST_BASEURL = "/waitlist";
const WAITLIST_ENDPOINTS = {
  ALL: "/all",
};

const MERCHANT_REGISTRATION_BASEURL = "/merchant-registrations";
const MERCHANT_REGISTRATION_ENDPOINTS = {
  ALL: "/all",
  REQUIREMENTS_REVIEW: (registrationId: string) =>
    `/${registrationId}/requirements/review`,
  IDENTIFIER_REVIEW: (registrationId: string, identifierId: string) =>
    `/${registrationId}/identifiers/${identifierId}/review`,
  DOCUMENT_REVIEW: (registrationId: string, documentId: string) =>
    `/${registrationId}/documents/${documentId}/review`,
  VERIFY_REQUIREMENTS: (registrationId: string) =>
    `/${registrationId}/requirements/verify`,
  REQUEST_CORRECTION: (registrationId: string) =>
    `/${registrationId}/requirements/correction`,
  REJECT: (registrationId: string) => `/${registrationId}/reject`,
};

// legal agreements
const LEGAL_AGREEMENTS_BASEURL = "/legal-agreements";

const LEGAL_AGREEMENTS_ENDPOINTS = {
  All: "/all",

  /** Commands */
  createAgreement: "/",
  updateAgreement: (agreementId: string) => `/${agreementId}`,
  updateAgreementLifecycle: (agreementId: string) =>
    `/${agreementId}/lifecycle`,
  createAgreementVersion: (agreementId: string) => `/${agreementId}/versions`,
  updateAgreementVersion: (agreementVersionId: string) =>
    `/versions/${agreementVersionId}`,
  addDocumentsAgreement: (agreementVersionId: string) =>
    `/versions/${agreementVersionId}/documents`,
  deleteAgreementVersionDocument: (documentId: string) =>
    `/documents/${documentId}`,
  authorizeAgreementVersionDocumentUpload: (agreementVersionId: string) =>
    `/versions/${agreementVersionId}/documents/upload-authorization`,
  authorizeAgreementVersionDocumentDownload: (
    agreementVersionId: string,
    fileMediaFileId: string,
  ) =>
    `/versions/${agreementVersionId}/documents/${fileMediaFileId}/download-authorization`,

  updateAgreementVersionLifeCycle: (agreementVersionId: string) =>
    `/versions/${agreementVersionId}/lifecycle`,
  discardDraftVersion: (agreementVersionId: string) =>
    `/versions/${agreementVersionId}`,
  recordAcceptance: (agreementVersionId: string) =>
    `/versions/${agreementVersionId}/acceptances`,

  /** Queries */
  getAgreementById: (agreementId: string) => `/${agreementId}`,
  getAgreementByCode: (agreementCode: string) => `/code/${agreementCode}`,
  getAgreementVersions: (agreementId: string) => `/${agreementId}/versions`,
  getAgreementVersionsPrimary: (agreementId: string) =>
    `/${agreementId}/versions/primary`,
  getAgreementVersionsDocuments: (agreementId: string) =>
    `/${agreementId}/versions/documents`,
  getAgreementVersionDocuments: (agreementVersionId: string) =>
    `/versions/${agreementVersionId}/documents`,

  getAcceptancesById: (acceptanceId: string) => `/acceptances/${acceptanceId}`,
  getAcceptancesVersion: (agreementVersionId: string) =>
    `/versions/${agreementVersionId}/acceptances`,
  getAccountAcceptance: (accountId: string) =>
    `/acceptances/account/${accountId}`,
  getAnonymousAcceptance: (anonymousReference: string) =>
    `/acceptances/anonymous/${anonymousReference}`,
};

const MERCHANT_MANAGEMENT_BASEURL = '/merchant-management';
const MERCHANT_MANAGEMENT_ENDPOINTS = {
  registrationRequests: '/registration-requests',
  applications: '/applications',
  summary: '/applications/summary',
  application: (applicationId: string) => `/applications/${applicationId}`,
  events: (applicationId: string) => `/applications/${applicationId}/events`,
  claim: (applicationId: string) => `/applications/${applicationId}/claim`,
  reassign: (applicationId: string) => `/applications/${applicationId}/reassign`,
  release: (applicationId: string) => `/applications/${applicationId}/release`,
  startReview: (applicationId: string) => `/applications/${applicationId}/review/start`,
  findings: (applicationId: string) => `/applications/${applicationId}/review/findings`,
  finding: (applicationId: string, findingId: string) =>
    `/applications/${applicationId}/review/findings/${findingId}`,
  decision: (applicationId: string) => `/applications/${applicationId}/review/decision`,
  cancel: (applicationId: string) => `/applications/${applicationId}/cancel`,
  restart: (applicationId: string) => `/applications/${applicationId}/restart`,
  fileDownloadAuthorization: (applicationId: string, fileMediaId: string) =>
    `/applications/${applicationId}/files/${fileMediaId}/download-authorization`,
};

const LEGAL_CATALOG_BASEURL = "/legal-catalog";
const LEGAL_CATALOG_ENDPOINTS = {
  allItems: "/items/all",
  createItem: "/items",
  getItem: (itemId: string) => `/items/${itemId}`,
  updateItem: (itemId: string) => `/items/${itemId}`,
  updateItemLifecycle: (itemId: string) => `/items/${itemId}/lifecycle`,
  createVersion: (itemId: string) => `/items/${itemId}/versions`,
  getVersions: (itemId: string) => `/items/${itemId}/versions`,
  getPrimaryVersion: (itemId: string) => `/items/${itemId}/versions/primary`,
  updateVersion: (versionId: string) => `/versions/${versionId}`,
  updateVersionLifecycle: (versionId: string) => `/versions/${versionId}/lifecycle`,
  deleteVersion: (versionId: string) => `/versions/${versionId}`,
  addDocument: (versionId: string) => `/versions/${versionId}/documents`,
  uploadAuthorization: (versionId: string) => `/versions/${versionId}/documents/upload-authorization`,
  downloadAuthorization: (versionId: string, fileMediaFileId: string) => `/versions/${versionId}/documents/${fileMediaFileId}/download-authorization`,
  getDocuments: (versionId: string) => `/versions/${versionId}/documents`,
  deleteDocument: (documentId: string) => `/documents/${documentId}`,
  getRequirements: "/requirements",
};

export {
  AUTH_BASEURL,
  AUTH_ENDPOINTS,
  USER_BASEURL,
  USER_ENDPOINTS,
  USERS_ACCOUNT_BASEURL,
  USERS_ACCOUNT_ENDPOINTS,
  WAITLIST_BASEURL,
  WAITLIST_ENDPOINTS,
  MERCHANT_REGISTRATION_BASEURL,
  MERCHANT_REGISTRATION_ENDPOINTS,
  MERCHANT_MANAGEMENT_BASEURL,
  MERCHANT_MANAGEMENT_ENDPOINTS,
  LEGAL_AGREEMENTS_BASEURL,
  LEGAL_AGREEMENTS_ENDPOINTS,
  LEGAL_CATALOG_BASEURL,
  LEGAL_CATALOG_ENDPOINTS,
};
