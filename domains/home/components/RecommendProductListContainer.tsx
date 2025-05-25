import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  QueryKey
} from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProductData } from "../../product/shared/types/productTypes";
import RecommendProductList from "./RecommendProductList";
import SuspenseErrorBoundary from "../../../shared/common/components/SuspenseErrorBoundary";
import ProductListSkeletonUI from "../../product/shared/components/product-list/ProductListSkeletonUI";
import ProductListError from "../../product/shared/components/product-list/ProductListError";

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
