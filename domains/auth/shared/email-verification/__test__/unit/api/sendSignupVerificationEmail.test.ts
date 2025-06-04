import sendSignupVerificationEmail from "../../../api/sendSignupVerificationEmail";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { VerificationEmailResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("sendSignupVerificationEmail", () => {
  const mockEmail = "test@example.com";

  it("인증 이메일 전송을 요청하고 응답을 반환합니다.", async () => {
    const mockResponse: AxiosResponse<VerificationEmailResponseData> = {
      data: { message: "메일로 인증번호가 전송됐어요.", ok: true },
      status: 200,
      statusText: "ok",
      headers: {},
      config: {
        headers: new AxiosHeaders()
      }
    };

    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await sendSignupVerificationEmail(mockEmail);

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/auth/send-signup-code",
      { email: mockEmail }
    );
    expect(response).toEqual(mockResponse);
  });

  it("에러가 발생하면 예외를 던집니다.", async () => {
    const mockError = new Error(
      "인증 이메일 발송에 실패했어요.\n잠시 후 다시 시도해주세요."
    );

    (customAxios.post as jest.Mock).mockRejectedValue(mockError);

    await expect(sendSignupVerificationEmail(mockEmail)).rejects.toThrow(
      "인증 이메일 발송에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
