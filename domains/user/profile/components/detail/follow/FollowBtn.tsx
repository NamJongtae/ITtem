import useMyProfileQuery from "../../../hooks/queries/useMyProfileQuery";
import useFollowUserInList from "../../../hooks/useFollowUserInList";
import { FollowUserData } from "../../../types/profileTypes";

interface IProps {
  followProfileData: FollowUserData | undefined;
  listType: "followers" | "followings";
}

export default function FollowBtn({ followProfileData, listType }: IProps) {
  const { myProfileData, myProfileLoading } = useMyProfileQuery();
  const { isNotMyProfile, onClickFollow } = useFollowUserInList({
    followProfileData,
    myProfileData,
    listType
  });

  if (myProfileLoading) {
    return <div className="w-32 h-10 bg-gray-300/60 rounded mt-2" />;
  }

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
