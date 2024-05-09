import useFollowMutate from "@/hooks/querys/useFollowMutate";
import useMyProfileQuery from "@/hooks/querys/useMyProfileQuery";
import useUnfollowMutate from "@/hooks/querys/useUnfollowMutate";
import { toast } from "react-toastify";

interface IProps {
  uid: string;
  authFollowers: string[];
}

export default function ProductDetailSerllerFollowBtn({
  uid,
  authFollowers,
}: IProps) {
  const { followMutate } = useFollowMutate(uid);
  const { unfollowMutate } = useUnfollowMutate(uid);
  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();
  const isFollow =
    !!myProfileData?.followings?.includes(uid) &&
    !!authFollowers.includes(myProfileData?.uid);

  const handleClickfollow = () => {
    if (!myProfileData) {
      toast.warn("로그인이 필요해요.");
      return;
    }
    if (isFollow) {
      unfollowMutate();
    } else {
      followMutate();
    }
  };

  return (
    !loadMyProfileLoading && (
      <button
        type="button"
        onClick={handleClickfollow}
        className="border py-2 px-4 text-md betterhover:hover:bg-gray-100"
      >
        {isFollow ? "- 언팔로우" : "+ 팔로우"}
      </button>
    )
  );
}
