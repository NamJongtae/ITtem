import SearchPage from "@/components/search/search-page";
import { BASE_URL } from "@/constants/constant";
import { queryKeys } from "@/query-keys/query-keys";
import { ProductCategory, ProductData } from "@/types/product-types";
import {
  HydrationBoundary,
  QueryClient,
  QueryFunction,
  dehydrate,
} from "@tanstack/react-query";

interface IProps {
  searchParams: { category: string | undefined; keyword: string | undefined };
}
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category: string | undefined; keyword: string | undefined };
}) {
  const category = searchParams?.category || "전체";
  const keyword = searchParams?.keyword;
  const url = `${BASE_URL}/search/product/?keyword=${keyword}`;
  const title = keyword
    ? `ITtem | 상품검색-${keyword}-${category}`
    : `ITtem | 상품-${category}`;

  return {
    metadataBase: new URL(url),
    title,
    openGraph: {
      url,
      title,
    },
  };
}

async function prefetchProductListData({
  category,
  keyword,
  queryClient,
}: {
  category?: ProductCategory;
  keyword?: string;
  queryClient: QueryClient;
}) {
  const queryKeyConfig = queryKeys.product.search({
    category,
    keyword,
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<
      ProductData[],
      any,
      unknown
    >,
    initialPageParam: null,
  });
}

export default async function Search({ searchParams }: IProps) {
  const queryClient = new QueryClient();
  const { category, keyword } = searchParams;

  await prefetchProductListData({
    category: category as ProductCategory,
    keyword: keyword,
    queryClient,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchPage />
    </HydrationBoundary>
  );
}
