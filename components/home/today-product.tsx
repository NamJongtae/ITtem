import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  QueryKey
} from "@tanstack/react-query";
import ProductList from "./home-product-list";
import { queryKeys } from "@/query-keys/query-keys";
import { ProductData } from "@/types/product-types";

export default async function TodayProduct() {
  async function prefetchProductListData(queryClient: QueryClient) {
    const queryKeyConfig = queryKeys.product.today();
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

  const queryClient = new QueryClient();

  await prefetchProductListData(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList />
    </HydrationBoundary>
  );
}
