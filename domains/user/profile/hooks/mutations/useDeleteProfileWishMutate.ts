import deleteWishlistProductData from "../../api/deleteWishlistProductData";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProfileData } from "../../types/profileTypes";
import { ProductData } from "@/domains/product/shared/types/productTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useDeleteProfileWishMutate() {
  const queryClient = useQueryClient();

  const wishQueryKey = queryKeys.profile.my._ctx.wish().queryKey;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const { mutate: deleteWishMutate, isPending: deleteWishPending } =
    useMutation<
      unknown,
      unknown,
      string[],
      {
        previousMyProfile?: ProfileData;
        previousWish?: InfiniteData<ProductData[]>;
      }
    >({
      mutationFn: (wishProductIds: string[]) =>
        deleteWishlistProductData(wishProductIds),

      onMutate: async (wishProductIds) => {
        await Promise.all([
          queryClient.cancelQueries({ queryKey: myProfileQueryKey }),
          queryClient.cancelQueries({ queryKey: wishQueryKey })
        ]);

        const previousMyProfile = queryClient.getQueryData(
          myProfileQueryKey
        ) as ProfileData | undefined;

        const previousWish = queryClient.getQueryData(wishQueryKey) as
          | InfiniteData<ProductData[]>
          | undefined;

        // 1) 내 찜 목록에서 제거 (optimistic)
        if (previousWish) {
          const nextPages = previousWish.pages.map((page) =>
            page.filter((p) => !wishProductIds.includes(p._id))
          );

          queryClient.setQueryData(wishQueryKey, {
            ...previousWish,
            pages: nextPages
          });
        }

        // 2) 내 프로필 wishCount 감소 (optimistic)
        if (previousMyProfile) {
          const nextWishCount = Math.max(
            (previousMyProfile.wishCount ?? 0) - wishProductIds.length,
            0
          );

          queryClient.setQueryData(myProfileQueryKey, {
            ...previousMyProfile,
            wishCount: nextWishCount
          });
        }

        return { previousMyProfile, previousWish };
      },

      onError: (error, _variables, ctx) => {
        if (ctx?.previousMyProfile) {
          queryClient.setQueryData(myProfileQueryKey, ctx.previousMyProfile);
        }
        if (ctx?.previousWish) {
          queryClient.setQueryData(wishQueryKey, ctx.previousWish);
        }

        if (isAxiosError<{ message: string }>(error)) {
          toast.warn(error.response?.data.message);
        } else {
          toast.warn("찜 목록 삭제에 실패했어요.");
        }
      },

      onSuccess: (_data, wishProductIds) => {
        toast.success("찜 목록 삭제에 성공했어요.");

        wishProductIds.forEach((productId) => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.product.detail(productId).queryKey
          });
        });
      },

      onSettled: () => {}
    });

  return { deleteWishMutate, deleteWishPending };
}
