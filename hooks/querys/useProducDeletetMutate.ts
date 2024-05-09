import { PRODUCT_TODAY_LIST_QUERY_KEY } from "@/constants/constant";
import { deleteProduct } from "@/lib/api/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useProductDeleteMutate() {
  const router = useRouter();
  const productId = router.query?.productId;
  const queryClient = useQueryClient();

  const { mutate: productDeleteMutate, isPending: productDeleteLoading } =
    useMutation({
      mutationFn: () => deleteProduct(productId as string),
      onSuccess: async (response) => {
        queryClient.invalidateQueries({
          queryKey: ["product"],
        });
        await router.replace("/");
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
