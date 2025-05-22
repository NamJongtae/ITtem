import customAxios from "@/utils/customAxios";
import { ApiResponse } from "@/types/response-types";
import { AxiosResponse } from "axios";

export default async function purchaseRequestReject(
  productId: string,
  cancelReason: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/sales/${productId}/purchase-request-reject`,
      {
        cancelReason
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
