import { purchaseCancelRequest } from "@/lib/api/trading";
import { queryKeys } from "@/query-keys/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function usePurchaseCancelRequestMutate() {
  const queryClient = useQueryClient();
  const productManageQueryKey = queryKeys.product.manage._def;

  const { mutate } = useMutation({
    mutationFn: ({
      productId,
      cancelReason,
    }: {
      productId: string;
      cancelReason: string;
    }) => purchaseCancelRequest(productId, cancelReason),
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

  return { purchaseCancelRequestMutate: mutate };
}
