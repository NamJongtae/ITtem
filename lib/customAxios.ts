import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  isAxiosError
} from "axios";
import { RegenerateAccessTokenResponseData } from "@/types/api-types";
import tokenObservable from "./Observable";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// accessToken 재발급 요청 확인 flag
let isRefreshing = false;

customAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      typeof window === "undefined" &&
      isAxiosError<RegenerateAccessTokenResponseData>(error) &&
      error.response?.status === 401 &&
      error.response?.data.message === "만료된 토큰이에요."
    ) {
      throw new Error("Expired AccessToken.");
    }

    if (
      isAxiosError<RegenerateAccessTokenResponseData>(error) &&
      error.response?.status === 401 &&
      error.response?.data.message === "만료된 토큰이에요." &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const cookies = originalRequest.headers["Cookie"];

          const response = await axios.post(
            `${BASE_URL}/api/auth/refresh-token`,
            {
              headers: {
                Cookie: cookies
              },
              withCredentials: true
            }
          );

          const setCookies = response.headers["set-cookie"];
          if (setCookies) {
            originalRequest.headers["Cookie"] = setCookies.join("; ");
          }

          // 리프레시 성공 → 대기중인 요청들 실행
          tokenObservable.notifyAll();
          return customAxios(originalRequest);
        } catch (refreshError) {
          tokenObservable.removeAll(); // 에러 시 구독 제거
          if (
            isAxiosError<RegenerateAccessTokenResponseData>(refreshError) &&
            refreshError.response?.status === 401
          ) {
            if (typeof window !== "undefined") {
              window.location.replace("/session-expired");
            }
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // accessToken 재발급 중이면 받은 요청 구독
      return new Promise((resolve) => {
        tokenObservable.setObserver(() => {
          resolve(customAxios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default customAxios;
