import { getReview } from "@/lib/api/product";
import { queryKeys } from "@/queryKeys";
import { ProductReviewData } from "@/types/productTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useProductReviewQuery({
  productId,
  closeModal,
}: {
  productId: string;
  closeModal: () => void;
}) {
  const productReviewQueryKey = queryKeys.product.review(productId).queryKey;

  const { data, isLoading, error } = useQuery<ProductReviewData, AxiosError>({
    queryKey: productReviewQueryKey,
    queryFn: async () => {
      const response = await getReview(productId);
      return response.data.review;
    },
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
