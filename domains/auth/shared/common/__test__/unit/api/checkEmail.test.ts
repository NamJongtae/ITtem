import checkEmail from "../../../api/checkEmail";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("checkEmail API 함수 테스트", () => {
  const mockEmail = "test@example.com";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "존재하는 이메일이에요."
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

  it("이메일 확인 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await checkEmail(mockEmail);

    expect(customAxios.post).toHaveBeenCalledWith("/api/auth/check-email", {
      email: mockEmail
    });
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 오류가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "이메일 확인에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(checkEmail(mockEmail)).rejects.toThrow(
      "이메일 확인에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
