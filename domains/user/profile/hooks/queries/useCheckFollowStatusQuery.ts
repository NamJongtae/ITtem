import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { useQuery } from "@tanstack/react-query";

export default function useCheckFollowStatusQuery(uid: string) {
  const user = useAuthStore((state) => state.user);
  const queryKeyConfing = queryKeys.profile.user(uid)._ctx.isFollow;

  const {
    data: isFollow,
    isLoading: isFollowLoading,
    isPending: isFollowPending,
    isFetching: isFollowFetching,
    isFetchedAfterMount: isFollowFetchedAfterMount,
    isError: isFollowError
  } = useQuery({
    queryFn: queryKeyConfing.queryFn,
    queryKey: queryKeyConfing.queryKey,
    enabled: !!user && !!uid,
    staleTime: 0,
    refetchOnMount: true
  });

  return {
    isFollow,
    isFollowLoading,
    isFollowPending,
    isFollowFetching,
    showSkeleton: isFollowFetching && !isFollowFetchedAfterMount,
    isFollowError
  };
}
