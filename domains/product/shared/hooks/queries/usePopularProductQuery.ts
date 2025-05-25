import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function usePopularProductQuery() {
  const queryKeyConfig = queryKeys.product.popular;

  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn,
    staleTime: 60 * 1000
  });

  return { data, isLoading, error };
}
