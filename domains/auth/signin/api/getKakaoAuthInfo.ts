import customAxios from "@/shared/common/utils/customAxios";
import { KakaoAuthInfoResponseData } from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function getKaKaoAuthInfo(
  accessToken: string
): Promise<AxiosResponse<KakaoAuthInfoResponseData>> {
  try {
    const userInfoUrl = "https://kapi.kakao.com/v2/user/me";
    const response = await customAxios(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}
