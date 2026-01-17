import useCheckFollowStatusQuery from "@/domains/user/profile/hooks/queries/useCheckFollowStatusQuery";
import useFollowUserInProduct from "../../hooks/useFollowUserInProduct";
import useMyProfileQuery from "@/domains/user/profile/hooks/queries/useMyProfileQuery";
interface IProps {
  uid: string;
  showCSRSkeleton: boolean;
}

export default function SellerFollowBtn({ uid, showCSRSkeleton }: IProps) {
  const { myProfileData } = useMyProfileQuery();
  const { isFollow } = useCheckFollowStatusQuery(uid);

  const { followHandler, isMyProfile } = useFollowUserInProduct({
    uid,
    isFollow,
    myProfileData
  });

  if (isMyProfile) return null;

  if (showCSRSkeleton)
    return <div className="py-2 px-4 bg-gray-100 animate-pulse w-24 h-10" />;

  return (
    <button
      type="button"
      onClick={followHandler}
      className="border py-2 px-4 text-md betterhover:hover:bg-gray-100"
    >
      {isFollow ? "- 언팔로우" : "+ 팔로우"}
    </button>
  );
}
