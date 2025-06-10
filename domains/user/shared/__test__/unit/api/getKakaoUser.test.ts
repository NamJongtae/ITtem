import getKakaoUser from "../../../api/getKakaoUser";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { KakaoAuthInfoResponseData } from "@/domains/auth/signin/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getKakaoUser API 함수 테스트", () => {
  const mockCode = "mock-auth-code";

  const mockUser: KakaoAuthInfoResponseData = {
    id: 123456789,
    connected_at: "",
    properties: {
      nickname: "카카오유저",
      profile_image: "https://kakao.com/profile.png",
      thumbnail_image: "https://kakao.com/thumb.png"
    }
  };

  const mockResponse: AxiosResponse<{
    user: KakaoAuthInfoResponseData;
    message: string;
  }> = {
    data: {
      user: mockUser,
      message: "유저정보를 성공적으로 가져왔어요."
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

  it("POST 요청을 보내고 카카오 유저 정보를 받습니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getKakaoUser(mockCode);

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/auth/signin/kakao/user",
      {
        code: mockCode
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error(
      "유저정보를 가져오지 못했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(getKakaoUser(mockCode)).rejects.toThrow(
      "유저정보를 가져오지 못했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
