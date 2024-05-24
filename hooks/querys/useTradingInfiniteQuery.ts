import { ProductManageMenu } from "@/components/product-manage/product-manage-page";
import { getPurchaseTrading, getSalesTrading } from "@/lib/api/product";
import { PurchaseTradingData, SaleTradingData } from "@/types/productTypes";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export default function useTradingInfiniteQuery(
  menu: ProductManageMenu,
  limit: number = 10
) {
  const router = useRouter();
  const currentMenu = menu === "판매" ? "sale" : "purchase";
  let status = router.query?.status as string | undefined;
  const search = router.query?.search as string | undefined;
  status =
    status !== "TRADING" &&
    status !== "TRADING_END" &&
    status !== "CANCEL_END/RETURN_END"
      ? "TRADING"
      : status;

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
    queryKey: ["product", "manage", currentMenu, status, search],
    queryFn: async ({ pageParam }) => {
      if (menu === "판매") {
        const response = await getSalesTrading({
          status,
          cursor: pageParam,
          search,
          limit,
        });
        return response.data.salesTrading;
      } else {
        const response = await getPurchaseTrading({
          status,
          cursor: pageParam,
          search,
          limit,
        });
        return response.data.purchaseTrading;
      }
    },
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
