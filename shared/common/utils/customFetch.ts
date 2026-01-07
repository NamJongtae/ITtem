import redirect from "./redirect";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type FetchError = {
  status: number;
  message: string;
};

export const createFetch = (baseURL: string, defaultOptions?: RequestInit) => {
  return async <T>(url: string, options?: RequestInit): Promise<T> => {
    const fullURL = new URL(url, baseURL).toString();

    const mergedOptions: RequestInit = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions?.headers,
        ...options?.headers
      }
    };

    const response = await fetch(fullURL, mergedOptions);

    const data = await response.json().catch(() => null);

    if (
      response.status === 401 &&
      data?.message === "만료된 세션이에요." &&
      typeof window !== "undefined"
    ) {
      await fetch("/api/auth/session-cookie", { method: "DELETE" });
      redirect("/session-expired");
      throw new Error("SESSION_EXPIRED");
    }

    if (!response.ok) {
      const error: FetchError = {
        status: response.status,
        message: data?.message ?? "요청에 실패했어요."
      };
      throw error;
    }

    return data as T;
  };
};

export const customFetch = createFetch(BASE_URL, {
  headers: { "Content-Type": "application/json" },
  credentials: "include"
});
