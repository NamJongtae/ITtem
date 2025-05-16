import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { queryKeys } from "@/query-keys/query-keys";
import PopularProductSlider from "./popular-product-slider";

async function prefetchPopularProduct(queryClient: QueryClient) {
  const queryKeyConfig = queryKeys.product.popular;
  await queryClient.prefetchQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn
  });
}

export default async function PopularProductSliderContainer() {
  const queryClinet = new QueryClient();
  await prefetchPopularProduct(queryClinet);

  return (
    <HydrationBoundary state={dehydrate(queryClinet)}>
      <PopularProductSlider />
    </HydrationBoundary>
  );
}
