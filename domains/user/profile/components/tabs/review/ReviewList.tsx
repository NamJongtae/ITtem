import useProfileReviewsInfiniteQuery from "../../../hooks/queries/useProfileReviewsInfiniteQuery";
import Empty from "@/shared/common/components/Empty";
import Item from "./ReviewItem";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";
import ItemSkeletonUI from "./ItemSkeletonUI";
import ReviewInfo from "./ReviewInfo";
import { ReviewSummaryData } from "../../../types/profileTypes";

interface IProps {
  uid: string | undefined;
  reviewInfo: ReviewSummaryData | undefined;
}

export default function ReviewList({ uid, reviewInfo }: IProps) {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useProfileReviewsInfiniteQuery({ uid: uid || "" });

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  if (!uid) {
    return <Empty message="유저 정보를 불러올 수 없어요." />;
  }

  if (!data || data.length === 0) {
    return <Empty message={"거래후기가 없어요."} />;
  }

  return (
    <>
      <ReviewInfo reviewInfo={reviewInfo} />
      <ul className="flex flex-col gap-5 mt-12">
        {data.map((review) => (
          <Item key={review._id} review={review} />
        ))}

        {isFetchingNextPage &&
          Array(8)
            .fill("")
            .map((_, index) => <ItemSkeletonUI key={index} />)}

        <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
      </ul>

      <InfiniteScrollEndMessage
        message="더 이상 리뷰가 없어요."
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
