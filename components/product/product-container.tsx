import ProductList from "../commons/product-list/product-list";
import { queryKeys } from "@/query-keys/query-keys";
import { ProductCategory, ProductData } from "@/types/product-types";
import {
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  dehydrate,
  QueryKey
} from "@tanstack/react-query";

interface IProps {
  category: string | null;
}

export default async function ProductContainer({ category }: IProps) {
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

  const queryClient = new QueryClient();

  await prefetchProductList({
    category: category as ProductCategory,
    queryClient
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList productListType="CATEGORY" />
      </HydrationBoundary>
    </>
  );
}
