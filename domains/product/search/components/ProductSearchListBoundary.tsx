import ProductSearchList from "./ProductSearchList";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import ProductListError from "../../shared/components/product-list/ProductListError";
import ProductListSkeletonUI from "../../shared/components/product-list/ProductListSkeletonUI";

export default async function ProductSearchListBoundary() {
  return (
    <SuspenseErrorBoundary
      suspenseFallback={<ProductListSkeletonUI listCount={12} />}
      errorFallback={<ProductListError productListType="SEARCH" />}
    >
      <ProductSearchList />
    </SuspenseErrorBoundary>
  );
}
