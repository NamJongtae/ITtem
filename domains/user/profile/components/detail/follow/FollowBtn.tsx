import useFollowUserInList from "../../../hooks/useFollowUserInList";
import { FollowUserData } from "../../../types/profileTypes";

interface IProps {
  followProfileData: FollowUserData | undefined;
  listType: "followers" | "followings";
}

export default function FollowBtn({ followProfileData, listType }: IProps) {
  const { isNotMyProfile, onClickFollow } = useFollowUserInList({
    followProfileData,
    listType
  });

  return (
    isNotMyProfile && (
      <button
        type="button"
        onClick={onClickFollow}
        className="w-full max-w-[180px] border mt-3 py-2 px-4 betterhover:hover:bg-gray-100"
      >
        {followProfileData?.isFollow ? "- 언팔로우" : "+ 팔로우"}
      </button>
    )
  );
}
