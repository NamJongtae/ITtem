import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";
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
