import { editProduct } from "@/lib/api/product";
import { ProductResponseData } from "@/types/apiTypes";
import { ProductData } from "@/types/productTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";

export default function useProductEditMutate() {
  const router = useRouter();
  const productId = router.query?.productId;

  const { mutateAsync: productEditMutate } = useMutation<
    AxiosResponse<ProductResponseData>,
    AxiosError,
    Partial<ProductData>
  >({
    mutationFn: (productData: Partial<ProductData>) =>
      editProduct(productId as string, productData),
    onSuccess: async (response) => {
      await router.push(`/product/${response.data.product._id}`);
    },
  });

  return { productEditMutate };
}
