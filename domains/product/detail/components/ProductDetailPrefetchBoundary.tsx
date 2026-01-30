import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import ProductDetailScreen from "./ProductDetailScreen";
import { getProductCached } from "@/app/product/(detail)/[productId]/page";
import Empty from "@/shared/common/components/Empty";

async function fetchProductData({
  productId,
  queryClient
}: {
  productId: string;
  queryClient: QueryClient;
}) {
  const productQueryKeyConfing = queryKeys.product.detail(productId);

  return await queryClient.fetchQuery({
    queryKey: productQueryKeyConfing.queryKey,
    queryFn: async () => {
      const data = await getProductCached(productId);
      return data.product;
    }
  });
}

export default async function ProductDetailPrefetchBoundary({
  productId
}: {
  productId: string | undefined;
}) {
  if (!productId) {
    return <Empty message="존재하지 않는 상품이에요." />;
  }



  const queryClient = new QueryClient();

  const product = await fetchProductData({ productId, queryClient });

    if (product.block) {
    return <Empty message="신고 누적으로 블라인드 처리된 상품입니다." />;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailScreen product={product} />
    </HydrationBoundary>
  );
}
