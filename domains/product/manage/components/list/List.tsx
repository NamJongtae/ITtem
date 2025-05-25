import useTradeInfiniteQuery from "../../hooks/queries/useTradeInfiniteQuery";
import Empty from "@/shared/common/components/empty";
import { isAxiosError } from "axios";
import Item from "../item/Item";
import ListSkeletonUI from "./ListSkeletonUI";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";
import {
  ProductManageMenuType,
  ProductManageStatusType
} from "../../types/productManageTypes";

interface IProps {
  menu: ProductManageMenuType;
  productManageStatus: ProductManageStatusType;
}

export default function List({ menu, productManageStatus }: IProps) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  } = useTradeInfiniteQuery();

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
            : `${productManageStatus} 목록이 없어요.`
        }
      />
    );
  }

  return (
    <>
      <ul>
        {isLoading ? (
          <ListSkeletonUI />
        ) : (
          <>
            {data?.map((tradingData) => (
              <Item
                key={tradingData._id}
                tradingData={tradingData}
                menu={menu}
                productManageStatus={productManageStatus}
              />
            ))}
            {isFetchingNextPage && <ListSkeletonUI />}
            <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
          </>
        )}
      </ul>

      <InfiniteScrollEndMessage
        message={`더 이상 ${productManageStatus} 상품이 없어요.`}
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
