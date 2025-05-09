import useTradeInfiniteQuery from "@/hooks/react-query/queries/trade/useTradeInfiniteQuery";
import Empty from "../../commons/empty";
import { isAxiosError } from "axios";
import Item from "../item/product-mange-item";
import {
  ProductManageStaus,
  ProductManageMenu
} from "../product-manage-page";
import ProductManageListSkeletonUI from "./product-manage-list-skeletonUI";
import useInfiniteScrollObserver from "@/hooks/commons/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/components/commons/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/components/commons/InfiniteScrollEndMessage";

interface IProps {
  menu: ProductManageMenu;
  detailMenu: ProductManageStaus;
}

export default function ProductManageList({ menu, detailMenu }: IProps) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  } = useTradeInfiniteQuery(menu);

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

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
    <>
      <ul>
        {isLoading ? (
          <ProductManageListSkeletonUI />
        ) : (
          <>
            {data?.map((tradingData) => (
              <Item
                key={tradingData._id}
                tradingData={tradingData}
                menu={menu}
                detailMenu={detailMenu}
              />
            ))}
            {isFetchingNextPage && <ProductManageListSkeletonUI />}
            <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
          </>
        )}
      </ul>

      <InfiniteScrollEndMessage
        message={`더 이상 ${detailMenu} 상품이 없어요.`}
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
