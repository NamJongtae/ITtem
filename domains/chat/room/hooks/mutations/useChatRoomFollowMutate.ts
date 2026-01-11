import followUser from "@/domains/user/shared/api/followUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import { isFetchError } from "@/shared/common/utils/isFetchError";

export default function useChatRoomFollowMutate(uid: string) {
  const queryClient = useQueryClient();
  const myUid = useAuthStore((s) => s.user?.uid ?? "");

  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings({
    uid: myUid,
    limit: 10
  }).queryKey;

  const targetProfileQueryKey = queryKeys.profile.user(uid).queryKey;
  const targetFollowersQueryKey = queryKeys.profile.user(uid)._ctx.followers({
    uid,
    limit: 10
  }).queryKey;

  // ✅ (UI동기화용) 상대의 팔로잉 목록에 "내 카드"가 있을 수 있음
  const targetFollowingsQueryKey = queryKeys.profile.user(uid)._ctx.followings({
    uid,
    limit: 10
  }).queryKey;

  const { mutate: userFollowMutate } = useMutation({
    mutationFn: () => followUser(uid),

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: targetProfileQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowersQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowingsQueryKey })
      ]);

      const previousTargetProfile = queryClient.getQueryData(
        targetProfileQueryKey
      ) as ProfileData | undefined;

      /** ✅ 1) 상대 프로필: followersCount +1, isFollow true */
      if (previousTargetProfile) {
        queryClient.setQueryData(targetProfileQueryKey, {
          ...previousTargetProfile,
          followersCount: (previousTargetProfile.followersCount || 0) + 1,
          isFollow: true
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
          toast.warn("이미 팔로우한 유저에요.");
        } else {
          toast.warn("유저 팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요.");
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

  return { userFollowMutate };
}
