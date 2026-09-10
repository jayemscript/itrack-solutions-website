// src/configs/domain-config.ts

let apiBaseUrl: string;

if (process.env.NODE_ENV === "production") {
  // Always use relative API in prod so it goes through Next.js rewrite
  apiBaseUrl = "/backend";
} else {
  // In dev, call backend directly
  apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
}

export const API_BASE_URL = apiBaseUrl;
