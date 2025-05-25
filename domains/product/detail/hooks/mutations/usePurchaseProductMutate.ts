import purchaseProduct from "../../api/purchaseProduct";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function usePurchaseProductMutate() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId || "";
  const { actions } = useGlobalLoadingStore();

  const { mutate: purchaseProductMutate } = useMutation({
    mutationFn: () => purchaseProduct(productId as string),
    onMutate: () => {
      actions.startLoading();
    },
    onSuccess: (response) => {
      router.push("/product/manage?menu=purchase");
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

  return { purchaseProductMutate };
}
