import { deleteProduct } from "@/lib/api/product";
import { queryKeys } from "@/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useProductDeleteMutate(productId?: string) {
  const router = useRouter();
  const currentProductId = router.query?.productId || productId;
  const queryClient = useQueryClient();
  const productQueryKey = queryKeys.product._def;

  const { mutate: productDeleteMutate, isPending: productDeleteLoading } =
    useMutation({
      mutationFn: () => deleteProduct(currentProductId as string),
      onSuccess: async (response) => {
        queryClient.removeQueries({
          queryKey: productQueryKey,
        });
        if (router.query?.productId) {
          router.replace("/product");
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
