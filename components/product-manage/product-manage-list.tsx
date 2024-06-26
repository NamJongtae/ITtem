import useTradeInfiniteQuery from "@/hooks/reactQuery/querys/trade/useTradeInfiniteQuery";
import InfiniteScroll from "react-infinite-scroller";
import Empty from "../commons/Empty";
import { isAxiosError } from "axios";
import ProductManageItem from "./product-manage-item";
import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "./product-manage-page";
import ProductManageListSkeletonUI from "./product-manage-list-skeletonUI";

interface IProps {
  menu: ProductManageMenu;
  detailMenu: ProductManageDeatilMenu;
}

export default function ProductManageList({ menu, detailMenu }: IProps) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useTradeInfiniteQuery(menu);

  if (error || data?.length === 0) {
    return (
      <Empty
        message={
          isAxiosError<{ message: string }>(error)
            ? error.response?.data.message || ""
            : `${detailMenu} 목록이 없어요.`
        }
      />
    );
  }

  return (
    <InfiniteScroll
      hasMore={hasNextPage && !error}
      loadMore={() => {
        if (!isFetchingNextPage) fetchNextPage();
      }}
    >
      <ul>
        {isLoading ? (
          <ProductManageListSkeletonUI />
        ) : (
          data?.map((tradingData) => (
            <ProductManageItem
              key={tradingData._id}
              tradingData={tradingData}
              menu={menu}
              detailMenu={detailMenu}
            />
          ))
        )}
        {isFetchingNextPage && <ProductManageListSkeletonUI />}
      </ul>
    </InfiniteScroll>
  );
}
