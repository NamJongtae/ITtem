import ProductPage from "@/components/product/product-page";
import { BASE_URL } from "@/constants/constant";
import { queryKeys } from "@/query-keys/query-keys";
import { ProductCategory, ProductData } from "@/types/product-types";
import {
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  dehydrate,
} from "@tanstack/react-query";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category: string | undefined };
}) {
  const category = searchParams?.category || "전체";
  const title = category ? `ITtem | 상품-${category}` : "ITtem | 상품-전체";
  const url = `${BASE_URL}/product?category=${category}`;

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title,
    },
  };
}

async function prefetchProductList({
  category = ProductCategory.전체,
  queryClient,
}: {
  category: ProductCategory;
  queryClient: QueryClient;
}) {
  const queryKeyConfig = queryKeys.product.list({
    produdctCategory: category || ProductCategory.전체,
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<ProductData[], any, null>,
    initialPageParam: null,
  });
}

export default async function Product({
  searchParams,
}: {
  searchParams: { category: string | undefined };
}) {
  const queryClient = new QueryClient();
  const category = searchParams.category || null;

  await prefetchProductList({
    category: category as ProductCategory,
    queryClient,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPage />
    </HydrationBoundary>
  );
}
