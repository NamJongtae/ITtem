import { renderHook, act, waitFor } from "@testing-library/react";
import useSendVerificationEmailMutate from "../../../../hooks/mutations/useSendVerificationEmailMutate";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import sendSignupVerificationEmail from "../../../../api/sendSignupVerificationEmail";
import sendResetPwVerificationEmail from "@/domains/auth/reset-password/api/sendResetPwVerificationEmail";
import * as React from "react";
import { EmailVerificationContext } from "../../../../context/EmailVerificationProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  isAxiosError: () => true
}));
jest.mock("../../../../api/sendSignupVerificationEmail");
jest.mock("@/domains/auth/reset-password/api/sendResetPwVerificationEmail");

const mockSetError = jest.fn();
const mockSetIsError = jest.fn();
const mockSetIsLoading = jest.fn();
const mockSetEmailStatus = jest.fn();
const mockResetTimer = jest.fn();
const mockUseFormContext = useFormContext as jest.Mock;
const mockToastSuccess = toast.success as jest.Mock;
const mockToastWarn = toast.warn as jest.Mock;
const mockSendSignupVerificationEmail =
  sendSignupVerificationEmail as jest.Mock;
const mockSendResetPwVerificationEmail =
  sendResetPwVerificationEmail as jest.Mock;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <EmailVerificationContext.Provider
      value={{
        emailStatus: "INITIAL",
        isLoading: false,
        isError: false,
        timer: 0,
        setEmailStatus: mockSetEmailStatus,
        setIsLoading: mockSetIsLoading,
        setIsError: mockSetIsError,
        resetTimer: mockResetTimer,
        countDown: jest.fn(),
        reset: jest.fn(),
        send: jest.fn()
      }}
    >
      {children}
    </EmailVerificationContext.Provider>
  </QueryClientProvider>
);

beforeEach(() => {
  jest.clearAllMocks();

  mockUseFormContext.mockReturnValue({
    setError: mockSetError
  });
});

describe("useSendVerificationEmailMutate 훅 테스트", () => {
  it("type이 'signup'이면 sendSignupVerificationEmail API가 호출되고 toast.success 성공 메시지가 표시됩니다.", async () => {
    const mockResponse = { data: { message: "이메일 전송 완료" } };
    mockSendSignupVerificationEmail.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useSendVerificationEmailMutate(), {
      wrapper
    });

    act(() => {
      result.current.sendToVerificationEmailMutate({
        email: "test@example.com",
        type: "signup"
      });
    });

    await waitFor(() => {
      expect(mockSendSignupVerificationEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(mockToastSuccess).toHaveBeenCalledWith("이메일 전송 완료");
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
      expect(mockSetIsError).toHaveBeenCalledWith(false);
    });
  });

  it("type이 'resetPw'이면 sendResetPwVerificationEmail API가 호출되고 toast.sucess 성공 메시지가 표시됩니다.", async () => {
    const mockResponse = { data: { message: "이메일 전송 완료" } };
    mockSendResetPwVerificationEmail.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useSendVerificationEmailMutate(), {
      wrapper
    });

    act(() => {
      result.current.sendToVerificationEmailMutate({
        email: "test@example.com",
        type: "resetPw"
      });
    });

    await waitFor(() => {
      expect(mockSendResetPwVerificationEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(mockToastSuccess).toHaveBeenCalledWith("이메일 전송 완료");
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
      expect(mockSetIsError).toHaveBeenCalledWith(false);
    });
  });

  it("이메일 전송 중 403 에러가 발생하면 상태 초기화, 에러 객체를 설정하며, toast.warn 에러 메세지가 출력됩니다.", async () => {
    const mockError = {
      isAxiosError: true,
      response: {
        status: 403,
        data: { message: "403 에러 발생" }
      }
    };
    mockSendResetPwVerificationEmail.mockRejectedValue(mockError);

    const { result } = renderHook(() => useSendVerificationEmailMutate(), {
      wrapper
    });

    act(() => {
      result.current.sendToVerificationEmailMutate({
        email: "test@example.com",
        type: "resetPw"
      });
    });

    await waitFor(() => {
      expect(mockSendResetPwVerificationEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(mockResetTimer).toHaveBeenCalled();
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
      expect(mockSetIsError).toHaveBeenCalledWith(true);
      expect(mockSetEmailStatus).toHaveBeenCalledWith("INITIAL");
      expect(mockToastWarn).toHaveBeenCalledWith("403 에러 발생");
      expect(mockSetError).toHaveBeenCalledWith("verificationCode", {
        type: "validate",
        message: "일일 시도 횟수를 초과했어요."
      });
    });
  });
});
