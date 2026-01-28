"use client";

import useMyProfileQuery from "../../hooks/queries/useMyProfileQuery";
import useCheckFollowStatusQuery from "../../hooks/queries/useCheckFollowStatusQuery";
import useFollowUserInProfile from "../../hooks/useFollowUserInProfile";
import { ProfileData } from "../../types/profileTypes";

interface IProps {
  profileData: ProfileData | undefined;
}
export default function FollowBtn({ profileData }: IProps) {
  const { myProfileData, myProfileLoading } = useMyProfileQuery();
  const { isFollow, showSkeleton } = useCheckFollowStatusQuery(
    profileData?.uid || ""
  );
  const { followHandler } = useFollowUserInProfile({
    profileData,
    myProfileData,
    isFollow
  });

  if (myProfileLoading || showSkeleton)
    return <div className="w-32 h-10 bg-gray-300/60 rounded mt-2" />;

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
