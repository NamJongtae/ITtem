import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import FollowingsList from "./List";
import { ProfileData } from "../../../types/profileTypes";
import SkeletonUI from "./SkeletonUI";
import Empty from "@/shared/common/components/Empty";

interface IProps {
  profileData: ProfileData | undefined;
}

export default function FollowingsContent({ profileData }: IProps) {
  return (
    <div className="mt-8 pb-8">
      <h2 className="font-semibold border-b pb-3 mb-5">
        팔로잉 {profileData?.followingsCount || 0}명
      </h2>
      {profileData?.followingsCount === 0 ? (
        <Empty message={"팔로잉 목록이 없어요."} />
      ) : (
        <SuspenseErrorBoundary
          suspenseFallback={<SkeletonUI />}
          errorFallback={
            <Empty
              message={
                "팔로잉 목록을 불러오지 못했어요.\n 잠시후 다시 시도해주세요."
              }
            />
          }
        >
          <FollowingsList listType={"followings"} profileData={profileData} />
        </SuspenseErrorBoundary>
      )}
    </div>
  );
}
