import customAxios from "@/shared/common/utils/customAxios";
import {
  KakaoAuthInfoResponseData,
  SigninResponseData
} from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function kakaoSignin(
  user: KakaoAuthInfoResponseData
): Promise<AxiosResponse<SigninResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/signin/kakao", {
      user
    });
    return response;
  } catch (error) {
    throw error;
  }
}
