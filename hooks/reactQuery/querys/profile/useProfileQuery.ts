import { queryKeys } from "@/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useProfileQuery(uid?: string) {
  const router = useRouter();
  const currentUid = uid || router.query?.uid || "";
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
