import useMyProfileQuery from "../../hooks/queries/useMyProfileQuery";
import useFollowUserInProfile from "../../hooks/useFollowUserInProfile";
import { ProfileData } from "../../types/profileTypes";

interface IProps {
  profileData: ProfileData | undefined;
}
export default function FollowBtn({ profileData }: IProps) {
  const { myProfileData, myProfileLoading } = useMyProfileQuery();
  const { followHandler } = useFollowUserInProfile({
    profileData,
    myProfileData
  });

  if (myProfileLoading)
    return <div className="w-32 h-10 bg-gray-300/60 rounded mt-2" />;

  return (
    <button
      type="button"
      onClick={followHandler}
      className="border py-2 px-4 w-full betterhover:hover:bg-gray-100"
    >
      {profileData?.isFollow ? "- 언팔로우" : "+ 팔로우"}
    </button>
  );
}
