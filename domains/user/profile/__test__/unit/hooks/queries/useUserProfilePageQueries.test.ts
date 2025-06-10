import { renderHook } from "@testing-library/react";
import useUserProfilePageQueries from "@/domains/user/profile/hooks/queries/useUserProfilePageQueries";
import { useQuery } from "@tanstack/react-query";
import useProfileQuery from "@/domains/user/profile/hooks/queries/useProfileQuery";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useQuery: jest.fn()
  };
});
jest.mock("@/domains/user/profile/hooks/queries/useProfileQuery");
jest.mock("@/domains/auth/shared/common/store/authStore");

describe("useUserProfilePageQueries 훅 테스트", () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockUseProfileQuery = useProfileQuery as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

  const mockMyProfileData = { uid: "me", name: "나" };
  const mockUserProfileData = { uid: "user1", name: "상대" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모든 쿼리가 성공했을 때 isLoading은 false, isError는 false입니다.", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "me" } })
    );

    mockUseQuery.mockReturnValue({
      data: mockMyProfileData,
      isSuccess: true,
      isError: false
    });

    mockUseProfileQuery.mockReturnValue({
      profileData: mockUserProfileData,
      profileSuccess: true,
      profileError: false
    });

    const { result } = renderHook(() => useUserProfilePageQueries());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.myProfileData).toEqual(mockMyProfileData);
    expect(result.current.profileData).toEqual(mockUserProfileData);
  });

  it("useProfileQuery 에러가 발생하면 isError는 true입니다.", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "me" } })
    );

    mockUseQuery.mockReturnValue({
      data: mockMyProfileData,
      isSuccess: true,
      isError: false
    });

    mockUseProfileQuery.mockReturnValue({
      profileData: undefined,
      profileSuccess: false,
      profileError: true
    });

    const { result } = renderHook(() => useUserProfilePageQueries());

    expect(result.current.isError).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it("useMyProfileQuery 에러가 발생하면 isError는 true입니다.", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "me" } })
    );

    mockUseQuery.mockReturnValue({
      data: undefined,
      isSuccess: false,
      isError: true
    });

    mockUseProfileQuery.mockReturnValue({
      profileData: mockUserProfileData,
      profileSuccess: true,
      profileError: false
    });

    const { result } = renderHook(() => useUserProfilePageQueries());

    expect(result.current.isError).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it("useProfileQuery, useMyProfileQuery 중 하나라도 로딩 중이면 isLoading은 true입니다.", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: { uid: "me" } })
    );

    mockUseQuery.mockReturnValue({
      data: undefined,
      isSuccess: false,
      isError: false
    });

    mockUseProfileQuery.mockReturnValue({
      profileData: mockUserProfileData,
      profileSuccess: true,
      profileError: false
    });

    const { result } = renderHook(() => useUserProfilePageQueries());

    expect(result.current.isLoading).toBe(true);
  });

  it("로그인된 사용자가 없으면 myProfileQuery는 호출되지 않습니다.", () => {
    mockUseAuthStore.mockImplementation((selector) => selector({ user: null }));

    mockUseQuery.mockImplementation((options) => {
      expect(options.enabled).toBe(false);
      return {
        data: undefined,
        isSuccess: false,
        isError: false
      };
    });

    mockUseProfileQuery.mockReturnValue({
      profileData: mockUserProfileData,
      profileSuccess: true,
      profileError: false
    });

    renderHook(() => useUserProfilePageQueries());
  });
});
