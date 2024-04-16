import axios, { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { regenerateAccessToken } from "./api/auth";
import { RegenerateAccessTokenResponseData } from "@/types/apiTypes";

const customAxios = axios.create();

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
          await regenerateAccessToken();
          if (originalRequest) return customAxios(originalRequest);
        } catch (refreshError) {
          if (isAxiosError<RegenerateAccessTokenResponseData>(refreshError)) {
            if (refreshError.response?.status === 401) {
              location.replace("/signin");
              toast.warn("로그인이 만료됬어요.");
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
