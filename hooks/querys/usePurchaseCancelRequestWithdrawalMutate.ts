import { purchaseCancelRequestWithdrawal } from "@/lib/api/product";
import { queryKeys } from "@/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function usePurchaseCancelRequestWithdrawalMutate() {
  const queryClient = useQueryClient();
  const productManageQueryKey = queryKeys.product.manage._def;

  const { mutate } = useMutation({
    mutationFn: (productId: string) =>
      purchaseCancelRequestWithdrawal(productId),
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

  return { purchaseCancelRequestWithdrawalMutate: mutate };
}
