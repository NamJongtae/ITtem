import { ReviewSummaryData } from "../../../types/profileTypes";
import ReviewInfo from "./ReviewInfo";
import ReviewList from "./ReviewList";
import Empty from "@/shared/common/components/Empty";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import ReviewSkeletonUI from "./ReviewSkeletonUI";

interface IProps {
  reviewInfo: ReviewSummaryData | undefined;
  uid: string | undefined;
}

export default function ReviewContent({ reviewInfo, uid }: IProps) {
  const totalCount = reviewInfo?.totalReviewCount ?? 0;

  return (
    <div className="mt-8 mb-8">
      <h2 className="font-semibold border-b mb-5 pb-3">
        거래후기 {totalCount}건
      </h2>

      {totalCount === 0 ? (
        <Empty message="거래후기가 존재하지 않아요." />
      ) : (
        <SuspenseErrorBoundary
          suspenseFallback={<ReviewSkeletonUI />}
          errorFallback={
            <Empty
              message={
                "거래후가 목록을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
              }
            />
          }
        >
          <ReviewList uid={uid} reviewInfo={reviewInfo} />
        </SuspenseErrorBoundary>
      )}
    </div>
  );
}
