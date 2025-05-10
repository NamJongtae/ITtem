import useFollowUserInProfile from "@/hooks/profile/useFollowUserInProfile";
import { ProfileData } from "@/types/auth-types";

interface IProps {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
}
export default function UserInfoFollowBtn({
  myProfileData,
  userProfileData
}: IProps) {
  const { isFollow, isNotMyProfile, followHandler } = useFollowUserInProfile({
    myProfileData,
    userProfileData
  });

  return (
    isNotMyProfile && (
      <button
        type="button"
        onClick={followHandler}
        className="border py-2 px-4 w-full betterhover:hover:bg-gray-100"
      >
        {isFollow ? "- 언팔로우" : "+ 팔로우"}
      </button>
    )
  );
}
