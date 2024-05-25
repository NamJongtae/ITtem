import { purchaseCancelConfirmation } from "@/lib/api/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useCancelConfirmationMutate() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (productId: string) => purchaseCancelConfirmation(productId),
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

  return { purchaseCancelConfirmationMutate: mutate };
}
