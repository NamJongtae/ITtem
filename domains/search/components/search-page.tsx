import { Suspense } from "react";
import ProductSearchListContainer from "./product-search-list-container";
import SearchHeader from "./search-header";
import ProductSearchLoading from "@/app/search/product/loading";

export default function SearchPage() {
  return (
    <>
      <Suspense fallback={<ProductSearchLoading />}>
        <SearchHeader />
        <ProductSearchListContainer />
      </Suspense>
    </>
  );
}
