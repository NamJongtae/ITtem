import getGoogleAuthInfo from "../../../api/getGoogleAuthInfo";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { GoogleAuthInfoResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getGoogleAuthInfo API 함수 테스트", () => {
  const accessToken = "mock-access-token";

  const mockResponse: AxiosResponse<GoogleAuthInfoResponseData> = {
    data: {
      email: "google@example.com",
      given_name: "GoogleUser",
      id: "userUid123",
      name: "GoogleUser",
      locale: "ko",
      picture: "https://googleusercontent.com/avatar.png",
      verifired_email: true
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
  });

  it("accessToken을 포함한 요청을 보내고 사용자 정보를 받습니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getGoogleAuthInfo(accessToken);

    expect(customAxios).toHaveBeenCalledWith(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("유저정보를 가져오지못했어요.");
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(getGoogleAuthInfo(accessToken)).rejects.toThrow(
      "유저정보를 가져오지못했어요."
    );
  });
});
