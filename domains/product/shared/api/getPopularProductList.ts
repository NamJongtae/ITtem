import { ProductListResponseData } from "../types/reponseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function getPopularProductList(): Promise<ProductListResponseData> {
  return await customFetch<ProductListResponseData>("/api/product/popular", {
    next: {
      revalidate: 60,
      tags: ["product-popular"]
    }
  });
}
