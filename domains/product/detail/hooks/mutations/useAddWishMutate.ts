import addProductWish from "../../api/addProductWish";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { ProductDetailData } from "../../types/productDetailTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { WishlistProductData } from "@/domains/user/profile/types/profileTypes";

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
    {
      previousProduct?: ProductDetailData;
      previousWishList?: InfiniteData<WishlistProductData[]>;
    }
  >({
    mutationFn: () => addProductWish(productId),

    onMutate: async () => {
      if (!isLoggedIn) return {};

      await Promise.all([
        queryClient.cancelQueries({ queryKey: productQueryKey }),
        queryClient.cancelQueries({ queryKey: myWishListQueryKey })
      ]);

      const previousProduct = queryClient.getQueryData(productQueryKey) as
        | ProductDetailData
        | undefined;

      const previousWishList = queryClient.getQueryData(myWishListQueryKey) as
        | InfiniteData<WishlistProductData[]>
        | undefined;

      if (!previousProduct) return { previousProduct, previousWishList };

      // 이미 찜이면 중복 방지
      if (previousProduct.isWish) return { previousProduct, previousWishList };

      // 1) 상품 상세 optimistic
      queryClient.setQueryData(productQueryKey, {
        ...previousProduct,
        isWish: true,
        wishCount: (previousProduct.wishCount ?? 0) + 1
      } as ProductDetailData);

      // 2) 찜 목록 optimistic: "맨 앞"에 끼워넣기
      if (previousWishList) {
        const firstPage = previousWishList.pages[0] ?? [];

        // 이미 목록에 있으면 중복 추가 방지
        const alreadyExists = firstPage.some(
          (p) => p._id === previousProduct._id
        );
        if (!alreadyExists) {
          const newWishItem: WishlistProductData = {
            _id: previousProduct._id,
            name: (previousProduct as any).name,
            price: (previousProduct as any).price,
            imgData: (previousProduct as any).imgData,
            createdAt: (previousProduct as any).createdAt,
            location: (previousProduct as any).location
          } as WishlistProductData;

          const nextFirstPage = [newWishItem, ...firstPage].slice(0, 10);

          const nextPages = [nextFirstPage, ...previousWishList.pages.slice(1)];

          queryClient.setQueryData(myWishListQueryKey, {
            ...previousWishList,
            pages: nextPages
          });
        }
      }

      return { previousProduct, previousWishList };
    },

    onError: (_error, _data, ctx) => {
      if (ctx?.previousProduct) {
        queryClient.setQueryData(productQueryKey, ctx.previousProduct);
      }
      if (ctx?.previousWishList) {
        queryClient.setQueryData(myWishListQueryKey, ctx.previousWishList);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: myWishListQueryKey });
    }
  });

  return { addWishMutate, addWishPending };
}
