import { purchaseRequestReject } from "@/lib/api/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function usePurchaseRequestRejectMutate() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({
      productId,
      rejectReason,
    }: {
      productId: string;
      rejectReason: string;
    }) => purchaseRequestReject(productId, rejectReason),
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

  return { purchaseRequestRejectMutate: mutate };
}
