import { MY_PROFILE_QUERY_KEY, getProductQueryKey } from "@/constants/constant";
import { deleteWish } from "@/lib/api/product";
import { RootState } from "@/store/store";
import { ProfileData } from "@/types/authTypes";
import { ProductDetailData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useDeleteWishMutate() {
  const router = useRouter();
  const productId = router.query?.productId || "";
  const queryClient = useQueryClient();
  const PRODUCT_QUERYKEY = getProductQueryKey(productId as string);
  const myUid = useSelector((state: RootState) => state.auth.user?.uid);

  const { mutate: deleteWishMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    undefined,
    { previousProduct: ProductDetailData; previousMyProfile: ProfileData }
  >({
    mutationFn: () => deleteWish(productId as string),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: PRODUCT_QUERYKEY,
      });

      const previousProduct = queryClient.getQueryData(
        PRODUCT_QUERYKEY
      ) as ProductDetailData;

      const previousMyProfile = queryClient.getQueryData(
        MY_PROFILE_QUERY_KEY
      ) as ProfileData;

      const newProduct = {
        ...previousProduct,
        wishUserIds: [
          ...previousProduct.wishUserIds.filter((id) => id !== (myUid || "")),
        ],
        wishCount: previousProduct.wishCount - 1,
      };

      const newMyProfile = {
        ...previousMyProfile,
        wishProductIds: [
          ...previousMyProfile.wishProductIds.filter(
            (id) => id !== previousProduct._id
          ),
        ],
      };

      queryClient.setQueryData(PRODUCT_QUERYKEY, newProduct);
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, newMyProfile);

      toast.success("찜 목록에서 상품을 삭제했어요.");

      return { previousProduct, previousMyProfile };
    },

    onError: (error, data, ctx) => {
      queryClient.setQueryData(PRODUCT_QUERYKEY, ctx?.previousProduct);
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, ctx?.previousMyProfile);
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERYKEY });
    },
  });

  return { deleteWishMutate };
}
