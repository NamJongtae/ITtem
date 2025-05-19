import { ProfileData } from "@/types/auth-types";
import ProfileDetailFollowList from "./profile-detail-follow-list";
import SuspenseErrorBoundary from "@/components/commons/suspense-error-boundary";
import Empty from "@/components/commons/empty";
import ProfileDetailFollowSkeletonUI from "./profile-detail-follow-skeletonUI";

interface IProps {
  profileData: ProfileData | undefined;
}

export default function ProfileDetailFollowers({ profileData }: IProps) {
  return (
    <div className="mt-8 pb-8">
      <h2 className="font-semibold border-b pb-3 mb-5">
        팔로워 {profileData?.followers?.length || 0}명
      </h2>
      {profileData?.followers?.length === 0 ? (
        <Empty message={"팔로워 목록이 없어요."} />
      ) : (
        <SuspenseErrorBoundary
          suspenseFallback={<ProfileDetailFollowSkeletonUI />}
          errorFallback={
            <Empty
              message={
                "팔로워 목록을 불러오지 못했어요.\n 잠시후 다시 시도해주세요."
              }
            />
          }
        >
          <ProfileDetailFollowList
            isFollowers={true}
            profileData={profileData}
          />
        </SuspenseErrorBoundary>
      )}
    </div>
  );
}
