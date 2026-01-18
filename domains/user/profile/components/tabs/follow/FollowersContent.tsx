import type { ProfileData } from "../../../types/profileTypes";
import FollowSection from "./FollowSection";

export default function FollowersContent({
  profileData,
  isMyProfile
}: {
  profileData: ProfileData | undefined;
  isMyProfile: boolean;
}) {
  return (
    <FollowSection
      listType="followers"
      profileData={profileData}
      isMyProfile={isMyProfile}
    />
  );
}
