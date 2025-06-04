import verificationEmail from "../../../api/verificationEmail";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { VerificationEmailResponseData } from "../../../types/responseTypes";
import { EmailVerificationType } from "../../../types/emailVerificationTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("verificationEmail", () => {
  const email = "test@example.com";
  const code = "123456";

  it("타입이 'signup'인 경우 인증 확인 요청을 보내고 응답을 반환합니다.", async () => {
    const type: EmailVerificationType = "signup";
    const mockResponse: AxiosResponse<VerificationEmailResponseData> = {
      data: { message: "인증이 완료됐어요.", ok: true },
      status: 200,
      statusText: "ok",
      headers: {},
      config: {
        headers: new AxiosHeaders()
      }
    };

    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await verificationEmail(email, code, type);

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/auth/verification-email",
      {
        email,
        verificationCode: code,
        type
      }
    );
    expect(response).toEqual(mockResponse);
  });

  it("타입이 'resetPw'인 경우 인증 확인 요청을 보내고 응답을 반환합니다.", async () => {
    const type: EmailVerificationType = "resetPw";
    const mockResponse: AxiosResponse<VerificationEmailResponseData> = {
      data: { message: "인증이 완료됐어요.", ok: true },
      status: 200,
      statusText: "ok",
      headers: {},
      config: {
        headers: new AxiosHeaders()
      }
    };

    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await verificationEmail(email, code, type);

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/auth/verification-email",
      {
        email,
        verificationCode: code,
        type
      }
    );
    expect(response).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const type: EmailVerificationType = "signup";
    const mockError = new Error(
      "인증에 실패했어요.\n잠시 후 다시 시도해주세요."
    );

    (customAxios.post as jest.Mock).mockRejectedValue(mockError);

    await expect(verificationEmail(email, code, type)).rejects.toThrow(
      "인증에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
