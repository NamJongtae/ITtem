import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { queryKeys } from "@/query-keys/query-keys";
import PopularProductSlider from "./popular-product-slider";
import SuspenseErrorBoundary from "../../../components/suspense-error-boundary";
import PopularProductListSkeletonUI from "./popular-product-list-skeletonUI";
import ProductListError from "../../product/components/product-list/product-list-error";

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
      <SuspenseErrorBoundary
        suspenseFallback={<PopularProductListSkeletonUI />}
        errorFallback={<ProductListError productListType="POPULAR" />}
      >
        <PopularProductSlider />
      </SuspenseErrorBoundary>
    </HydrationBoundary>
  );
}
