import { queryKeys } from "@/query-keys/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useProductQuery(isEdit?: boolean, productId?: string) {
  const params = useParams();
  const currentProductId = productId || params?.productId;
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
