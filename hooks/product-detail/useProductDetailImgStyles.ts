import { ProductStatus } from "@/types/product-types";

export default function useProductDetailImgStyle({
  status
}: {
  status: ProductStatus | undefined;
}) {
  const imgStyle = `before:absolute before:inset-0 before:bg-gray-700 before:bg-opacity-50 before:z-10 before:text-white before:text-3xl before:font-semibold before:flex before:justify-center before:items-center ${
    status === ProductStatus.soldout
      ? "before:content-['판매완료']"
      : "before:content-['거래중']"
  }`;

  return { imgStyle };
}
