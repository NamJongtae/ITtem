import Empty from "@/components/commons/empty";
import { isAxiosError } from "axios";
import ProfileDetailWishItem from "./profile-detail-wish-item";
import ProfileDetailWishSkeletonUI from "./profile-detail-wish-skeletonUI";
import ProfileDetailWishDelBtn from "./profile-detail-wish-del-btn";
import useProfileDetailWishList from "@/hooks/profile/useProfileDetailWishList";
import useInfiniteScrollObserver from "@/hooks/commons/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/components/commons/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/components/commons/InfiniteScrollEndMessage";

interface IProps {
  wishProductIds: string[] | undefined;
}

export default function ProfileDetailWishList({ wishProductIds }: IProps) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    selectedWish,
    handleSelectAll,
    handleCheckWish
  } = useProfileDetailWishList({ wishProductIds });

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  return (
    <>
      <ProfileDetailWishDelBtn
        selectedWish={selectedWish}
        handleSelectAll={handleSelectAll}
      />
      {(error && !data) || data?.length === 0 ? (
        <Empty
          message={
            isAxiosError<{ message: string }>(error)
              ? error.response?.data.message || ""
              : "찜 목록이 없어요."
          }
        />
      ) : null}

      <ul className="grid grid-col-1 md:grid-cols-2 gap-3">
        {isLoading ? (
          <ProfileDetailWishSkeletonUI
            listCount={
              wishProductIds?.length || 0 < 10 ? wishProductIds?.length : 10
            }
          />
        ) : (
          <>
            {data?.map((data) => (
              <ProfileDetailWishItem
                key={data._id}
                wishProduct={data}
                handleCheckWish={handleCheckWish}
                selectedWish={selectedWish}
              />
            ))}
            {isFetchingNextPage && <ProfileDetailWishSkeletonUI />}
            <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
          </>
        )}
      </ul>
      <InfiniteScrollEndMessage
        message="더 이상 찜한 상품이 없어요."
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
