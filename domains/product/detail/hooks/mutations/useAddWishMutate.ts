import addProductWish from "../../api/addProductWish";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { ProductDetailData } from "../../types/productDetailTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";

export default function useAddWishMutate() {
  const params = useParams();
  const productId = (params?.productId as string) || "";
  const queryClient = useQueryClient();

  const productQueryKey = queryKeys.product.detail(productId).queryKey;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const myWishListQueryKey = queryKeys.profile.my._ctx.wish({
    limit: 10
  }).queryKey;

  const isLoggedIn = !!useAuthStore((state) => state.user?.uid);

  const { mutate: addWishMutate, isPending: addWishPending } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    void,
    { previousProduct?: ProductDetailData }
  >({
    mutationFn: () => addProductWish(productId),
    onMutate: async () => {
      if (!isLoggedIn) return {};

      // 상품 상세만 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: productQueryKey });

      const previousProduct = queryClient.getQueryData(productQueryKey) as
        | ProductDetailData
        | undefined;

      if (!previousProduct) return { previousProduct };

      // 이미 찜 상태면 중복 업데이트 방지 (UI 연타 대비)
      if (previousProduct.isWish) return { previousProduct };

      const newProduct: ProductDetailData = {
        ...previousProduct,
        isWish: true,
        wishCount: (previousProduct.wishCount ?? 0) + 1
      };

      queryClient.setQueryData(productQueryKey, newProduct);

      return { previousProduct };
    },
    onError: (_error, _data, ctx) => {
      // 상품 상세 롤백
      if (ctx?.previousProduct) {
        queryClient.setQueryData(productQueryKey, ctx.previousProduct);
      }
    },
    onSettled: () => {
      // ✅ 프로필 wishCount 반영
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });

      // ✅ 내 찜 목록 반영
      queryClient.invalidateQueries({ queryKey: myWishListQueryKey });
    }
  });

  return { addWishMutate, addWishPending };
}
