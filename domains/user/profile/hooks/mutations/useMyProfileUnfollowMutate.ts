import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { ProfileData } from "../../types/profileTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useMyProfileUnfollowMutate(uid: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const myUid = user?.uid;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings._def;
  const userFollowersQueryKey = queryKeys.profile.user(uid)._ctx.followers._def;

  const { mutate: myProfileUnfollowMutate } = useMutation({
    mutationFn: () => unfollowUser(uid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: myProfileQueryKey });
      await queryClient.cancelQueries({ queryKey: myFollowingsQueryKey });
      await queryClient.cancelQueries({ queryKey: userFollowersQueryKey });

      const previousMyProfile = queryClient.getQueryData(myProfileQueryKey) as
        | ProfileData
        | undefined;
      const previousMyFollowings = queryClient.getQueryData(
        myFollowingsQueryKey
      ) as InfiniteData<ProfileData[]> | undefined;
      const previousUserFollowers = queryClient.getQueryData(
        userFollowersQueryKey
      ) as InfiniteData<ProfileData[]> | undefined;

      const newMyProfile = {
        ...previousMyProfile,
        followings:
          previousMyProfile?.followings.filter(
            (data: string) => data !== uid
          ) || []
      };
      const newMyFollowings = previousMyFollowings?.pages.map(
        (page: ProfileData[]) =>
          page.filter((profile: ProfileData) => profile.uid !== uid)
      );

      const newUserFollowers = previousUserFollowers?.pages.map(
        (page: ProfileData[]) => {
          return page.map((profile: ProfileData) => {
            if (profile.uid === uid) {
              const updatedFollowers = profile.followers.filter(
                (id: string) => id !== myUid
              );
              return { ...profile, followers: updatedFollowers };
            } else {
              return profile;
            }
          });
        }
      );

      queryClient.setQueryData(myProfileQueryKey, newMyProfile);

      if (previousMyFollowings) {
        queryClient.setQueryData(myFollowingsQueryKey, {
          ...previousMyFollowings,
          pages: newMyFollowings
        });
      }

      if (previousUserFollowers) {
        queryClient.setQueryData(userFollowersQueryKey, {
          ...previousUserFollowers,
          pages: newUserFollowers
        });
      }

      toast.success("유저 언팔로우에 성공했어요.");
      return { previousMyProfile, previousMyFollowings, previousUserFollowers };
    },
    onError: (error, data, ctx) => {
      console.error(error);

      queryClient.setQueryData(myProfileQueryKey, ctx?.previousMyProfile);

      if (ctx?.previousMyFollowings)
        queryClient.setQueryData(
          myFollowingsQueryKey,
          ctx.previousMyFollowings
        );

      if (ctx?.previousUserFollowers) {
        queryClient.setQueryData(
          userFollowersQueryKey,
          ctx.previousUserFollowers
        );
      }

      if (isAxiosError<{ message: string }>(error)) {
        toast.error(error.response?.data.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
      queryClient.invalidateQueries({
        queryKey: userFollowersQueryKey
      });
      queryClient.invalidateQueries({
        queryKey: myFollowingsQueryKey
      });
    }
  });

  return { myProfileUnfollowMutate };
}
