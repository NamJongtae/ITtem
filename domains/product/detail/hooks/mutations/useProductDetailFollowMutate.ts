import followUser from "@/domains/user/shared/api/followUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProductDetailData } from "../../types/productDetailTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { isFetchError } from "@/shared/common/utils/isFetchError";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";

export default function useProductDetailFollowMutate(uid: string) {
  const params = useParams();
  const productId = params?.productId || "";
  const queryClient = useQueryClient();
  const myUid = useAuthStore((s) => s.user?.uid ?? "");

  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings({
    uid: myUid,
    limit: 10
  }).queryKey;
  const userProfileQueryKey = queryKeys.profile.user(uid).queryKey;
  const userFollowersQueryKey = queryKeys.profile.user(uid)._ctx.followers({
    uid,
    limit: 10
  }).queryKey;
  const userFolloingsQueryKey = queryKeys.profile.user(uid)._ctx.followings({
    uid,
    limit: 10
  }).queryKey;

  const productQueryKey = queryKeys.product.detail(
    productId as string
  ).queryKey;

  const { mutate: productDetailfollowMutate } = useMutation({
    mutationFn: () => followUser(uid),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: productQueryKey });

      const previousProduct = queryClient.getQueryData(productQueryKey) as
        | ProductDetailData
        | undefined;

      /** ✅ 상품 상세 데이터에서 isFollow = true */
      if (previousProduct?.auth) {
        queryClient.setQueryData(productQueryKey, {
          ...previousProduct,
          auth: {
            ...previousProduct.auth,
            isFollow: true
          }
        });
      }

      return { previousProduct };
    },

    onError: (error, _, ctx) => {
      queryClient.setQueryData(productQueryKey, ctx?.previousProduct);

      if (isFetchError(error)) {
        if (error.status === 409) {
          toast.warn("이미 팔로우한 유저 입니다.");
        } else {
          toast.warn("유저 팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요.");
        }
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: userProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: myFollowingsQueryKey });
      queryClient.invalidateQueries({ queryKey: userFollowersQueryKey });
      queryClient.invalidateQueries({ queryKey: userFolloingsQueryKey });
    }
  });

  return { productDetailfollowMutate };
}
