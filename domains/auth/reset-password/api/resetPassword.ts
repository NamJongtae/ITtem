import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";
import { AxiosResponse } from "axios";

export async function resetPassword({
  email,
  password
}: {
  email?: string;
  password: string;
}): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.patch("/api/auth/reset-password", {
      email,
      password
    });
    return response;
  } catch (error) {
    throw error;
  }
}
