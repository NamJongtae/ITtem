import { deleteProduct } from "@/lib/api/product";
import { queryKeys } from "@/query-keys/query-keys";
import useGlobalLoadingStore from "@/store/global-loging-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useProductDeleteMutate(productId?: string) {
  const router = useRouter();
  const params = useParams();
  const currentProductId = params?.productId || productId;
  const { actions } = useGlobalLoadingStore();
  const queryClient = useQueryClient();
  const productQueryKey = queryKeys.product._def;

  const { mutate: productDeleteMutate, isPending: productDeleteLoading } =
    useMutation({
      mutationFn: () => deleteProduct(currentProductId as string),
      onMutate: () => {
        actions.startLoading();
      },
      onSuccess: async (response) => {
        if (params?.productId) {
          router.replace("/product");
        } else {
          queryClient.invalidateQueries({ queryKey: productQueryKey });
        }

        toast.success(response.data.message);
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

  return { productDeleteMutate, productDeleteLoading };
}
