import sendResetPwVerificationEmail from "../../../api/sendResetPwVerificationEmail";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { VerificationEmailResponseData } from "@/domains/auth/shared/email-verification/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("sendResetPwVerificationEmail API 함수 테스트", () => {
  const mockEmailData = "test@mock.com";

  const mockResponse: AxiosResponse<VerificationEmailResponseData> = {
    data: {
      message: "메일로 인증번호가 전송됐어요.",
      ok: true
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {
      headers: new AxiosHeaders(),
      url: "",
      method: "post"
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("인증 코드 전송 요청이 정상적으로 처리되면 응답을 반환합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await sendResetPwVerificationEmail(mockEmailData);

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/auth/send-resetpw-code",
      { email: mockEmailData }
    );
    expect(result).toEqual(mockResponse);
  });

  it("API 요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    (customAxios.post as jest.Mock).mockRejectedValue(
      new Error("인증번호 전송에 실패했어요.\n잠시후 다시 시도해주세요.")
    );

    await expect(sendResetPwVerificationEmail(mockEmailData)).rejects.toThrow(
      "인증번호 전송에 실패했어요.\n잠시후 다시 시도해주세요."
    );
  });
});
