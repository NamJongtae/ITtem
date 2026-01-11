import followUser from "@/domains/user/shared/api/followUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { FollowUserData } from "../../types/profileTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useParams } from "next/navigation";

type InfiniteFollowList = InfiniteData<FollowUserData[], unknown>;
type ListType = "followers" | "followings";

interface Props {
  uid: string; // 내가 팔로우할 대상 유저 uid
  listType: ListType; // 지금 보고 있는 목록 타입 (followers인지 followings인지)
}

export default function useUserProfileFollowInListMutate({
  uid,
  listType
}: Props) {
  const queryClient = useQueryClient();
  const myUid = useAuthStore((s) => s.user?.uid ?? "");

  const params = useParams();
  const pageUid = (params?.uid as string) ?? "";

  // ✅ 내 프로필 / 내 팔로잉 (invalidate 용)
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings({
    uid: myUid,
    limit: 10
  }).queryKey;

  // ✅ 타겟(팔로우 당하는 유저) 프로필 / followers (invalidate 용)
  const targetProfileQueryKey = queryKeys.profile.user(uid).queryKey;
  const targetFollowersQueryKey = queryKeys.profile.user(uid)._ctx.followers({
    uid,
    limit: 10
  }).queryKey;
    const targetFollowingsQueryKey = queryKeys.profile.user(uid)._ctx.followings({
    uid,
    limit: 10
  }).queryKey;

  // ✅ 지금 화면에 보이는 리스트
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

  const { mutate: userFollowMutate } = useMutation<
    unknown,
    unknown,
    void,
    { previousPageFollowList?: InfiniteFollowList }
  >({
    mutationFn: () => followUser(uid),

    onMutate: async () => {
      // ✅ 현재 화면 리스트만 optimistic 업데이트 하므로 이것만 cancel하면 충분
      await queryClient.cancelQueries({ queryKey: pageFollowListQueryKey });

      const previousPageFollowList = queryClient.getQueryData(
        pageFollowListQueryKey
      ) as InfiniteFollowList | undefined;

      // ✅ 현재 보고 있는 리스트에서만 버튼/카운트 즉시 반영
      if (previousPageFollowList) {
        const updatedPageFollowList: InfiniteFollowList = {
          ...previousPageFollowList,
          pages: previousPageFollowList.pages.map((page) =>
            page.map((u) => {
              // 타겟 유저: isFollow true + followersCount +1
              if (u.uid === uid) {
                return {
                  ...u,
                  isFollow: true,
                  followersCount: (u.followersCount || 0) + 1
                };
              }

              // (요구사항) 리스트에 내 정보가 있으면 내 followingsCount +1
              if (u.uid === myUid) {
                return {
                  ...u,
                  followingsCount: (u.followingsCount || 0) + 1
                };
              }

              return u;
            })
          )
        };

        queryClient.setQueryData(pageFollowListQueryKey, updatedPageFollowList);
      }

      return { previousPageFollowList };
    },

    onError: (_err, _vars, ctx) => {
      // ✅ optimistic 했던 것만 롤백 (현재 페이지 리스트)
      if (ctx?.previousPageFollowList) {
        queryClient.setQueryData(
          pageFollowListQueryKey,
          ctx.previousPageFollowList
        );
      }

      toast.warn("유저 팔로우에 실패했어요.\n잠시 후 다시 시도해주세요.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: myFollowingsQueryKey });
      queryClient.invalidateQueries({ queryKey: targetProfileQueryKey });
      queryClient.invalidateQueries({ queryKey: targetFollowersQueryKey });
      queryClient.invalidateQueries({ queryKey: targetFollowingsQueryKey });
    }
  });

  return { userFollowMutate };
}
