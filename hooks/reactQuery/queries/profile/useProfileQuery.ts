import { queryKeys } from "@/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useProfileQuery(uid?: string) {
  const searchParams = useSearchParams();
  const currentUid = uid || searchParams.get("uid") || "";
  const queryKeyConfig = queryKeys.profile.user(currentUid as string);

  const {
    data: profileData,
    isLoading: loadProfileDataLoading,
    error: loadProfileDataError,
  } = useQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn,
    enabled: !!currentUid,
    staleTime: 30 * 1000,
  });

  return { profileData, loadProfileDataLoading, loadProfileDataError };
}
