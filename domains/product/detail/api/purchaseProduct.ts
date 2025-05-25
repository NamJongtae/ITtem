import { ApiResponse } from "@/shared/common/types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosResponse } from "axios";

export default async function purchaseProduct(
  productId: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.post(
      `/api/product/${productId}/purchase`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
