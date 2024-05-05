import { getProfileQueryKey } from "@/constants/constant";
import { getUserProfile } from "@/lib/api/auth";
import { ProfileData } from '@/types/authTypes';
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useProfileQuery(uid: string) {
  const {
    data: profileData,
    isLoading: loadProfileDataLoading,
    error: loadProfileDataError,
  } = useQuery<ProfileData, AxiosError>({
    queryKey: getProfileQueryKey(uid),
    queryFn: async () => {
      const response = await getUserProfile(uid);
      return response.data.profile;
    },
  });

  return { profileData, loadProfileDataLoading, loadProfileDataError };
}
