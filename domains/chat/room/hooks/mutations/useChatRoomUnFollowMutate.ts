import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isFetchError } from "@/shared/common/utils/isFetchError";

export default function useChatRoomUnFollowMutate(uid: string) {
  const queryClient = useQueryClient();

  const targetFollowStatusQueryKey =
    queryKeys.profile.user(uid)._ctx.isFollow.queryKey;

  const { mutate: userUnFollowMutate } = useMutation({
    mutationFn: () => unfollowUser(uid),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: targetFollowStatusQueryKey });

      const previousFollowStatus = queryClient.getQueryData(
        targetFollowStatusQueryKey
      ) as boolean | undefined;

      queryClient.setQueryData(targetFollowStatusQueryKey, false);

      return { previousFollowStatus };
    },

    onError: (error, _vars, ctx) => {
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

  return { userUnFollowMutate };
}
