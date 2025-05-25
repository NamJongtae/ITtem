import productReturnDeliveryConfirmation from "../../api/productReturnDeliveryConfirmation";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useProductReturnDeliveryConfirmationMutate() {
  const queryClient = useQueryClient();
  const productManageQuerykey = queryKeys.product.manage._def;
  const { actions } = useGlobalLoadingStore();

  const { mutate } = useMutation({
    mutationFn: (productId: string) =>
      productReturnDeliveryConfirmation(productId),
    onMutate: () => {
      actions.startLoading();
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({
        queryKey: productManageQuerykey
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

  return { productReturnDeliveryConfirmationMutate: mutate };
}
