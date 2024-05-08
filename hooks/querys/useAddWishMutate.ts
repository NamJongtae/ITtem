import { getProductQueryKey } from "@/constants/constant";
import { addWish } from "@/lib/api/product";
import { ProductDetailData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useAddWishMutate() {
  const router = useRouter();
  const productId = router.query?.productId || "";
  const queryClient = useQueryClient();
  const PRODUCT_QUERYKEY = getProductQueryKey(productId as string);

  const { mutate: addWishMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    undefined,
    { previousProduct: ProductDetailData }
  >({
    mutationFn: () => addWish(productId as string),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: PRODUCT_QUERYKEY,
      });

      const previousProduct = queryClient.getQueryData(
        PRODUCT_QUERYKEY
      ) as ProductDetailData;

      const newProduct = {
        ...previousProduct,
        isWish: true,
        wishCount: previousProduct.wishCount + 1,
      };

      queryClient.setQueryData(PRODUCT_QUERYKEY, newProduct);
      toast.success("찜 목록에 상품을 추가했어요.");
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

  return { addWishMutate };
}
