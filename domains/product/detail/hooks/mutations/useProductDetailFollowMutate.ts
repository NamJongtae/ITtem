import followUser from "@/domains/user/shared/api/followUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import { ProductDetailData } from "../../types/productDetailTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function useProductDetailFollowMutate(uid: string) {
  const params = useParams();
  const productId = params?.productId || "";
  const queryClient = useQueryClient();
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const productQueryKey = queryKeys.product.detail(
    productId as string
  ).queryKey;

  const { mutate: productDetailfollowMutate } = useMutation({
    mutationFn: () => followUser(uid),
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
            previousMyProfile?.uid
          ]
        }
      };

      const newMyProfile = {
        ...previousMyProfile,
        followings: [...(previousMyProfile?.followings || []), uid]
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
        queryKey: productQueryKey
      });
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
    }
  });
  return { productDetailfollowMutate };
}
