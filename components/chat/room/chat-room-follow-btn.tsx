import useChatRoomFollowBtn from "@/hooks/chat-room/useChatRoomFollowBtn";

interface IProps {
  otherUserId: string;
  myFollowings: string[] | undefined;
}
export default function ChatRoomFollowBtn({
  otherUserId,
  myFollowings,
}: IProps) {
  const {
    onClickFollow,
    onClickUnfollow,
    followBtnStyle,
    unfollowBtnStyle,
    isFollow,
  } = useChatRoomFollowBtn({ otherUserId, myFollowings });

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
