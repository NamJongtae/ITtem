import addProductWish from "../../../api/addProductWish";
import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/domains/auth/store/auth-store";
import { ProfileData } from "@/domains/user/types/profile-types";
import { ProductDetailData } from "../../../types/product-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";

export default function useAddWishMutate() {
  const params = useParams();
  const productId = params?.productId || "";
  const queryClient = useQueryClient();
  const productQueryKey = queryKeys.product.detail(
    productId as string
  ).queryKey;
  const myUid = useAuthStore((state) => state.user?.uid);
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const { mutate: addWishMutate, isPending: addWishPending } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    void,
    { previousProduct: ProductDetailData; previousMyProfile: ProfileData }
  >({
    mutationFn: () => addProductWish(productId as string),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: productQueryKey
      });

      await queryClient.cancelQueries({ queryKey: myProfileQueryKey });

      const previousProduct = queryClient.getQueryData(
        productQueryKey
      ) as ProductDetailData;

      const previousMyProfile = queryClient.getQueryData(
        myProfileQueryKey
      ) as ProfileData;

      const newProduct = {
        ...previousProduct,
        wishUserIds: [...previousProduct.wishUserIds, myUid],
        wishCount: previousProduct.wishCount + 1
      };

      const newMyProfile = {
        ...previousMyProfile,
        wishProductIds: [
          ...previousMyProfile.wishProductIds,
          previousProduct._id
        ]
      };

      queryClient.setQueryData(productQueryKey, newProduct);
      queryClient.setQueryData(myProfileQueryKey, newMyProfile);

      return { previousProduct, previousMyProfile };
    },
    onError: (error, data, ctx) => {
      queryClient.setQueryData(productQueryKey, ctx?.previousProduct);
      queryClient.setQueryData(myProfileQueryKey, ctx?.previousMyProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKey });
    }
  });

  return { addWishMutate, addWishPending };
}
