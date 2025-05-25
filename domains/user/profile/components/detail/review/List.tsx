import useProfileReviewsInfiniteQuery from "../../../hooks/queries/useProfileReviewsInfiniteQuery";
import Empty from "@/shared/common/components/empty";
import Item from "./Item";
import useInfiniteScrollObserver from "@/shared/common/hooks/useInfiniteScrollObserver";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";
import ItemSkeletonUI from "./ItemSkeletonUI";

interface IProps {
  uid: string | undefined;
}

export default function ReviewList({ uid }: IProps) {
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
            <Item key={review._id} review={review} />
          ))}
          {isFetchingNextPage &&
            Array(8)
              .fill("")
              .map((_, index) => <ItemSkeletonUI key={index} />)}
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
