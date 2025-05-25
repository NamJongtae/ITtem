import customAxios from "@/shared/common/utils/customAxios";
import { KaKaoAuthAccessTokenResponseData } from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function getKakaoAuthAccessToken(
  code: string
): Promise<AxiosResponse<KaKaoAuthAccessTokenResponseData>> {
  try {
    const response = await customAxios(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${code}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
