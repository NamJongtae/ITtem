import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useProductReviewQuery({
  productId,
  closeModal
}: {
  productId: string;
  closeModal: () => void;
}) {
  const productReviewQueryKey = queryKeys.product.review(productId).queryKey;

  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: productReviewQueryKey,
    queryFn: queryKeys.product.review(productId).queryFn
  });

  useEffect(() => {
    if (error) {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
        closeModal();
      }
    }
  }, [error, closeModal]);

  return { data, isLoading, error };
}
