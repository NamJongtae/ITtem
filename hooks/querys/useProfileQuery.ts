import { getProfileQueryKey } from "@/constants/constant";
import { getUserProfile } from "@/lib/api/auth";
import { ProfileData } from "@/types/authTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

export default function useProfileQuery(uid?: string) {
  const router = useRouter();
  const currentUid = uid || router.query?.uid || "";

  const {
    data: profileData,
    isLoading: loadProfileDataLoading,
    error: loadProfileDataError,
  } = useQuery<ProfileData, AxiosError>({
    queryKey: getProfileQueryKey(uid as string),
    queryFn: async () => {
      const response = await getUserProfile(currentUid as string);
      return response.data.profile;
    },
    enabled: !!currentUid,
    staleTime: 30 * 1000,
  });

  return { profileData, loadProfileDataLoading, loadProfileDataError };
}
