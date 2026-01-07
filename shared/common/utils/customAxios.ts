import axios, { AxiosError, isAxiosError } from "axios";
import { ApiResponse } from "../types/responseTypes";
import redirect from "./redirect";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

customAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse>) => {
    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      error.response?.data.message === "만료된 세션이에요."
    ) {
      if (typeof window !== "undefined" && process.env.TEST_ENV !== "SSR") {
        await fetch("/api/auth/session-cookie", { method: "DELETE" });
        redirect("/session-expired");
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;
