import unfollowUser from "@/domains/user/shared/api/unfollowUser";
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
import { isFetchError } from "@/shared/common/utils/isFetchError";

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

  const targetProfileQueryKey = queryKeys.profile.user(uid).queryKey;

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
      await queryClient.cancelQueries({ queryKey: targetProfileQueryKey });

      const previousPageFollowList = queryClient.getQueryData(
        pageFollowListQueryKey
      ) as InfiniteProfileList | undefined;

      /**
       * 현재 보고 있는 리스트에서도 즉시 반영
       * - 타겟(uid): isFollow false, followersCount -1
       * - 내(myUid)가 리스트에 있으면 followingsCount -1
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

              // 리스트에 내 정보가 있으면 followingsCount -1
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

    onError: (error, _vars, ctx) => {
      if (ctx?.previousPageFollowList) {
        queryClient.setQueryData(
          pageFollowListQueryKey,
          ctx.previousPageFollowList
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

    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: pageFollowListQueryKey });
    }
  });

  return { userUnfollowMutate };
}
