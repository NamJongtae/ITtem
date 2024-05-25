import { deleteProduct } from "@/lib/api/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useProductDeleteMutate(productId?: string) {
  const router = useRouter();
  const currentProductId = router.query?.productId || productId;
  const queryClient = useQueryClient();

  const { mutate: productDeleteMutate, isPending: productDeleteLoading } =
    useMutation({
      mutationFn: () => deleteProduct(currentProductId as string),
      onSuccess: async (response) => {
        queryClient.invalidateQueries({
          queryKey: ["product"],
        });
        if (router.query?.productId) {
          await router.replace("/");
        }

        toast.success(response.data.message);
      },
      onError: (error) => {
        if (isAxiosError<{ message: string }>(error)) {
          toast.warn(error.response?.data.message);
        }
      },
    });

  return { productDeleteMutate, productDeleteLoading };
}
