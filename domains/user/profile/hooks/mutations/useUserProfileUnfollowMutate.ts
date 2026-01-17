import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProfileData } from "../../types/profileTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { isFetchError } from "@/shared/common/utils/isFetchError";

type InfiniteProfileList = InfiniteData<ProfileData[], unknown>;

export default function useUserProfileUnfollowMutate(uid: string) {
  const queryClient = useQueryClient();
  const myUid = useAuthStore((s) => s.user?.uid ?? "");

  // ✅ 언팔로우 대상(상대) 프로필
  const targetProfileQueryKey = queryKeys.profile.user(uid).queryKey;

  // ✅ 상대 팔로워 목록
  const targetFollowersQueryKey = queryKeys.profile.user(uid)._ctx.followers({
    uid,
    limit: 10
  }).queryKey;

  // ✅ 상대의 팔로잉 목록 (내 정보가 있을 수 있음)
  const targetFollowingsQueryKey = queryKeys.profile.user(uid)._ctx.followings({
    uid,
    limit: 10
  }).queryKey;

  // ✅ 추가: isFollowQuery key
  const targetFollowStatusQueryKey =
    queryKeys.profile.user(uid)._ctx.isFollow.queryKey;

  const { mutate: userUnfollowMutate } = useMutation({
    mutationFn: () => unfollowUser(uid),

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: targetProfileQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowersQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowingsQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowStatusQueryKey })
      ]);

      const previousTargetProfile = queryClient.getQueryData(
        targetProfileQueryKey
      ) as ProfileData | undefined;

      const previousTargetFollowers = queryClient.getQueryData(
        targetFollowersQueryKey
      ) as InfiniteProfileList | undefined;

      const previousTargetFollowings = queryClient.getQueryData(
        targetFollowingsQueryKey
      ) as InfiniteProfileList | undefined;

      const previousFollowStatus = queryClient.getQueryData(
        targetFollowStatusQueryKey
      ) as boolean | undefined;

      /** ✅ 상대 프로필: followersCount -1 */
      if (previousTargetProfile) {
        queryClient.setQueryData(targetProfileQueryKey, {
          ...previousTargetProfile,
          followersCount: Math.max(
            (previousTargetProfile.followersCount || 0) - 1,
            0
          )
        });
      }

      /** ✅ isFollowQuery: false */
      queryClient.setQueryData(targetFollowStatusQueryKey, false);

      /** ✅ 상대의 팔로워 목록에서 "나(myUid)" 제거 */
      if (previousTargetFollowers && myUid) {
        const updatedTargetFollowers: InfiniteProfileList = {
          ...previousTargetFollowers,
          pages: previousTargetFollowers.pages.map((page) =>
            page.filter((p) => p.uid !== myUid)
          )
        };

        queryClient.setQueryData(
          targetFollowersQueryKey,
          updatedTargetFollowers
        );
      }

      /** ✅ 상대의 팔로잉 목록에서 "나(myUid)"를 찾아서 followingsCount -1 */
      if (previousTargetFollowings && myUid) {
        const updatedTargetFollowings: InfiniteProfileList = {
          ...previousTargetFollowings,
          pages: previousTargetFollowings.pages.map((page) =>
            page.map((user) =>
              user.uid === myUid
                ? {
                    ...user,
                    followingsCount: Math.max(
                      (user.followingsCount || 0) - 1,
                      0
                    )
                  }
                : user
            )
          )
        };

        queryClient.setQueryData(
          targetFollowingsQueryKey,
          updatedTargetFollowings
        );
      }

      return {
        previousTargetProfile,
        previousTargetFollowers,
        previousTargetFollowings,
        previousFollowStatus
      };
    },

    onError: (error, _vars, ctx) => {
      queryClient.setQueryData(
        targetProfileQueryKey,
        ctx?.previousTargetProfile
      );

      if (ctx?.previousTargetFollowers) {
        queryClient.setQueryData(
          targetFollowersQueryKey,
          ctx.previousTargetFollowers
        );
      }

      if (ctx?.previousTargetFollowings) {
        queryClient.setQueryData(
          targetFollowingsQueryKey,
          ctx.previousTargetFollowings
        );
      }

      if (ctx?.previousFollowStatus) {
        queryClient.setQueryData(
          targetFollowStatusQueryKey,
          ctx.previousFollowStatus
        );
      } else {
        queryClient.removeQueries({ queryKey: targetFollowStatusQueryKey });
      }

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
      queryClient.invalidateQueries({ queryKey: targetFollowStatusQueryKey });
    }
  });

  return { userUnfollowMutate };
}
