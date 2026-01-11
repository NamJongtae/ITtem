
import useChatRoomFollowMutate from "./mutations/useChatRoomFollowMutate";
import useChatRoomUnFollowMutate from "./mutations/useChatRoomUnFollowMutate";

interface IParams {
  otherUserId: string | undefined;
}

export default function useChatRoomFollowBtnLogic({ otherUserId }: IParams) {
  const { userFollowMutate } = useChatRoomFollowMutate(otherUserId || "");
  const { userUnFollowMutate } = useChatRoomUnFollowMutate(
    otherUserId || ""
  );

  const onClickFollow = () => {
    userFollowMutate();
  };

  const onClickUnfollow = () => {
    userUnFollowMutate();
  };

  return {
    onClickFollow,
    onClickUnfollow
  };
}
