import HomePage from "@/components/home/hom-page";
import { queryKeys } from "@/query-keys/query-keys";
import { ProductData } from "@/types/product-types";
import {
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  QueryKey,
  dehydrate
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITtem | 홈",
  openGraph: {
    title: "ITtem | 홈"
  }
};

async function prefetchProductListData({
  queryClient
}: {
  queryClient: QueryClient;
}) {
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

export default async function Home() {
  const queryClient = new QueryClient();
  await prefetchProductListData({ queryClient });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
