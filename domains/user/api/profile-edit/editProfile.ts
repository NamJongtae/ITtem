import { AxiosResponse } from "axios";
import { ProfileEditData } from "../../types/profile-types";
import { ProfileResponseData } from "../../types/response-types";
import customAxios from "@/utils/customAxios";

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
