import { MY_PROFILE_QUERY_KEY, getProductQueryKey } from "@/constants/constant";
import { unfollow } from "@/lib/api/auth";
import { ProfileData } from "@/types/authTypes";
import { ProductDetailData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useProductDetailUnfollowMutate(uid: string) {
  const router = useRouter();
  const productId = router.query?.productId;
  const queryClient = useQueryClient();
  const PRODUCT_QUERYKEY = getProductQueryKey(productId as string);

  const { mutate: productDetailUnfollowMutate } = useMutation({
    mutationFn: () => unfollow(uid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: PRODUCT_QUERYKEY });

      await queryClient.cancelQueries({ queryKey: MY_PROFILE_QUERY_KEY });

      const previousProduct = queryClient.getQueryData(
        PRODUCT_QUERYKEY
      ) as ProductDetailData;

      const previousMyProfile = queryClient.getQueryData(
        MY_PROFILE_QUERY_KEY
      ) as ProfileData;

      const newProduct = {
        ...previousProduct,
        auth: {
          ...previousProduct.auth,
          followings: [
            ...previousMyProfile.followings.filter(
              (id) => id !== previousMyProfile.uid
            ),
          ],
        },
      };

      const newMyProfile = {
        ...previousMyProfile,
        followings: [
          ...previousMyProfile.followings.filter((id) => id !== uid),
        ],
      };

      await queryClient.setQueryData(PRODUCT_QUERYKEY, newProduct);

      await queryClient.setQueryData(MY_PROFILE_QUERY_KEY, newMyProfile);

      toast.success("유저 언팔로우에 성공했어요.");

      return { previousProduct, previousMyProfile };
    },
    onError: (error, data, ctx) => {
      queryClient.setQueryData(PRODUCT_QUERYKEY, ctx?.previousProduct);
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, ctx?.previousMyProfile);
      if (isAxiosError<{ message: string }>(error)) {
        toast.error(error.response?.data.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERYKEY });
      queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY });
    },
  });

  return { productDetailUnfollowMutate };
}
