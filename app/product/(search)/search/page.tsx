import SearchHeader from "@/domains/product/search/components/SearchHeader";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Suspense } from "react";
import ProductSearchloading from "./loading";
import ProductSearchListBoundary from "@/domains/product/search/components/ProductSearchListBoundary";
import { BASE_METADATA } from "@/domains/auth/shared/common/constants/constansts";

export async function generateMetadata() {
  return {
    ...BASE_METADATA,
    metadataBase: new URL(BASE_URL),
    title: "ITtem | 상품검색",
    openGraph: {
      ...BASE_METADATA.openGraph,
      url: BASE_URL,
      title: "ITtem | 상품검색"
    }
  };
}

export default async function Search() {
  return (
    <>
      <SearchHeader />
      <Suspense fallback={<ProductSearchloading />}>
        <ProductSearchListBoundary />
      </Suspense>
    </>
  );
}
