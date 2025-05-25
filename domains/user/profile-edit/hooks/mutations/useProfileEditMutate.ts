import editProfile from "../../api/editProfile";
import prepareProfileEditData from "../../api/prepareProfileEditData";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { ProfileResponseData } from "@/domains/user/profile/types/responseTypes";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { ProfileEditData } from "../../types/profileEditTypes";

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
