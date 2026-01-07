import { renderHook, act, waitFor } from "@testing-library/react";
import useKakaoSigninMutate from "@/domains/auth/signin/hooks/mutations/useKakaoSigninMutate";
import { useRouter } from "next/navigation";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import kakaoSign from "@/domains/auth/signin/api/kakaoSignin";

import { toast } from "react-toastify";
import { AxiosHeaders, AxiosResponse } from "axios";

import {
  KakaoAuthInfoResponseData,
  SigninResponseData
} from "@/domains/auth/signin/types/responseTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import destoryDBSession from "@/domains/auth/shared/common/api/destoryDBSession";

jest.mock("next/navigation");
jest.mock("react-toastify", () => ({
  toast: { warn: jest.fn() }
}));
jest.mock("@/domains/auth/signin/api/kakaoSignin");
jest.mock("@/domains/auth/shared/common/api/destoryDBSession");
jest.mock("@/domains/auth/shared/common/store/authStore");

const queryClient = new QueryClient();
queryClient.refetchQueries = jest.fn();

const createWrapper = () => {
  const client = queryClient;
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );

  return wrapper;
};

const wrapper = createWrapper();

describe("useKakaoSigninMutate 훅 테스트", () => {
  const mockUseRouter = useRouter as jest.Mock;
  const mockuseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockDestoryDBSession = destoryDBSession as jest.Mock;
  const mockKakaoSign = kakaoSign as jest.Mock;
  const mockRouterReplace = jest.fn();
  const mockRouterPush = jest.fn();
  const mockActions = {
    setAuth: jest.fn()
  };

  beforeEach(async () => {
    mockUseRouter.mockReturnValue({
      replace: mockRouterReplace,
      push: mockRouterPush
    });
    mockuseAuthStore.mockImplementation((selector) =>
      selector({ actions: mockActions })
    );
    jest.clearAllMocks();
  });

  it("Mutate 성공 시 setAuth, refetchQueries, replace('/') 호출해야 합니다.", async () => {
    const fakeUser = {
      id: 123,
      properties: {
        nickname: "user123"
      }
    } as KakaoAuthInfoResponseData;

    const response: AxiosResponse<SigninResponseData> = {
      data: {
        message: "로그인에 성공했어요.",
        user: {
          uid: "123",
          email: "test@example.com",
          nickname: "Tester",
          profileImg: "img.png"
        }
      },
      status: 200,
      statusText: "ok",
      headers: {},
      config: {
        headers: new AxiosHeaders()
      }
    };

    mockKakaoSign.mockResolvedValue(response);

    const { result } = renderHook(() => useKakaoSigninMutate(), {
      wrapper
    });

    act(() => {
      result.current.kakaoSigninMutate(fakeUser);
    });

    await waitFor(() => {
      expect(kakaoSign).toHaveBeenCalledWith(fakeUser);
      expect(mockActions.setAuth).toHaveBeenCalledWith(response.data.user);
      expect(queryClient.refetchQueries).toHaveBeenCalledWith({
        queryKey: queryKeys.session._def
      });
      expect(mockRouterReplace).toHaveBeenCalledWith("/");
    });
  });

  it("409 에러 + confirm=true 시 destoryDBSession, router.push 호출해야 합니다.", async () => {
    const fakeUser = {
      id: 123,
      properties: {
        nickname: "user123"
      }
    } as KakaoAuthInfoResponseData;

    const error = {
      response: {
        status: 409,
        data: { message: "중복 로그인" }
      },
      isAxiosError: true
    };

    const confirmSpy = jest.spyOn(global, "confirm").mockReturnValue(true);

    mockKakaoSign.mockRejectedValue(error);

    const { result } = renderHook(() => useKakaoSigninMutate(), {
      wrapper
    });

    act(() => {
      result.current.kakaoSigninMutate(fakeUser);
    });

    await waitFor(() => {
      expect(mockDestoryDBSession).toHaveBeenCalledWith("123");
      expect(mockRouterPush).toHaveBeenCalledWith(
        expect.stringContaining("https://kauth.kakao.com/oauth")
      );
    });

    confirmSpy.mockRestore();
  });

  it("409 에러 + confirm=false 시 router.replace('/signin') 호출해야 합니다.", async () => {
    const fakeUser = {
      id: 123,
      properties: {
        nickname: "user123"
      }
    } as KakaoAuthInfoResponseData;

    mockuseAuthStore.mockImplementation((selector) =>
      selector({ actions: mockActions })
    );

    const confirmSpy = jest.spyOn(global, "confirm").mockReturnValue(false);

    const error = {
      response: {
        status: 409,
        data: { message: "중복 로그인" }
      },
      isAxiosError: true
    };

    mockKakaoSign.mockRejectedValue(error);

    const { result } = renderHook(() => useKakaoSigninMutate(), {
      wrapper
    });

    act(() => {
      result.current.kakaoSigninMutate(fakeUser);
    });

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith("/signin");
    });

    confirmSpy.mockRestore();
  });

  it("기타 에러 발생 시 toast.warn, router.replace('/signin') 호출해야 합니다.", async () => {
    const fakeUser = {
      id: 123,
      properties: {
        nickname: "user123"
      }
    } as KakaoAuthInfoResponseData;
    const error = {
      response: {
        status: 500,
        data: { message: "Internal Server Error" }
      },
      isAxiosError: true
    };

    mockKakaoSign.mockRejectedValue(error);

    const { result } = renderHook(() => useKakaoSigninMutate(), {
      wrapper
    });

    act(() => {
      result.current.kakaoSigninMutate(fakeUser);
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("로그인에 실패했어요.");
      expect(mockRouterReplace).toHaveBeenCalledWith("/signin");
    });
  });
});
