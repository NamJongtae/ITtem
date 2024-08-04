import useMyProfileFollowMutate from "../react-query/mutations/profile/useMyProfileFollowMutate";
import useMyProfileUnfollowMutate from "../react-query/mutations/profile/useMyProfileUnfollowMutate";

interface IParams {
  otherUserId: string;
  myFollowings: string[] | undefined;
}

export default function useChatRoomFollowBtn({
  otherUserId,
  myFollowings,
}: IParams) {
  const { myProfilefollowMutate } = useMyProfileFollowMutate(otherUserId);
  const { myProfileUnfollowMutate } = useMyProfileUnfollowMutate(otherUserId);

  const onClickFollow = () => {
    myProfilefollowMutate();
  };

  const onClickUnfollow = () => {
    myProfileUnfollowMutate();
  };

  const followBtnStyle =
    "bg-rootColor betterhover:hover:bg-[#5588D9] text-white";
  const unfollowBtnStyle = "bg-gray-200  betterhover:hover:bg-gray-300";
  const isFollow = myFollowings?.includes(otherUserId);

  return {
    onClickFollow,
    onClickUnfollow,
    followBtnStyle,
    unfollowBtnStyle,
    isFollow,
  };
}
