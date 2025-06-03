import deleteAllToken from "../../../api/deleteToken";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("deleteAllToken API 함수 테스트", () => {
  const mockEmail = "test@example.com";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "성공적으로 토큰이 삭제됬어요."
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

  it("DELETE 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await deleteAllToken(mockEmail);

    expect(customAxios.delete).toHaveBeenCalledWith("/api/auth/delete-token", {
      data: { email: mockEmail }
    });
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 오류가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("토큰 삭제에 실패했어요.");
    (customAxios.delete as jest.Mock).mockRejectedValue(error);

    await expect(deleteAllToken(mockEmail)).rejects.toThrow(
      "토큰 삭제에 실패했어요."
    );
  });
});
