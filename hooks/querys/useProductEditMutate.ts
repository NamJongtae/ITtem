import { editProduct } from "@/lib/api/product";
import { ProductResponseData } from '@/types/apiTypes';
import { ProductData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams, useRouter } from "next/navigation";

export default function useProductEditMutate() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId;
  const queryClient = useQueryClient();

  const { mutateAsync: productEditMutate, data: productData} = useMutation<
    AxiosResponse<ProductResponseData>,
    AxiosError,
    Partial<ProductData>
  >({
    mutationFn: (productData: Partial<ProductData>) =>
      editProduct(productId as string, productData),
    onSuccess: (response) => {
      router.push(`/product/${response.data.product.id}`);
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });

  return { productEditMutate, productData };
}
