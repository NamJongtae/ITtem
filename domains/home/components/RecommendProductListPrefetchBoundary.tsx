import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import RecommendProductList from "./RecommendProductList";
import SuspenseErrorBoundary from "../../../shared/common/components/SuspenseErrorBoundary";
import ProductListSkeletonUI from "../../product/shared/components/product-list/ProductListSkeletonUI";
import ProductListError from "../../product/shared/components/product-list/ProductListError";
import { getRecommendProductsServer } from "../server/getRecommendProductsServer";
import RecommendProductFirstList from "./RecommendProductFirstList";
import Empty from "@/shared/common/components/Empty";

export default async function RecommendProductListPrefetchBoundary() {
  const { products, nextCursor } = await getRecommendProductsServer(12);

  if (!products || products.length === 0) {
    return <Empty message="상품이 존재하지 않습니다." />;
  }

  return (
    <SuspenseErrorBoundary
      suspenseFallback={<ProductListSkeletonUI listCount={12} />}
      errorFallback={<ProductListError productListType="RECOMMEND" />}
    >
      <RecommendProductFirstList products={products} />
      <RecommendProductList nextCursor={nextCursor} />
    </SuspenseErrorBoundary>
  );
}
