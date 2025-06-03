import checkEmailDuplication from "../../../api/checkEmailDuplication";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { EmailDuplicationResponseData } from "../../../types/responseTypes";
jest.mock("@/shared/common/utils/customAxios");

describe("checkEmailDuplication API 함수 테스트", () => {
  const mockEmail = "test@example.com";

  const mockResponse: AxiosResponse<EmailDuplicationResponseData> = {
    data: {
      ok: true,
      message: "사용 가능한 이메일입니다."
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

  it("이메일 중복 확인 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await checkEmailDuplication(mockEmail);

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/auth/duplication/email",
      {
        email: mockEmail
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 오류가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("이메일 확인에 실패하였습니다.");
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(checkEmailDuplication(mockEmail)).rejects.toThrow(
      "이메일 확인에 실패하였습니다."
    );
  });
});
