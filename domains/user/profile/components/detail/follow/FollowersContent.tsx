import { ProfileData } from "../../../types/profileTypes";
import FollowList from "./List";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";
import Empty from "@/shared/common/components/empty";
import SkeletonUI from "./SkeletonUI";

interface IProps {
  profileData: ProfileData | undefined;
}

export default function FollowersContent({ profileData }: IProps) {
  return (
    <div className="mt-8 pb-8">
      <h2 className="font-semibold border-b pb-3 mb-5">
        팔로워 {profileData?.followers?.length || 0}명
      </h2>
      {profileData?.followers?.length === 0 ? (
        <Empty message={"팔로워 목록이 없어요."} />
      ) : (
        <SuspenseErrorBoundary
          suspenseFallback={<SkeletonUI />}
          errorFallback={
            <Empty
              message={
                "팔로워 목록을 불러오지 못했어요.\n 잠시후 다시 시도해주세요."
              }
            />
          }
        >
          <FollowList isFollowers={true} profileData={profileData} />
        </SuspenseErrorBoundary>
      )}
    </div>
  );
}
