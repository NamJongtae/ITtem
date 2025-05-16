import { Suspense } from "react";
import ProductSearchListContainer from "./product-search-list-container";
import SearchHeader from "./search-header";
import { ErrorBoundary } from "../commons/ErrorBoundary";
import ProductListError from "../commons/product-list/product-list-error";
import ProductSearchloading from "@/app/search/product/loading";

export default function SearchPage() {
  return (
    <>
      <SearchHeader />
      <Suspense fallback={<ProductSearchloading />}>
        <ErrorBoundary fallback={<ProductListError productListType="SEARCH" />}>
          <ProductSearchListContainer />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
