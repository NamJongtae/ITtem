import { renderHook, waitFor } from "@testing-library/react";
import useAuth from "../../../hooks/useAuth";
import useAuthQuery from "../../../hooks/queries/useAuthQuery";
import useSessionCookiesQuery from "../../../hooks/queries/useSessionCookiesQuery";
import useAuthStore from "../../../store/authStore";
import { usePathname, useRouter } from "next/navigation";

jest.mock("../../../hooks/queries/useAuthQuery");
jest.mock("../../../hooks/queries/useSessionCookiesQuery");
jest.mock("../../../store/authStore");
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn()
}));

describe("useAuth 훅 테스트", () => {
  const mockUserAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseSessionCookiesQuery = useSessionCookiesQuery as jest.Mock;
  const mockUsePathname = usePathname as unknown as jest.Mock;
  const mockUseRouter = useRouter as unknown as jest.Mock;
  const mockUseAuthQuery = useAuthQuery as jest.Mock;

  const mockRefetchAuth = jest.fn();
  const mockResetAuth = jest.fn();
  const mockSetAuth = jest.fn();
  const mockSetIsLoading = jest.fn();
  const mockRouterReplace = jest.fn();

  const createMockActions = () => ({
    setAuth: mockSetAuth,
    resetAuth: mockResetAuth,
    setIsLoading: mockSetIsLoading
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockUsePathname.mockReturnValue("/");

    mockUseRouter.mockReturnValue({
      replace: mockRouterReplace
    });

    mockUserAuthStore.mockImplementation((selector) =>
      selector({ actions: createMockActions() })
    );
  });

  it("세션 조회 성공 + 세션 존재하면 refetchAuth가 호출되고 setIsLoading(false)가 호출된다.", async () => {
    mockUseSessionCookiesQuery.mockReturnValue({
      isExistSession: true,
      sessionQueryIsSuccess: true,
      sessionQueryError: null
    });

    mockUseAuthQuery.mockReturnValue({
      user: null,
      authIsLoading: false,
      authError: null,
      refetchAuth: mockRefetchAuth
    });

    renderHook(() => useAuth());

    await waitFor(() => {
      expect(mockRefetchAuth).toHaveBeenCalledTimes(1);
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    });
  });

  it("세션 조회 성공 + 세션 없음 + user도 없으면 router.replace는 호출되지 않고 setIsLoading(false)만 호출된다.", async () => {
    mockUseSessionCookiesQuery.mockReturnValue({
      isExistSession: false,
      sessionQueryIsSuccess: true,
      sessionQueryError: null
    });

    mockUseAuthQuery.mockReturnValue({
      user: null,
      authIsLoading: false,
      authError: null,
      refetchAuth: mockRefetchAuth
    });

    renderHook(() => useAuth());

    await waitFor(() => {
      expect(mockRefetchAuth).not.toHaveBeenCalled();
      expect(mockRouterReplace).not.toHaveBeenCalled();
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    });
  });

  it("세션 조회 성공 + 세션 없음인데 user가 있으면 /session-expired로 replace한다.", async () => {
    const mockUser = {
      uid: "abc123",
      nickname: "테스터",
      email: "test@example.com",
      profileImg: "/profile.png"
    };

    mockUseSessionCookiesQuery.mockReturnValue({
      isExistSession: false,
      sessionQueryIsSuccess: true,
      sessionQueryError: null
    });

    mockUseAuthQuery.mockReturnValue({
      user: mockUser,
      authIsLoading: false,
      authError: null,
      refetchAuth: mockRefetchAuth
    });

    renderHook(() => useAuth());

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith("/session-expired");
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    });
  });

  it("세션 존재 + user 정보가 있으면 actions.setAuth가 호출된다.", async () => {
    const mockUser = {
      uid: "abc123",
      nickname: "테스터",
      email: "test@example.com",
      profileImg: "/profile.png"
    };

    mockUseSessionCookiesQuery.mockReturnValue({
      isExistSession: true,
      sessionQueryIsSuccess: true,
      sessionQueryError: null
    });

    mockUseAuthQuery.mockReturnValue({
      user: mockUser,
      authIsLoading: false,
      authError: null,
      refetchAuth: mockRefetchAuth
    });

    renderHook(() => useAuth());

    await waitFor(() => {
      expect(mockSetAuth).toHaveBeenCalledWith({
        uid: mockUser.uid,
        nickname: mockUser.nickname,
        email: mockUser.email,
        profileImg: mockUser.profileImg
      });
    });
  });

  it("sessionQueryError 발생 시 setIsLoading(false)이 호출된다.", async () => {
    mockUseSessionCookiesQuery.mockReturnValue({
      isExistSession: false,
      sessionQueryIsSuccess: false,
      sessionQueryError: new Error("세션 오류")
    });

    mockUseAuthQuery.mockReturnValue({
      user: null,
      authIsLoading: false,
      authError: null,
      refetchAuth: mockRefetchAuth
    });

    renderHook(() => useAuth());

    await waitFor(() => {
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    });
  });

  it("authError 발생 시 actions.resetAuth가 호출된다.", async () => {
    mockUseSessionCookiesQuery.mockReturnValue({
      isExistSession: true,
      sessionQueryIsSuccess: true,
      sessionQueryError: null
    });

    mockUseAuthQuery.mockReturnValue({
      user: null,
      authIsLoading: false,
      authError: new Error("인증 오류"),
      refetchAuth: mockRefetchAuth
    });

    renderHook(() => useAuth());

    await waitFor(() => {
      expect(mockResetAuth).toHaveBeenCalledTimes(1);
    });
  });

  it("pathname이 /session-expired이면 sessionQueryIsSuccess여도 refetchAuth/setIsLoading(false)가 실행되지 않는다.", async () => {
    mockUsePathname.mockReturnValue("/session-expired");

    mockUseSessionCookiesQuery.mockReturnValue({
      isExistSession: true,
      sessionQueryIsSuccess: true,
      sessionQueryError: null
    });

    mockUseAuthQuery.mockReturnValue({
      user: null,
      authIsLoading: false,
      authError: null,
      refetchAuth: mockRefetchAuth
    });

    renderHook(() => useAuth());

    await waitFor(() => {
      expect(mockRefetchAuth).not.toHaveBeenCalled();
      expect(mockSetIsLoading).not.toHaveBeenCalledWith(false);
    });
  });

  it("pathname이 /logout이면 sessionQueryIsSuccess여도 refetchAuth/setIsLoading(false)가 실행되지 않는다.", async () => {
    mockUsePathname.mockReturnValue("/logout");

    mockUseSessionCookiesQuery.mockReturnValue({
      isExistSession: true,
      sessionQueryIsSuccess: true,
      sessionQueryError: null
    });

    mockUseAuthQuery.mockReturnValue({
      user: null,
      authIsLoading: false,
      authError: null,
      refetchAuth: mockRefetchAuth
    });

    renderHook(() => useAuth());

    await waitFor(() => {
      expect(mockRefetchAuth).not.toHaveBeenCalled();
      expect(mockSetIsLoading).not.toHaveBeenCalledWith(false);
    });
  });
});
