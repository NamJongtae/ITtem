import { productReturnRequest } from "@/lib/api/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useProductReturnRequestMutate() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({
      productId,
      returnReason,
    }: {
      productId: string;
      returnReason: string;
    }) => productReturnRequest(productId, returnReason),
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: ["product", "manage"],
      });
    },
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { productReturnRequestMutate: mutate };
}