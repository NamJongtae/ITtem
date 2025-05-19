import { ReivewInfoData } from "@/types/auth-types";
import ProfileDetailReviewInfo from "./profile-detail-review-info";
import ProfileDetailReviewList from "./profile-detail-review-list";
import Empty from "@/components/commons/empty";
import SuspenseErrorBoundary from "@/components/commons/suspense-error-boundary";
import ProfileDetailReviewSkeletonUI from "./profile-detail-review-skeletonUI";

interface IProps {
  reviewInfo: ReivewInfoData | undefined;
  uid: string | undefined;
}

export default function ProfileDetailReview({ reviewInfo, uid }: IProps) {
  return (
    <div className="mt-8 mb-8">
      <h2 className="font-semibold border-b mb-5 pb-3">
        거래후기 {reviewInfo?.totalReviewCount || 0}건
      </h2>

      {reviewInfo ? (
        <SuspenseErrorBoundary
          suspenseFallback={<ProfileDetailReviewSkeletonUI />}
          errorFallback={
            <Empty
              message={
                "리뷰 목록을 불러올 수 없어요.\n잠시 후 다시 시도해주세요."
              }
            />
          }
        >
          <ProfileDetailReviewInfo reviewInfo={reviewInfo} />
          <ProfileDetailReviewList uid={uid} />
        </SuspenseErrorBoundary>
      ) : (
        <Empty message="리뷰가 존재하지 않아요." />
      )}
    </div>
  );
}
