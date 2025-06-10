import getGoogleUser from "../../../api/getGoogleUser";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { GoogleAuthInfoResponseData } from "@/domains/auth/signin/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getGoogleUser API 함수 테스트", () => {
  const mockCode = "mock-auth-code";

  const mockUser = {
    email: "google@example.com",
    given_name: "GoogleUser",
    id: "userUid123",
    name: "GoogleUser",
    locale: "ko",
    picture: "https://googleusercontent.com/avatar.png",
    verifired_email: true
  };

  const mockResponse: AxiosResponse<{
    user: GoogleAuthInfoResponseData;
    message: string;
  }> = {
    data: {
      user: mockUser,
      message: "구글 유저 정보 조회 성공"
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

  it("POST 요청을 보내고 구글 유저 정보를 받습니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getGoogleUser(mockCode);

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/auth/signin/google/user",
      {
        code: mockCode
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error("구글 사용자 요청 실패");
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(getGoogleUser(mockCode)).rejects.toThrow(
      "구글 사용자 요청 실패"
    );
  });
});
