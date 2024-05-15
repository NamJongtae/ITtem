import {
  MY_PROFILE_QUERY_KEY,
  getFollowersQueryKey,
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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useMyProfileFollowMutate(uid: string) {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const myUid = user?.uid || "";
  const MY_FOLLOWERS_QUERY_KEY = getFollowersQueryKey(myUid);

  const { mutate: myProfilefollowMutate } = useMutation({
    mutationFn: () => follow(uid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: MY_PROFILE_QUERY_KEY });

      await queryClient.cancelQueries({ queryKey: MY_FOLLOWERS_QUERY_KEY });

      const previousMyProfile = queryClient.getQueryData(
        MY_PROFILE_QUERY_KEY
      ) as ProfileData | undefined;

      const previousMyFollowers = queryClient.getQueryData(
        MY_FOLLOWERS_QUERY_KEY
      ) as InfiniteData<ProfileData[], unknown> | undefined;

      const newMyProfile = {
        ...previousMyProfile,
        followings: [...(previousMyProfile?.followings || []), uid],
      };

      const newMyFollowers = previousMyFollowers?.pages.map(
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

      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, newMyProfile);

      if (previousMyFollowers) {
        queryClient.setQueryData(MY_FOLLOWERS_QUERY_KEY, {
          ...previousMyFollowers,
          pages: newMyFollowers,
        });
      }

      toast.success("유저 팔로우에 성공했어요.");
      return { previousMyProfile, previousMyFollowers };
    },
    onError: (error, data, ctx) => {
      console.error(error);
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, ctx?.previousMyProfile);

      if (ctx?.previousMyFollowers) {
        queryClient.setQueryData(
          MY_FOLLOWERS_QUERY_KEY,
          ctx.previousMyFollowers
        );
      }

      if (isAxiosError<{ message: string }>(error)) {
        toast.error(error.response?.data.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: MY_FOLLOWERS_QUERY_KEY,
      });
    },
  });

  return { myProfilefollowMutate };
}
