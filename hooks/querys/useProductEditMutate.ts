import { editProduct } from "@/lib/api/product";
import { ProductData } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useParams, useRouter } from "next/navigation";

export default function useProductEditMutate() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId;
  const queryClient = useQueryClient();

  const { mutate: productEditMutate, data: productData } = useMutation<
    AxiosResponse<{ product: ProductData; message: string }>,
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
