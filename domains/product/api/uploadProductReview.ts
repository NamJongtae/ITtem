import customAxios from "@/utils/customAxios";
import { AxiosResponse } from "axios";
import { UploadProductReviewResponseData } from "../types/reponse-types";

export default async function uploadProductReview({
  productId,
  reviewScore,
  reviewContent,
  reviewTags
}: {
  productId: string;
  reviewScore: number;
  reviewContent: string;
  reviewTags: number[];
}): Promise<AxiosResponse<UploadProductReviewResponseData>> {
  try {
    const response = await customAxios.post(
      `/api/product/${productId}/review`,
      {
        reviewScore,
        reviewContent,
        reviewTags
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
