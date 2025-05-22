import customAxios from "@/utils/customAxios";
import { ApiResponse } from "@/types/response-types";
import { AxiosResponse } from "axios";

export default async function regenerateAccessToken(): Promise<
  AxiosResponse<ApiResponse>
> {
  try {
    const respose = await customAxios("/api/auth/refresh-token");
    return respose;
  } catch (error) {
    throw error;
  }
}
