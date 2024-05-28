import { getProductReviewQueryKey } from "@/constants/constant";
import { getReview } from "@/lib/api/product";
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
  const { data, isLoading, error } = useQuery<ProductReviewData, AxiosError>({
    queryKey: getProductReviewQueryKey(productId),
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
