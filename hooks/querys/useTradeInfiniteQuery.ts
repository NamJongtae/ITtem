import { ProductManageMenu } from "@/components/product-manage/product-manage-page";
import { queryKeys } from "@/queryKeys";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export default function useTradeInfiniteQuery(
  menu: ProductManageMenu,
  limit: number = 10
) {
  const router = useRouter();
  const currentMenu = menu === "판매" ? "sale" : "purchase";
  let status = router.query?.status as string | undefined;
  status =
    status !== "TRADING" &&
    status !== "TRADING_END" &&
    status !== "CANCEL_END/RETURN_END" &&
    status !== "CANCEL_REJECT/RETURN_REJECT"
      ? "TRADING"
      : status;
  const search = router.query?.search as string | undefined;

  const queryKeyConfig = queryKeys.product.manage({
    currentMenu,
    status,
    search,
    menu,
    limit,
  });

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery<
    SaleTradingData[] | PurchaseTradingData[],
    AxiosError,
    InfiniteData<SaleTradingData | PurchaseTradingData>
  >({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn as any,
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      let nextCursor;
      if (currentMenu === "sale") {
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
    retry: 0,
  });

  return {
    data: data?.pages.flat(),
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  };
}
