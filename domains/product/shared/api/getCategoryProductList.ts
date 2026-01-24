import { customFetch } from "@/shared/common/utils/customFetch";
import { ProductCategory } from "../types/productTypes";
import { ProductListResponseData } from "../types/reponseTypes";

export default async function getCategoryProductList({
  category = ProductCategory.전체,
  cursor,
  limit = 12,
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

  return await customFetch<ProductListResponseData>(
    `/api/product?${params.toString()}`,
    {
      next: {
        revalidate: 60,
        tags: ["products", `products-${category}`]
      }
    }
  );
}
