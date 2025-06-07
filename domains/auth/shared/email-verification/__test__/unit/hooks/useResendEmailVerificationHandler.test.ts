import { renderHook, act } from "@testing-library/react";
import useResendEmailVerificationHandler from "../../../hooks/useResendEmailVerificationHandler";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import useEmailDuplicationMutate from "@/domains/auth/shared/common/hooks/mutations/useEmailDuplicationMutate";
import useSendVerificationEmailMutate from "../../../hooks/mutations/useSendVerificationEmailMutate";
import useCheckEmailMutate from "@/domains/auth/shared/common/hooks/mutations/useCheckEmailMutate";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn()
}));
jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));
jest.mock("react-toastify", () => ({
  toast: { warn: jest.fn() }
}));
jest.mock(
  "@/domains/auth/shared/common/hooks/mutations/useEmailDuplicationMutate"
);
jest.mock("@/domains/auth/shared/common/hooks/mutations/useCheckEmailMutate");
jest.mock("../../../hooks/mutations/useSendVerificationEmailMutate");

describe("useResendEmailVerificationHandler 훅 테스트", () => {
  const mockClearErrors = jest.fn();
  const mockSend = jest.fn();
  const mockUseCheckEmailMutate = useCheckEmailMutate as jest.Mock;
  const mockUseEmailDuplicationMutate = useEmailDuplicationMutate as jest.Mock;
  const mockUseContext = useContext as jest.Mock;
  const mockUseSendVerificationEmailMutate =
    useSendVerificationEmailMutate as jest.Mock;
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockCheckEmailMutate = jest.fn().mockResolvedValue(undefined);
  const mockEmailDuplicationMuate = jest.fn().mockResolvedValue(undefined);
  const mockSendToVerificationEmailMutate = jest
    .fn()
    .mockResolvedValue(undefined);

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseFormContext.mockReturnValue({
      getValues: () => "test@example.com",
      clearErrors: mockClearErrors
    });

    mockUseCheckEmailMutate.mockReturnValue({
      checkEmailMutate: mockCheckEmailMutate
    });

    mockUseEmailDuplicationMutate.mockReturnValue({
      emailDuplicationMuate: mockEmailDuplicationMuate
    });

    mockUseSendVerificationEmailMutate.mockReturnValue({
      sendToVerificationEmailMutate: mockSendToVerificationEmailMutate
    });

    mockUseContext.mockReturnValue({ send: mockSend });
  });

  it("타입이 resetPw 일 때 checkEmailMutate을 호출 후 인증 코드 전송 함수가 호출되어야 합니다.", async () => {
    const { result } = renderHook(() =>
      useResendEmailVerificationHandler("resetPw")
    );

    await act(async () => {
      await result.current.requestSendToVerificationEmail();
    });

    expect(mockClearErrors).toHaveBeenCalledWith("verificationCode");
    expect(mockCheckEmailMutate).toHaveBeenCalled();
    expect(mockSend).toHaveBeenCalled();
    expect(mockSendToVerificationEmailMutate).toHaveBeenCalledWith({
      email: "test@example.com",
      type: "resetPw"
    });
  });

  it("타입이 signup일 때 emailDuplicationMuate 호출 후 인증 코드 전송 함수가 호출되어야 합니다.", async () => {
    const { result } = renderHook(() =>
      useResendEmailVerificationHandler("signup")
    );

    await act(async () => {
      await result.current.requestSendToVerificationEmail();
    });

    expect(mockEmailDuplicationMuate).toHaveBeenCalledWith("test@example.com");
    expect(mockClearErrors).toHaveBeenCalledWith("verificationCode");
    expect(mockSend).toHaveBeenCalled();
    expect(mockSendToVerificationEmailMutate).toHaveBeenCalledWith({
      email: "test@example.com",
      type: "signup"
    });
  });
});
