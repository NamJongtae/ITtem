import { productReturnRequestWithdrawal } from "@/lib/api/trading";
import { queryKeys } from "@/query-keys/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useProductReturnRequestWithdrawalMutate() {
  const queryClient = useQueryClient();
  const productManageQuerykey = queryKeys.product.manage._def;

  const { mutate } = useMutation({
    mutationFn: (productId: string) =>
      productReturnRequestWithdrawal(productId),
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: productManageQuerykey,
      });
    },
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { productReturnRequestWithdrawalMutate: mutate };
}
