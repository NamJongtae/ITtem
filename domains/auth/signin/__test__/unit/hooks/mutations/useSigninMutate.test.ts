import { renderHook, act, waitFor } from "@testing-library/react";
import useSigninMutate from "@/domains/auth/signin/hooks/mutations/useSigninMutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import authStore from "@/domains/auth/shared/common/store/authStore";
import globalLoadingStore from "@/shared/common/store/globalLogingStore";
import signin from "@/domains/auth/signin/api/signin";
import { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("react-toastify", () => ({ toast: { warn: jest.fn() } }));
jest.mock("@/domains/auth/shared/common/store/authStore");
jest.mock("@/shared/common/store/globalLogingStore");
jest.mock("@/domains/auth/signin/api/signin");

const wrapper = createQueryClientWrapper();

describe("useSigninMutate 훅 테스트", () => {
  const mockAuthStore = authStore as unknown as jest.Mock;
  const mockGlobalLoadingStore = globalLoadingStore as unknown as jest.Mock;
  const mockSignin = signin as jest.Mock;
  const mockRouterPush = jest.fn();
  const mockRouterBack = jest.fn();
  const mockSetAuth = jest.fn();
  const mockSetIsLoading = jest.fn();
  const mockStartLoading = jest.fn();
  const mockStopLoading = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
      back: mockRouterBack
    });

    mockAuthStore.mockImplementation(() => ({
      actions: {
        setAuth: mockSetAuth,
        setIsLoading: mockSetIsLoading
      }
    }));

    mockGlobalLoadingStore.mockImplementation(() => ({
      actions: {
        startLoading: mockStartLoading,
        stopLoading: mockStopLoading
      }
    }));

    jest.clearAllMocks();
  });

  it("Mutate 성공 시 setAuth, refetchQueries, router 이동 호출", async () => {
    const response: AxiosResponse = {
      data: {
        user: {
          uid: "1",
          email: "test@example.com",
          nickname: "Tester",
          profileImg: "img.png"
        },
        message: "success"
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: { headers: new AxiosHeaders() }
    };

    mockSignin.mockResolvedValue(response);

    const { result } = renderHook(() => useSigninMutate({ isModal: false }), {
      wrapper
    });

    act(() => {
      result.current.signinMutate({
        email: "test@example.com",
        password: "pw"
      });
    });

    await waitFor(() => {
      expect(mockStartLoading).toHaveBeenCalled();
      expect(mockSetAuth).toHaveBeenCalledWith(response.data.user);
      expect(mockRouterPush).toHaveBeenCalledWith("/");
      expect(mockStopLoading).toHaveBeenCalled();
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    });
  });

  it("401 에러 시 toast.warn 호출", async () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 401,
        data: { message: "비밀번호가 틀렸습니다." }
      }
    } as AxiosError;

    mockSignin.mockRejectedValue(error);

    const { result } = renderHook(() => useSigninMutate({}), { wrapper });

    act(() => {
      result.current.signinMutate({
        email: "test@example.com",
        password: "wrong"
      });
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("비밀번호가 틀렸습니다.");
      expect(mockStopLoading).toHaveBeenCalled();
    });
  });

  it("409 에러 + confirm=true 시 중복 로그인을 시도합니다.", async () => {
    const confirmSpy = jest.spyOn(global, "confirm").mockReturnValue(true);

    mockSignin.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        status: 409,
        data: { message: "중복 로그인" }
      }
    });

    mockSignin.mockResolvedValueOnce({
      data: { user: { uid: "1", email: "test@example.com" } },
      status: 200,
      statusText: "OK",
      headers: {},
      config: { headers: new AxiosHeaders() }
    });

    const { result } = renderHook(() => useSigninMutate({}), { wrapper });

    act(() => {
      result.current.signinMutate({
        email: "test@example.com",
        password: "pw"
      });
    });

    await waitFor(() => {
      expect(mockSignin).toHaveBeenCalledTimes(2);
      expect(mockSignin.mock.calls[1][0]).toBe("test@example.com");
      expect(mockSignin.mock.calls[1][2]).toBe(true);
    });

    confirmSpy.mockRestore();
  });

  it("기타 에러 시 ERROR_MESSAGE 토스트 출력", async () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 500,
        data: { message: "Internal error" }
      }
    } as AxiosError;

    mockSignin.mockRejectedValue(error);

    const { result } = renderHook(() => useSigninMutate({}), { wrapper });

    act(() => {
      result.current.signinMutate({
        email: "test@example.com",
        password: "pw"
      });
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalled();
    });
  });
});
