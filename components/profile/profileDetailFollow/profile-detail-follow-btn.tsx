import useFollowMutate from "@/hooks/querys/useFollowMutate";
import useUnfollowMutate from "@/hooks/querys/useUnfollowMutate";
import { ProfileData } from "@/types/authTypes";
import { toast } from "react-toastify";

interface IProps {
  myProfileData: ProfileData | undefined;
  profileData: ProfileData | undefined;
}

export default function ProfileDetailFollowBtn({
  myProfileData,
  profileData,
}: IProps) {
  const { followMutate } = useFollowMutate(profileData?.uid || "");
  const { unfollowMutate } = useUnfollowMutate(profileData?.uid || "");
  const isFollow =
    !!myProfileData?.followings?.includes(profileData?.uid || "") &&
    !!profileData?.followers?.includes(myProfileData?.uid);

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
    myProfileData?.uid !== profileData?.uid && (
      <button
        type="button"
        onClick={handleClickfollow}
        className="w-full max-w-[180px] border mt-3 py-2 px-4"
      >
        {isFollow ? "- 언팔로우" : "+ 팔로우"}
      </button>
    )
  );
}
