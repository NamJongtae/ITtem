import { getProductQueryKey } from "@/constants/constant";
import { deleteWish } from "@/lib/api/product";
import { ProductDetailData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useDeleteWishMutate() {
  const router = useRouter();
  const productId = router.query?.productId || "";
  const queryClient = useQueryClient();
  const PRODUCT_QUERYKEY = getProductQueryKey(productId as string);

  const { mutate: deleteWishMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    undefined,
    { previousProduct: ProductDetailData }
  >({
    mutationFn: () => deleteWish(productId as string),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: PRODUCT_QUERYKEY,
      });

      const previousProduct = queryClient.getQueryData(
        PRODUCT_QUERYKEY
      ) as ProductDetailData;

      const newProduct = {
        ...previousProduct,
        isWish: false,
        wishCount: previousProduct.wishCount - 1,
      };

      queryClient.setQueryData(PRODUCT_QUERYKEY, newProduct);

      toast.success("찜 목록에서 상품을 삭제했어요.");

      return { previousProduct };
    },

    onError: (error, data, ctx) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
        queryClient.setQueryData(PRODUCT_QUERYKEY, ctx?.previousProduct);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERYKEY });
    },
  });

  return { deleteWishMutate };
}
