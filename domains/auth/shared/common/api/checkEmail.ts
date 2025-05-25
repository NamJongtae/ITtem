import { ApiResponse } from "@/shared/common/types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosResponse } from "axios";

export default async function checkEmail(
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
