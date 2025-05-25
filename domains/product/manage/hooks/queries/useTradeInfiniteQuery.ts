import useProductManageUrlQuerys from "@/domains/product/manage/hooks/useProductManageUrlQuerys";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import {
  SaleTradingData,
  PurchaseTradingData
} from "../../types/productManageTypes";
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useInfiniteQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useTradeInfiniteQuery(limit: number = 10) {
  const { menu, search, status } = useProductManageUrlQuerys();

  const queryKeyConfig = queryKeys.product.manage({
    status,
    search,
    menu,
    limit
  });

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  } = useInfiniteQuery<
    SaleTradingData[] | PurchaseTradingData[],
    AxiosError,
    InfiniteData<SaleTradingData | PurchaseTradingData>
  >({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as QueryFunction<
      SaleTradingData[] | PurchaseTradingData[],
      QueryKey,
      unknown
    >,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      let nextCursor;
      if (menu === "sale") {
        nextCursor = (lastPage[lastPage.length - 1] as SaleTradingData)
          ?.saleStartDate;
      } else {
        nextCursor = (lastPage[lastPage.length - 1] as PurchaseTradingData)
          ?.purchaseStartDate;
      }

      if (lastPage.length < limit) {
        return undefined;
      }
      return nextCursor;
    },
    retry: 0
  });

  return {
    data: data?.pages.flat(),
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  };
}
