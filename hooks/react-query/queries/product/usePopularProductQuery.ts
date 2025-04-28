import { queryKeys } from "@/query-keys/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function usePopularProductQuery() {
  const queryKeyConfig = queryKeys.product.popular;

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn,
    staleTime: 60 * 1000
  });

  return { data, isLoading, error };
}
