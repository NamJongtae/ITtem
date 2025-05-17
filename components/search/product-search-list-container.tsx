import { queryKeys } from "@/query-keys/query-keys";
import { ProductCategory, ProductData } from "@/types/product-types";
import {
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  dehydrate,
  QueryKey
} from "@tanstack/react-query";
import ProductSearchList from "./product-search-list";
import SuspenseErrorBoundary from "../commons/suspense-error-boundary";
import ProductListError from "../commons/product-list/product-list-error";
import ProductSearchLoading from '@/app/search/product/loading';

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

export default async function ProductSearchListContainer({ category }: IProps) {
  const queryClient = new QueryClient();

  await prefetchProductList({
    category: category as ProductCategory,
    queryClient
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SuspenseErrorBoundary
          suspenseFallback={<ProductSearchLoading />}
          errorFallback={<ProductListError productListType="SEARCH" />}
        >
          <ProductSearchList />
        </SuspenseErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
