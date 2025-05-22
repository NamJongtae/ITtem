import { ApiResponse } from "@/types/response-types";
import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";

export async function checkEmail(
  email: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.post("/api/auth/check-email", {
      email
    });
    return response;
  } catch (error) {
    throw error;
  }
}
