import { renderHook } from "@testing-library/react";
import useMyProfileSuspenseQuery from "@/domains/user/profile/hooks/queries/useMyProfileSuspenseQuery";
import { toast } from "react-toastify";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useSuspenseQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useSuspenseQuery: jest.fn()
}));
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("@/domains/auth/shared/common/store/authStore");

describe("useMyProfileSuspenseQuery 훅 테스트", () => {
  const mockUser = { uid: "123" };
  const mockData = { name: "테스트유저" };
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
  const mockUseSuspenseQuery = useSuspenseQuery as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuthStore.mockImplementation((selector) =>
      selector({
        user: { uid: mockUser }
      })
    );
  });

  it("정상적으로 data를 반환하고 로딩 상태는 false이다", () => {
    mockUseSuspenseQuery.mockReturnValue({
      data: mockData,
      isPending: false,
      isError: false
    });

    const { result } = renderHook(() => useMyProfileSuspenseQuery());

    expect(result.current.myProfileData).toEqual(mockData);
    expect(result.current.myProfileLoading).toBe(false);
    expect(result.current.myProfileError).toBe(false);
  });

  it("로딩 중일 때 myProfileLoading이 true가 된다", () => {
    mockUseSuspenseQuery.mockReturnValue({
      data: null,
      isPending: true,
      isError: false
    });

    const { result } = renderHook(() => useMyProfileSuspenseQuery());

    expect(result.current.myProfileLoading).toBe(true);
  });

  it("user가 없으면 myProfileLoading은 false이다", () => {
    mockUseAuthStore.mockImplementation((selector) => selector({ user: null }));
    mockUseSuspenseQuery.mockReturnValue({
      data: null,
      isPending: true,
      isError: false
    });

    const { result } = renderHook(() => useMyProfileSuspenseQuery());

    expect(result.current.myProfileLoading).toBe(false);
  });

  it("프로필 에러가 발생하면 toast.warn이 호출된다", () => {
    mockUseSuspenseQuery.mockImplementation((selector) =>
      selector({ user: mockUser })
    );
    mockUseSuspenseQuery.mockReturnValue({
      data: null,
      isPending: false,
      isError: true
    });

    renderHook(() => useMyProfileSuspenseQuery());

    expect(toast.warn).toHaveBeenCalledWith(
      "나의 프로필 정보를 가져오는데 실패했어요.\n로그인 정보를 확인해주세요."
    );
  });
});
