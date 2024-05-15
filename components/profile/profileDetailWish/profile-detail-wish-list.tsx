import Empty from "@/components/commons/Empty";
import useProfileWishInfiniteQuery from "@/hooks/querys/useProfileWishInfiniteQuery";
import { isAxiosError } from "axios";
import InfiniteScroll from "react-infinite-scroller";
import ProfileDetailWishItem from "./profile-detail-wish-item";
import ProfileDetailWishSkeletonUI from "./profile-detail-wish-skeletonUI";
import { useState } from "react";
import ProfileDetailWishDelBtn from "./profile-detail-wish-delBtn";

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
  } = useProfileWishInfiniteQuery({
    wishProductIds: wishProductIds || [],
  });
  const [selectedWish, setSelectedWish] = useState<string[]>([]);
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allWishIds = data?.map((item) => item._id) || [];
      setSelectedWish(allWishIds);
    } else {
      setSelectedWish([]);
    }
  };

  const handleCheckWish = (id: string) => {
    setSelectedWish((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((wishId) => wishId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <>
      <ProfileDetailWishDelBtn handleSelectAll={handleSelectAll} />
      {(error && !data) || data?.length === 0 ? (
        <Empty
          message={
            isAxiosError<{ message: string }>(error)
              ? error.response?.data.message || ""
              : ""
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
