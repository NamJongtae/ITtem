import reportProduct from "../../api/reportProduct";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { ProductDetailData } from "../../types/productDetailTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function useProductReportMutate() {
  const params = useParams();
  const productId = params?.productId || "";
  const queryClient = useQueryClient();
  const productQueryKey = queryKeys.product.detail(
    productId as string
  ).queryKey;
  const myUid = useAuthStore((state) => state.user);

  const { mutate: productReportMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    void,
    { previousProduct: ProductDetailData }
  >({
    mutationFn: () => reportProduct(productId as string),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: productQueryKey });

      const previousProduct = queryClient.getQueryData(
        productQueryKey
      ) as ProductDetailData;

      const newProduct = {
        ...previousProduct,
        reportUserIds: [...previousProduct.reportUserIds, myUid],
        reportCount: previousProduct.reportCount + 1,
        block: previousProduct.reportCount >= 4
      };

      queryClient.setQueryData(productQueryKey, newProduct);

      toast.success(
        previousProduct.reportCount >= 4
          ? "상품 신고가 누적되어 블라인드 처리되었어요."
          : "해당 상품을 신고했어요."
      );

      return { previousProduct };
    },
    onError: (error, data, ctx) => {
      if (isAxiosError<{ message: string }>(error))
        toast.warn(error.response?.data.message);
      queryClient.setQueryData(productQueryKey, ctx?.previousProduct);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKey });
    }
  });

  return { productReportMutate };
}
