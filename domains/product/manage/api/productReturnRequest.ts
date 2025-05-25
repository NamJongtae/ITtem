import customAxios from "@/shared/common/utils/customAxios";
import { ApiResponse } from "@/shared/common/types/responseTypes";
import { AxiosResponse } from "axios";

export default async function productReturnRequest(
  productId: string,
  returnReason: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await customAxios.patch(
      `/api/trading/purchase/${productId}/return`,
      {
        returnReason
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
