import { PRODUCT_TODAY_LIST_QUERY_KEY } from "@/constants/constant";
import { getTodayProductList } from "@/lib/api/product";
import { ProductData, ProductListType } from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useProductTodayListInfiniteQuery({
  limit = 10,
  productListType,
}: {
  limit?: number;
  productListType: ProductListType;
}) {
  const {
    data: todayProductListData,
    hasNextPage: hasNextPageTodayProductList,
    fetchNextPage: fetchNextPageTodayProductList,
    isFetchingNextPage: isFetchingNextPageTodayProductList,
    isLoading: isLoadingTodayProductList,
    error: todayProductListError,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: PRODUCT_TODAY_LIST_QUERY_KEY,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getTodayProductList(pageParam, limit);
      return response.data.product;
    },
    enabled: productListType === "TODAY",
    retry: 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allpages) => {
      return lastPage.length === limit
        ? allpages.flat().length / limit + 1
        : undefined;
    },
  });

  return {
    todayProductListData: todayProductListData?.pages.flat(),
    hasNextPageTodayProductList,
    fetchNextPageTodayProductList,
    isFetchingNextPageTodayProductList,
    isLoadingTodayProductList,
    todayProductListError,
  };
}
