import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import ProductDetailScreen from "./ProductDetailScreen";

async function fetchProductData({
  productId,
  queryClient
}: {
  productId: string;
  queryClient: QueryClient;
}) {
  const productQueryKeyConfing = queryKeys.product.detail(productId);

  await queryClient.prefetchQuery({
    queryKey: productQueryKeyConfing.queryKey,
    queryFn: productQueryKeyConfing.queryFn
  });
}

export default async function ProductDetailPrefetchBoundary({
  productId
}: {
  productId: string | undefined;
}) {
  const queryClient = new QueryClient();

  if (productId) {
    await fetchProductData({ productId, queryClient });
  } 

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailScreen />
    </HydrationBoundary>
  );
}
