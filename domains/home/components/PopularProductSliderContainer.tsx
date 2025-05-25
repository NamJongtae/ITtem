import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import PopularProductSlider from "./PopularProductSlider";
import SuspenseErrorBoundary from "../../../shared/common/components/SuspenseErrorBoundary";
import PopularProductListSkeletonUI from "./PopularProductListSkeletonUI";
import ProductListError from "../../product/shared/components/product-list/ProductListError";

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
