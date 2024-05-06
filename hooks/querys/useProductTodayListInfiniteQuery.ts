import { PRODUCT_TODAY_LIST_QUERY_KEY } from "@/constants/constant";
import { getTodayProductList } from "@/lib/api/product";
import { ProductData, ProductListType } from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

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
    queryFn: async ({ pageParam }) => {
      const response = await getTodayProductList(pageParam, limit);
      return response.data.products;
    },
    enabled: productListType === "TODAY",
    retry: 0,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage[lastPage.length - 1].createdAt;
      if (lastPage.length < limit) {
        return undefined;
      }
      return nextCursor;
    },
  });

  useEffect(() => {
    console.log(todayProductListData?.pages);
  }, [todayProductListData]);

  return {
    todayProductListData: todayProductListData?.pages.flat(),
    hasNextPageTodayProductList,
    fetchNextPageTodayProductList,
    isFetchingNextPageTodayProductList,
    isLoadingTodayProductList,
    todayProductListError,
  };
}
