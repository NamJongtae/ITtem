import Empty from "@/components/empty";
import ProfileDetailWishItem from "./profile-detail-wish-item";
import ProfileDetailWishDelBtn from "./profile-detail-wish-del-btn";
import useInfiniteScrollObserver from "@/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/components/InfiniteScrollEndMessage";
import useProfileWishInfiniteQuery from "@/domains/user/hooks/profile/queries/useProfileWishInfiniteQuery";
import useWishDeleteSelector from "@/domains/user/hooks/profile/useWishDeleteSelector";
import ProfileDetailWishItemSkeltonUI from "./profile-detail-wish-item-skeletonUI";

interface IProps {
  wishProductIds: string[] | undefined;
}

export default function ProfileDetailWishList({ wishProductIds }: IProps) {
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
      <ProfileDetailWishDelBtn
        selectedWish={selectedWish}
        onClickSelectAll={onClickSelectAll}
      />

      <ul className="grid grid-col-1 md:grid-cols-2 gap-3">
        {
          <>
            {data?.map((data) => (
              <ProfileDetailWishItem
                key={data._id}
                wishProduct={data}
                onClickCheckBox={onClickCheckBox}
                selectedWish={selectedWish}
              />
            ))}
            {isFetchingNextPage &&
              Array(8)
                .fill("")
                .map((_, index) => (
                  <ProfileDetailWishItemSkeltonUI key={index} />
                ))}
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
