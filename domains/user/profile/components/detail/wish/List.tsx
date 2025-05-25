import Empty from "@/shared/common/components/empty";
import Item from "./Item";
import DeleteBtn from "./DeleteBtn";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";
import useProfileWishInfiniteQuery from "../../../hooks/queries/useProfileWishInfiniteQuery";
import useWishDeleteSelector from "../../../hooks/useWishDeleteSelector";
import ItemSkeltonUI from "./ItemSkeletonUI";

interface IProps {
  wishProductIds: string[] | undefined;
}

export default function List({ wishProductIds }: IProps) {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useProfileWishInfiniteQuery({
      wishProductIds: wishProductIds || []
    });

  const { selectedWish, onClickSelectAll, onClickCheckBox } =
    useWishDeleteSelector({
      data
    });

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  if (data?.length === 0) {
    return <Empty message={"찜 목록이 없어요."} />;
  }

  return (
    <>
      <DeleteBtn
        selectedWish={selectedWish}
        onClickSelectAll={onClickSelectAll}
      />

      <ul className="grid grid-col-1 md:grid-cols-2 gap-3">
        {
          <>
            {data?.map((data) => (
              <Item
                key={data._id}
                wishProduct={data}
                onClickCheckBox={onClickCheckBox}
                selectedWish={selectedWish}
              />
            ))}
            {isFetchingNextPage &&
              Array(8)
                .fill("")
                .map((_, index) => <ItemSkeltonUI key={index} />)}
            <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
          </>
        }
      </ul>
      <InfiniteScrollEndMessage
        message="더 이상 찜한 상품이 없어요."
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
