import useProfileReviewsInfiniteQuery from "@/hooks/react-query/queries/profile/useProfileReviewsInfiniteQuery";
import Empty from "@/components/commons/empty";
import { isAxiosError } from "axios";
import ProfileDetailItem from "./profile-detail-item";
import ProfileDetailSkeletonUI from "./profile-detail-review-skeletonUI";
import useInfiniteScrollObserver from "@/hooks/commons/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/components/commons/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/components/commons/InfiniteScrollEndMessage";

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
    error
  } = useProfileReviewsInfiniteQuery({ uid: uid || "" });

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

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
    <>
      <ul className="flex flex-col gap-5 mt-12">
        {isLoading ? (
          <ProfileDetailSkeletonUI
            listCount={data?.length || 0 < 10 ? data?.length : 10}
          />
        ) : (
          <>
            {data?.map((review) => (
              <ProfileDetailItem key={review._id} review={review} />
            ))}
            {isFetchingNextPage && <ProfileDetailSkeletonUI />}
            <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
          </>
        )}
      </ul>
      <InfiniteScrollEndMessage
        message="더 이상 리뷰가 없어요."
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
