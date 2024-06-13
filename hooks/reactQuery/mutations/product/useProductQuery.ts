import { queryKeys } from "@/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useProductQuery(isEdit?: boolean, productId?: string) {
  const router = useRouter();
  const currentProductId = productId || router.query?.productId;
  const queryKeyConfig = queryKeys.product.detail(currentProductId as string);

  const {
    data: productDetailData,
    isLoading: loadProductLoading,
    error: loadProductError,
  } = useQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn,
    enabled: isEdit || !!currentProductId,
    staleTime: 30 * 1000,
  });

  return { productDetailData, loadProductLoading, loadProductError };
}
