import useChatRoomFollowBtnLogic from "@/hooks/chat-room/useChatRoomFollowBtnLogic";

interface IProps {
  otherUserId: string;
  myFollowings: string[] | undefined;
}
export default function ChatRoomFollowBtn({
  otherUserId,
  myFollowings
}: IProps) {
  const { onClickFollow, onClickUnfollow, isFollow } =
    useChatRoomFollowBtnLogic({ otherUserId, myFollowings });

  const followBtnStyle =
    "bg-rootColor betterhover:hover:bg-[#5588D9] text-white";
  const unfollowBtnStyle = "bg-gray-200  betterhover:hover:bg-gray-300";

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
