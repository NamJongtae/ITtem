import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useProfileQuery(uid?: string) {
  const params = useParams();
  const currentUid = uid || params?.uid || "";
  const queryKeyConfig = queryKeys.profile.user(currentUid as string);

  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
    isSuccess: profileSuccess,
    isFetching: profileIsFetching,
    isFetchedAfterMount: profileIsFetchedAfterMount
  } = useSuspenseQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn,
    staleTime: Infinity,
    refetchOnMount: "always"
  });

  return {
    profileData,
    profileLoading,
    profileIsFetching,
    showCSRSkeleton: profileIsFetching && !profileIsFetchedAfterMount,
    profileError,
    profileSuccess
  };
}
