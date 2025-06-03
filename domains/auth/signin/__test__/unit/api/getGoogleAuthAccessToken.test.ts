import getGoogleAuthAccessToken from "../../../api/getGoogleAuthAccessToken";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { GoogleAuthAccessTokenResponseData } from "../../../types/responseTypes";

// customAxios 모킹
jest.mock("@/shared/common/utils/customAxios");

describe("getGoogleAuthAccessToken API 함수 테스트", () => {
  const mockCode = "mock_auth_code";

  const mockResponse: AxiosResponse<GoogleAuthAccessTokenResponseData> = {
    data: {
      access_token: "google-access-token",
      authuser: "mockUser",
      expires_in: 3600,
      prompot: "",
      scope: "email profile",
      token_type: "Bearer"
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
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = "mock-client-id";
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET = "mock-client-secret";
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI =
      "http://localhost:3000/auth/callback";
  });

  it("Google access token 요청을 정상적으로 보내고 응답을 반환합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getGoogleAuthAccessToken(mockCode);

    const expectedParams = new URLSearchParams({
      code: mockCode,
      client_id: "mock-client-id",
      client_secret: "mock-client-secret",
      redirect_uri: "http://localhost:3000/auth/callback",
      grant_type: "authorization_code"
    });

    expect(customAxios.post).toHaveBeenCalledWith(
      "https://oauth2.googleapis.com/token",
      expectedParams.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("토큰을 가져오지못했어요.");
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(getGoogleAuthAccessToken(mockCode)).rejects.toThrow(
      "토큰을 가져오지못했어요."
    );
  });
});
