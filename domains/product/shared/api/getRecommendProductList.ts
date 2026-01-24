import { ProductListResponseData } from "../types/reponseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function getRecommendProductList(
  cursor: unknown = null,
  limit: number = 12
): Promise<ProductListResponseData> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", String(cursor));

  return await customFetch<ProductListResponseData>(
    `/api/product/recommend?${params.toString()}`,
    {
      next: {
        revalidate: 86400,
        tags: ["product-recommend"]
      }
    }
  );
}
