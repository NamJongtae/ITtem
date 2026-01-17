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
import { isFetchError } from "@/shared/common/utils/isFetchError";

type InfiniteFollowList = InfiniteData<FollowUserData[], unknown>;
type ListType = "followers" | "followings";

interface Props {
  uid: string;
  listType: ListType;
}

export default function useUserProfileFollowInListMutate({
  uid,
  listType
}: Props) {
  const queryClient = useQueryClient();
  const myUid = useAuthStore((s) => s.user?.uid ?? "");

  const params = useParams();
  const pageUid = (params?.uid as string) ?? "";

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
      await queryClient.cancelQueries({ queryKey: pageFollowListQueryKey });

      const previousPageFollowList = queryClient.getQueryData(
        pageFollowListQueryKey
      ) as InfiniteFollowList | undefined;

      // 현재 보고 있는 리스트에서만 버튼/카운트 즉시 반영
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

              // 리스트에 내 정보가 있으면 내 followingsCount +1
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

    onError: (error, _vars, ctx) => {
      // ✅ optimistic 했던 것만 롤백 (현재 페이지 리스트)
      if (ctx?.previousPageFollowList) {
        queryClient.setQueryData(
          pageFollowListQueryKey,
          ctx.previousPageFollowList
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
      // queryClient.invalidateQueries({ queryKey: pageFollowListQueryKey });
    }
  });

  return { userFollowMutate };
}
