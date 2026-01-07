import redirect from "./redirect";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const createFetch = (baseURL: string, defaultOptions?: RequestInit) => {
  return async (url: string, options?: RequestInit) => {
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

    if (response.status === 401) {
      if (typeof window !== "undefined") {
        await fetch("/api/auth/session-cookie", { method: "DELETE" });
        redirect("/session-expired");
      }
    }

    return response;
  };
};

export const customFetch = createFetch(BASE_URL, {
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include"
});
