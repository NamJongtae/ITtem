import useProductDetailFollowBtn from "@/hooks/productDetail/useProductDetailFollowBtn";
import useMyProfileQuery from "@/hooks/querys/useMyProfileQuery";

interface IProps {
  uid: string;
  authFollowers: string[];
}

export default function ProductDetailSerllerFollowBtn({
  uid,
  authFollowers,
}: IProps) {
  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();
  const { isFollow, handleClickfollow } = useProductDetailFollowBtn({
    uid,
    authFollowers,
    myProfileData,
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
