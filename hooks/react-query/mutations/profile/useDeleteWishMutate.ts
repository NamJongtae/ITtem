import { deleteWish } from "@/lib/api/product";
import { queryKeys } from "@/query-keys/query-keys";
import { RootState } from "@/store/store";
import { ProfileData } from "@/types/auth-types";
import { ProductDetailData } from "@/types/product-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useDeleteWishMutate() {
  const params = useParams();
  const productId = params?.productId || "";
  const queryClient = useQueryClient();
  const myProfileQuerKey = queryKeys.profile.my.queryKey;
  const productQueryKey = queryKeys.product.detail(
    productId as string
  ).queryKey;
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
        queryKey: productQueryKey,
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

      queryClient.setQueryData(productQueryKey, newProduct);
      queryClient.setQueryData(myProfileQuerKey, newMyProfile);

      toast.success("찜 목록에서 상품을 삭제했어요.");

      return { previousProduct, previousMyProfile };
    },

    onError: (error, data, ctx) => {
      queryClient.setQueryData(productQueryKey, ctx?.previousProduct);
      queryClient.setQueryData(myProfileQuerKey, ctx?.previousMyProfile);
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKey });
    },
  });

  return { deleteWishMutate };
}
