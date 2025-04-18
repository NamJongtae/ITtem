import { uploadImgToFireStore } from "@/lib/api/firebase";
import { ProfileData, ProfileEditData } from "@/types/auth-types";
import { useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import useProfileEditMutate from "../react-query/mutations/profile/useProfileEditMutate";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { queryKeys } from "@/query-keys/query-keys";

export default function useProfileEditSubmit(closeModal: () => void) {
  const [profileEditLoading, setProfileEditLoading] = useState(false);

  const { profileEditMutate } = useProfileEditMutate(closeModal);
  const profileEditData = {} as ProfileEditData;
  const queryClient = useQueryClient();
  const myProfileQueryKey = queryKeys.profile.my.queryKey;

  const profileData = queryClient.getQueryData(myProfileQueryKey) as
    | ProfileData
    | undefined;

  /**
   * 프로필 수정시 수정된 데이터만 설정하는 함수
   */
  const setProfileEditData = async (values: FieldValues) => {
    for (const key of Object.keys(values)) {
      if (key === "profileImg") {
        if (
          JSON.stringify(profileData?.profileImgFilename) !==
          JSON.stringify(values.profileImg.name)
        ) {
          if (values.profileImg === "") {
            profileEditData.profileImg = "/icons/user-icon.svg";
            profileEditData.profileImgFilename = "";
            return;
          }
          if (!(values.profileImg instanceof File)) return;
          const imgFiles = values.profileImg;
          const imgData = await uploadImgToFireStore(imgFiles);
          if (!imgData) return;
          profileEditData.profileImg = imgData.url;
          profileEditData.profileImgFilename = imgData.name;
        }
      } else if (key === "nickname" || key === "introduce") {
        if (profileData && profileData[key] !== values[key]) {
          profileEditData[key] = values[key];
        }
      }
    }
  };

  const handleProfileEditSubmit = async (values: FieldValues) => {
    try {
      setProfileEditLoading(true);
      await setProfileEditData(values);
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

  return { handleProfileEditSubmit, profileEditLoading };
}
