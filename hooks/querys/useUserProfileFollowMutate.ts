import {
  MY_PROFILE_QUERY_KEY,
  getFollowersQueryKey,
  getProfileQueryKey,
} from "@/constants/constant";
import { follow } from "@/lib/api/auth";
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
  const USER_PROFILE_QUERY_KEY = getProfileQueryKey(urlQueryUid as string);
  const USER_FOLLOWINGS_QUERY_KEY = getFollowersQueryKey(urlQueryUid as string);
  const USER_FOLLOWERS_QUERY_KEY = getFollowersQueryKey(urlQueryUid as string);

  const { mutate: userFollowMutate } = useMutation({
    mutationFn: () => follow(uid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: MY_PROFILE_QUERY_KEY });

      await queryClient.cancelQueries({ queryKey: USER_PROFILE_QUERY_KEY });

      await queryClient.cancelQueries({ queryKey: USER_FOLLOWINGS_QUERY_KEY });

      await queryClient.cancelQueries({ queryKey: USER_FOLLOWERS_QUERY_KEY });

      const previousMyProfile = queryClient.getQueryData(
        MY_PROFILE_QUERY_KEY
      ) as ProfileData | undefined;

      const previousUserProfile = queryClient.getQueryData(
        USER_PROFILE_QUERY_KEY
      ) as ProfileData | undefined;

      const previousUserFollowings = queryClient.getQueryData(
        USER_FOLLOWINGS_QUERY_KEY
      ) as InfiniteData<ProfileData[], unknown> | undefined;

      const previousUserFollowers = queryClient.getQueryData(
        USER_FOLLOWERS_QUERY_KEY
      ) as InfiniteData<ProfileData[], unknown> | undefined;

      const newMyProfile = {
        ...previousMyProfile,
        followings: [...(previousMyProfile?.followings || []), uid],
      };

      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, newMyProfile);

      const newUserProfile = {
        ...previousUserProfile,
        followers: [...(previousUserProfile?.followers || []), myUid],
      };
      queryClient.setQueryData(USER_PROFILE_QUERY_KEY, newUserProfile);

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
        queryClient.setQueryData(USER_FOLLOWINGS_QUERY_KEY, {
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
        queryClient.setQueryData(USER_FOLLOWERS_QUERY_KEY, {
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
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, ctx?.previousMyProfile);

      queryClient.setQueryData(
        USER_PROFILE_QUERY_KEY,
        ctx?.previousUserProfile
      );

      if (ctx?.previousUserFollowings) {
        queryClient.setQueryData(
          USER_FOLLOWINGS_QUERY_KEY,
          ctx.previousUserFollowings
        );
      }

      if (ctx?.previousUserFollowers) {
        queryClient.setQueryData(
          USER_FOLLOWERS_QUERY_KEY,
          ctx.previousUserFollowers
        );
      }

      if (isAxiosError<{ message: string }>(error)) {
        toast.error(error.response?.data.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY });

      queryClient.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });

      queryClient.invalidateQueries({
        queryKey: USER_FOLLOWINGS_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: USER_FOLLOWERS_QUERY_KEY,
      });
    },
  });

  return { userFollowMutate };
}
