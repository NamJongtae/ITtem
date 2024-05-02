import { getProduct } from "@/lib/api/product";
import { ProductData } from "@/types/productTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";

export default function useProductQuery(isEdit: boolean | undefined) {
  const params = useParams();
  const productId = params?.productId;

  const {
    data: productData,
    isLoading: loadProductLoading,
    error: loadProductError,
  } = useQuery<ProductData, AxiosError>({
    queryFn: () => {
      const product = getProduct(productId as string);
      return product;
    },
    queryKey: ["product", productId],
    enabled: isEdit && !!productId,
  });

  return { productData, loadProductLoading, loadProductError };
}
