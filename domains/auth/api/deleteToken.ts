import { ApiResponse } from "@/types/response-types";
import customAxios from "@/utils/customAxios";
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
