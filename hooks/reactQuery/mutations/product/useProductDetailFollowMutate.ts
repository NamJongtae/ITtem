import { follow } from "@/lib/api/profile";
import { queryKeys } from "@/queryKeys";
import { ProfileData } from "@/types/authTypes";
import { ProductDetailData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useProductDetailFollowMutate(uid: string) {
  const router = useRouter();
  const productId = router.query?.productId;
  const queryClient = useQueryClient();
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const productQueryKey = queryKeys.product.detail(
    productId as string
  ).queryKey;

  const { mutate: productDetailfollowMutate } = useMutation({
    mutationFn: () => follow(uid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: productQueryKey });

      await queryClient.cancelQueries({ queryKey: myProfileQueryKey });

      const previousProduct = queryClient.getQueryData(productQueryKey) as
        | ProductDetailData
        | undefined;

      const previousMyProfile = queryClient.getQueryData(myProfileQueryKey) as
        | ProfileData
        | undefined;

      const newProduct = {
        ...previousProduct,
        auth: {
          ...previousProduct?.auth,
          followers: [
            ...(previousMyProfile?.followers || []),
            previousMyProfile?.uid,
          ],
        },
      };

      const newMyProfile = {
        ...previousMyProfile,
        followings: [...(previousMyProfile?.followings || []), uid],
      };

      queryClient.setQueryData(productQueryKey, newProduct);

      queryClient.setQueryData(myProfileQueryKey, newMyProfile);

      toast.success("유저 팔로우에 성공했어요.");

      return { previousProduct, previousMyProfile };
    },
    onError: (error, data, ctx) => {
      queryClient.setQueryData(productQueryKey, ctx?.previousProduct);
      queryClient.setQueryData(myProfileQueryKey, ctx?.previousMyProfile);
      if (isAxiosError<{ message: string }>(error)) {
        toast.error(error.response?.data.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: productQueryKey,
      });
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
    },
  });
  return { productDetailfollowMutate };
}
