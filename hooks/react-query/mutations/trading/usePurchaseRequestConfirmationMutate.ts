import { purchaseRequestConfirmation } from "@/lib/api/trading";
import { queryKeys } from "@/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function usePurchaseRequestConfirmationMutate() {
  const queryClient = useQueryClient();
  const productManageQueryKey = queryKeys.product.manage._def;

  const { mutate } = useMutation({
    mutationFn: (productId: string) => purchaseRequestConfirmation(productId),
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: productManageQueryKey,
      });
    },
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { purchaseRequestConfirmationMutate: mutate };
}
