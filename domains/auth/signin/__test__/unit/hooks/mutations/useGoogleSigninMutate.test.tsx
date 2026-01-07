import { renderHook, act, waitFor } from "@testing-library/react";
import useGoogleSigninMutate from "@/domains/auth/signin/hooks/mutations/useGoogleSigninMutate";
import { useRouter } from "next/navigation";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import googleSignin from "@/domains/auth/signin/api/googleSignin";
import { toast } from "react-toastify";
import { AxiosHeaders, AxiosResponse } from "axios";

import {
  GoogleAuthInfoResponseData,
  SigninResponseData
} from "@/domains/auth/signin/types/responseTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import destoryDBSession from "@/domains/auth/shared/common/api/destoryDBSession";

jest.mock("next/navigation");
jest.mock("react-toastify", () => ({
  toast: { warn: jest.fn() }
}));
jest.mock("@/domains/auth/signin/api/googleSignin");
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

describe("useGoogleSigninMutate 훅 테스트", () => {
  const mockUseRouter = useRouter as jest.Mock;
  const mockuseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockGoogleSignin = googleSignin as jest.Mock;
  const mockDestoryDBSession = destoryDBSession as jest.Mock;
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
    const fakeUser: GoogleAuthInfoResponseData = {
      email: "test@example.com",
      id: "token"
    } as GoogleAuthInfoResponseData;

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

    mockGoogleSignin.mockResolvedValue(response);

    const { result } = renderHook(() => useGoogleSigninMutate(), {
      wrapper
    });

    act(() => {
      result.current.googleSigninMutate(fakeUser);
    });

    await waitFor(() => {
      expect(mockGoogleSignin).toHaveBeenCalledWith(fakeUser);
      expect(mockActions.setAuth).toHaveBeenCalledWith(response.data.user);
      expect(queryClient.refetchQueries).toHaveBeenCalledWith({
        queryKey: queryKeys.session._def
      });
      expect(mockRouterReplace).toHaveBeenCalledWith("/");
    });
  });

  it("409 에러 + confirm=true 시 destoryDBSession, router.push 호출해야 합니다.", async () => {
    const confirmSpy = jest.spyOn(global, "confirm").mockReturnValue(true);
    const error = {
      response: {
        status: 409,
        data: { message: "Conflict", email: "user@test.com" }
      },
      isAxiosError: true
    };

    mockGoogleSignin.mockRejectedValue(error);

    const { result } = renderHook(() => useGoogleSigninMutate(), {
      wrapper
    });

    await act(async () => {
      result.current.googleSigninMutate({
        email: "user@test.com",
        id: "token"
      } as GoogleAuthInfoResponseData);
    });

    await waitFor(() => {
      expect(mockDestoryDBSession).toHaveBeenCalledWith("user@test.com");
      expect(mockRouterPush).toHaveBeenCalledWith(
        expect.stringContaining("https://accounts.google.com/o/oauth2/v2/auth")
      );
    });

    confirmSpy.mockRestore();
  });

  it("409 에러 + confirm=false 시 router.replace('/signin') 호출해야 합니다.", async () => {
    const confirmSpy = jest.spyOn(global, "confirm").mockReturnValue(false);

    const error = {
      response: {
        status: 409,
        data: { message: "Conflict", email: "user@test.com" }
      },
      isAxiosError: true
    };

    mockGoogleSignin.mockRejectedValue(error);

    const { result } = renderHook(() => useGoogleSigninMutate(), {
      wrapper
    });

    await act(async () => {
      result.current.googleSigninMutate({
        email: "user@test.com",
        id: "token"
      } as GoogleAuthInfoResponseData);
    });

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith("/signin");
    });

    confirmSpy.mockRestore();
  });

  it("기타 에러 발생 시 toast.warn, router.replace('/signin') 호출해야 합니다.", async () => {
    const error = {
      response: {
        status: 500,
        data: { message: "Internal Server Error" }
      },
      isAxiosError: true
    };

    mockGoogleSignin.mockRejectedValue(error);

    const { result } = renderHook(() => useGoogleSigninMutate(), {
      wrapper
    });

    await act(async () => {
      result.current.googleSigninMutate({
        email: "user@test.com",
        id: "token"
      } as GoogleAuthInfoResponseData);
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("로그인에 실패했어요.");
      expect(mockRouterReplace).toHaveBeenCalledWith("/signin");
    });
  });
});
