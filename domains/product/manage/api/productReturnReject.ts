import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";
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
