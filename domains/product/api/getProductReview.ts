import customAxios from "@/utils/customAxios";
import { ProductReviewResponseData } from "../types/product-types";
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
