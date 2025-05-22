import customAxios from "@/utils/customAxios";
import { ApiResponse } from "@/types/response-types";
import { AxiosResponse } from "axios";

export default async function productReturnDeliveryConfirmation(
  productId: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/return/delivery-confirmation`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
