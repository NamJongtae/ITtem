import followUser from "@/domains/user/shared/api/followUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { FollowUserData, ProfileData } from "../../types/profileTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { isFetchError } from "@/shared/common/utils/isFetchError";

type InfiniteProfileList = InfiniteData<FollowUserData[], unknown>;

export default function useUserProfileFollowMutate(uid: string) {
  const queryClient = useQueryClient();
  const myUid = useAuthStore((s) => s.user?.uid ?? "");

  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const targetProfileQueryKey = queryKeys.profile.user(uid).queryKey;
  const targetFollowersQueryKey = queryKeys.profile.user(uid)._ctx.followers({
    uid,
    limit: 10
  }).queryKey;

  const targetFollowingsQueryKey = queryKeys.profile.user(uid)._ctx.followings({
    uid,
    limit: 10
  }).queryKey;

  const targetFollowStatusQueryKey =
    queryKeys.profile.user(uid)._ctx.isFollow.queryKey;

  const { mutate: userFollowMutate } = useMutation({
    mutationFn: () => followUser(uid),

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: targetProfileQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowersQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowingsQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowStatusQueryKey })
      ]);

      const previousMyProfile = queryClient.getQueryData(myProfileQueryKey) as
        | ProfileData
        | undefined;

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

      /** ✅ 1) 상대 프로필: followersCount + 1 */
      if (previousTargetProfile) {
        queryClient.setQueryData(targetProfileQueryKey, {
          ...previousTargetProfile,
          followersCount: (previousTargetProfile.followersCount || 0) + 1
        });
      }

      /** ✅ 1-2) isFollowQuery: true */
      queryClient.setQueryData(targetFollowStatusQueryKey, true);

      /** ✅ 2) 상대 followers 목록: 나(myUid) 추가 */
      if (previousTargetFollowers && previousMyProfile && myUid) {
        const alreadyExists = previousTargetFollowers.pages.some((page) =>
          page.some((u) => u.uid === myUid)
        );

        if (!alreadyExists) {
          const meAsFollower: FollowUserData = {
            uid: myUid,
            nickname: previousMyProfile.nickname,
            profileImg: previousMyProfile.profileImg,
            followersCount: previousMyProfile.followersCount || 0,
            followingsCount: (previousMyProfile.followingsCount || 0) + 1,
            isFollow: false,
            productIds: previousMyProfile.productIds || [],
            reviewPercentage:
              previousMyProfile.reviewInfo?.reviewPercentage || 0
          };

          const updatedTargetFollowers: InfiniteProfileList = {
            ...previousTargetFollowers,
            pages: previousTargetFollowers.pages.map((page, index) =>
              index === 0 ? [meAsFollower, ...page] : page
            )
          };

          queryClient.setQueryData(
            targetFollowersQueryKey,
            updatedTargetFollowers
          );
        }
      }

      /** ✅ 3) 상대 followings 목록에 내 카드가 있다면 followingsCount +1 반영 */
      if (previousTargetFollowings && myUid) {
        const updatedTargetFollowings: InfiniteProfileList = {
          ...previousTargetFollowings,
          pages: previousTargetFollowings.pages.map((page) =>
            page.map((user) =>
              user.uid === myUid
                ? {
                    ...user,
                    followingsCount: (user.followingsCount || 0) + 1
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

      if (ctx?.previousFollowStatus !== undefined) {
        queryClient.setQueryData(
          targetFollowStatusQueryKey,
          ctx.previousFollowStatus
        );
      } else {
        queryClient.removeQueries({ queryKey: targetFollowStatusQueryKey });
      }

      if (isFetchError(error)) {
        if (error.status === 409) {
          toast.warn("이미 팔로우한 유저에요.");
        } else {
          toast.warn("유저 팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요.");
        }
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: targetFollowStatusQueryKey });
    }
  });

  return { userFollowMutate };
}
