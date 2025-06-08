import { renderHook, act, waitFor } from "@testing-library/react";
import useSignoutMutate from "@/domains/auth/signout/hooks/useSignoutMutate";
import signout from "@/domains/auth/signout/api/signout";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosHeaders, AxiosResponse } from "axios";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@/domains/auth/signout/api/signout");
jest.mock("@/domains/auth/shared/common/store/authStore");
jest.mock("@/shared/common/store/globalLogingStore");
jest.mock("react-toastify", () => ({ toast: { warn: jest.fn() } }));
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));

describe("useSignoutMutate", () => {
  const { Wrapper: wrapper } = createQueryClientWrapper();
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseGlobalLoadingStore =
    useGlobalLoadingStore as unknown as jest.Mock;
  const mockSignout = signout as jest.Mock;
  const mockReplace = jest.fn();
  const mockStartLoading = jest.fn();
  const mockStopLoading = jest.fn();

  beforeEach(() => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "123" } })
    );

    mockUseGlobalLoadingStore.mockImplementation((selector) =>
      selector({
        actions: {
          startLoading: mockStartLoading,
          stopLoading: mockStopLoading
        }
      })
    );

    mockUseRouter.mockReturnValue({ replace: mockReplace });

    jest.clearAllMocks();
  });

  it("성공 시 메시지에 따라 카카오 로그아웃 또는 일반 로그아웃 리디렉션", async () => {
    const kakaoResponse: AxiosResponse = {
      data: { message: "카카오 계정은 별도의 로그아웃이 필요해요." },
      status: 200,
      statusText: "ok",
      headers: {},
      config: {
        headers: new AxiosHeaders()
      }
    };

    mockSignout.mockResolvedValueOnce(kakaoResponse);

    const { result } = renderHook(() => useSignoutMutate(), { wrapper });

    act(() => {
      result.current.signoutMutate();
    });

    await waitFor(() => {
      expect(mockStartLoading).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith(
        expect.stringContaining("https://kauth.kakao.com/oauth/logout")
      );
      expect(mockStopLoading).toHaveBeenCalled();
    });
  });

  it("성공 시 일반 로그아웃이면 /logout 리디렉션", async () => {
    const normalResponse: AxiosResponse = {
      data: { message: "정상적으로 로그아웃 되었습니다." },
      status: 200,
      statusText: "ok",
      headers: {},
      config: {
        headers: new AxiosHeaders()
      }
    };

    mockSignout.mockResolvedValueOnce(normalResponse);

    const { result } = renderHook(() => useSignoutMutate(), { wrapper });

    act(() => {
      result.current.signoutMutate();
    });

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/logout");
    });
  });

  it("에러 발생 시 toast.warn 호출", async () => {
    const error = {
      isAxiosError: true,
      response: { data: { message: "에러가 발생했습니다." } }
    };

    mockSignout.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useSignoutMutate(), { wrapper });

    act(() => {
      result.current.signoutMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("에러가 발생했습니다.");
    });
  });
});
