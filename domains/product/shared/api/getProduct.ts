import { notFound } from "next/navigation";
import { ProductDetailResponseData } from "../../detail/types/responseTypes";
import { BASE_URL } from "@/shared/common/constants/constant";
import { customFetch } from "@/shared/common/utils/customFetch";

export default async function getProduct(
  id: string
): Promise<ProductDetailResponseData> {
  const res = await customFetch(`/api/product/${id}`, false, {
    next: {
      tags: [`product-${id}`]
    }
  });

  if (!res.ok) {
    if (res.status === 404) {
      return notFound();
    }
    const errorData = await res.json().catch(() => ({}));
    throw {
      status: res.status,
      message: errorData?.message ?? "상품 정보 조회에 실패했어요."
    };
  }

  return res.json();
}
