import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useResetPasswordMutate from "../../../hooks/useResetPasswordMutate";
import { resetPassword } from "../../../api/resetPassword";
import { AxiosError, AxiosHeaders } from "axios";
import { toast } from "react-toastify";
import * as useGlobalLoadingStoreModule from "@/shared/common/store/globalLogingStore";
import { useRouter } from "next/navigation";

jest.mock("next/navigation");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("@/shared/common/store/globalLogingStore");
jest.mock("../../../api/resetPassword");

describe("useResetPasswordMutate 훅 테스트 (실제 useMutation 사용)", () => {
  const mockUseGlobalLoadingStore =
    useGlobalLoadingStoreModule.default as unknown as jest.Mock;
  const mockResetPassword = resetPassword as jest.Mock;
  const mockuseRouter = useRouter as jest.Mock;
  const mockStartLoading = jest.fn();
  const mockStopLoading = jest.fn();
  const mockPush = jest.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    mockUseGlobalLoadingStore.mockImplementation(() => ({
      actions: {
        startLoading: mockStartLoading,
        stopLoading: mockStopLoading
      }
    }));

    mockuseRouter.mockReturnValue({
      push: mockPush
    });

    jest.clearAllMocks();
  });

  it("비밀번호 재설정 성공 시 toast.success 및 router.push 호출", async () => {
    mockResetPassword.mockResolvedValue({
      data: { message: "재설정 완료" }
    });

    const { result } = renderHook(() => useResetPasswordMutate(), { wrapper });

    await act(async () => {
      await result.current.resetPasswordMutate({
        email: "test@example.com",
        password: "newPassword123"
      });
    });

    expect(mockStartLoading).toHaveBeenCalled();
    expect(mockStopLoading).toHaveBeenCalled();
    expect(mockResetPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "newPassword123"
    });
    expect(toast.success).toHaveBeenCalledWith("재설정 완료");
    expect(mockPush).toHaveBeenCalledWith("/signin");
  });

  it("비밀번호 재설정 실패 시 toast.warn 호출", async () => {
    const error = new AxiosError("에러", "400", undefined, undefined, {
      status: 400,
      statusText: "Bad Request",
      headers: new AxiosHeaders(),
      config: { headers: new AxiosHeaders() },
      data: { message: "에러 발생" }
    });

    mockResetPassword.mockRejectedValue(error);

    const { result } = renderHook(() => useResetPasswordMutate(), { wrapper });

    await act(async () => {
      await result.current.resetPasswordMutate({
        email: "test@example.com",
        password: "wrong"
      });
    });

    expect(mockStartLoading).toHaveBeenCalled();
    expect(mockStopLoading).toHaveBeenCalled();
    expect(toast.warn).toHaveBeenCalledWith("에러 발생");
  });
});
