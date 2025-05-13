import useTradeInfiniteQuery from "@/hooks/react-query/queries/trade/useTradeInfiniteQuery";
import Empty from "../../commons/empty";
import { isAxiosError } from "axios";
import Item from "../item/product-mange-item";
import ProductManageListSkeletonUI from "./product-manage-list-skeletonUI";
import useInfiniteScrollObserver from "@/hooks/commons/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/components/commons/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/components/commons/InfiniteScrollEndMessage";
import {
  ProductManageMenuType,
  ProductManageStatusType
} from "@/types/product-types";

interface IProps {
  menu: ProductManageMenuType;
  productManageStatus: ProductManageStatusType;
}

export default function ProductManageList({
  menu,
  productManageStatus
}: IProps) {
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
          <ProductManageListSkeletonUI />
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
            {isFetchingNextPage && <ProductManageListSkeletonUI />}
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
