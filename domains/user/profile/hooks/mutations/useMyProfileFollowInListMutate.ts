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

type InfiniteFollowList = InfiniteData<FollowUserData[], unknown>;

export default function useMyProfileFollowInListMutate(uid: string) {
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

  const targetProfileQueryKey = queryKeys.profile.user(uid).queryKey;

  const targetFollowersQueryKey = queryKeys.profile.user(uid)._ctx.followers({
    uid,
    limit: 10
  }).queryKey;

  const { mutate: myProfilefollowMutate } = useMutation({
    mutationFn: () => followUser(uid),

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

      const previousTargetProfile = queryClient.getQueryData(
        targetProfileQueryKey
      ) as ProfileData | undefined;

      const previousTargetFollowers = queryClient.getQueryData(
        targetFollowersQueryKey
      ) as InfiniteFollowList | undefined;

      /** ✅ 내 프로필: followingsCount +1 */
      if (previousMyProfile) {
        queryClient.setQueryData(myProfileQueryKey, {
          ...previousMyProfile,
          followingsCount: (previousMyProfile.followingsCount || 0) + 1
        });
      }

      /** ✅ 내 팔로워 목록: isFollow true */
      if (previousMyFollowers) {
        const updatedFollowers: InfiniteFollowList = {
          ...previousMyFollowers,
          pages: previousMyFollowers.pages.map((page) =>
            page.map((profile) =>
              profile.uid === uid
                ? {
                    ...profile,
                    followersCount: (profile.followersCount || 0) + 1,
                    isFollow: true
                  }
                : profile
            )
          )
        };

        queryClient.setQueryData(myFollowersQueryKey, updatedFollowers);
      }

      /** ✅ 내 팔로잉 목록: (중복 방지) + 첫 페이지 맨 앞에 추가 */
      if (previousMyFollowings && previousTargetProfile) {
        const alreadyExists = previousMyFollowings.pages.some((page) =>
          page.some((p) => p.uid === uid)
        );

        if (!alreadyExists) {
          const newFollowing: FollowUserData = {
            uid: previousTargetProfile.uid,
            nickname: previousTargetProfile.nickname,
            profileImg: previousTargetProfile.profileImg,
            followersCount: (previousTargetProfile.followersCount || 0) + 1,
            followingsCount: previousTargetProfile.followingsCount || 0,
            productIds: previousTargetProfile.productIds,
            reviewPercentage: previousTargetProfile.reviewPercentage,
            isFollow: true
          };

          const updatedFollowings: InfiniteFollowList = {
            ...previousMyFollowings,
            pages: previousMyFollowings.pages.map((page, index) =>
              index === 0 ? [newFollowing, ...page] : page
            )
          };

          queryClient.setQueryData(myFollowingsQueryKey, updatedFollowings);
        }
      }

      return {
        previousMyProfile,
        previousMyFollowers,
        previousMyFollowings,
        previousTargetProfile,
        previousTargetFollowers
      };
    },

    onError: (_err, _vars, ctx) => {
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

      toast.warn("유저 팔로우에 실패했어요.\n잠시 후 다시 시도해주세요.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: targetProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: targetFollowersQueryKey });
    }
  });

  return { myProfilefollowMutate };
}
