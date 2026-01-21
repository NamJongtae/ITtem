import { Suspense } from "react";
import ProductSearchListPrefetchBoundary from "./ProductSearchListPrefetchBoundary";
import SearchHeader from "./SearchHeader";
import ProductSearchLoading from "@/app/search/product/loading";

export default function SearchBoundary() {
  return (
    <>
      <SearchHeader />
      <Suspense fallback={<ProductSearchLoading />}>
        <ProductSearchListPrefetchBoundary />
      </Suspense>
    </>
  );
}
