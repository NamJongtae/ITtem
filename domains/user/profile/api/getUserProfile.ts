import customAxios from "@/shared/common/utils/customAxios";
import { ProfileResponseData } from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function getUserProfile(
  uid: string
): Promise<AxiosResponse<ProfileResponseData>> {
  try {
    const response = await customAxios(`/api/profile/${uid}`);
    return response;
  } catch (error) {
    throw error;
  }
}
