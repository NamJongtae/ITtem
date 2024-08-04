import axios, { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { RegenerateAccessTokenResponseData } from "@/types/api-types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
const customAxios = axios.create({
  baseURL: BASE_URL,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (isAxiosError<RegenerateAccessTokenResponseData>(error)) {
      if (
        error.response?.status === 401 &&
        error.response?.data.message === "만료된 토큰이에요."
      ) {
        try {
          const cookies = originalRequest?.headers["Cookie"];
          const response = await axios(`${BASE_URL}/api/auth/refresh-token`, {
            headers: {
              Cookie: cookies,
            },
          });
          const reposeCookies = response.headers["set-cookie"];
          if (reposeCookies) {
            originalRequest!.headers["Cookie"] = reposeCookies.join("; ");
          }
          if (originalRequest) return axios(originalRequest);
        } catch (refreshError) {
          if (isAxiosError<RegenerateAccessTokenResponseData>(refreshError)) {
            if (refreshError.response?.status === 401) {
              if (typeof window !== "undefined") {
                toast.warn("로그인이 만료됬어요.", {
                  autoClose: 3000,
                });
                window.location.replace("/signin");
              }
            }
            return Promise.reject(refreshError);
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;
