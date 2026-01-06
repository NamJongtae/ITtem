import { ProductListResponseData } from "../types/reponseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function getRecommendProductList(
  cursor: unknown = null,
  limit: number = 10
): Promise<ProductListResponseData> {
  try {
    const response = await customFetch(
      `/api/product/recommend?${cursor ? `cursor=${cursor}` : ""}&limit=${limit}`,
      false,
      {
        next: {
          revalidate: 86400,
          tags: ["product-recommend"]
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      throw {
        status: response.status,
        message: errorData?.message ?? "추천 상품 목록 조회에 실패했어요."
      };
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
