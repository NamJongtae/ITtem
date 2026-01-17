import useCheckFollowStatusQuery from "@/domains/user/profile/hooks/queries/useCheckFollowStatusQuery";
import useChatRoomFollowBtnLogic from "../hooks/useChatRoomFollowBtnLogic";

interface IProps {
  otherUserId: string | undefined;
}
export default function FollowBtn({ otherUserId }: IProps) {
  const { onClickFollow, onClickUnfollow } = useChatRoomFollowBtnLogic({
    otherUserId
  });
  const { isFollow, showSkeleton } = useCheckFollowStatusQuery(
    otherUserId || ""
  );

  const followBtnStyle =
    "bg-rootColor betterhover:hover:bg-[#5588D9] text-white";
  const unfollowBtnStyle = "bg-gray-200  betterhover:hover:bg-gray-300";

  if (showSkeleton) {
    return (
      <div className="flex justify-center items-center  w-12 h-6 bg-gray-300/60 rounded-xl" />
    );
  }

  return (
    <button
      onClick={isFollow ? onClickUnfollow : onClickFollow}
      className={`flex justify-center items-center rounded-xl px-2 py-1 text-xs ${
        isFollow ? unfollowBtnStyle : followBtnStyle
      }`}
    >
      <span>{isFollow ? "언팔로우" : "팔로우"}</span>
    </button>
  );
}
