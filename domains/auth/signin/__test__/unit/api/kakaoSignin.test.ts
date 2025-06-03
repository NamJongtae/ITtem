import kakaoSignin from "../../../api/kakaoSignin";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import {
  KakaoAuthInfoResponseData,
  SigninResponseData
} from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("kakaoSignin API 함수 테스트", () => {
  const mockUser: KakaoAuthInfoResponseData = {
    id: 12345678,
    connected_at: "",
    properties: {
      nickname: "KakaoUser",
      profile_image: "https://kakaousercontent.com/avatar.png",
      thumbnail_image: "https://kakaousercontent.com/thumbnail.png"
    }
  };

  const mockResponse: AxiosResponse<SigninResponseData> = {
    data: {
      user: {
        nickname: "mock-uuid_test123",
        profileImg: "https://mock-storage.com/profile.png",
        uid: "userUid123",
        email: mockUser.id.toString()
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

  it("카카오 사용자 정보를 포함하여 로그인 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await kakaoSignin(mockUser);

    expect(customAxios.post).toHaveBeenCalledWith("/api/auth/signin/kakao", {
      user: mockUser
    });
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("로그인에 실패했어요.\n잠시 후 다시 시도해주세요.");
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(kakaoSignin(mockUser)).rejects.toThrow(
      "로그인에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
