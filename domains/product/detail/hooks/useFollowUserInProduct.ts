import { toast } from "react-toastify";
import useProductDetailFollowMutate from "./mutations/useProductDetailFollowMutate";
import useProductDetailUnFollowMutate from "./mutations/useProductDetailUnFollowMutate";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";

interface IParams {
  uid: string;
  isFollow: boolean | undefined;
  myProfileData: ProfileData | undefined;
}

export default function useFollowUserInProduct({
  uid,
  isFollow,
  myProfileData
}: IParams) {
  const myUid = useAuthStore((s) => s.user?.uid);
  const { productDetailfollowMutate } = useProductDetailFollowMutate(uid);

  const { productDetailUnfollowMutate } = useProductDetailUnFollowMutate(uid);

  const followHandler = () => {
    if (!myUid) {
      toast.warn("로그인이 필요해요.");
      return;
    }
    if (isFollow) {
      productDetailUnfollowMutate();
    } else {
      productDetailfollowMutate();
    }
  };

  const isMyProfile = uid === myProfileData?.uid;

  return { isMyProfile, followHandler };
}
