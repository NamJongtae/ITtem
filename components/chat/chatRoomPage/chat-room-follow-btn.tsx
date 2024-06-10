import useMyProfileFollowMutate from "@/hooks/querys/useMyProfileFollowMutate";
import useMyProfileUnfollowMutate from "@/hooks/querys/useMyProfileUnfollowMutate";

interface IProps {
  otherUserId: string;
  myFollowings: string[] | undefined;
  closeMenu: () => void;
}
export default function ChatRoomFollowBtn({
  otherUserId,
  myFollowings,
  closeMenu,
}: IProps) {
  const { myProfilefollowMutate } = useMyProfileFollowMutate(otherUserId);
  const { myProfileUnfollowMutate } = useMyProfileUnfollowMutate(otherUserId);

  const onClickFollow = () => {
    myProfilefollowMutate();
    closeMenu();
  };

  const onClickUnfollow = () => {
    myProfileUnfollowMutate();
    closeMenu();
  };

  return (
    <button
      onClick={
        myFollowings?.includes(otherUserId) ? onClickUnfollow : onClickFollow
      }
      className="py-2 px-4 w-full text-sm text-left betterhover:hover:bg-gray-100"
    >
      {myFollowings?.includes(otherUserId) ? "언팔로우" : "팔로우"}
    </button>
  );
}
