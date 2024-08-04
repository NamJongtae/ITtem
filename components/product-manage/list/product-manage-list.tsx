import useTradeInfiniteQuery from "@/hooks/react-query/queries/trade/useTradeInfiniteQuery";
import InfiniteScroll from "react-infinite-scroller";
import Empty from "../../commons/empty";
import { isAxiosError } from "axios";
import Item from "../item/product-mange-item";
import {
  ProductManageDeatilMenu,
  ProductManageMenu,
} from "../product-manage-page";
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
            <Item
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
