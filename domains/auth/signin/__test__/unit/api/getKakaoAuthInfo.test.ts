import getKaKaoAuthInfo from "../../../api/getKakaoAuthInfo";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { KakaoAuthInfoResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getKaKaoAuthInfo", () => {
  const accessToken = "mock-access-token";

  const mockResponse: AxiosResponse<KakaoAuthInfoResponseData> = {
    data: {
      id: 123456789,
      connected_at: "",
      properties: {
        nickname: "카카오유저",
        profile_image: "https://kakao.com/profile.png",
        thumbnail_image: "https://kakao.com/thumb.png"
      }
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

  it("accessToken을 포함하여 카카오 사용자 정보 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getKaKaoAuthInfo(accessToken);

    expect(customAxios).toHaveBeenCalledWith(
      "https://kapi.kakao.com/v2/user/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("카카오 사용자 정보 요청 실패");
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(getKaKaoAuthInfo(accessToken)).rejects.toThrow(
      "카카오 사용자 정보 요청 실패"
    );
  });
});
