import { getProductQueryKey } from "@/constants/constant";
import { reportProduct } from "@/lib/api/product";
import { RootState } from '@/store/store';
import { ProductDetailData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useProductReportMutate() {
  const router = useRouter();
  const productId = router.query?.productId || "";
  const queryClient = useQueryClient();
  const PRODUCT_QUERYKEY = getProductQueryKey(productId as string);
  const myUid = useSelector((state: RootState) => state.auth.user);

  const { mutate: productReportMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    undefined,
    { previousProduct: ProductDetailData }
  >({
    mutationFn: () => reportProduct(productId as string),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: PRODUCT_QUERYKEY });

      const previousProduct = queryClient.getQueryData(
        PRODUCT_QUERYKEY
      ) as ProductDetailData;

      const newProduct = {
        ...previousProduct,
        reportUserIds: [...previousProduct.reportUserIds, myUid],
        reportCount: previousProduct.reportCount + 1,
        block: previousProduct.reportCount >= 4,
      };

      queryClient.setQueryData(PRODUCT_QUERYKEY, newProduct);

      toast.success("해당 상품을 신고했어요.");

      return { previousProduct };
    },
    onError: (error, data, ctx) => {
      if (isAxiosError<{ message: string }>(error))
        toast.warn(error.response?.data.message);
      queryClient.setQueryData(PRODUCT_QUERYKEY, ctx?.previousProduct);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERYKEY });
    },
  });

  return { productReportMutate };
}
