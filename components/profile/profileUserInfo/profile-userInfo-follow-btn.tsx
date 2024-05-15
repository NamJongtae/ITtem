import useUserInfoFollowBtn from "@/hooks/profile/useUserInfoFollowBtn";
import { ProfileData } from "@/types/authTypes";

interface IProps {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
}
export default function ProfileUserInfoFollowBtn({
  myProfileData,
  userProfileData,
}: IProps) {
  const { isFollow, handleClickfollow } = useUserInfoFollowBtn({
    myProfileData,
    userProfileData,
  });

  return (
    myProfileData?.uid !== userProfileData?.uid && (
      <button
        type="button"
        onClick={handleClickfollow}
        className="border py-2 px-4 w-full betterhover:hover:bg-gray-100"
      >
        {isFollow ? "- 언팔로우" : "+ 팔로우"}
      </button>
    )
  );
}
