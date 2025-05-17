import useFollowUserInProfile from "@/hooks/profile/useFollowUserInProfile";
import { ProfileData } from "@/types/auth-types";

interface IProps {
  profileData: ProfileData | undefined;
}
export default function UserInfoFollowBtn({ profileData }: IProps) {
  const { isFollow, followHandler } = useFollowUserInProfile({
    profileData
  });

  return (
    <button
      type="button"
      onClick={followHandler}
      className="border py-2 px-4 w-full betterhover:hover:bg-gray-100"
    >
      {isFollow ? "- 언팔로우" : "+ 팔로우"}
    </button>
  );
}
