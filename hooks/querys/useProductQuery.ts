import { getProductQueryKey } from '@/constants/constant';
import { getProduct } from "@/lib/api/product";
import { ProductData } from "@/types/productTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";

export default function useProductQuery(isEdit?: boolean) {
  const params = useParams();
  const productId = params?.productId || "";

  const {
    data: productData,
    isLoading: loadProductLoading,
    error: loadProductError,
  } = useQuery<ProductData, AxiosError>({
    queryFn: async () => {
      const response = await getProduct(productId as string);
      return response.data.product;
    },
    queryKey: getProductQueryKey(productId as string),
    enabled: isEdit || !!productId,
  });

  return { productData, loadProductLoading, loadProductError };
}
