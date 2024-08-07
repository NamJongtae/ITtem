import ProfileDetailFollowList from "./profile-detail-follow-list";
import { ProfileData } from "@/types/auth-types";

interface IProps {
  userProfileData: ProfileData | undefined;
  myProfileData: ProfileData | undefined;
}

export default function ProfileDetailFollowings({
  userProfileData,
  myProfileData,
}: IProps) {
  return (
    <div className="mt-8 pb-8">
      <h2 className="font-semibold border-b pb-3 mb-5">
        팔로잉 {userProfileData?.followings?.length || 0}명
      </h2>
      <ProfileDetailFollowList
        isFollowers={false}
        userProfileData={userProfileData}
        myProfileData={myProfileData}
      />
    </div>
  );
}
