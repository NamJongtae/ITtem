import getKakaoAuthAccessToken from "../../../api/getKaKakaoAuthAccessToken";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { KaKaoAuthAccessTokenResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getKakaoAuthAccessToken", () => {
  const mockCode = "mock-auth-code";

  const mockResponse: AxiosResponse<KaKaoAuthAccessTokenResponseData> = {
    data: {
      access_token: "kakao-access-token",
      token_type: "bearer",
      refresh_token: "kakao-refresh-token",
      expires_in: 21599,
      scope: "profile",
      refresh_token_expires_in: 5184000,
      id_token: "mock_access_token123"
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY = "mock-kakao-key";
    process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI =
      "http://localhost:3000/auth/kakao/callback";
  });

  it("카카오 인증 코드로 토큰 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getKakaoAuthAccessToken(mockCode);

    const expectedUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=mock-kakao-key&redirect_uri=http://localhost:3000/auth/kakao/callback&code=${mockCode}`;

    expect(customAxios).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockResponse);
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error("토큰을 가져오지못했어요.");
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(getKakaoAuthAccessToken(mockCode)).rejects.toThrow(
      "토큰을 가져오지못했어요."
    );
  });
});
