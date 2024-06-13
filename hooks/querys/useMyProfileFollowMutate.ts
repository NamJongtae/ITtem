import { follow } from "@/lib/api/auth";
import { queryKeys } from "@/queryKeys";
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
  const myFollowersQueryKey = queryKeys.profile.my._ctx.followers._def;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const { mutate: myProfilefollowMutate } = useMutation({
    mutationFn: () => follow(uid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: myProfileQueryKey });

      await queryClient.cancelQueries({ queryKey: myFollowersQueryKey });

      const previousMyProfile = queryClient.getQueryData(myProfileQueryKey) as
        | ProfileData
        | undefined;

      const previousMyFollowers = queryClient.getQueryData(
        myFollowersQueryKey
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

      queryClient.setQueryData(myProfileQueryKey, newMyProfile);

      if (previousMyFollowers) {
        queryClient.setQueryData(myFollowersQueryKey, {
          ...previousMyFollowers,
          pages: newMyFollowers,
        });
      }

      toast.success("유저 팔로우에 성공했어요.");
      return { previousMyProfile, previousMyFollowers };
    },
    onError: (error, data, ctx) => {
      console.error(error);
      queryClient.setQueryData(myProfileQueryKey, ctx?.previousMyProfile);

      if (ctx?.previousMyFollowers) {
        queryClient.setQueryData(myFollowersQueryKey, ctx.previousMyFollowers);
      }

      if (isAxiosError<{ message: string }>(error)) {
        toast.error(error.response?.data.message);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
      queryClient.invalidateQueries({
        queryKey: myFollowersQueryKey,
      });
    },
  });

  return { myProfilefollowMutate };
}
