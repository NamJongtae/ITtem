import { productReturnReject } from "@/lib/api/trading";
import { queryKeys } from "@/query-keys/query-keys";
import useGlobalLoadingStore from "@/store/global-loging-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useReturnRejectMutate() {
  const queryClient = useQueryClient();
  const productManageQueryKey = queryKeys.product.manage._def;
  const { actions } = useGlobalLoadingStore();

  const { mutate } = useMutation({
    mutationFn: ({
      productId,
      rejectReason
    }: {
      productId: string;
      rejectReason: string;
    }) => productReturnReject(productId, rejectReason),
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
      actions.startLoading();
    }
  });

  return { returnRejectMutate: mutate };
}
