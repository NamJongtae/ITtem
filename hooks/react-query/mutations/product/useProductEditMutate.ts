import { editProduct } from "@/lib/api/product";
import { ProductResponseData } from "@/types/api-types";
import { ProductData } from "@/types/product-types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams, useRouter } from "next/navigation";

export default function useProductEditMutate() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId || "";

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
