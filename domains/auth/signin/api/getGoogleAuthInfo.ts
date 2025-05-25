import customAxios from "@/shared/common/utils/customAxios";
import { GoogleAuthInfoResponseData } from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function getGoogleAuthInfo(
  accessToken: string
): Promise<AxiosResponse<GoogleAuthInfoResponseData>> {
  try {
    const response = await customAxios(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
