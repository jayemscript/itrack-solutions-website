import { BaseFields, CommonResponse, BasePaginationResponse } from "../common";

export interface IUserPayload {
  id: string;
  email: string;
  username: string;
}

export interface ILoginRequest {
  identifier: string;
  password: string;
}

export interface IAuthResponse {
  message?: string;
  accessToken: string;
  expiresIn?: number;
  appId: string;
  sessionId: string;
  user: IUserPayload;
}

export interface IRegisterUser {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export type TAuthFullResponse = CommonResponse<IAuthResponse>;

export interface IAuthUserSession extends BaseFields {
  userId: string;
  appId: string;
  deviceFingerprint: string;
  deviceType: string;
  deviceName: string;
  ipAddress: string;
  userAgent: string;
  status: string;
  lastActivityAt: string;
  expiresAt: string;
  revokedAt: string | null;
  refreshTokenHash: string;
}

export interface IAuthUserApplicationInfo extends BaseFields {
  appId: string;
  name: string;
  description: string;
  status: string;
  refreshTokenExpirationSeconds: number;
  maxSessionsPerUser: number;
  strictIpValidation: boolean;
}

export interface IAuthUserApplication {
  userId: string;
  appId: string;
  application: IAuthUserApplicationInfo;
}

export interface IAuthUserProfile extends BaseFields {
  [key: string]: unknown;
  email: string;
  username: string;
  status: string;
  lastLoginAt: string | null;
  sessions: IAuthUserSession[];
  userApplications: IAuthUserApplication[];
}

export interface IAuthUserProfileAll {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  users_data: IAuthUserProfile[];
}

export interface ICreateUserAccount extends Partial<BaseFields> {
  email?: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface IUpdateUserAcccount extends Partial<ICreateUserAccount> {}

export type TAuthUserProfileResponse = CommonResponse<IAuthUserProfile>;

export interface IGetAllUsersAccountPaginated extends BasePaginationResponse<IAuthUserProfile> {
  users_data: IAuthUserProfile[];
}

export type IGetAllUsersAccountResponse =
  CommonResponse<IGetAllUsersAccountPaginated>;

export type IUserAccountCreateResponse = CommonResponse<IAuthUserProfile>;
export type IUserAccountUpdateResponse = CommonResponse<IAuthUserProfile>;
