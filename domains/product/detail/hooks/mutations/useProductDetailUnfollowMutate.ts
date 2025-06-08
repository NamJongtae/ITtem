import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import { ProductDetailData } from "../../types/productDetailTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function useProductDetailUnfollowMutate(uid: string) {
  const params = useParams();
  const productId = params?.productId || "";
  const queryClient = useQueryClient();
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const productQueryKey = queryKeys.product.detail(
    productId as string
  ).queryKey;

  const { mutate: productDetailUnfollowMutate } = useMutation({
    mutationFn: () => unfollowUser(uid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: productQueryKey });

      await queryClient.cancelQueries({ queryKey: myProfileQueryKey });

      const previousProduct = queryClient.getQueryData(
        productQueryKey
      ) as ProductDetailData;

      const previousMyProfile = queryClient.getQueryData(
        myProfileQueryKey
      ) as ProfileData;

      const newProduct = {
        ...previousProduct,
        auth: {
          ...previousProduct.auth,
          followers: [
            ...previousProduct.auth.followers.filter(
              (id) => id !== previousMyProfile.uid
            )
          ]
        }
      };

      const newMyProfile = {
        ...previousMyProfile,
        followings: [...previousMyProfile.followings.filter((id) => id !== uid)]
      };

      await queryClient.setQueryData(productQueryKey, newProduct);

      await queryClient.setQueryData(myProfileQueryKey, newMyProfile);

      return { previousProduct, previousMyProfile };
    },
    onError: (error, data, ctx) => {
      queryClient.setQueryData(productQueryKey, ctx?.previousProduct);
      queryClient.setQueryData(myProfileQueryKey, ctx?.previousMyProfile);
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(
          "유저 언팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요."
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKey });
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
    }
  });

  return { productDetailUnfollowMutate };
}
