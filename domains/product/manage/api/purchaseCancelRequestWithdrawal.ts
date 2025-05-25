import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";
import { AxiosResponse } from "axios";

export default async function purchaseCancelRequestWithdrawal(
  productId: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/cancel/withdrawal`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
