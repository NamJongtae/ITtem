import { ReviewSummaryData } from "../../../types/profileTypes";
import ReviewInfo from "./ReviewInfo";
import List from "./List";
import Empty from "@/shared/common/components/Empty";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import ReviewSkeletonUI from "./SkeletonUI";

interface IProps {
  reviewInfo: ReviewSummaryData | undefined;
  uid: string | undefined;
}

export default function ReviewContent({ reviewInfo, uid }: IProps) {
  return (
    <div className="mt-8 mb-8">
      <h2 className="font-semibold border-b mb-5 pb-3">
        거래후기 {reviewInfo?.totalReviewCount || 0}건
      </h2>

      {reviewInfo ? (
        <SuspenseErrorBoundary
          suspenseFallback={<ReviewSkeletonUI />}
          errorFallback={
            <Empty
              message={
                "리뷰 목록을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
              }
            />
          }
        >
          <ReviewInfo reviewInfo={reviewInfo} />
          <List uid={uid} />
        </SuspenseErrorBoundary>
      ) : (
        <Empty message="리뷰가 존재하지 않아요." />
      )}
    </div>
  );
}
