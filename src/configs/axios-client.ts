import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from "axios";
import { API_BASE_URL } from "./domain-config";
import { memoryToken } from "@/utils/memory-token";
import Cookies from "js-cookie";
import { TAuthFullResponse } from "@/interfaces/auth";
import { AUTH_BASEURL, AUTH_ENDPOINTS } from "@/configs/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  public?: boolean;
}

declare module "axios" {
  interface AxiosRequestConfig {
    /** Skip authentication restore, Authorization headers, and 401 refresh handling. */
    public?: boolean;
  }
}

interface AxiosErrorResponse {
  message?: string | string[] | { message?: string };
}

// ─── Refresh Queue ────────────────────────────────────────────────────────────
// Ensures only ONE refresh request fires at a time.
// All concurrent 401s subscribe to the same promise and get the resolved token.

let refreshPromise: Promise<string | null> | null = null;

// ─── Axios Instance ───────────────────────────────────────────────────────────

const axiosClientInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ─── Auth Routes ──────────────────────────────────────────────────────────────

const TOKENLESS_AUTH_ROUTES = [
  `${AUTH_BASEURL}${AUTH_ENDPOINTS.REFRESH}`,
  `${AUTH_BASEURL}${AUTH_ENDPOINTS.LOGIN}`,
  `${AUTH_BASEURL}${AUTH_ENDPOINTS.REGISTER}`,
];

const isTokenlessAuthRoute = (url = ""): boolean => {
  const pathname = `/${url
    .split("?")[0]
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")}`;
  return TOKENLESS_AUTH_ROUTES.some((path) => pathname.endsWith(path));
};

// ─── Shared Refresh Logic ─────────────────────────────────────────────────────
// Returns the new access token, or null on failure.
// If a refresh is already in-flight, queues the caller instead of firing again.

async function performRefresh(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const ownsRefreshLock = memoryToken.acquireRefreshLock();
    if (!ownsRefreshLock) {
      return memoryToken.waitForRefreshResult();
    }

    try {
      const response = await axiosClientInstance.post<TAuthFullResponse>(
        `${AUTH_BASEURL}${AUTH_ENDPOINTS.REFRESH}`,
        {},
        { withCredentials: true },
      );
      const accessToken = response.data.data.accessToken;

      if (!accessToken) return null;

      memoryToken.set(accessToken, true);
      return accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      memoryToken.clear(true);
      return null;
    } finally {
      memoryToken.releaseRefreshLock();
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ─── Boot: Restore Token on Page Load ────────────────────────────────────────
// Runs once per tab. If this tab has no token yet, try to restore it via
// the HTTP-only refresh cookie. The lock and BroadcastChannel coordinate this
// across tabs so one refresh token is consumed by only one request.

// (async () => {
//   if (typeof window !== "undefined" && !memoryToken.get()) {
//     await performRefresh();
//   }
// })();

// ─── Request Interceptor ──────────────────────────────────────────────────────

axiosClientInstance.interceptors.request.use(async (config) => {
  let token = memoryToken.get();
  config.headers = config.headers || ({} as AxiosRequestHeaders);

  const url = config.url ?? "";
  const method = config.method?.toUpperCase() ?? "";
  const isPublicRequest = config.public === true;
  const isTokenlessAuthRequest = isTokenlessAuthRoute(url);

  // Never send a protected request without first restoring the in-memory token.
  if (!isPublicRequest && !isTokenlessAuthRequest && !token) {
    token = await performRefresh();

    if (!token) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:logout"));
      }

      throw new AxiosError(
        "Unable to restore authentication session",
        "ERR_AUTH_SESSION",
        config,
      );
    }
  }

  if (!isPublicRequest && !isTokenlessAuthRequest && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (
    !isPublicRequest &&
    !isTokenlessAuthRequest &&
    ["POST", "PUT", "PATCH", "DELETE"].includes(method)
  ) {
    const xsrfToken = Cookies.get("XSRF-TOKEN");
    if (xsrfToken) {
      config.headers["X-XSRF-TOKEN"] = xsrfToken;
    }
  }

  config.withCredentials = isTokenlessAuthRequest || !isPublicRequest;
  return config;
});

// ─── Response Interceptor ─────────────────────────────────────────────────────

axiosClientInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      console.error("Unexpected error:", error);
      return Promise.reject(error);
    }

    const originalRequest = error.config as CustomRequestConfig;

    // Normalize error message from backend
    const data = error.response?.data as AxiosErrorResponse | undefined;
    let errMsg: string;
    if (typeof data?.message === "string") errMsg = data.message;
    else if (Array.isArray(data?.message)) errMsg = data.message.join(", ");
    else if (typeof data?.message === "object" && data.message?.message)
      errMsg = data.message.message;
    else errMsg = error.message || "Server Error";

    console.error("API Error:", errMsg);

    const is401 = error.response?.status === 401;
    const alreadyRetried = originalRequest._retry;
    const isTokenlessAuthRequest = isTokenlessAuthRoute(originalRequest.url);
    const isPublicRequest = originalRequest.public === true;

    if (
      is401 &&
      !alreadyRetried &&
      !isTokenlessAuthRequest &&
      !isPublicRequest
    ) {
      originalRequest._retry = true;

      // performRefresh() is queue-aware:
      // - First caller fires the real request
      // - All other concurrent 401s simply await the same promise
      const newToken = await performRefresh();

      if (newToken) {
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosClientInstance(originalRequest);
      }

      // Refresh failed — redirect to login or dispatch a logout event
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:logout"));
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClientInstance;
