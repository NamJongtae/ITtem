import useProfileReviewsInfiniteQuery from "@/hooks/react-query/queries/profile/useProfileReviewsInfiniteQuery";
import Empty from "@/components/commons/empty";
import ProfileDetailReviewItem from "./profile-detail-review-item";
import useInfiniteScrollObserver from "@/hooks/commons/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/components/commons/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/components/commons/InfiniteScrollEndMessage";
import ProfileDetailReviewItemSkeletonUI from "./profile-detail-review-item-skeletonUI";

interface IProps {
  uid: string | undefined;
}

export default function ProfileDetailReviewList({ uid }: IProps) {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useProfileReviewsInfiniteQuery({ uid: uid || "" });

  const { ref } = useInfiniteScrollObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  });

  if (data?.length === 0) {
    return <Empty message={"리뷰 목록이 없어요."} />;
  }

  return (
    <>
      <ul className="flex flex-col gap-5 mt-12">
        <>
          {data?.map((review) => (
            <ProfileDetailReviewItem key={review._id} review={review} />
          ))}
          {isFetchingNextPage &&
            Array(8)
              .fill("")
              .map((_, index) => (
                <ProfileDetailReviewItemSkeletonUI key={index} />
              ))}
          <InfiniteScrollTarget ref={ref} hasNextPage={hasNextPage} />
        </>
      </ul>
      <InfiniteScrollEndMessage
        message="더 이상 리뷰가 없어요."
        data={data}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
