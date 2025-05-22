import { AxiosResponse } from "axios";
import { ProfileResponseData } from "../../types/response-types";
import customAxios from "@/utils/customAxios";

export default async function getMyProfile(): Promise<
  AxiosResponse<ProfileResponseData>
> {
  try {
    const response = await customAxios("/api/profile");
    return response;
  } catch (error) {
    throw error;
  }
}
