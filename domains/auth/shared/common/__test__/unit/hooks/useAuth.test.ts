import { renderHook } from "@testing-library/react";
import useAuth from "../../../hooks/useAuth";
import useAuthQuery from "../../../hooks/queries/useAuthQuery";
import useSessionCookiesQuery from "../../../hooks/queries/useSessionCookiesQuery";
import useAuthStore from "../../../store/authStore";
import { usePathname } from "next/navigation";

jest.mock("../../../hooks/queries/useAuthQuery");
jest.mock("../../../hooks/queries/useSessionCookiesQuery");
jest.mock("../../../store/authStore");
jest.mock("next/navigation");

describe("useAuth 훅 테스트", () => {
  const mockUserAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseSessionCookiesQuery = useSessionCookiesQuery as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseAuthQuery = useAuthQuery as jest.Mock;
  const mockRefetchAuth = jest.fn();
  const mockResetAuth = jest.fn();
  const mockSetAuth = jest.fn();
  const mockSetIsLoading = jest.fn();

  const createMockActions = () => ({
    setAuth: mockSetAuth,
    resetAuth: mockResetAuth,
    setIsLoading: mockSetIsLoading
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockUserAuthStore.mockImplementation((selector) =>
      selector({ actions: createMockActions() })
    );
  });

  it("세션이 존재하면 refetchAuth가 호출됩니다.", () => {
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

    mockUsePathname.mockReturnValue("/");

    renderHook(() => useAuth());

    expect(mockRefetchAuth).toHaveBeenCalled();
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it("세션이 없으면 resetAuth가 호출됩니다.", () => {
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

    mockUsePathname.mockReturnValue("/");

    renderHook(() => useAuth());

    expect(mockResetAuth).toHaveBeenCalled();
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it("세션 존재하고 user 정보가 있으면 setAuth가 호출됩니다.", () => {
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

    mockUsePathname.mockReturnValue("/");

    renderHook(() => useAuth());

    expect(mockSetAuth).toHaveBeenCalledWith(mockUser);
  });

  it("sessionQueryError 발생 시 setIsLoading(false)이 호출됩니다.", () => {
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

    mockUsePathname.mockReturnValue("/");

    renderHook(() => useAuth());

    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it("authError 발생 시 resetAuth가 호출됩니다.", () => {
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

    mockUsePathname.mockReturnValue("/");

    renderHook(() => useAuth());

    expect(mockResetAuth).toHaveBeenCalled();
  });
});
