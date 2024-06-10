import { getProductQueryKey } from "@/constants/constant";
import { getProduct } from "@/lib/api/product";
import { ProductDetailData } from "@/types/productTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export default function useProductQuery(isEdit?: boolean, productId?: string) {
  const router = useRouter();
  const currentProductId = productId || router.query?.productId;

  const {
    data: productDetailData,
    isLoading: loadProductLoading,
    error: loadProductError,
  } = useQuery<ProductDetailData, AxiosError>({
    queryFn: async () => {
      const response = await getProduct(currentProductId as string);
      return response.data.product;
    },
    queryKey: getProductQueryKey(currentProductId as string),
    enabled: isEdit || !!currentProductId,
    staleTime: 30 * 1000,
  });

  return { productDetailData, loadProductLoading, loadProductError };
}
