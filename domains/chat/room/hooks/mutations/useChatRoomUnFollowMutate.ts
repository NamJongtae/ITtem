import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { isFetchError } from "@/shared/common/utils/isFetchError";

export default function useChatRoomUnFollowMutate(uid: string) {
  const queryClient = useQueryClient();
  const myUid = useAuthStore((s) => s.user?.uid ?? "");

  // ✅ 내 프로필
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  // ✅ 내 팔로잉 목록 (내가 팔로우한 사람들)
  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings({
    uid: myUid,
    limit: 10
  }).queryKey;

  // ✅ 언팔로우 대상(상대) 프로필
  const targetProfileQueryKey = queryKeys.profile.user(uid).queryKey;

  // ✅ 상대 팔로워 목록 (상대를 팔로우하는 사람들 => 여기서 "나"가 빠져야 함)
  const targetFollowersQueryKey = queryKeys.profile.user(uid)._ctx.followers({
    uid,
    limit: 10
  }).queryKey;

  // ✅ 추가: 상대의 팔로잉 목록 (내 정보가 있을 수 있음)
  const targetFollowingsQueryKey = queryKeys.profile.user(uid)._ctx.followings({
    uid,
    limit: 10
  }).queryKey;

  const { mutate: userUnFollowMutate } = useMutation({
    mutationFn: () => unfollowUser(uid),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: targetProfileQueryKey });

      const previousTargetProfile = queryClient.getQueryData(
        targetProfileQueryKey
      ) as ProfileData | undefined;

      /** ✅ 상대 프로필: followersCount -1 + isFollow false */
      if (previousTargetProfile) {
        queryClient.setQueryData(targetProfileQueryKey, {
          ...previousTargetProfile,
          followersCount: Math.max(
            (previousTargetProfile.followersCount || 0) - 1,
            0
          ),
          isFollow: false
        });
      }

      return {
        previousTargetProfile
      };
    },

    onError: (error, _vars, ctx) => {
      queryClient.setQueryData(
        targetProfileQueryKey,
        ctx?.previousTargetProfile
      );

      if (isFetchError(error)) {
        if (error.status === 409) {
          toast.warn("이미 언팔로우한 유저에요.");
        } else {
          toast.warn(
            "유저 언팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요."
          );
        }
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: myFollowingsQueryKey });
      queryClient.invalidateQueries({ queryKey: targetFollowersQueryKey });
      queryClient.invalidateQueries({ queryKey: targetFollowingsQueryKey });
    }
  });

  return { userUnFollowMutate };
}
