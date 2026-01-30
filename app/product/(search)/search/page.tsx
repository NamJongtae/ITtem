import SearchHeader from "@/domains/search/components/SearchHeader";
import { BASE_URL } from "@/shared/common/constants/constant";
import { Suspense } from "react";
import ProductSearchloading from "./loading";
import ProductSearchListBoundary from "@/domains/search/components/ProductSearchListBoundary";

export async function generateMetadata() {
  return {
    metadataBase: new URL(BASE_URL),
    title: "ITtem | 상품검색",
    openGraph: {
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
