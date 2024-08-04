import { queryKeys } from "@/queryKeys";
import {
  ProductCategory,
  ProductData,
  ProductListType,
} from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

export default function useSearchProductListInfiniteQuery({
  limit = 10,
  category = ProductCategory.전체,
  productListType,
}: {
  limit?: number;
  category?: ProductCategory;
  productListType: ProductListType;
}) {
  const search = useSearchParams();
  const keyword = search.get("keyword");
  const queryKeyConfig = queryKeys.product.search({
    keyword: keyword as string,
    category,
    limit,
  });

  const {
    data: searchProductListData,
    hasNextPage: hasNextPageSearchProductList,
    fetchNextPage: fetchNextPageSearchProductList,
    isFetchingNextPage: isFetchingNextPageSearchProductList,
    isLoading: isLoadingSearchProductList,
    error: searchProductListError,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as any,
    enabled: productListType === "SEARCH" && !!keyword,
    retry: 0,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1]?.createdAt;
      if (lastPage.length < limit) {
        return undefined;
      }
      return nextCursor;
    },
  });

  return {
    searchProductListData: searchProductListData?.pages.flat(),
    hasNextPageSearchProductList,
    fetchNextPageSearchProductList,
    isFetchingNextPageSearchProductList,
    isLoadingSearchProductList,
    searchProductListError,
  };
}
