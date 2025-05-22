import productReturnConfirmation from "../../../api/manage/productReturnConfirmation";
import { queryKeys } from "@/query-keys/query-keys";
import useGlobalLoadingStore from "@/store/global-loging-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useReturnConfirmationMutate() {
  const queryClient = useQueryClient();
  const productManageQueryKey = queryKeys.product.manage._def;
  const { actions } = useGlobalLoadingStore();

  const { mutate } = useMutation({
    mutationFn: (productId: string) => productReturnConfirmation(productId),
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

  return { productReturnConfirmationMutate: mutate };
}
