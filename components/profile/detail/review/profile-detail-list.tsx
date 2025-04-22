import useProfileReviewsInfiniteQuery from "@/hooks/react-query/queries/profile/useProfileReviewsInfiniteQuery";
import Empty from "@/components/commons/empty";
import { isAxiosError } from "axios";
import InfiniteScroll from "react-infinite-scroller";
import ProfileDetailItem from "./profile-detail-item";
import ProfileDetailSkeletonUI from "./profile-detail-review-skeletonUI";

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

  if ((error && !data) || data?.length === 0) {
    return (
      <Empty
        message={
          isAxiosError<{ message: string }>(error)
            ? error.response?.data.message || ""
            : "리뷰 목록이 없어요."
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
      <ul className="flex flex-col gap-5 mt-12">
        {isLoading ? (
          <ProfileDetailSkeletonUI listCount={data?.length || 0 < 10 ? data?.length : 10} />
        ) : (
          data?.map((review) => <ProfileDetailItem key={review._id} review={review} />)
        )}
        {isFetchingNextPage && <ProfileDetailSkeletonUI />}
      </ul>
    </InfiniteScroll>
  );
}
