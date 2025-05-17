import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  QueryKey
} from "@tanstack/react-query";
import { queryKeys } from "@/query-keys/query-keys";
import { ProductData } from "@/types/product-types";
import RecommendProductList from "./recommend-product-list";
import SuspenseErrorBoundary from "../commons/suspense-error-boundary";
import ProductListSkeletonUI from "../commons/product-list/product-list-skeletonUI";
import ProductListError from "../commons/product-list/product-list-error";

async function prefetchProductListData(queryClient: QueryClient) {
  const queryKeyConfig = queryKeys.product.recommend();
  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<
      ProductData[],
      QueryKey,
      unknown
    >,
    initialPageParam: null
  });
}

export default async function RecommendProductListContainer() {
  const queryClient = new QueryClient();

  await prefetchProductListData(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SuspenseErrorBoundary
        suspenseFallback={<ProductListSkeletonUI listCount={8} />}
        errorFallback={<ProductListError productListType="RECOMMEND" />}
      >
        <RecommendProductList />
      </SuspenseErrorBoundary>
    </HydrationBoundary>
  );
}
