import { addWish } from "@/lib/api/product";
import { queryKeys } from "@/queryKeys";
import { RootState } from "@/store/store";
import { ProfileData } from "@/types/authTypes";
import { ProductDetailData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useAddWishMutate() {
  const router = useRouter();
  const productId = router.query?.productId || "";
  const queryClient = useQueryClient();
  const productQueryKey = queryKeys.product.detail(
    productId as string
  ).queryKey;
  const myUid = useSelector((state: RootState) => state.auth.user?.uid);
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const { mutate: addWishMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    undefined,
    { previousProduct: ProductDetailData; previousMyProfile: ProfileData }
  >({
    mutationFn: () => addWish(productId as string),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: productQueryKey,
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
        wishCount: previousProduct.wishCount + 1,
      };

      const newMyProfile = {
        ...previousMyProfile,
        wishProductIds: [
          ...previousMyProfile.wishProductIds,
          previousProduct._id,
        ],
      };

      queryClient.setQueryData(productQueryKey, newProduct);
      queryClient.setQueryData(myProfileQueryKey, newMyProfile);

      toast.success("찜 목록에 상품을 추가했어요.");
      return { previousProduct, previousMyProfile };
    },
    onError: (error, data, ctx) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKey });
    },
  });

  return { addWishMutate };
}
