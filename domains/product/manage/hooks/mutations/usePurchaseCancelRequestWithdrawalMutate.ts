import purchaseCancelRequestWithdrawal from "../../api/purchaseCancelRequestWithdrawal";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function usePurchaseCancelRequestWithdrawalMutate() {
  const queryClient = useQueryClient();
  const productManageQueryKey = queryKeys.product.manage._def;
  const { actions } = useGlobalLoadingStore();

  const { mutate } = useMutation({
    mutationFn: (productId: string) =>
      purchaseCancelRequestWithdrawal(productId),
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: productManageQueryKey
      });
    },
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
    onSettled: () => {
      actions.stopLoading();
    }
  });

  return { purchaseCancelRequestWithdrawalMutate: mutate };
}
