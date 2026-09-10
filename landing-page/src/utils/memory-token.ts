// src/utils/memory-token.ts

const CHANNEL_NAME = "auth_token_sync";
const TOKEN_EVENT = "token_updated";
const CLEAR_EVENT = "token_cleared";
const REFRESH_LOCK_KEY = "auth_refresh_lock";
const REFRESH_LOCK_TTL_MS = 10_000;

let headerToken: string | null = null;
let channel: BroadcastChannel | null = null;
let refreshLockId: string | null = null;
const refreshWaiters = new Set<(token: string | null) => void>();

function resolveRefreshWaiters(token: string | null): void {
  refreshWaiters.forEach((resolve) => resolve(token));
  refreshWaiters.clear();
}

// Only initialize BroadcastChannel in browser environments
function getChannel(): BroadcastChannel | null {
  if (typeof window === "undefined") return null;
  if (!channel) {
    channel = new BroadcastChannel(CHANNEL_NAME);

    // Listen for token updates from other tabs
    channel.onmessage = (event: MessageEvent) => {
      if (event.data?.type === TOKEN_EVENT && event.data?.token) {
        // Silently update in-memory token from another tab's refresh
        headerToken = event.data.token;
        resolveRefreshWaiters(headerToken);
      } else if (event.data?.type === CLEAR_EVENT) {
        headerToken = null;
        resolveRefreshWaiters(null);
      }
    };
  }
  return channel;
}

export const memoryToken = {
  get: (): string | null => headerToken,

  set: (token: string, broadcast = true): void => {
    headerToken = token;
    if (broadcast) {
      // Notify all other tabs of the new token
      getChannel()?.postMessage({ type: TOKEN_EVENT, token });
    }
  },

  clear: (broadcast = true): void => {
    headerToken = null;
    resolveRefreshWaiters(null);
    if (broadcast) {
      getChannel()?.postMessage({ type: CLEAR_EVENT });
    }
  },

  acquireRefreshLock: (): boolean => {
    if (typeof window === "undefined") return true;

    try {
      const now = Date.now();
      const existingLock = localStorage.getItem(REFRESH_LOCK_KEY);
      const lockExpiresAt = Number(existingLock?.split(":")[0]);
      if (lockExpiresAt > now) return false;

      refreshLockId = `${now + REFRESH_LOCK_TTL_MS}:${Math.random()}`;
      localStorage.setItem(REFRESH_LOCK_KEY, refreshLockId);
      return localStorage.getItem(REFRESH_LOCK_KEY) === refreshLockId;
    } catch {
      return true;
    }
  },

  releaseRefreshLock: (): void => {
    if (typeof window === "undefined" || !refreshLockId) return;

    try {
      if (localStorage.getItem(REFRESH_LOCK_KEY) === refreshLockId) {
        localStorage.removeItem(REFRESH_LOCK_KEY);
      }
    } catch {
      // Storage is unavailable; there is no lock to release.
    } finally {
      refreshLockId = null;
    }
  },

  waitForRefreshResult: (
    timeoutMs: number = REFRESH_LOCK_TTL_MS,
  ): Promise<string | null> => {
    if (headerToken) return Promise.resolve(headerToken);
    getChannel();

    return new Promise((resolve) => {
      let timeout: ReturnType<typeof setTimeout>;
      const complete = (token: string | null) => {
        clearTimeout(timeout);
        refreshWaiters.delete(complete);
        resolve(token);
      };
      timeout = setTimeout(() => complete(null), timeoutMs);
      refreshWaiters.add(complete);
    });
  },

  destroy: (): void => {
    channel?.close();
    channel = null;
    headerToken = null;
    refreshWaiters.clear();
    refreshLockId = null;
  },
};
