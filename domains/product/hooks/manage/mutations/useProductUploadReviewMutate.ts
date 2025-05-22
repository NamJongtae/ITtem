import uploadProductReview from "../../../api/uploadProductReview";
import { queryKeys } from "@/query-keys/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useProductUploadReviewMutate(closeModal: () => void) {
  const queryClinet = useQueryClient();
  const productManageQueryKey = queryKeys.product.manage._def;

  const { mutate: uploadReviewMutate, isPending: uploadReviewLoading } =
    useMutation({
      mutationFn: ({
        productId,
        reviewScore,
        reviewContent,
        reviewTags
      }: {
        productId: string;
        reviewScore: number;
        reviewContent: string;
        reviewTags: number[];
      }) =>
        uploadProductReview({
          productId,
          reviewScore,
          reviewContent,
          reviewTags
        }),
      onSuccess: (response) => {
        toast.success(response.data.message);
        closeModal();
        queryClinet.invalidateQueries({ queryKey: productManageQueryKey });
      },
      onError: (error) => {
        if (isAxiosError<{ message: string }>(error)) {
          toast.warn(error.response?.data.message);
        }
      }
    });
  return { uploadReviewMutate, uploadReviewLoading };
}
