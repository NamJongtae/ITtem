import { customFetch } from "@/shared/common/utils/customFetch";
import { ProductCategory } from "../types/productTypes";
import { ProductListResponseData } from "../types/reponseTypes";
import { BASE_URL } from "@/shared/common/constants/constant";

export default async function getCategoryProductList({
  category = ProductCategory.전체,
  cursor,
  limit = 10,
  location
}: {
  category?: ProductCategory;
  cursor?: string | null;
  limit?: number;
  location?: string;
}): Promise<ProductListResponseData> {
  const params = new URLSearchParams({
    category,
    limit: String(limit)
  });

  if (cursor) params.append("cursor", cursor);
  if (location) params.append("location", location);

  const res = await customFetch(`/api/product?${params.toString()}`, false, {
    next: {
      revalidate: 60,
      tags: ["products", `products-${category}`]
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => {});
    throw {
      status: res.status,
      message: errorData?.message ?? `${category} 상품 목록 조회에 실패했어요.`
    };
  }

  return res.json();
}
