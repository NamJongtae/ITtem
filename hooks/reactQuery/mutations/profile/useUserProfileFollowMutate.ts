import { follow } from "@/lib/api/profile";
import { queryKeys } from "@/queryKeys";
import { RootState } from "@/store/store";
import { ProfileData } from "@/types/authTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useUserProfileFollowMutate(uid: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid || "";
  const urlQueryUid = router.query?.uid || "";

  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const userProfileQueryKey = queryKeys.profile.user(
    urlQueryUid as string
  ).queryKey;
  const userFollowingsQueryKey = queryKeys.profile.user(urlQueryUid as string)
    ._ctx.followings._def;
  const userFollowersQueryKey = queryKeys.profile.user(urlQueryUid as string)
    ._ctx.followers._def;

  const { mutate: userFollowMutate } = useMutation({
    mutationFn: () => follow(uid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: myProfileQueryKey });

      await queryClient.cancelQueries({ queryKey: userProfileQueryKey });

      await queryClient.cancelQueries({ queryKey: userFollowingsQueryKey });

      await queryClient.cancelQueries({ queryKey: userFollowersQueryKey });

      const previousMyProfile = queryClient.getQueryData(myProfileQueryKey) as
        | ProfileData
        | undefined;

      const previousUserProfile = queryClient.getQueryData(
        userProfileQueryKey
      ) as ProfileData | undefined;

      const previousUserFollowings = queryClient.getQueryData(
        userFollowingsQueryKey
      ) as InfiniteData<ProfileData[], unknown> | undefined;

      const previousUserFollowers = queryClient.getQueryData(
        userFollowersQueryKey
      ) as InfiniteData<ProfileData[], unknown> | undefined;

      const newMyProfile = {
        ...previousMyProfile,
        followings: [...(previousMyProfile?.followings || []), uid],
      };

      queryClient.setQueryData(myProfileQueryKey, newMyProfile);

      const newUserProfile = {
        ...previousUserProfile,
        followers: [...(previousUserProfile?.followers || []), myUid],
      };
      queryClient.setQueryData(userProfileQueryKey, newUserProfile);

      if (previousUserFollowings) {
        const newUserFollowings = previousUserFollowings?.pages.map(
          (page: ProfileData[]) => {
            return page.map((profile) => {
              if (profile.uid === uid) {
                return {
                  ...profile,
                  followers: [...(profile.followers || []), myUid],
                };
              } else {
                return profile;
              }
            });
          }
        );
        queryClient.setQueryData(userFollowingsQueryKey, {
          ...previousUserFollowings,
          pages: newUserFollowings,
        });
      }

      if (previousUserFollowers) {
        const newUserFollowers = previousUserFollowers?.pages.map(
          (page: ProfileData[]) => {
            return page.map((profile) => {
              if (profile.uid === uid) {
                return {
                  ...profile,
                  followers: [...(profile.followers || []), myUid],
                };
              } else {
                return profile;
              }
            });
          }
        );
        queryClient.setQueryData(userFollowersQueryKey, {
          ...previousUserFollowers,
          pages: newUserFollowers,
        });
      }

      toast.success("유저 팔로우에 성공했어요.");
      return {
        previousMyProfile,
        previousUserProfile,
        previousUserFollowings,
        previousUserFollowers,
      };
    },
    onError: (error, data, ctx) => {
      console.log(error);
      queryClient.setQueryData(myProfileQueryKey, ctx?.previousMyProfile);

      queryClient.setQueryData(userProfileQueryKey, ctx?.previousUserProfile);

      if (ctx?.previousUserFollowings) {
        queryClient.setQueryData(
          userFollowingsQueryKey,
          ctx.previousUserFollowings
        );
      }

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

      queryClient.invalidateQueries({ queryKey: userProfileQueryKey });

      queryClient.invalidateQueries({
        queryKey: userFollowingsQueryKey,
      });

      queryClient.invalidateQueries({
        queryKey: userFollowersQueryKey,
      });
    },
  });

  return { userFollowMutate };
}
