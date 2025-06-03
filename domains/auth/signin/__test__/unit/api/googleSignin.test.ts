import googleSignin from "../../../api/googleSignin";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import {
  GoogleAuthInfoResponseData,
  SigninResponseData
} from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("googleSignin API 함수 테스트", () => {
  const mockUser: GoogleAuthInfoResponseData = {
    email: "googleuser@example.com",
    name: "GoogleUser",
    given_name: "GoogleUser",
    id: "googleId123",
    locale: "ko",
    picture: "https://googleusercontent.com/avatar.png",
    verifired_email: true
  };

  const mockResponse: AxiosResponse<SigninResponseData> = {
    data: {
      user: {
        email: mockUser.email,
        nickname: "mock-uuid_test123",
        profileImg: "https://mock-storage.com/profile.png",
        uid: "user123"
      },
      message: "로그인에 성공했어요."
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

  it("Google 사용자 정보를 포함한 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await googleSignin(mockUser);

    expect(customAxios.post).toHaveBeenCalledWith("/api/auth/signin/google", {
      user: mockUser
    });
    expect(result).toEqual(mockResponse);
  });

  it("API 요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("로그인에 실패했어요.\n잠시 후 다시 시도해주세요.");
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(googleSignin(mockUser)).rejects.toThrow(
      "로그인에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
