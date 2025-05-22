import customAxios from "@/utils/customAxios";
import { ApiResponse } from "@/types/response-types";
import { AxiosResponse } from "axios";

export default async function productReturnReject(
  productId: string,
  rejectReason: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/sales/${productId}/return-reject`,
      {
        rejectReason
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
