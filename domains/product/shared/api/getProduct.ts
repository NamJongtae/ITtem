import { notFound } from "next/navigation";
import { ProductDetailResponseData } from "../../detail/types/responseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";
import { isFetchError } from "@/shared/common/utils/isFetchError";

export default async function getProduct(
  id: string
): Promise<ProductDetailResponseData> {
  try {
    return await customFetch<ProductDetailResponseData>(`/api/product/${id}`, {
      next: { tags: [`product-${id}`] }
    });
  } catch (error) {
    if (isFetchError(error) && error.status === 404) {
      notFound();
    }

    throw error;
  }
}
