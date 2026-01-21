import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import {
  ProductCategory,
  ProductData
} from "../../product/shared/types/productTypes";
import {
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  dehydrate,
  QueryKey
} from "@tanstack/react-query";
import ProductSearchList from "./ProductSearchList";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import ProductListError from "../../product/shared/components/product-list/ProductListError";
import ProductListSkeletonUI from "../../product/shared/components/product-list/ProductListSkeletonUI";

interface IProps {
  category?: string;
}

async function prefetchProductList({
  category = ProductCategory.전체,
  queryClient
}: {
  category: ProductCategory;
  queryClient: QueryClient;
}) {
  const queryKeyConfig = queryKeys.product.category({
    category: category || ProductCategory.전체
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<
      ProductData[],
      QueryKey,
      null
    >,
    initialPageParam: null
  });
}

export default async function ProductSearchListPrefetchBoundary({ category }: IProps) {
  const queryClient = new QueryClient();

  await prefetchProductList({
    category: category as ProductCategory,
    queryClient
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SuspenseErrorBoundary
          suspenseFallback={<ProductListSkeletonUI listCount={8} />}
          errorFallback={<ProductListError productListType="SEARCH" />}
        >
          <ProductSearchList />
        </SuspenseErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
