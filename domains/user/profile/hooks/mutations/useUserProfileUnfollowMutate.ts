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

type InfiniteProfileList = InfiniteData<ProfileData[], unknown>;

export default function useUserProfileUnfollowMutate(uid: string) {
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

  const { mutate: userUnfollowMutate } = useMutation({
    mutationFn: () => unfollowUser(uid),

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: targetProfileQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowersQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowingsQueryKey })
      ]);

      const previousMyProfile = queryClient.getQueryData(myProfileQueryKey) as
        | ProfileData
        | undefined;

      const previousMyFollowings = queryClient.getQueryData(
        myFollowingsQueryKey
      ) as InfiniteProfileList | undefined;

      const previousTargetProfile = queryClient.getQueryData(
        targetProfileQueryKey
      ) as ProfileData | undefined;

      const previousTargetFollowers = queryClient.getQueryData(
        targetFollowersQueryKey
      ) as InfiniteProfileList | undefined;

      const previousTargetFollowings = queryClient.getQueryData(
        targetFollowingsQueryKey
      ) as InfiniteProfileList | undefined;

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
        previousMyProfile,
        previousMyFollowings,
        previousTargetProfile,
        previousTargetFollowers,
        previousTargetFollowings
      };
    },

    onError: (_error, _vars, ctx) => {
      queryClient.setQueryData(myProfileQueryKey, ctx?.previousMyProfile);

      if (ctx?.previousMyFollowings) {
        queryClient.setQueryData(
          myFollowingsQueryKey,
          ctx.previousMyFollowings
        );
      }

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

      toast.warn("유저 언팔로우에 실패했어요.\n잠시 후 다시 시도해주세요.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: myFollowingsQueryKey });
    }
  });

  return { userUnfollowMutate };
}
