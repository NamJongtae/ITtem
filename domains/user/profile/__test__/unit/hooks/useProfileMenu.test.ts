import { renderHook, act } from "@testing-library/react";
import useProfileMenu from "../../../hooks/useProfileMenu";
import { ProfileMenu } from "../../../types/profileTypes";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}));

describe("useProfileMenu 훅 테스트", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("쿼리스트링이 없으면 기본값은 'products'입니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null
    });

    const { result } = renderHook(() => useProfileMenu());

    expect(result.current.currentMenu).toBe("products");
  });

  it("쿼리스트링 m 값이 있으면 해당 값이 currentMenu가 됩니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "reviews"
    });

    const { result } = renderHook(() => useProfileMenu());

    expect(result.current.currentMenu).toBe("reviews");
  });

  it("onClickMenu를 호출하면 router.push가 올바른 URL로 호출됩니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "products"
    });

    const { result } = renderHook(() => useProfileMenu());

    act(() => {
      result.current.onClickMenu("wishlist");
    });

    expect(pushMock).toHaveBeenCalledWith("/profile?m=wishlist");
  });

  it("onClickMenu는 전달받은 menu 값을 그대로 쿼리에 반영합니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "products"
    });

    const { result } = renderHook(() => useProfileMenu());

    act(() => {
      result.current.onClickMenu("followers");
    });

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenLastCalledWith("/profile?m=followers");
  });
});
