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
    isSuccess: profileSuccess
  } = useSuspenseQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn,
    staleTime: 30 * 1000
  });

  return { profileData, profileLoading, profileError, profileSuccess };
}
