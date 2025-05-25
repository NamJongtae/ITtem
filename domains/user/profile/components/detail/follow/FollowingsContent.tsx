import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import List from "./List";
import { ProfileData } from "../../../types/profileTypes";
import SkeletonUI from "./SkeletonUI";
import Empty from "@/shared/common/components/empty";

interface IProps {
  profileData: ProfileData | undefined;
}

export default function FollowingsContent({ profileData }: IProps) {
  return (
    <div className="mt-8 pb-8">
      <h2 className="font-semibold border-b pb-3 mb-5">
        팔로잉 {profileData?.followings?.length || 0}명
      </h2>
      {profileData?.followers?.length === 0 ? (
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
          <List isFollowers={false} profileData={profileData} />
        </SuspenseErrorBoundary>
      )}
    </div>
  );
}
