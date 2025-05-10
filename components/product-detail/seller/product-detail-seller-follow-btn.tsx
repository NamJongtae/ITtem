import useFollowUserInProduct from "@/hooks/product-detail/useFollowUserInProduct";
import useMyProfileQuery from "@/hooks/react-query/queries/profile/useMyProfileQuery";

interface IProps {
  uid: string;
  authFollowers: string[];
}

export default function ProductDetailSellerFollowBtn({
  uid,
  authFollowers
}: IProps) {
  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();

  const { isFollowing, followHandler, isMyProfile } = useFollowUserInProduct({
    uid,
    authFollowers,
    myProfileData
  });

  if (loadMyProfileLoading || isMyProfile) return null;

  return (
    <button
      type="button"
      onClick={followHandler}
      className="border py-2 px-4 text-md betterhover:hover:bg-gray-100"
    >
      {isFollowing ? "- 언팔로우" : "+ 팔로우"}
    </button>
  );
}
