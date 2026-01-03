import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import ProductDetailPage from "./ProductDetailPage";

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

export default async function PageContainer({
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
      <ProductDetailPage />
    </HydrationBoundary>
  );
}
