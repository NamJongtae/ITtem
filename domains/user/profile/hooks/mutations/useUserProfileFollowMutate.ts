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

      /** ✅ 1) 상대 프로필: followersCount +1, isFollow true */
      if (previousTargetProfile) {
        queryClient.setQueryData(targetProfileQueryKey, {
          ...previousTargetProfile,
          followersCount: (previousTargetProfile.followersCount || 0) + 1,
          isFollow: true
        });
      }

      /** ✅ 2) 상대 followers 목록: 나(myUid) 추가 (중복 방지 + 맨 앞 삽입) */
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
            // ✅ 팔로우 했으니 내 팔로잉 수는 +1 된 상태로 보여주는 게 자연스러움
            followingsCount: (previousMyProfile.followingsCount || 0) + 1,
            isFollow: false, // "상대 followers 목록"에서 내 카드의 isFollow 의미가 애매하면 false 고정 추천
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

      /**
       * ✅ 3) (UI 동기화) 상대의 팔로잉 목록에 "내 카드"가 있다면 → 내 followingsCount +1 반영
       * - 이건 관계 변경이 아니라, 캐시에 떠있는 "내 카드" 숫자만 맞추는 용도
       */
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
        previousTargetFollowings
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
    }
  });

  return { userFollowMutate };
}
