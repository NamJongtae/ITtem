import { ApiResponse } from "@/shared/common/types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosResponse } from "axios";

export default async function reportProduct(
  id: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.post(`/api/product/${id}/report`);
    return response;
  } catch (error) {
    throw error;
  }
}
