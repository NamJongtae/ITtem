import followUser from "@/domains/user/shared/api/followUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isFetchError } from "@/shared/common/utils/isFetchError";

export default function useProductDetailFollowMutate(uid: string) {
  const queryClient = useQueryClient();
  const targetFollowStatusQueryKey =
    queryKeys.profile.user(uid)._ctx.isFollow.queryKey;

  const { mutate: productDetailfollowMutate } = useMutation({
    mutationFn: () => followUser(uid),

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: targetFollowStatusQueryKey })
      ]);

      const previousFollowStatus = queryClient.getQueryData(
        targetFollowStatusQueryKey
      ) as boolean | undefined;

      queryClient.setQueryData(targetFollowStatusQueryKey, true);

      return { previousFollowStatus };
    },

    onError: (error, _, ctx) => {
      if (ctx?.previousFollowStatus) {
        queryClient.setQueryData(
          targetFollowStatusQueryKey,
          ctx.previousFollowStatus
        );
      } else {
        queryClient.removeQueries({ queryKey: targetFollowStatusQueryKey });
      }

      if (isFetchError(error)) {
        if (error.status === 409) {
          toast.warn("이미 팔로우한 유저 입니다.");
        } else {
          toast.warn("유저 팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요.");
        }
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: targetFollowStatusQueryKey });
    }
  });

  return { productDetailfollowMutate };
}
