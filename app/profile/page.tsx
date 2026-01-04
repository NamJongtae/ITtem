import ProfileUserInfoSkeletonUI from "@/domains/user/profile/components/user-info/UserInfoSkeletonUI";
import ProfileDetailSkeletonUI from "@/domains/user/profile/components/detail/ProfileDetailSkeletonUI";
import MyProfilePage from "@/domains/user/profile/components/MyProfilePage";
import Empty from "@/shared/common/components/Empty";
import SuspenseErrorBoundary from "@/shared/common/components/SuspenseErrorBoundary";

export default function MyProfile() {
  return (
    <SuspenseErrorBoundary
      suspenseFallback={
        <>
          <ProfileUserInfoSkeletonUI isMyProfile={true} />
          <ProfileDetailSkeletonUI isMyProfile={true} />
        </>
      }
      errorFallback={
        <Empty
          message={
            "나의 프로필을 불러올 수 없어요.\n 잠시 후 다시 시도해주세요."
          }
        />
      }
    >
      <MyProfilePage />
    </SuspenseErrorBoundary>
  );
}
