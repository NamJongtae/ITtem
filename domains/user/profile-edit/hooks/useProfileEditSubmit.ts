import { ProfileData } from "../../profile/types/profileTypes";
import { ProfileEditData } from "../types/profileEditTypes";
import { useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import useProfileEditMutate from "./mutations/useProfileEditMutate";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";

export default function useProfileEditSubmit(closeModal: () => void) {
  const { profileEditMutate, profileEditLoading } =
    useProfileEditMutate(closeModal);
  const profileEditData = {} as ProfileEditData;
  const queryClient = useQueryClient();
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const profileData = queryClient.getQueryData(myProfileQueryKey) as
    | ProfileData
    | undefined;

  const onSubmit = async (values: FieldValues) => {
    try {
      await profileEditMutate({ values, profileData, profileEditData });
    } catch (error) {
      if (isAxiosError<{ message: string }>(error)) {
        toast.warn(error.response?.data.message);
      } else if (error instanceof Error) {
        toast.warn(error.message);
      }
    }
  };

  return { onSubmit, profileEditLoading };
}
