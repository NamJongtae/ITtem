import customAxios from "@/shared/common/utils/customAxios";
import { KakaoAuthInfoResponseData } from "@/domains/auth/signin/types/responseTypes";
import { AxiosResponse } from "axios";

export default async function getKakaoUser(
  code: string
): Promise<
  AxiosResponse<{ user: KakaoAuthInfoResponseData; message: string }>
> {
  try {
    const response = await customAxios.post("/api/auth/signin/kakao/user", {
      code
    });
    return response;
  } catch (error) {
    throw error;
  }
}
