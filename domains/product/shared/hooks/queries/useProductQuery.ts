import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useProductQuery(productId?: string) {
  const params = useParams();
  const currentProductId = productId || params?.productId;
  const queryKeyConfig = queryKeys.product.detail(currentProductId as string);

  const {
    data: productData,
    isLoading: productLoading,
    isFetching: productIsFetching,
    isPending: productIsPending,
    isFetchedAfterMount: productIsFetchedAfterMount,
    error: productError
  } = useSuspenseQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn,
    staleTime: Infinity,
    refetchOnMount: "always"
  });

  return {
    productData,
    productLoading,
    productIsPending,
    productIsFetching,
    productIsFetchedAfterMount,
    showCSRSkeleton: productIsFetching && !productIsFetchedAfterMount,
    productError
  };
}
