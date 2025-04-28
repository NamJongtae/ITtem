import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  QueryKey
} from "@tanstack/react-query";
import { queryKeys } from "@/query-keys/query-keys";
import { ProductData } from "@/types/product-types";
import ProductList from "../commons/product-list/product-list";

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

export default async function RecommendProductList() {
  const queryClient = new QueryClient();

  await prefetchProductListData(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList productListType="RECOMMEND" />
    </HydrationBoundary>
  );
}
