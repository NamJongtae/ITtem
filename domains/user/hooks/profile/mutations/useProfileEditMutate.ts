import editProfile from "../../../api/profile-edit/editProfile";
import prepareProfileEditData from "../../../api/profile-edit/prepareProfileEditData";
import { queryKeys } from "@/query-keys/query-keys";
import { ProfileResponseData } from "../../../types/response-types";
import { ProfileData, ProfileEditData } from "../../../types/profile-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export default function useProfileEditMutate(closeModal: () => void) {
  const queryClient = useQueryClient();
  const authQueryKey = queryKeys.auth._def;
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const { mutateAsync: profileEditMutate, isPending: profileEditLoading } =
    useMutation<
      AxiosResponse<ProfileResponseData>,
      AxiosError,
      {
        profileData: ProfileData | undefined;
        profileEditData: ProfileEditData;
        values: FieldValues;
      }
    >({
      mutationFn: async ({ profileData, profileEditData, values }) => {
        await prepareProfileEditData({ values, profileData, profileEditData });
        return await editProfile(profileEditData);
      },
      onSuccess: (response) => {
        closeModal();
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: authQueryKey });
        queryClient.invalidateQueries({ queryKey: myProfileQueryKey });
      }
    });

  return { profileEditMutate, profileEditLoading };
}
