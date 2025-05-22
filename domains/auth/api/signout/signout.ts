import { AxiosResponse } from "axios";
import customAxios from "@/utils/customAxios";
import { ApiResponse } from "@/types/response-types";

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
