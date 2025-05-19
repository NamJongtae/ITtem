import { queryKeys } from "@/query-keys/query-keys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useProductQuery(productId?: string) {
  const params = useParams();
  const currentProductId = productId || params?.productId;
  const queryKeyConfig = queryKeys.product.detail(currentProductId as string);

  const {
    data: productData,
    isLoading: productLoading,
    error: productError
  } = useSuspenseQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn,
    staleTime: 30 * 1000
  });

  return { productData, productLoading, productError };
}
