import { AxiosResponse } from "axios";
import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

export default async function signout(
  uid: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.post("/api/auth/signout", {
      uid
    });
    return response;
  } catch (error) {
    throw error;
  }
}
