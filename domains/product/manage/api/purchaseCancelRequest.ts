import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";
import { AxiosResponse } from "axios";

export default async function purchaseCancelRequest(
  productId: string,
  cancelReason: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/cancel`,
      {
        cancelReason
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
