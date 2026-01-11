import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { FollowUserData, ProfileData } from "../../types/profileTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";

type InfiniteProfileList = InfiniteData<FollowUserData[], unknown>;
type ListType = "followers" | "followings";

interface Props {
  uid: string;
  listType: ListType;
}

export default function useUserProfileUnFollowInListMutate({
  uid,
  listType
}: Props) {
  const queryClient = useQueryClient();
  const myUid = useAuthStore((s) => s.user?.uid ?? "");

  const params = useParams();
  const pageUid = (params?.uid as string) ?? "";

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
    const targetFollowingsQueryKey = queryKeys.profile.user(uid)._ctx.followings({
    uid,
    limit: 10
  }).queryKey;

  const pageFollowListQueryKey =
    listType === "followers"
      ? queryKeys.profile.user(pageUid)._ctx.followers({
          uid: pageUid,
          limit: 10
        }).queryKey
      : queryKeys.profile.user(pageUid)._ctx.followings({
          uid: pageUid,
          limit: 10
        }).queryKey;

  const { mutate: userUnfollowMutate } = useMutation({
    mutationFn: () => unfollowUser(uid),

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: myProfileQueryKey }),
        queryClient.cancelQueries({ queryKey: myFollowingsQueryKey }),
        queryClient.cancelQueries({ queryKey: targetProfileQueryKey }),
        queryClient.cancelQueries({ queryKey: targetFollowersQueryKey }),
        queryClient.cancelQueries({ queryKey: pageFollowListQueryKey })
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

      const previousPageFollowList = queryClient.getQueryData(
        pageFollowListQueryKey
      ) as InfiniteProfileList | undefined;

      /**
       * ✅ 현재 보고 있는 리스트에서도 즉시 반영
       * - 타겟(uid): isFollow false, followersCount -1
       * - ✅ 추가: 내(myUid)가 리스트에 있으면 followingsCount -1
       */
      if (previousPageFollowList) {
        const updatedPageFollowList: InfiniteProfileList = {
          ...previousPageFollowList,
          pages: previousPageFollowList.pages.map((page) =>
            page.map((u) => {
              // ✅ 언팔 대상
              if (u.uid === uid) {
                return {
                  ...u,
                  isFollow: false,
                  followersCount: Math.max((u.followersCount || 0) - 1, 0)
                };
              }

              // ✅ (추가) 리스트에 내 정보가 있으면 followingsCount -1
              if (u.uid === myUid) {
                return {
                  ...u,
                  followingsCount: Math.max((u.followingsCount || 0) - 1, 0)
                };
              }

              return u;
            })
          )
        };

        queryClient.setQueryData(pageFollowListQueryKey, updatedPageFollowList);
      }

      return {
        previousPageFollowList
      };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previousPageFollowList) {
        queryClient.setQueryData(
          pageFollowListQueryKey,
          ctx.previousPageFollowList
        );
      }

      toast.warn("언팔로우에 실패했어요. 잠시 후 다시 시도해주세요.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: myFollowingsQueryKey });
      queryClient.invalidateQueries({ queryKey: targetProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: targetFollowersQueryKey });
      queryClient.invalidateQueries({ queryKey: targetFollowingsQueryKey });
    }
  });

  return { userUnfollowMutate };
}
