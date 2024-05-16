import useProfileReviewsInfiniteQuery from "@/hooks/querys/useProfileReviewsInfiniteQuery";
import Empty from "@/components/commons/Empty";
import { isAxiosError } from "axios";
import InfiniteScroll from "react-infinite-scroller";
import ProfileDetailReviewItem from "./profile-detail-review-item";
import ProfileDetailReviewSkeletonUI from './profile-detail-review-skeletonUI';

interface IProps {
  uid: string | undefined;
}

export default function ProfileDetailReviewList({ uid }: IProps) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useProfileReviewsInfiniteQuery({ uid: uid || "" });

  return (
    <>
      {(error && !data) || data?.length === 0 ? (
        <Empty
          message={
            isAxiosError<{ message: string }>(error)
              ? error.response?.data.message || ""
              : "리뷰 목록이 없어요."
          }
        />
      ) : null}
      <InfiniteScroll
        hasMore={hasNextPage && !error}
        loadMore={() => {
          if (!isFetchingNextPage) fetchNextPage();
        }}
      >
        <ul className="flex flex-col gap-5 mt-12">
          {isLoading ? (
            <ProfileDetailReviewSkeletonUI
              listCount={data?.length || 0 < 10 ? data?.length : 10}
            />
          ) : (
            data?.map((review) => (
              <ProfileDetailReviewItem key={review._id} review={review} />
            ))
          )}
          {isFetchingNextPage && <ProfileDetailReviewSkeletonUI />}
        </ul>
      </InfiniteScroll>
    </>
  );
}
