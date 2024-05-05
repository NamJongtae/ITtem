import { uploadProduct } from "@/lib/api/product";
import { ProductResponseData } from "@/types/apiTypes";
import { ProductUploadData } from "@/types/productTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export default function useProductUploadMutate() {
  const router = useRouter();

  const {
    mutateAsync: productUploadMuate,
    isPending: productUploadLoading,
    data: productUploadResposeData,
  } = useMutation<
    AxiosResponse<ProductResponseData>,
    AxiosError,
    ProductUploadData
  >({
    mutationFn: async (productData) => await uploadProduct(productData),
    onSuccess: (response) => {
      router.push(`/product/${response.data.product.id}`);
    },
  });
  return { productUploadMuate, productUploadLoading, productUploadResposeData };
}
