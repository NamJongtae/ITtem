import { Suspense } from "react";
import ProductSearchListContainer from "./ProductSearchListContainer";
import SearchHeader from "./SearchHeader";
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
