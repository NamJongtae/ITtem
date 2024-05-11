import ProfileDetailReviewInfo from "./profile-detail-review-info";
import ProfileDetailReviewList from "./profile-detail-review-list";

export default function ProfileDetailReview() {
  return (
    <div className="mt-8 mb-8">
      <h2 className="font-semibold border-b mb-5 pb-3">거래후기 1건</h2>
      <ProfileDetailReviewInfo />
      <ProfileDetailReviewList />
    </div>
  );
}
