import { ProfileData, ProfileEditData } from "@/types/auth-types";
import { useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import useProfileEditMutate from "../react-query/mutations/profile/useProfileEditMutate";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { queryKeys } from "@/query-keys/query-keys";
import { setProfileEditData } from "@/lib/api/profile";

export default function useProfileEditSubmit(closeModal: () => void) {
  const [profileEditLoading, setProfileEditLoading] = useState(false);

  const { profileEditMutate } = useProfileEditMutate(closeModal);
  const profileEditData = {} as ProfileEditData;
  const queryClient = useQueryClient();
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const profileData = queryClient.getQueryData(myProfileQueryKey) as
    | ProfileData
    | undefined;

  const onSubmit = async (values: FieldValues) => {
    try {
      setProfileEditLoading(true);
      await setProfileEditData({ values, profileData, profileEditData });
      await profileEditMutate(profileEditData);
    } catch (error) {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.warn(error.message);
      }
    } finally {
      setProfileEditLoading(false);
    }
  };

  return { onSubmit, profileEditLoading };
}
