import Header from "@/components/product/product-header";
import { BASE_URL } from "@/constants/constant";
import { Suspense } from "react";

import CategoryProductListContainer from "@/components/product/category-product-list-container";
import ProductListSkeletonUI from "@/components/commons/product-list/product-list-skeletonUI";

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
      <Header />
      <Suspense fallback={<ProductListSkeletonUI listCount={8} />}>
        <CategoryProductListContainer category={category} />
      </Suspense>
    </>
  );
}
