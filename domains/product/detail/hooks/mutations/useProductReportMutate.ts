import reportProduct from "../../api/reportProduct";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProductDetailData } from "../../types/productDetailTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useProductReportMutate() {
  const router = useRouter();
  const params = useParams();
  const productId = (params?.productId as string) || "";
  const queryClient = useQueryClient();

  const productQueryKey = queryKeys.product.detail(productId).queryKey;

  const { mutate: productReportMutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError,
    void,
    { previousProduct?: ProductDetailData; newProduct?: ProductDetailData }
  >({
    mutationFn: () => reportProduct(productId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: productQueryKey });

      const previousProduct = queryClient.getQueryData(productQueryKey) as
        | ProductDetailData
        | undefined;

      if (!previousProduct || previousProduct.isReported) {
        return { previousProduct };
      }

      const nextReportCount = (previousProduct.reportCount ?? 0) + 1;

      const newProduct: ProductDetailData = {
        ...previousProduct,
        isReported: true,
        reportCount: nextReportCount,
        block: nextReportCount >= 5
      };

      queryClient.setQueryData(productQueryKey, newProduct);

      return { previousProduct, newProduct };
    },

    onSuccess: (_res, _data, ctx) => {
      const p = ctx?.newProduct;
      if (!p) return;

      toast.success(
        p.block
          ? "상품 신고가 누적되어 블라인드 처리되었어요."
          : "해당 상품을 신고했어요."
      );

      router.replace("/product")
    },

    onError: (error, _data, ctx) => {
      if (ctx?.previousProduct) {
        queryClient.setQueryData(productQueryKey, ctx.previousProduct);
      }
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      } else {
        toast.warn("상품 신고에 실패했어요.");
      }
    },

    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: productQueryKey });
    }
  });

  return { productReportMutate };
}
