import { ApiResponse } from "@/shared/common/types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosResponse } from "axios";

export default async function deleteAllToken(
  email: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = customAxios.delete("/api/auth/delete-token", {
      data: { email }
    });
    return response;
  } catch (error) {
    throw error;
  }
}
