import customAxios from "@/utils/customAxios";
import { ProfileResponseData } from "../../types/response-types";
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
