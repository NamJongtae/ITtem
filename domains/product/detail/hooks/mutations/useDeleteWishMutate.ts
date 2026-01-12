import deleteProductWish from "../../api/deleteProductWish";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { ProductDetailData } from "../../types/productDetailTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";

export default function useDeleteWishMutate() {
  const params = useParams();
  const productId = (params?.productId as string) || "";
  const queryClient = useQueryClient();

  const productQueryKey = queryKeys.product.detail(productId).queryKey;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const myWishListQueryKey = queryKeys.profile.my._ctx.wish({
    limit: 10
  }).queryKey;

  const isLoggedIn = !!useAuthStore((state) => state.user?.uid);

  const { mutate: deleteWishMutate, isPending: deleteWishPending } =
    useMutation<
      AxiosResponse<{ message: string }>,
      AxiosError,
      void,
      { previousProduct?: ProductDetailData }
    >({
      mutationFn: () => deleteProductWish(productId),
      onMutate: async () => {
        if (!isLoggedIn) return {};

        await queryClient.cancelQueries({ queryKey: productQueryKey });

        const previousProduct = queryClient.getQueryData(productQueryKey) as
          | ProductDetailData
          | undefined;

        if (!previousProduct) return { previousProduct };

        // 이미 찜 해제 상태면 중복 업데이트 방지
        if (!previousProduct.isWish) return { previousProduct };

        const nextWishCount = Math.max((previousProduct.wishCount ?? 0) - 1, 0);

        const newProduct: ProductDetailData = {
          ...previousProduct,
          isWish: false,
          wishCount: nextWishCount
        };

        queryClient.setQueryData(productQueryKey, newProduct);

        return { previousProduct };
      },
      onError: (_error, _data, ctx) => {
        if (ctx?.previousProduct) {
          queryClient.setQueryData(productQueryKey, ctx.previousProduct);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
        queryClient.invalidateQueries({ queryKey: myWishListQueryKey });
      }
    });

  return { deleteWishMutate, deleteWishPending };
}
