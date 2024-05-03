import { uploadProduct } from "@/lib/api/product";
import { ProductResponseData } from '@/types/apiTypes';
import { ProductData } from "@/types/productTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useProductUploadMutate() {
  const router = useRouter();

  const { mutate: productUploadMuate, isPending: productUploadLoading } =
    useMutation<AxiosResponse<ProductResponseData>, AxiosError, ProductData>({
      mutationFn: async (productData) => await uploadProduct(productData),
      onSuccess: (response) => {
        router.push(`/product/${response.data.product.id}`);
      },
      onError: (error) => {
        if (isAxiosError<{ message: string }>(error)) {
          toast.warn(error.response?.data.message);
        }
      },
    });
  return { productUploadMuate, productUploadLoading };
}
