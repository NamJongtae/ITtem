import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { FollowUserData, ProfileData } from "../../types/profileTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isFetchError } from "@/shared/common/utils/isFetchError";

type InfiniteFollowList = InfiniteData<FollowUserData[], unknown>;

export default function useMyProfileUnfollowInListMutate(uid: string) {
  const queryClient = useQueryClient();
  const myUid = useAuthStore((s) => s.user?.uid ?? "");

  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const myFollowersQueryKey = queryKeys.profile.my._ctx.followers({
    uid: myUid,
    limit: 10
  }).queryKey;

  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings({
    uid: myUid,
    limit: 10
  }).queryKey;

  const { mutate: myProfileUnfollowMutate } = useMutation({
    mutationFn: () => unfollowUser(uid),

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: myProfileQueryKey }),
        queryClient.cancelQueries({ queryKey: myFollowersQueryKey }),
        queryClient.cancelQueries({ queryKey: myFollowingsQueryKey })
      ]);

      const previousMyProfile = queryClient.getQueryData(myProfileQueryKey) as
        | ProfileData
        | undefined;

      const previousMyFollowers = queryClient.getQueryData(
        myFollowersQueryKey
      ) as InfiniteFollowList | undefined;

      const previousMyFollowings = queryClient.getQueryData(
        myFollowingsQueryKey
      ) as InfiniteFollowList | undefined;

      /** ✅ 내 프로필: followingsCount -1 */
      if (previousMyProfile) {
        queryClient.setQueryData(myProfileQueryKey, {
          ...previousMyProfile,
          followingsCount: Math.max(
            (previousMyProfile.followingsCount || 0) - 1,
            0
          )
        });
      }

      /**
       * ✅ 내 팔로잉 목록: uid 제거
       * - 언팔로우하면 내 팔로잉 목록에서 사라지는게 UX적으로 자연스러움
       */
      if (previousMyFollowings) {
        const updatedFollowings: InfiniteFollowList = {
          ...previousMyFollowings,
          pages: previousMyFollowings.pages.map((page) =>
            page.filter((profile) => profile.uid !== uid)
          )
        };

        queryClient.setQueryData(myFollowingsQueryKey, updatedFollowings);
      }

      /**
       * ✅ 내 팔로워 목록: (있다면) uid 항목의 isFollow만 false로 변경
       * - 팔로워 목록은 "내가 나를 팔로우하는 사람들"
       * - 그 안에서 특정 유저를 내가 팔로우 중/아닌지 표시할 수도 있으니 patch
       */
      if (previousMyFollowers) {
        const updatedFollowers: InfiniteFollowList = {
          ...previousMyFollowers,
          pages: previousMyFollowers.pages.map((page) =>
            page.map((profile) =>
              profile.uid === uid
                ? {
                    ...profile,
                    isFollow: false,
                    // 이 값은 "그 유저의 followersCount"를 의미하면 -1 가능
                    followersCount: Math.max(
                      (profile.followersCount || 0) - 1,
                      0
                    )
                  }
                : profile
            )
          )
        };

        queryClient.setQueryData(myFollowersQueryKey, updatedFollowers);
      }

      return {
        previousMyProfile,
        previousMyFollowers,
        previousMyFollowings
      };
    },

    onError: (error, _vars, ctx) => {
      queryClient.setQueryData(myProfileQueryKey, ctx?.previousMyProfile);

      if (ctx?.previousMyFollowers) {
        queryClient.setQueryData(myFollowersQueryKey, ctx.previousMyFollowers);
      }

      if (ctx?.previousMyFollowings) {
        queryClient.setQueryData(
          myFollowingsQueryKey,
          ctx.previousMyFollowings
        );
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

    onSettled: () => {}
  });

  return { myProfileUnfollowMutate };
}
