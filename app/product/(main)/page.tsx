import ProductHeader from "@/domains/product/upload/components/ProductHeader";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Suspense } from "react";

import CategoryProductListContainer from "@/domains/product/upload/components/CategoryProductListContainer";
import ProductListSkeletonUI from "@/domains/product/shared/components/product-list/ProductListSkeletonUI";

export const revalidate = 60;

export async function generateMetadata() {
  const title = "ITtem | 상품";
  const url = `${BASE_URL}/product`;

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title
    }
  };
}

export default async function Product() {
  return (
    <>
      <ProductHeader />
      <Suspense fallback={<ProductListSkeletonUI listCount={8} />}>
        <CategoryProductListContainer />
      </Suspense>
    </>
  );
}
