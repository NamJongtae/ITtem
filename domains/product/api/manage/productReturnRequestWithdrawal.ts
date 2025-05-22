import customAxios from "@/utils/customAxios";
import { ApiResponse } from "@/types/response-types";
import { AxiosResponse } from "axios";

export default async function productReturnRequestWithdrawal(
  productId: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/return/withdrawal`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
