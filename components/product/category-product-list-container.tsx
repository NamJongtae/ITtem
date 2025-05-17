import { queryKeys } from "@/query-keys/query-keys";
import { ProductCategory, ProductData } from "@/types/product-types";
import {
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  dehydrate,
  QueryKey
} from "@tanstack/react-query";
import CategoryProductList from "./category-product-list";
import SuspenseErrorBoundary from "../commons/suspense-error-boundary";
import ProductListSkeletonUI from "../commons/product-list/product-list-skeletonUI";
import ProductListError from "../commons/product-list/product-list-error";

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

export default async function CategoryProductListContainer({
  category
}: IProps) {
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
          errorFallback={<ProductListError productListType="CATEGORY" />}
        >
          <CategoryProductList />
        </SuspenseErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
