import { AxiosResponse } from "axios";
import { ProfileEditData } from "../types/profileEditTypes";
import { ProfileResponseData } from "../../profile/types/responseTypes";
import customAxios from "@/shared/common/utils/customAxios";

export default async function editProfile(
  profileEditData: ProfileEditData
): Promise<AxiosResponse<ProfileResponseData>> {
  try {
    const response = await customAxios.patch("/api/profile", {
      profileEditData
    });
    return response;
  } catch (error) {
    throw error;
  }
}
