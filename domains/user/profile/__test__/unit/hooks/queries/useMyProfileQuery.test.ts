import { renderHook } from "@testing-library/react";
import useMyProfileQuery from "@/domains/user/profile/hooks/queries/useMyProfileQuery";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { toast } from "react-toastify";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useQuery: jest.fn()
  };
});
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("@/domains/auth/shared/common/store/authStore");

describe("useMyProfileQuery 훅 테스트", () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("로그인된 사용자가 있는 경우 쿼리를 요청하고 데이터를 반환합니다.", () => {
    const mockUser = { uid: "user1" };
    const mockProfileData = { uid: "user1", name: "홍길동" };

    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: mockUser })
    );

    mockUseQuery.mockReturnValue({
      data: mockProfileData,
      isPending: false,
      isError: false
    });

    const { result } = renderHook(() => useMyProfileQuery());

    expect(result.current.myProfileData).toEqual(mockProfileData);
    expect(result.current.myProfilePending).toBe(false);
    expect(result.current.myProfileError).toBe(false);
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: true,
        queryKey: expect.any(Array),
        queryFn: expect.any(Function)
      })
    );
  });

  it("로그인된 사용자가 없는 경우 쿼리를 요청하지 않습니다.", () => {
    mockUseAuthStore.mockImplementation((selector) => selector({ user: null }));

    mockUseQuery.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: false
    });

    const { result } = renderHook(() => useMyProfileQuery());

    expect(result.current.myProfileData).toBeUndefined();
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false
      })
    );
  });

  it("에러 발생시 toast.warn를 호출합니다.", () => {
    const mockUser = { uid: "user1" };

    mockUseAuthStore.mockImplementation((selector) =>
      selector({ user: mockUser })
    );

    mockUseQuery.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true
    });

    renderHook(() => useMyProfileQuery());

    expect(toast.warn).toHaveBeenCalledWith(
      "나의 프로필 정보를 가져오는데 실패했어요.\n로그인 정보를 확인해주세요."
    );
  });
});
