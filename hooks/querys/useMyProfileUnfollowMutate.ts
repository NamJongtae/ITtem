import {
  MY_PROFILE_QUERY_KEY,
  getFollowersQueryKey,
  getFollowingsQueryKey,
} from "@/constants/constant";
import { unfollow } from "@/lib/api/auth";
import { RootState } from "@/store/store";
import { ProfileData } from "@/types/authTypes";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useMyProfileUnfollowMutate(uid: string) {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid;
  const MY_FOLLOWINGS_QUERY_KEY = getFollowingsQueryKey(myUid || "");
  const USER_FOLLOWERS_QUERY_KEY = getFollowersQueryKey(myUid || "");

  const { mutate: myProfileUnfollowMutate } = useMutation({
    mutationFn: () => unfollow(uid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: MY_PROFILE_QUERY_KEY });
      await queryClient.cancelQueries({ queryKey: MY_FOLLOWINGS_QUERY_KEY });
      await queryClient.cancelQueries({ queryKey: USER_FOLLOWERS_QUERY_KEY });

      const previousMyProfile = queryClient.getQueryData(
        MY_PROFILE_QUERY_KEY
      ) as ProfileData | undefined;
      const previousMyFollowings = queryClient.getQueryData(
        MY_FOLLOWINGS_QUERY_KEY
      ) as InfiniteData<ProfileData[]> | undefined;
      const previousUserFollowers = queryClient.getQueryData(
        USER_FOLLOWERS_QUERY_KEY
      ) as InfiniteData<ProfileData[]> | undefined;

      const newMyProfile = {
        ...previousMyProfile,
        followings:
          previousMyProfile?.followings.filter(
            (data: string) => data !== uid
          ) || [],
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

      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, newMyProfile);

      if (previousMyFollowings) {
        queryClient.setQueryData(MY_FOLLOWINGS_QUERY_KEY, {
          ...previousMyFollowings,
          pages: newMyFollowings,
        });
      }

      if (previousUserFollowers) {
        queryClient.setQueryData(USER_FOLLOWERS_QUERY_KEY, {
          ...previousUserFollowers,
          pages: newUserFollowers,
        });
      }

      toast.success("유저 언팔로우에 성공했어요.");
      return { previousMyProfile, previousMyFollowings, previousUserFollowers };
    },
    onError: (error, data, ctx) => {
      console.error(error);

      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, ctx?.previousMyProfile);

      if (ctx?.previousMyFollowings)
        queryClient.setQueryData(
          MY_FOLLOWINGS_QUERY_KEY,
          ctx.previousMyFollowings
        );

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
      queryClient.invalidateQueries({
        queryKey: USER_FOLLOWERS_QUERY_KEY,
      });
      queryClient.invalidateQueries({
        queryKey: MY_FOLLOWINGS_QUERY_KEY,
      });
    },
  });

  return { myProfileUnfollowMutate };
}
