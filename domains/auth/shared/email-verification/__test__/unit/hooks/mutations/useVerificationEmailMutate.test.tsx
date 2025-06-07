import { renderHook, act, waitFor } from "@testing-library/react";
import useVerificationEmailMutate from "../../../../hooks/mutations/useVerificationEmailMutate";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import verificationEmail from "../../../../api/verificationEmail";
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
jest.mock("../../../../api/verificationEmail");

const mockSetEmailStatus = jest.fn();
const mockSetError = jest.fn();
const mockClearErrors = jest.fn();
const mockSetValue = jest.fn();

const mockUseFormContext = useFormContext as jest.Mock;
const mockToastSuccess = toast.success as jest.Mock;
const mockToastWarn = toast.warn as jest.Mock;
const mockVerificationEmail = verificationEmail as jest.Mock;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <EmailVerificationContext.Provider
      value={{
        emailStatus: "INITIAL",
        isLoading: false,
        isError: false,
        timer: 0,
        setEmailStatus: mockSetEmailStatus,
        setIsLoading: jest.fn(),
        setIsError: jest.fn(),
        resetTimer: jest.fn(),
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
    setError: mockSetError,
    clearErrors: mockClearErrors,
    setValue: mockSetValue
  });
});

describe("useVerificationEmailMutate 훅 테스트", () => {
  it("이메일 인증 성공 시 상태 변경 및 성공 메시지가 표시된다", async () => {
    const mockResponse = { data: { message: "인증 완료" } };
    mockVerificationEmail.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useVerificationEmailMutate(), {
      wrapper
    });

    act(() => {
      result.current.verificationEmailMuate({
        email: "test@example.com",
        verificationCode: "123456",
        type: "signup"
      });
    });

    await waitFor(() => {
      expect(mockVerificationEmail).toHaveBeenCalledWith(
        "test@example.com",
        "123456",
        "signup"
      );
      expect(mockToastSuccess).toHaveBeenCalledWith("인증 완료");
      expect(mockSetEmailStatus).toHaveBeenCalledWith("VERFICATION");
      expect(mockClearErrors).toHaveBeenCalledWith("verificationCode");
    });
  });

  it("401 에러 발생 시 인증 실패 처리 로직이 수행된다", async () => {
    const mockError = {
      isAxiosError: true,
      response: {
        status: 401,
        data: { message: "코드 불일치" }
      }
    };

    mockVerificationEmail.mockRejectedValue(mockError);

    const { result } = renderHook(() => useVerificationEmailMutate(), {
      wrapper
    });

    act(() => {
      result.current.verificationEmailMuate({
        email: "test@example.com",
        verificationCode: "000000",
        type: "signup"
      });
    });

    await waitFor(() => {
      expect(mockToastWarn).toHaveBeenCalledWith("코드 불일치");
      expect(mockSetError).toHaveBeenCalledWith("verificationCode", {
        type: "validate",
        message: "인증코드가 일치하지 않아요."
      });
    });
  });

  it("403 에러 발생 시 상태 초기화, 인증 코드 초기화 및 경고 메시지가 표시된다", async () => {
    const mockError = {
      isAxiosError: true,
      response: {
        status: 403,
        data: { message: "인증 제한" }
      }
    };

    mockVerificationEmail.mockRejectedValue(mockError);

    const { result } = renderHook(() => useVerificationEmailMutate(), {
      wrapper
    });

    act(() => {
      result.current.verificationEmailMuate({
        email: "test@example.com",
        verificationCode: "000000",
        type: "signup"
      });
    });

    await waitFor(() => {
      expect(mockSetEmailStatus).toHaveBeenCalledWith("INITIAL");
      expect(mockSetValue).toHaveBeenCalledWith("verificationCode", "");
      expect(mockClearErrors).toHaveBeenCalledWith("verificationCode");
      expect(mockToastWarn).toHaveBeenCalledWith("인증 제한");
    });
  });
});
