import useMyProfileFollowMutate from "../react-query/mutations/profile/useMyProfileFollowMutate";
import useMyProfileUnfollowMutate from "../react-query/mutations/profile/useMyProfileUnfollowMutate";

interface IParams {
  otherUserId: string;
  myFollowings: string[] | undefined;
}

export default function useChatRoomFollowBtnLogic({
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

  const isFollow = myFollowings?.includes(otherUserId);

  return {
    onClickFollow,
    onClickUnfollow,
    isFollow,
  };
}
