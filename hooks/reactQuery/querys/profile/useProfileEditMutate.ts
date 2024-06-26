import { editProfile } from "@/lib/api/profile";
import { queryKeys } from "@/queryKeys";
import { ProfileResponseData } from "@/types/apiTypes";
import { ProfileEditData } from "@/types/authTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export default function useProfileEditMutate(closeModal: () => void) {
  const queryClient = useQueryClient();
  const authQueryKey = queryKeys.auth._def;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const { mutateAsync: profileEditMutate } = useMutation<
    AxiosResponse<ProfileResponseData>,
    AxiosError,
    ProfileEditData
  >({
    mutationFn: async (profileEditData: ProfileEditData) =>
      await editProfile(profileEditData),
    onSuccess: (response) => {
      closeModal();
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: authQueryKey });
      queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
    },
  });

  return { profileEditMutate };
}
