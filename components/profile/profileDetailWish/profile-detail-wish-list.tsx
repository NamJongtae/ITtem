import Empty from "@/components/commons/Empty";
import { isAxiosError } from "axios";
import InfiniteScroll from "react-infinite-scroller";
import ProfileDetailWishItem from "./profile-detail-wish-item";
import ProfileDetailWishSkeletonUI from "./profile-detail-wish-skeletonUI";
import ProfileDetailWishDelBtn from "./profile-detail-wish-delBtn";
import useProfileDetailWishList from "@/hooks/profile/useProfileDetailWishList";

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
    handleCheckWish,
  } = useProfileDetailWishList({wishProductIds});

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

      <InfiniteScroll
        hasMore={hasNextPage && !error}
        loadMore={() => {
          if (!isFetchingNextPage) fetchNextPage();
        }}
      >
        <ul className="grid grid-col-1 md:grid-cols-2 gap-3">
          {isLoading ? (
            <ProfileDetailWishSkeletonUI
              listCount={
                wishProductIds?.length || 0 < 10 ? wishProductIds?.length : 10
              }
            />
          ) : (
            data?.map((data) => (
              <ProfileDetailWishItem
                key={data._id}
                wishProduct={data}
                handleCheckWish={handleCheckWish}
                selectedWish={selectedWish}
              />
            ))
          )}
          {isFetchingNextPage && <ProfileDetailWishSkeletonUI />}
        </ul>
      </InfiniteScroll>
    </>
  );
}
