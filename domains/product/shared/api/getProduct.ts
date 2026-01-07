import { notFound } from "next/navigation";
import { ProductDetailResponseData } from "../../detail/types/responseTypes";
import { customFetch } from "@/shared/common/utils/customFetch";
import { FetchError } from "@/shared/common/types/errorTypes";

export default async function getProduct(
  id: string
): Promise<ProductDetailResponseData> {
  try {
    return await customFetch<ProductDetailResponseData>(`/api/product/${id}`, {
      next: { tags: [`product-${id}`] }
    });
  } catch (error: unknown) {
    const err = error as FetchError;
    if (err.status === 404) {
      notFound();
    }

    throw error;
  }
}
