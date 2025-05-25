import customAxios from "@/shared/common/utils/customAxios";
import { AxiosResponse } from "axios";
import { IncrementProductViewResponseData } from "../types/responseTypes";

export default async function incrementProductView(
  productId: string
): Promise<AxiosResponse<IncrementProductViewResponseData>> {
  try {
    const response = await customAxios.patch(`/api/product/${productId}/view`);
    return response;
  } catch (error) {
    throw error;
  }
}
