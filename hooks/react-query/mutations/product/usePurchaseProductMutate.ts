import { purchaseProduct } from "@/lib/api/product";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function usePurchaseProductMutate() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId || "";

  const { mutate: purchaseProductMutate } = useMutation({
    mutationFn: () => purchaseProduct(productId as string),
    onSuccess: async (response) => {
      await router.push(`/product/manage`);
      toast.success(response.data.message);
    },
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      }
    },
  });

  return { purchaseProductMutate };
}
