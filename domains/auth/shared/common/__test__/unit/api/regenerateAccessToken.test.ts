import regenerateAccessToken from "@/domains/auth/shared/common/api/regenerateAccessToken";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("regenerateAccessToken API 함수 테스트", () => {
  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "토큰이 발급 됬어요."
    },
    status: 200,
    statusText: "ok",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("재발급 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await regenerateAccessToken();

    expect(customAxios).toHaveBeenCalledWith("/api/auth/refresh-token");
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 오류 발생 시 예외를 던집니다.", async () => {
    const error = new Error("토큰 발급에 실패 했어요.");
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(regenerateAccessToken()).rejects.toThrow(
      "토큰 발급에 실패 했어요."
    );
  });
});
