import { reportProduct } from "@/lib/api/product";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function useProductReportMutate() {
  const router = useRouter();
  const productId = router.query?.productId || "";

  const { mutate: productReportMutate } = useMutation({
    mutationFn: () => reportProduct(productId as string),
    onSuccess: (response) => {
      toast.success(response.data.message);
    },
    onError: (error) => {
      if (isAxiosError<{ message: string }>(error))
        toast.warn(error.response?.data.message);
    },
  });

  return { productReportMutate };
}
