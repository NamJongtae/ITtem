import useProfileDetailFollowBtn from "@/hooks/profile/useProfileDetailFollowBtn";
import { ProfileData } from "@/types/authTypes";

interface IProps {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
  followProfileData: ProfileData | undefined;
}

export default function ProfileDetailFollowBtn({
  myProfileData,
  userProfileData,
  followProfileData,
}: IProps) {
  const { isFollow, handleClickfollow } = useProfileDetailFollowBtn({
    myProfileData,
    userProfileData,
    followProfileData,
  });

  return (
    myProfileData?.uid !== followProfileData?.uid && (
      <button
        type="button"
        onClick={handleClickfollow}
        className="w-full max-w-[180px] border mt-3 py-2 px-4 betterhover:hover:bg-gray-100"
      >
        {isFollow ? "- 언팔로우" : "+ 팔로우"}
      </button>
    )
  );
}
