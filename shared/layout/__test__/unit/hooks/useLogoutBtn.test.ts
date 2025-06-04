import { renderHook, act } from "@testing-library/react";
import useLogoutBtn from "@/shared/layout/hooks/useLogoutBtn";

const mockSignoutMutate = jest.fn();
jest.mock("@/domains/auth/signout/hooks/useSignoutMutate", () => ({
  __esModule: true,
  default: () => ({
    signoutMutate: mockSignoutMutate
  })
}));

describe("useLogoutBtn 훅 테스트", () => {
  beforeEach(() => {
    mockSignoutMutate.mockClear();
  });

  it("handleClickLogout이 호출되면 signoutMutate가 실행되어야 합니다.", () => {
    const { result } = renderHook(() => useLogoutBtn());

    act(() => {
      result.current.handleClickLogout();
    });

    expect(mockSignoutMutate).toHaveBeenCalled();
  });
});
