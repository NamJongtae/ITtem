import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProductCategory, ProductData } from "../../shared/types/productTypes";
import {
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  dehydrate,
  QueryKey
} from "@tanstack/react-query";
import CategoryProductList from "./CategoryProductList";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import ProductListSkeletonUI from "../../shared/components/product-list/ProductListSkeletonUI";
import ProductListError from "../../shared/components/product-list/ProductListError";

async function prefetchProductList(queryClient: QueryClient) {
  // ISR을 위해 기본 카테고리(전체)만 prefetch
  const queryKeyConfig = queryKeys.product.category({
    category: ProductCategory.전체
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<
      ProductData[],
      QueryKey,
      null
    >,
    initialPageParam: null
  });
}

export default async function CategoryProductListContainer() {
  const queryClient = new QueryClient();

  await prefetchProductList(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SuspenseErrorBoundary
          suspenseFallback={<ProductListSkeletonUI listCount={8} />}
          errorFallback={<ProductListError productListType="CATEGORY" />}
        >
          <CategoryProductList />
        </SuspenseErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
