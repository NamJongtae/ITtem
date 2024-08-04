import { ReivewInfoData } from "@/types/authTypes";
import ProfileDetailInfo from "./profile-detail-info";
import ProfileDetailList from "./profile-detail-list";
import Empty from "@/components/commons/empty";

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
        <>
          <ProfileDetailInfo reviewInfo={reviewInfo} />
          <ProfileDetailList uid={uid} />
        </>
      ) : (
        <Empty message="리뷰가 존재하지 않아요." />
      )}
    </div>
  );
}
