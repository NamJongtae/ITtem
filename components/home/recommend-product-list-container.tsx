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
      <RecommendProductList />
    </HydrationBoundary>
  );
}
