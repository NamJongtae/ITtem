import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useProfileQuery from "./useProfileQuery";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";

export default function useUserProfilePageQueries() {
  const myProfileQueryKeyConfing = queryKeys.profile.my;
  const user = useAuthStore((state) => state.user);

  const { profileData, profileError, profileSuccess } = useProfileQuery();

  const {
    data: myProfileData,
    isSuccess: myProfileSuccess,
    isError: myProfileError
  } = useQuery({
    queryKey: myProfileQueryKeyConfing.queryKey,
    queryFn: myProfileQueryKeyConfing.queryFn,
    enabled: !!user
  });

  const isAllFinished =
    (myProfileSuccess || myProfileError) && (profileSuccess || profileError);

  const isLoading = !isAllFinished;
  const isError = isAllFinished && (profileError || myProfileError);

  return { profileData, myProfileData, isLoading, isError };
}
