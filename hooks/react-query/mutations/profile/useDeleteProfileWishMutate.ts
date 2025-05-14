import { deleteProfileWish } from "@/lib/api/profile";
import { queryKeys } from "@/query-keys/query-keys";
import { ProfileData } from "@/types/auth-types";
import { ProductData } from "@/types/product-types";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useDeleteProfileWishMutate() {
  const queryClient = useQueryClient();
  const wishQueryKey = queryKeys.profile.my._ctx.wish._def;
  const myProfileQuerKey = queryKeys.profile.my.queryKey;
  const productDetailQueryKey = queryKeys.product.detail._def;

  const { mutate: deleteWishMutate } = useMutation({
    mutationFn: (wishProductIds: string[]) => deleteProfileWish(wishProductIds),
    onMutate: async (wishProductIds) => {
      await queryClient.cancelQueries({ queryKey: wishQueryKey });

      await queryClient.cancelQueries({ queryKey: wishQueryKey });

      const previousMyProfile = queryClient.getQueryData(myProfileQuerKey) as
        | ProfileData
        | undefined;

      const previousWish = queryClient.getQueryData(wishQueryKey) as
        | InfiniteData<ProductData[], unknown>
        | undefined;

      const newMyProfile = {
        ...previousMyProfile,
        wishProductIds: [
          ...(previousMyProfile?.wishProductIds.filter(
            (productId: string) => !wishProductIds.includes(productId)
          ) || [])
        ]
      };

      const newWish = previousWish?.pages.map(
        (productDataList: ProductData[]) => {
          return productDataList.filter(
            (productData: ProductData) =>
              !wishProductIds.includes(productData._id)
          );
        }
      );

      queryClient.setQueryData(myProfileQuerKey, newMyProfile);
      queryClient.setQueryData(wishQueryKey, {
        ...previousWish,
        pages: newWish
      });

      toast.success("찜 목록 삭제에 성공했어요.");
      return { previousMyProfile, previousWish };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productDetailQueryKey
      });
    },
    onError: (error, data, ctx) => {
      queryClient.setQueryData(myProfileQuerKey, ctx?.previousMyProfile);
      queryClient.setQueryData(wishQueryKey, ctx?.previousWish);
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    }
  });

  return { deleteWishMutate };
}
