import { getProductQueryKey } from "@/constants/constant";
import { getProduct } from "@/lib/api/product";
import { ProductDetailData } from "@/types/productTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export default function useProductQuery(isEdit?: boolean) {
  const router = useRouter();
  const productId = router.query?.productId;

  const {
    data: productData,
    isLoading: loadProductLoading,
    error: loadProductError,
  } = useQuery<ProductDetailData, AxiosError>({
    queryFn: async () => {
      const response = await getProduct(productId as string);
      return response.data.product;
    },
    queryKey: getProductQueryKey(productId as string),
    enabled: isEdit || !!productId,
  });

  return { productData, loadProductLoading, loadProductError };
}
