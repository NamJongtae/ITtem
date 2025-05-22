import useFollowUserInList from "@/domains/user/hooks/profile/useFollowUserInList";
import { ProfileData } from "@/domains/user/types/profile-types";

interface IProps {
  followProfileData: ProfileData | undefined;
}

export default function ProfileDetailFollowBtn({ followProfileData }: IProps) {
  const { isFollow, isNotMyProfile, onClickFollow } = useFollowUserInList({
    followProfileData
  });

  return (
    isNotMyProfile && (
      <button
        type="button"
        onClick={onClickFollow}
        className="w-full max-w-[180px] border mt-3 py-2 px-4 betterhover:hover:bg-gray-100"
      >
        {isFollow ? "- 언팔로우" : "+ 팔로우"}
      </button>
    )
  );
}
