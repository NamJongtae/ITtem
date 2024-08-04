import useProductDetailFollowBtn from "@/hooks/product-detail/useProductDetailFollowBtn";

interface IProps {
  uid: string;
  authFollowers: string[];
}

export default function ProductDetailSellerFollowBtn({
  uid,
  authFollowers,
}: IProps) {
  const { loadMyProfileLoading, myProfileData, isFollow, handleClickfollow } =
    useProductDetailFollowBtn({
      uid,
      authFollowers,
    });

  return (
    !loadMyProfileLoading &&
    uid !== myProfileData?.uid && (
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
