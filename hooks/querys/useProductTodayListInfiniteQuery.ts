import { PRODUCT_TODAY_LIST_QUERY_KEY } from '@/constants/constant';
import { getTodayProductList } from "@/lib/api/product";
import { ProductData } from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";



export default function useProductTodayListInfiniteQuery(limit: number = 10) {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<ProductData[], AxiosError, InfiniteData<ProductData>>({
    queryKey: PRODUCT_TODAY_LIST_QUERY_KEY,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getTodayProductList(pageParam , limit);
      return response.data.product;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allpages) => {
      return lastPage.length === limit
        ? allpages.flat().length / limit + 1
        : undefined;
    },
  });

  return {
    data: data?.pages.flat(),
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}
