import { FetchError } from "@/shared/common/types/errorTypes";
import { ProductListResponseData } from "../types/reponseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function getRecommendProductList(
  cursor: unknown = null,
  limit: number = 10
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
