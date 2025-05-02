import { deleteWish } from "@/lib/api/product";
import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/store/auth-store";
import { ProfileData } from "@/types/auth-types";
import { ProductDetailData } from "@/types/product-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";

export default function useDeleteWishMutate() {
  const params = useParams();
  const productId = params?.productId || "";
  const queryClient = useQueryClient();
  const myProfileQuerKey = queryKeys.profile.my.queryKey;
  const productQueryKey = queryKeys.product.detail(
    productId as string
  ).queryKey;
  const myUid = useAuthStore((state) => state.user?.uid);

  const { mutate: deleteWishMutate, isPending: deleteWishPending } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    void,
    { previousProduct: ProductDetailData; previousMyProfile: ProfileData }
  >({
    mutationFn: () => deleteWish(productId as string),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: productQueryKey
      });

      const previousProduct = queryClient.getQueryData(
        productQueryKey
      ) as ProductDetailData;

      const previousMyProfile = queryClient.getQueryData(
        myProfileQuerKey
      ) as ProfileData;

      const newProduct = {
        ...previousProduct,
        wishUserIds: [
          ...previousProduct.wishUserIds.filter((id) => id !== (myUid || ""))
        ],
        wishCount: previousProduct.wishCount - 1
      };

      const newMyProfile = {
        ...previousMyProfile,
        wishProductIds: [
          ...previousMyProfile.wishProductIds.filter(
            (id) => id !== previousProduct._id
          )
        ]
      };

      queryClient.setQueryData(productQueryKey, newProduct);
      queryClient.setQueryData(myProfileQuerKey, newMyProfile);

      return { previousProduct, previousMyProfile };
    },

    onError: (error, data, ctx) => {
      queryClient.setQueryData(productQueryKey, ctx?.previousProduct);
      queryClient.setQueryData(myProfileQuerKey, ctx?.previousMyProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKey });
    }
  });

  return { deleteWishMutate, deleteWishPending };
}
