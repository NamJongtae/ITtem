import { queryKeys } from "@/queryKeys";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useMyProfileQuery() {
  const user = useSelector((state: RootState) => state.auth.user);
  const queryKeyConfing = queryKeys.profile.my;

  const {
    data,
    isPending: queryIsPending,
    isError,
  } = useQuery({
    queryFn: queryKeyConfing.queryFn,
    queryKey: queryKeyConfing.queryKey,
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

  const loadMyProfileLoading = !!user && queryIsPending;

  return { myProfileData: data, loadMyProfileLoading };
}
