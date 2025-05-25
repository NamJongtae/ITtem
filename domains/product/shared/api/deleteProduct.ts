import { ApiResponse } from "@/shared/common/types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosResponse } from "axios";

export default async function deleteProduct(
  id: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.delete(`/api/product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}
