import { MY_PROFILE_QUERY_KEY } from "@/constants/constant";
import { getMyProfile } from "@/lib/api/auth";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useMyProfileQuery() {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data, isPending, isError } = useQuery({
    queryFn: async () => {
      const response = await getMyProfile();
      return response.data.profile;
    },
    queryKey: MY_PROFILE_QUERY_KEY,
    enabled: !!user,
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (isError) {
      toast.warn(
        "나의 프로필 정보를 가져오는데 실패했어요.\n로그인 정보를 확인해주세요."
      );
    }
  }, [isError]);
  
  return { myProfileData: data, loadMyProfileLoading: isPending };
}
