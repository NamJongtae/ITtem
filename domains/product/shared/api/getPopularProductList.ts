import { ProductListResponseData } from "../types/reponseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function getPopularProductList(): Promise<ProductListResponseData> {
  const response = await customFetch("/api/product/popular", false, {
    next: {
      revalidate: 60,
      tags: ["product-popular"]
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => {});
    throw {
      status: response.status,
      message: errorData?.message ?? "인기 상품 목록 조회에 실패했어요."
    };
  }

  const data = await response.json();

  return data;
}
