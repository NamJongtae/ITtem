import useProfileDetailFollowBtnLogic from '@/hooks/profile/useFollowUserInList';
import { ProfileData } from "@/types/auth-types";

interface IProps {
  myProfileData: ProfileData | undefined;
  userProfileData: ProfileData | undefined;
  followProfileData: ProfileData | undefined;
}

export default function ProfileDetailFollowBtn({
  myProfileData,
  userProfileData,
  followProfileData
}: IProps) {
  const { isFollow, isNotMyProfile, onClickfollow } = useProfileDetailFollowBtnLogic(
    {
      myProfileData,
      userProfileData,
      followProfileData
    }
  );

  return (
    isNotMyProfile && (
      <button
        type="button"
        onClick={onClickfollow}
        className="w-full max-w-[180px] border mt-3 py-2 px-4 betterhover:hover:bg-gray-100"
      >
        {isFollow ? "- 언팔로우" : "+ 팔로우"}
      </button>
    )
  );
}
