import ProductHeader from "@/domains/product/upload/components/ProductHeader";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Suspense } from "react";

import CategoryProductListContainer from "@/domains/product/upload/components/CategoryProductListContainer";
import ProductListSkeletonUI from "@/domains/product/shared/components/product-list/ProductListSkeletonUI";

export async function generateMetadata(props: {
  searchParams: Promise<{ category: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category || "전체";
  const title = category ? `ITtem | 상품-${category}` : "ITtem | 상품-전체";
  const url = `${BASE_URL}/product?category=${category}`;

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title
    }
  };
}

export default async function Product({
  searchParams
}: {
  searchParams: Promise<{ category: string | undefined }>;
}) {
  const { category } = await searchParams;

  return (
    <>
      <ProductHeader />
      <Suspense fallback={<ProductListSkeletonUI listCount={8} />}>
        <CategoryProductListContainer category={category} />
      </Suspense>
    </>
  );
}
