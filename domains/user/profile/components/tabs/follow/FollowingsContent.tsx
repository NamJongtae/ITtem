import type { ProfileData } from "../../../types/profileTypes";
import FollowSection from "./FollowSection";

export default function FollowingsContent({
  profileData,
  isMyProfile
}: {
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
}) {
  return (
    <FollowSection
      listType="followings"
      profileData={profileData}
      isMyProfile={isMyProfile}
    />
  );
}
