import { ProfileData } from "@/types/authTypes";
import ProfileDetailFollowList from "./profile-detail-follow-list";

interface IProps {
  profileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function ProfileDetailFollower({
  profileData,
  myProfileData,
}: IProps) {
  return (
    <div className="mt-8 pb-8">
      <h2 className="font-semibold border-b pb-3 mb-5">
        팔로워 {profileData?.followers?.length || 0}명
      </h2>
      <ProfileDetailFollowList
        isFollowers={true}
        profileData={profileData}
        myProfileData={myProfileData}
      />
    </div>
  );
}
