import { reportProduct } from "@/lib/api/product";
import { queryKeys } from "@/query-keys/query-keys";
import { RootState } from "@/store/store";
import { ProductDetailData } from "@/types/product-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useProductReportMutate() {
  const params = useParams();
  const productId = params?.productId || "";
  const queryClient = useQueryClient();
  const productQueryKey = queryKeys.product.detail(
    productId as string
  ).queryKey;
  const myUid = useSelector((state: RootState) => state.auth.user);

  const { mutate: productReportMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    undefined,
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
        block: previousProduct.reportCount >= 4,
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
    },
  });

  return { productReportMutate };
}
