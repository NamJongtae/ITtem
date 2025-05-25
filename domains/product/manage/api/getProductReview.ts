import customAxios from "@/shared/common/utils/customAxios";
import { ProductReviewResponseData } from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function getProductReview(
  productId: string
): Promise<AxiosResponse<ProductReviewResponseData>> {
  try {
    const response = await customAxios(`/api/product/${productId}/review`);
    return response;
  } catch (error) {
    throw error;
  }
}
