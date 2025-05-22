import followUser from "../../../api/followUser";
import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/domains/auth/store/auth-store";
import { ProfileData } from "../../../types/profile-types";
import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function useMyProfileFollowMutate(uid: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const myUid = user?.uid || "";
  const myFollowersQueryKey = queryKeys.profile.my._ctx.followers._def;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const { mutate: myProfilefollowMutate } = useMutation({
    mutationFn: () => followUser(uid),
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
        followings: [...(previousMyProfile?.followings || []), uid]
      };

      const newMyFollowers = previousMyFollowers?.pages.map(
        (page: ProfileData[]) => {
          return page.map((profile) => {
            if (profile.uid === uid) {
              return {
                ...profile,
                followers: [...(profile.followers || []), myUid]
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
          pages: newMyFollowers
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
        queryKey: myFollowersQueryKey
      });
    }
  });

  return { myProfilefollowMutate };
}
