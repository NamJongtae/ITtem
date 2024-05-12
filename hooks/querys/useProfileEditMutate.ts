import { AUTH_QUERY_KEY, MY_PROFILE_QUERY_KEY } from "@/constants/constant";
import { editProfile } from "@/lib/api/auth";
import { ProfileResponseData } from "@/types/apiTypes";
import { ProfileEditData } from "@/types/authTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export default function useProfileEditMutate(closeModal: () => void) {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY });
    },
  });

  return { profileEditMutate };
}
