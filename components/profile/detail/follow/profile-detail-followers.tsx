import { ProfileData } from "@/types/auth-types";
import ProfileDetailFollowList from "./profile-detail-follow-list";

interface IProps {
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function ProfileDetailFollowers({
  userProfileData,
  myProfileData,
}: IProps) {
  return (
    <div className="mt-8 pb-8">
      <h2 className="font-semibold border-b pb-3 mb-5">
        팔로워 {userProfileData?.followers?.length || 0}명
      </h2>
      <ProfileDetailFollowList
        isFollowers={true}
        userProfileData={userProfileData}
        myProfileData={myProfileData}
      />
    </div>
  );
}
